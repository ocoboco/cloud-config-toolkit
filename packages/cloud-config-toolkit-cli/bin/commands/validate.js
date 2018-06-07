const fs = require('fs-extra');
const { yellow, red } = require('chalk');

const toolkit = require('../toolkit-instance');
const { logError } = require('../commands-util');

exports.command = 'validate <path>';
exports.desc = 'Validates the configuration file at specified path.';
exports.handler = handler.bind(undefined, toolkit);

async function handler(toolkit, { path }) {
  try {
    await fs.access(path, fs.constants.R_OK);
  } catch (error) {
    logError('Cannot access the file at specified path.', error);
    process.exit(1);
  }
  let fileContent;
  try {
    fileContent = await fs.readFile(path, 'utf8');
  } catch(error) {
    logError('Cannot read the file at specified path.', error);
    process.exit(1);
  }
  let configuration;
  try {
    configuration = toolkit.deserialize(fileContent);
  } catch(error) {
    logError('Cannot deserialize the configuration file.', error);
    process.exit(1);
  }
  const { isValid, errors } = toolkit.validate(configuration);
  if (!isValid) {
    console.log(yellow('Configuration is invalid.'));
    console.log(red(JSON.stringify(errors, null, 2)));
    process.exit(1);
  }
}