const toolkit = require('../toolkit-instance');
const handleLs = require('../commands-util/handle-ls');
const { logError } = require('../commands-util/util');

exports.command = 'ls';
exports.desc = 'Lists available configuration versions on storage.';
exports.builder = {
  'namespace': {
    alias: 'n',
    describe: 'Configuration namespace',
    demandOption: false,
    default: 'default'
  }
};
exports.handler = async function(...args) {
  try {
    await handleLs(toolkit, ...args);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};