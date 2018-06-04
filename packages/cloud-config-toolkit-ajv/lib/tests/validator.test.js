const Ajv = require('ajv');

const Validator = require('../validator');
const keywords = require('./fixtures/keywords');
const schema = require('./fixtures/schema');
const validConfig = require('./fixtures/config/valid.json');
const invalidConfig = require('./fixtures/config/invalid.json');

describe('Validator', function() {
  test('validates valid configuration', function() {
    const validator = new Validator({
      schema,
      keywords
    });
    expect(validator.isValid(validConfig)).toBeTruthy();
    expect(validator.getErrors(validConfig)).toHaveLength(0);
  });

  test('invalidates invalid configuration', function() {
    const validator = new Validator({
      schema,
      keywords
    });
    expect(validator.isValid(invalidConfig)).toBeFalsy();
    expect(validator.getErrors(invalidConfig)).toMatchSnapshot();
  });
});