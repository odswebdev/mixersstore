// server/middleware/auth.js
import jwt from 'jsonwebtoken';

// 🔐 Middleware для проверки аутентификации
export const authenticate = (req, res, next) => {
  try {
    // Получаем токен из заголовков
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Требуется аутентификация'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Добавляем пользователя в запрос
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Недействительный токен'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Токен истек'
      });
    }
    
    console.error('❌ Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка аутентификации',
      error: error.message
    });
  }
};

// 👑 Middleware для проверки ролей
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Требуется аутентификация'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Недостаточно прав'
      });
    }

    next();
  };
};

// 🔍 Middleware для проверки владения ресурсом
export const checkOwnership = (model) => {
  return async (req, res, next) => {
    try {
      const resource = await model.findByPk(req.params.id);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Ресурс не найден'
        });
      }

      // Если пользователь админ или владелец ресурса
      if (req.user.role === 'admin' || resource.userId === req.user.id) {
        req.resource = resource;
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'Недостаточно прав для доступа к этому ресурсу'
      });
    } catch (error) {
      console.error('❌ Check ownership error:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка проверки прав доступа',
        error: error.message
      });
    }
  };
};