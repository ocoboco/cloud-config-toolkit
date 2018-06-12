const mock = require('mock-fs');

const handleValidation = require('../handle-validation');

const toolkit = {
  deserialize: JSON.parse,
  validate() {
    return {
      isValid: true, 
      errors: []
    };
  }
}

describe('handleValidation()', function() {
  test('throws an error when path is incorrect', async function() {
    try {
      await handleValidation(toolkit, {
        path: 'invalid-path-config.json'
      });
    } catch (e) {
      expect(e.message).toMatchSnapshot();
    }
  });

  test('throws an error when unable to parse the content', async function() {
    try {
      await handleValidation(toolkit, {
        path: 'invalid-config.json'
      });
    } catch (e) {
      expect(e.message).toMatchSnapshot();
    }
  });

  test('throws an error when validation failed', async function() {
    try {
      await handleValidation({
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
      expect(e.message).toMatch("An error message");
    }
  });

  test('does not throw errors on successful execution', async function() {
    const result = await handleValidation(toolkit, {
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