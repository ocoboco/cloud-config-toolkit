const fs = require('fs-extra');
const { yellow, red } = require('chalk');

const toolkit = require('../toolkit-instance');

exports.command = 'validate <path>'
exports.desc = 'Validates the configuration file at specified path.';

exports.handler = async function ({ path }) {
  try {
    await fs.access(path, fs.constants.R_OK);
  } catch (error) {
    console.log(yellow('Cannot access the file at specified path.'));
    console.log(red(error.message));
    process.exit(1);
  }
  let fileContent;
  try {
    fileContent = await fs.readFile(path, 'utf8');
  } catch(error) {
    console.log(yellow('Cannot read the file at specified path.'));
    console.log(red(error.message));
    process.exit(1);
  }
  let configuration;
  try {
    configuration = toolkit.deserialize(fileContent);
  } catch(error) {
    console.log(yellow('Cannot deserialize the configuration file.'));
    console.log(red(error.message));
    process.exit(1);
  }
  const { isValid, errors } = toolkit.validate(configuration);
  if (!isValid) {
    console.log(yellow('Configuration is invalid.'));
    console.log(red(JSON.stringify(errors, null, 2)));
    process.exit(1);
  }
};