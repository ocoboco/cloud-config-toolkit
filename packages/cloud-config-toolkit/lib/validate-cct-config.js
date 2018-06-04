const Interface = require('./interface');

const ValidationInterface = new Interface('Validation', [
  'isValid',
  'getErrors'
]);

module.exports = function validateCctConfig({
  validation,
  serialize,
  deserialize
} = {}) {
  if (typeof validation !== 'object') {
    throw new Error('config.validation is not provided.');
  }
  Interface.ensureImplements(validation, ValidationInterface);
  if (typeof serialize !== 'function') {
    throw new Error('config.serialize function is not provided.');
  }
  if (typeof deserialize !== 'function') {
    throw new Error('config.deserialize function is not provided.');
  }
}