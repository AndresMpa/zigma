const redisPersistence = require('aedes-persistence-redis');
const mqemitter = require('mqemitter-redis');
const { config } = require('./');
const redis = require('redis');

function createAedesServer() {
  const mqttServer = require('aedes')({
    persistence: redisPersistence(config.cache),
    mq: mqemitter(config.cache),
  });

  return require('net').createServer(mqttServer.handle);
}

module.exports = {
  createAedesServer,
};
