const debug = require('debug')('zigma:databse:setup');
const { handleFatalError } = require('./util');
const { config } = require('./config');
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

  const dBConfig = {
    ...config.db,
    setup: true,

    logging: (status) => debug(status),
  };

  await database(dBConfig).catch(handleFatalError);

  console.log(`${chalk.green('[DATA BASE]')}: Created successfully!`);
  process.exit(0);
}

setup();
