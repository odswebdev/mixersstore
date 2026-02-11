const express = require('express');
const cors = require('cors');
const productRoutes = require('../backend/src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Разрешаем кросс-доменные запросы
app.use(express.json()); // Для парсинга JSON
app.use(express.urlencoded({ extended: true }));

// Статические файлы для изображений
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', productRoutes); // Подключаем маршруты товаров

// Базовый маршрут для проверки
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});