const { handleFatalError } = require('../util');
const debug = require('debug')('zigma:mqtt');
const chalk = require('chalk');

function handler(server) {
  server.on('connection', (client) => {
    debug(`${chalk.blue('[MQTT SERVER]:')} Client connected`);
    debug(`Client data: ${client.client.id}`);
  });

  server.on('disconnected', (client) => {
    debug(`${chalk.blue('[MQTT SERVER]:')} Client disconnected`);
    debug(`Client data: ${client}`);
  });

  server.on('published', (package, client) => {
    debug(`${chalk.blue('[MQTT SERVER]:')} Getting information from client`);
    debug(`Package topic: ${package.topic}`);
    debug(`Client data: ${client}`);
  });

  server.on('clientError', handleFatalError);
  server.on('connectionError', handleFatalError);
}

module.exports = {
  handler,
};
