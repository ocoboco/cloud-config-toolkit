const toolkit = require('../toolkit-instance');
const handlePush = require('../commands-util/handle-push');
const { logError } = require('../commands-util/util');

exports.command = 'push <path>';
exports.desc = 'Pushes configuration to storage.';
exports.builder = {
  'version': {
    alias: 'v',
    describe: 'Configuration version',
    demandOption: true
  },
  'namespace': {
    alias: 'n',
    describe: 'Configuration namespace',
    demandOption: false,
    default: 'default'
  }
};
exports.handler = async function(...args) {
  try {
    await handlePush(toolkit, ...args);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};