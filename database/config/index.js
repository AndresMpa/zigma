require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  db: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};

module.exports = { config };
