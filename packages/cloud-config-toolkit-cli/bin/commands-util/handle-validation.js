const fs = require('fs-extra');

async function handleValidation(toolkit, { path }) {
  try {
    await fs.access(path, fs.constants.R_OK);
  } catch (error) {
    error.explanation = 'Cannot access the file at specified path.';
    throw error;
  }
  let fileContent;
  try {
    fileContent = await fs.readFile(path, 'utf8');
  } catch(error) {
    error.explanation = 'Cannot read the file at specified path.';
    throw error;
  }
  let configuration;
  try {
    configuration = toolkit.deserialize(fileContent);
  } catch(error) {
    error.explanation = 'Cannot deserialize the configuration file.';
    throw error;
  }
  const { isValid, errors } = toolkit.validate(configuration);
  if (!isValid) {
    const error = new Error(JSON.stringify(errors, null, 2));
    error.explanation = 'Configuration is invalid.';
    throw error;
  }
  return true;
}

module.exports = handleValidation;