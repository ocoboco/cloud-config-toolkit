#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const resolveCwd = require('resolve-cwd');
let cctConfig;

try {
  config = require(process.cwd() + '/cct-config.js');
} catch (error) {
  console.log(chalk.red('Error: ') + chalk.yellow('cct-config.js') + ' not found in the project directory\n');
  throw error;
}

const argv = yargs
  .commandDir('commands')
  .demandCommand()
  .help()
  .argv;