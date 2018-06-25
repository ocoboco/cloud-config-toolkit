const Interface = require('./interface');

const Validator = new Interface('Validator', [
  'isValid',
  'getErrors'
]);
const Storage = new Interface('Storage', [
  'createItem',
  'getItemContent',
  'itemExists',
  'getItemNames'
]);

const COMMAND_NAMES = [
  'validate', 'v',
  'push', 'p',
  'download', 'd',
  'ls',
  'download-export', 'de',
  'export', 'e'
];

module.exports = function checkCctConfig({
  validator,
  serialize,
  deserialize,
  storage,
  commands
} = {}) {
  if (typeof validator !== 'object') {
    throw new Error('config.validator is required.');
  }
  Interface.ensureImplements(validator, Validator);
  if (typeof serialize !== 'function') {
    throw new Error('config.serialize function is required.');
  }
  if (typeof deserialize !== 'function') {
    throw new Error('config.deserialize function is required.');
  }
  if (typeof storage !== 'object') {
    throw new Error('config.storage is required.');
  }
  if (typeof commands === 'object') {
    Object.keys(commands).forEach(function(commandName) {
      if (COMMAND_NAMES.includes(commandName)) {
        throw new Error(`Command name "${commandName}" is pre-defined and cannot be used.`);
      }
    });
  }
  Interface.ensureImplements(storage, Storage);
}