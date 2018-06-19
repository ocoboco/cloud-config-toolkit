const fs = require('fs-extra');

async function handleDownload(toolkit, { version, namespace, destination }) {
  let destinationFileExists = true;
  try {
    await fs.access(destination, fs.constants.F_OK);
  } catch (error) {
    destinationFileExists = false;
  }
  if (destinationFileExists) {
    throw new Error(`Cannot write to destination file, a file already exists at "${destination}".`);
  }
  const versionExists = await toolkit.itemExists(version, `${namespace}/configs`);
  if (!versionExists) {
    throw new Error(`Configuration version "${version}" not found.`);
  }
  const fileContent = await toolkit.download(version, `${namespace}/configs`);
  try {
    await fs.writeFile(destination, fileContent);
  } catch (error) {
    error.explanation = `Cannot write to destination file "${destination}", check the directory existence and write permission.`;
    throw error;
  }
  return true;
}

module.exports = handleDownload;