const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);

// Импортируем конфигурацию из database.js правильно
const databaseConfig = require('../config/database.js');
const env = process.env.NODE_ENV || 'development';

// Получаем правильную конфигурацию
let sequelize;

if (databaseConfig.sequelize) {
  // Если database.js уже создал экземпляр Sequelize
  sequelize = databaseConfig.sequelize;
} else {
  // Если database.js экспортирует конфигурацию
  const config = databaseConfig.config || databaseConfig;
  
  // Для разных окружений
  let dbConfig;
  if (config[env]) {
    dbConfig = config[env];
  } else {
    dbConfig = config;
  }

  if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
  } else {
    sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        dialectOptions: dbConfig.dialectOptions,
        logging: dbConfig.logging,
        pool: dbConfig.pool
      }
    );
  }
}

const db = {};

// Импортируем все модели из папки models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Устанавливаем ассоциации
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;