#!/usr/bin/env node

const yargs = require('yargs');

require('./verify-modules');

const argv = yargs
  .commandDir('commands')
  .demandCommand()
  .help()
  .argv;