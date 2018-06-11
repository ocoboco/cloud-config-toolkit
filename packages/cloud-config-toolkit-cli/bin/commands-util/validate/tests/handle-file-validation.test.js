const mock = require('mock-fs');

const handleFileValidation = require('../handle-file-validation');

const toolkit = {
  deserialize: JSON.parse,
  validate() {
    return {
      isValid: true, 
      errors: []
    };
  }
}

describe('handleFileValidation()', function() {
  test('throws an error when path is incorrect', async function() {
    try {
      await handleFileValidation(toolkit, {
        path: 'invalid-path-config.json'
      });
    } catch (e) {
      expect(e.message).toBe("ENOENT, no such file or directory 'invalid-path-config.json'");
    }
  });

  test('throws an error when unable to parse the content', async function() {
    try {
      await handleFileValidation(toolkit, {
        path: 'invalid-config.json'
      });
    } catch (e) {
      expect(e.message).toBe("Unexpected end of JSON input");
    }
  });

  test('throws an error when validation failed', async function() {
    try {
      await handleFileValidation({
        ...toolkit,
        validate() {
          return {
            isValid: false, 
            errors: ['An error message']
          };
        }
      }, {
        path: 'config.json'
      });
    } catch (e) {
      expect(e.message).toBe("Configuration is invalid.");
    }
  });

  test('does not throw errors on successful execution', async function() {
    const result = await handleFileValidation(toolkit, {
      path: 'config.json'
    });
    expect(result).toBe(true);
  });
});

beforeAll(function() {
  console.log = jest.fn();
  mock({
    'invalid-config.json': '{ "prop": "value" ',
    'config.json': '{ "prop": "value" }',
  });
});

afterAll(function() {
  mock.restore();
});