require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  db: {
    database: process.env.DB_NAME || 'zigma',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin123',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  port: process.env.DB_PORT || 3000,
};

module.exports = { config };
