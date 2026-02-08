// Упрощенный контроллер заказов для быстрого запуска

// Хранилище в памяти
const orders = [];
let orderId = 1;

// 🛒 Создать заказ
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Корзина пуста'
      });
    }
    
    const order = {
      id: orderId++,
      orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: req.user?.id || 1,
      items,
      shippingAddress,
      status: 'pending',
      totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.push(order);
    
    res.status(201).json({
      success: true,
      message: 'Заказ успешно создан',
      data: order
    });
  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при создании заказа',
      error: error.message
    });
  }
};

// 📋 Получить все заказы (для админа)
export const getOrders = async (req, res) => {
  try {
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('❌ Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении заказов',
      error: error.message
    });
  }
};

// 🔍 Получить заказ по ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;
    
    const order = orders.find(o => o.id === parseInt(id));
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Заказ не найден'
      });
    }
    
    // Если не админ, проверяем владение
    if (userRole !== 'admin' && order.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Недостаточно прав'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('❌ Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении заказа',
      error: error.message
    });
  }
};

// 👤 Получить заказы текущего пользователя
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const userOrders = orders.filter(order => order.userId === userId);
    
    res.json({
      success: true,
      data: userOrders
    });
  } catch (error) {
    console.error('❌ Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении заказов',
      error: error.message
    });
  }
};

// 🔄 Обновить статус заказа
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = orders.find(o => o.id === parseInt(id));
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Заказ не найден'
      });
    }
    
    order.status = status;
    order.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: `Статус заказа обновлен на "${status}"`,
      data: order
    });
  } catch (error) {
    console.error('❌ Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении статуса заказа',
      error: error.message
    });
  }
};

// ❌ Отменить заказ
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 1;
    
    const order = orders.find(o => o.id === parseInt(id) && o.userId === userId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Заказ не найден'
      });
    }
    
    // Проверяем можно ли отменить
    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Заказ в статусе "${order.status}" нельзя отменить`
      });
    }
    
    order.status = 'cancelled';
    order.updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: 'Заказ успешно отменен',
      data: order
    });
  } catch (error) {
    console.error('❌ Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при отмене заказа',
      error: error.message
    });
  }
};

// 📊 Статистика заказов (для админа)
export const getOrderStats = async (req, res) => {
  try {
    // Расчет статистики из массива orders
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Статистика по статусам
    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    
    // Последние 5 заказов
    const recentOrders = orders.slice(-5).reverse();
    
    // Ежедневная статистика (заглушка)
    const dailyStats = [
      { date: '2024-01-01', orders: 5, revenue: 7500 },
      { date: '2024-01-02', orders: 3, revenue: 4500 },
      { date: '2024-01-03', orders: 7, revenue: 10500 }
    ];
    
    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        averageOrderValue,
        ordersByStatus,
        recentOrders,
        dailyStats,
        summary: {
          pending: orders.filter(o => o.status === 'pending').length,
          processing: orders.filter(o => o.status === 'processing').length,
          shipped: orders.filter(o => o.status === 'shipped').length,
          delivered: orders.filter(o => o.status === 'delivered').length,
          cancelled: orders.filter(o => o.status === 'cancelled').length
        }
      }
    });
  } catch (error) {
    console.error('❌ Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении статистики',
      error: error.message
    });
  }
};