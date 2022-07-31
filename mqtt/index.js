const { handler } = require('./events/events.handler');
const { handleFatalError } = require('./util');
const { config } = require('./config');
const mqtt = require('./config/mqtt');
const chalk = require('chalk');

const server = mqtt.createAedesServer();

server.listen(config.port, () => {
  console.log(
    `${chalk.green('[MQTT SERVER]:')} Server is running on port ${config.port}`
  );
});

handler(server);

process.on('uncaughtException', handleFatalError);
process.on('unhandledRejection', handleFatalError);
