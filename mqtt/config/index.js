require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.SEVER_PORT || 3000,
  cache: {
    port: process.env.CACHE_PORT || 6379,
    host: process.env.CACHE_HOST || 'localhost',
    family: parseInt(process.env.CACHE_IP_PROTOCOL, 10) || 4,
    password: process.env.CACHE_PASS || 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
  },
};

module.exports = { config };
