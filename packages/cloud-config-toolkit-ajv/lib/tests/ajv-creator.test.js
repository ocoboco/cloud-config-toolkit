const Ajv = require('ajv');

const AjvCreator = require('../ajv-creator');
const keywords = require('./fixtures/keywords');

describe('AjvCreator', function () {
  test('creates an Ajv instance', function () {
    const ajvInstance = AjvCreator.create([]);
    expect(ajvInstance).toBeInstanceOf(Ajv);
  });

  test('adds keywords', function () {
    const ajvInstance = AjvCreator.create(keywords);
    keywords.forEach(function({ name, definition }) {
      const rule = ajvInstance.RULES.custom[name];
      expect(rule).not.toBeUndefined();
      expect(rule.definition).toBe(definition);
    });
  });
});