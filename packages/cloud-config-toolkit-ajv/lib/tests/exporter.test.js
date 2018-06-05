const Ajv = require('ajv');

const Exporter = require('../exporter');
const keywords = require('./fixtures/keywords');
const schema = require('./fixtures/schema');
const validConfig = require('./fixtures/config/valid.json');
const invalidConfig = require('./fixtures/config/invalid.json');

describe('Exporter', function() {
  test('exports valid configuration', function() {
    const exporter = new Exporter({
      schema,
      keywords
    });
    expect(exporter.export(validConfig)).toMatchSnapshot();
  });

  test('throws an error when configuration is invalid', function() {
    const exporter = new Exporter({
      schema,
      keywords
    });
    expect(function() {
      exporter.export(invalidConfig);
    }).toThrow('invalid');
  });
});