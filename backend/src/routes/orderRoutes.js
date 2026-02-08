import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getMyOrders,
  getOrderStats  // Эта строка должна быть!
} from '../controllers/orderController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// 📦 Все маршруты для заказов

// 🔒 Маршруты для пользователей (требуется аутентификация)
router.post('/', authenticate, createOrder); // Создать заказ
router.get('/my-orders', authenticate, getMyOrders); // Получить мои заказы
router.get('/my-orders/:id', authenticate, getOrderById); // Получить конкретный заказ
router.put('/my-orders/:id/cancel', authenticate, cancelOrder); // Отменить заказ

// 👑 Маршруты для админов (требуется роль admin)
router.get('/', authenticate, authorize('admin'), getOrders); // Получить все заказы
router.put('/:id/status', authenticate, authorize('admin'), updateOrderStatus); // Обновить статус заказа
router.get('/stats', authenticate, authorize('admin'), getOrderStats); // Статистика заказов

export default router;