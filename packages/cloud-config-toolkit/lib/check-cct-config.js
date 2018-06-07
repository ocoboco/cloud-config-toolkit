const Interface = require('./interface');

const Validator = new Interface('Validator', [
  'isValid',
  'getErrors'
]);

module.exports = function checkCctConfig({
  validator,
  serialize,
  deserialize
} = {}) {
  if (typeof validator !== 'object') {
    throw new Error('config.validator is not provided.');
  }
  Interface.ensureImplements(validator, Validator);
  if (typeof serialize !== 'function') {
    throw new Error('config.serialize function is not provided.');
  }
  if (typeof deserialize !== 'function') {
    throw new Error('config.deserialize function is not provided.');
  }
}