#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');

const modulesExist = require('./modulesExist');

const result = modulesExist([
  './cct-config.js',
  'cloud-config-toolkit'
]);

if (result != null) {
  const { error, modulePath } = result;
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log(chalk.red('Error: ') + chalk.yellow(modulePath) + ' not found in the project directory\n');
  }
  throw error;
}

const argv = yargs
  .commandDir('commands')
  .demandCommand()
  .help()
  .argv;