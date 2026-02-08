const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const productRoutes = require('../routes/productRoutes');

const app = express();

// Определяем окружение
const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Настройка CORS в зависимости от окружения
const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200
};

if (isProduction && !isVercel) {
  // Продакшн на собственном сервере - строгие настройки CORS
  corsOptions.origin = process.env.CLIENT_URL 
    ? process.env.CLIENT_URL.split(',') 
    : false;
} else if (isVercel) {
  // Vercel - разрешаем запросы с vercel.app доменов и указанных клиентов
  const vercelDomains = [
    'https://*.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173' // Vite dev server
  ];
  
  if (process.env.CLIENT_URL) {
    vercelDomains.push(...process.env.CLIENT_URL.split(','));
  }
  
  corsOptions.origin = (origin, callback) => {
    // Разрешаем запросы без origin (например, из Postman, curl)
    if (!origin) return callback(null, true);
    
    // Проверяем совпадение с разрешенными доменами
    const allowed = vercelDomains.some(domain => {
      if (domain.includes('*')) {
        const regex = new RegExp(domain.replace('*', '.*'));
        return regex.test(origin);
      }
      return origin === domain;
    });
    
    if (allowed) {
      callback(null, true);
    } else {
      console.log(`CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  };
} else {
  // Локальная разработка - разрешаем все
  corsOptions.origin = true;
}

// Middleware
app.use(cors(corsOptions));

// Безопасность: устанавливаем заголовки
app.use((req, res, next) => {
  // Базовые заголовки безопасности
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // CSP для Vercel
  if (isVercel) {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    );
  }
  
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
// На Vercel используем /tmp директорию, так как файловая система read-only
if (isVercel) {
  // На Vercel файлы лучше хранить в облачном хранилище (S3, Cloudinary и т.д.)
  console.log('Running on Vercel - using cloud storage for files');
  
  // Резервный вариант: используем /tmp директорию Vercel
  const tmpDir = '/tmp';
  const fs = require('fs');
  
  // Создаем /tmp/uploads если не существует
  if (!fs.existsSync(`${tmpDir}/uploads`)) {
    fs.mkdirSync(`${tmpDir}/uploads`, { recursive: true });
  }
  
  app.use('/uploads', express.static(tmpDir));
} else {
  // Локальная разработка
  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
}

// Конфигурация multer для загрузки файлов
const storage = isVercel 
  ? multer.diskStorage({
      destination: '/tmp/uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    })
  : multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    });

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Экспортируем upload middleware для использования в роутах
app.locals.upload = upload;

// Routes
app.use('/api/products', productRoutes);

// Health check с информацией о среде
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    vercel: isVercel,
    nodeVersion: process.version,
    platform: process.platform
  });
});

// Информация о приложении
app.get('/api/info', (req, res) => {
  res.json({
    app: 'E-Commerce API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    deployedOn: isVercel ? 'Vercel' : 'Local/Other',
    features: {
      fileUpload: true,
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: isDevelopment ? err.stack : undefined,
    path: req.path,
    method: req.method
  });
  
  if (err instanceof multer.MulterError) {
    let message = 'File upload error';
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large. Maximum size is 5MB';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected field in file upload';
        break;
    }
    return res.status(400).json({ error: message });
  }
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy violation' });
  }
  
  res.status(err.status || 500).json({ 
    error: 'Internal server error',
    message: isDevelopment ? err.message : undefined,
    ...(isDevelopment && { stack: err.stack })
  });
});

// Запуск сервера только если не на Vercel
// На Vercel приложение экспортируется как serverless функция
if (!isVercel) {
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📁 Static files: ${path.join(__dirname, '../public/uploads')}`);
    console.log(`🔄 CORS: ${process.env.CLIENT_URL || 'All origins (development)'}`);
  });
  
  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Closing server...');
    process.exit(0);
  });
  
  process.on('SIGINT', () => {
    console.log('SIGINT received. Closing server...');
    process.exit(0);
  });
}

module.exports = app;