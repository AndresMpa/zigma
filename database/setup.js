const debug = require('debug')('zigma:databse:setup');
const inquirer = require('inquirer');
const chalk = require('chalk');
const database = require('./');

const promp = inquirer.createPromptModule();

async function setup() {
  const answer = await promp([
    {
      type: 'confirm',
      name: 'setup',
      message: `${chalk.yellow(
        '[DANGER]:'
      )} This script will remove the entire data base, are you sure?`,
    },
  ]);

  if (!answer.setup) {
    return console.log(`${chalk.blue('[CANCELLED]:')} Script did not continue`);
  }

  const config = {
    database: process.env.DB_NAME || 'zigma',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin123',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    setup: true,

    logging: (status) => debug(status),
  };

  await database(config).catch(handleFatalError);

  console.log(`${chalk.green('[DATA BASE]')}: Created successfully!`);
  process.exit(0);
}

function handleFatalError(error) {
  console.error(`${chalk.red('[FATAL ERROR]')} ${error.message}`);
  console.error(error.stack);
  process.exit(1);
}

setup();
