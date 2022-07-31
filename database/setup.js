const debug = require('debug')('zigma:databse:setup');
const { handleFatalError } = require('./util');
const cmdArgs = require('command-line-args');
const { config } = require('./config');
const inquirer = require('inquirer');
const chalk = require('chalk');
const database = require('./');

// CLI options
const optionDefinitions = [{ name: 'yes', alias: 'y', type: Boolean }];
const parsedArgv = cmdArgs(optionDefinitions);

// Promp for humans
const promp = inquirer.createPromptModule();

async function setup() {
  if (!parsedArgv.yes) {
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
      console.log(`${chalk.blue('[CANCELLED]:')} Script did not continue`);
      process.exit(0);
    }
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
