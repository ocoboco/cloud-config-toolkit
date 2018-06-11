const fs = require('fs-extra');
const { yellow, red } = require('chalk');

const { logError } = require('../index');

async function handleFileValidation(toolkit, { path }) {
  try {
    await fs.access(path, fs.constants.R_OK);
  } catch (error) {
    logError('Cannot access the file at specified path.', error);
    throw error;
  }
  let fileContent;
  try {
    fileContent = await fs.readFile(path, 'utf8');
  } catch(error) {
    logError('Cannot read the file at specified path.', error);
    throw error;
  }
  let configuration;
  try {
    configuration = toolkit.deserialize(fileContent);
  } catch(error) {
    logError('Cannot deserialize the configuration file.', error);
    throw error;
  }
  const { isValid, errors } = toolkit.validate(configuration);
  if (!isValid) {
    console.log(yellow('Configuration is invalid.'));
    console.log(red(JSON.stringify(errors, null, 2)));
    throw new Error('Configuration is invalid.');
  }
  return true;
}

module.exports = handleFileValidation;