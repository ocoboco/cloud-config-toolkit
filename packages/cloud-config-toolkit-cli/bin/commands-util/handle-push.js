const fs = require('fs-extra');

const handleValidation = require('./handle-validation');

async function handlePush(toolkit, { path, version, namespace }) {
  await handleValidation(toolkit, { path });
  const fileContent = await fs.readFile(path, 'utf8');
  const configuration = toolkit.deserialize(fileContent);
  const versionExists = await toolkit.itemExists(version, `${namespace}/configs`);
  if (versionExists) {
    throw new Error(`Configuration version "${version}" is already pushed to storage.`);
  }
  await toolkit.push(configuration, version, `${namespace}/configs`);
  if (toolkit.exportEnabled()) {
    const exportedConfiguration = toolkit.export(configuration);
    await toolkit.push(exportedConfiguration, version, `${namespace}/exports`);
  }
  return true;
}

module.exports = handlePush;