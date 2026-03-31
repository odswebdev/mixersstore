require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - обновленная конфигурация для Railway
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_URL || ['https://your-frontend.up.railway.app', 'https://mixersstore-frontend.up.railway.app'])
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - для Railway важно правильно указать путь
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', productRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'API is running 🚀',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Health check для Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});