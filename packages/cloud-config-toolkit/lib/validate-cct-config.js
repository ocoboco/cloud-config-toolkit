const Interface = require('./interface');

const ValidatorInterface = new Interface('Validator', [
  'isValid',
  'getErrors'
]);

module.exports = function validateCctConfig({
  validator,
  serialize,
  deserialize
} = {}) {
  if (typeof validator !== 'object') {
    throw new Error('config.validator is not provided.');
  }
  Interface.ensureImplements(validator, ValidatorInterface);
  if (typeof serialize !== 'function') {
    throw new Error('config.serialize function is not provided.');
  }
  if (typeof deserialize !== 'function') {
    throw new Error('config.deserialize function is not provided.');
  }
}