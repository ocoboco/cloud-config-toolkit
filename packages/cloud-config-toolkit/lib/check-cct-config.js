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

module.exports = function checkCctConfig({
  validator,
  serialize,
  deserialize,
  storage
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
  Interface.ensureImplements(storage, Storage);
}