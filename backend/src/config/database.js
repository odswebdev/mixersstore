const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

// Определяем, работаем ли мы на Vercel
const isVercel = process.env.VERCEL === '1';
const isVercelProduction = process.env.VERCEL_ENV === 'production';

// Получаем URL базы данных из окружения Vercel
const vercelPostgresUrl = process.env.POSTGRES_URL;
const supabaseUrl = process.env.SUPABASE_URL;
const databaseUrl = process.env.DATABASE_URL;

// Функция для парсинга URL базы данных
const parseDatabaseUrl = (url) => {
  // Форматы:
  // postgresql://[user]:[password]@[host]:[port]/[database]
  // postgres://[user]:[password]@[host]:[port]/[database]
  const urlPatterns = [
    /postgres(?:ql)?:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/,
    /postgres(?:ql)?:\/\/([^@]+)@([^:]+):(\d+)\/(.+)/,
  ];

  for (const pattern of urlPatterns) {
    const match = url.match(pattern);
    if (match) {
      // Если у нас 5 групп (с username и password)
      if (match.length === 6) {
        return {
          username: match[1],
          password: match[2],
          host: match[3],
          port: parseInt(match[4], 10),
          database: match[5],
        };
      }
      // Если у нас 4 группы (без пароля или username)
      if (match.length === 5) {
        return {
          username: match[1],
          password: '', // или process.env.DB_PASSWORD если нужно
          host: match[2],
          port: parseInt(match[3], 10),
          database: match[4],
        };
      }
    }
  }
  
  throw new Error('Invalid database URL format: ' + url);
};

// Определяем конфигурацию
let config;

if (isVercel) {
  // Работаем на Vercel
  let dbUrl;
  
  // Приоритет подключений
  if (vercelPostgresUrl) {
    dbUrl = vercelPostgresUrl;
    console.log('Using Vercel PostgreSQL');
  } else if (supabaseUrl && process.env.DATABASE_URL) {
    dbUrl = process.env.DATABASE_URL;
    console.log('Using Supabase PostgreSQL');
  } else if (databaseUrl) {
    dbUrl = databaseUrl;
    console.log('Using DATABASE_URL');
  } else {
    // Если нет URL, используем переменные окружения по отдельности
    config = {
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    };
    console.log('Using individual environment variables on Vercel');
  }
  
  // Если нашли URL базы данных
  if (dbUrl) {
    const parsedConfig = parseDatabaseUrl(dbUrl);
    
    config = {
      ...parsedConfig,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    };
  }
} else {
  // Локальная разработка или не Vercel окружение
  config = {
    database: process.env.DB_NAME || 'demmstore',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'test2026',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  };
  console.log('Using local PostgreSQL configuration');
}

// Альтернативный подход с конфигурациями для разных окружений
const configs = {
  development: {
    database: process.env.DB_NAME || 'demmstore',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'test2026',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    logging: process.env.DB_LOGGING === 'true' ? console.log : console.log,
  },
  
  test: {
    database: process.env.DB_NAME_TEST || 'ecommerce_test',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'test2026',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433', 10),
    dialect: 'postgres',
    logging: false,
  },
  
  production: {
    // По умолчанию используем конфигурацию из переменных окружения
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'false' ? undefined : {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || '10', 10),
      min: parseInt(process.env.DB_POOL_MIN || '0', 10),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
      idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10)
    }
  }
};

// Используем нужную конфигурацию
// Если мы на Vercel, используем config из условия выше
// Если не на Vercel, используем конфигурацию по NODE_ENV
let finalConfig = config;
if (!isVercel) {
  finalConfig = configs[env] || configs.development;
}

// Создаем экземпляр Sequelize
const sequelize = new Sequelize(
  finalConfig.database,
  finalConfig.username,
  finalConfig.password,
  {
    host: finalConfig.host,
    port: finalConfig.port,
    dialect: finalConfig.dialect,
    dialectOptions: finalConfig.dialectOptions,
    logging: finalConfig.logging,
    pool: finalConfig.pool,
  }
);

// Проверка подключения
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Database connected successfully. Environment: ${env}, Vercel: ${isVercel ? 'Yes' : 'No'}`);
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
  config: finalConfig
};