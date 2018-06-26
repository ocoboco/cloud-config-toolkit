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
const Env = new Interface('Env', [
  'getVars'
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
  commands,
  env
} = {}) {
  if (typeof validator !== 'object') {
    throw new Error('"config.validator" is required.');
  }
  Interface.ensureImplements(validator, Validator);
  if (typeof serialize !== 'function') {
    throw new Error('"config.serialize" function is required.');
  }
  if (typeof deserialize !== 'function') {
    throw new Error('"config.deserialize" function is required.');
  }
  if (typeof storage !== 'object') {
    throw new Error('"config.storage" is required.');
  }
  Interface.ensureImplements(storage, Storage);
  if (Array.isArray(commands)) {
    commands.forEach(function(module) {
      if (!module.command) {
        throw new Error(`"config.commands": command property is required.`);
      }
      if (!module.handler) {
        throw new Error(`"config.commands": handler of "${module.command}" is missing.`);
      }
      const commandName = module.command.split(' ')[0];
      if (COMMAND_NAMES.includes(commandName)) {
        throw new Error(`"config.commands": name "${commandName}" is pre-defined and cannot be used.`);
      }
    });
  }
  if (typeof env === 'object') {
    Interface.ensureImplements(env, Env);
  }
}