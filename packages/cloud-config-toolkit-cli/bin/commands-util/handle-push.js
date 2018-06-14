const fs = require('fs-extra');

const handleValidation = require('./handle-validation');

async function handlePush(toolkit, { path, version, namespace }) {
  await handleValidation(toolkit, { path });
  const fileContent = await fs.readFile(path, 'utf8');
  const configuration = toolkit.deserialize(fileContent);
  await toolkit.push(configuration, version, namespace);
  return true;
}

module.exports = handlePush;