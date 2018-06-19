const fs = require('fs-extra');

const handleValidation = require('./handle-validation');

async function handleExport(toolkit, { path, destination }) {
  await handleValidation(toolkit, { path });
  let destinationFileExists = true;
  try {
    await fs.access(destination, fs.constants.F_OK);
  } catch (error) {
    destinationFileExists = false;
  }
  if (destinationFileExists) {
    throw new Error(`Cannot write to destination file, a file already exists at '${destination}'`);
  }
  const fileContent = await fs.readFile(path, 'utf8');
  const configuration = toolkit.deserialize(fileContent);
  const exportedConfiguration = toolkit.export(configuration);
  const exportedFileContent = toolkit.serialize(exportedConfiguration);
  try {
    await fs.writeFile(destination, exportedFileContent);
  } catch (error) {
    error.explanation = `Cannot write to destination file ${destination}, check the directory existence and write permission.`;
    throw error;
  }
  return true;
}

module.exports = handleExport;