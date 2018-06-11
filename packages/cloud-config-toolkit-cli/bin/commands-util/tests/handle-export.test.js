const mock = require('mock-fs');

const handleFileValidation = require('../handle-export');

const toolkit = {
  deserialize: JSON.parse,
  validate() {
    return {
      isValid: true, 
      errors: []
    };
  }
}

describe('handleExport()', function() {
  // test('throws an error when path is incorrect', async function() {
  //   try {
  //     await handleFileValidation(toolkit, {
  //       path: 'invalid-path-config.json'
  //     });
  //   } catch (e) {
  //     expect(e.message).toBe("ENOENT, no such file or directory 'invalid-path-config.json'");
  //   }
  // });
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