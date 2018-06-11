const mock = require('mock-fs');

const handleFileValidation = require('../handle-file-validation');

const toolkit = {
  deserialize: JSON.parse,
  validate() {
    return true;
  }
}

describe('handleFileValidation()', function() {
  test('throws an error path is incorrect', async function() {
    try {
      await handleFileValidation(toolkit, {
        path: 'invalid-path-config.json'
      });
    } catch (e) {
      expect(e.message).toBe("ENOENT, no such file or directory 'invalid-path-config.json'");
    }
  });
});

beforeAll(function() {
  console.log = jest.fn();
  mock({
    'config.json': '{}',
  });
});

afterAll(function() {
  mock.restore();
});