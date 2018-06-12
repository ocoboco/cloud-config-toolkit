const mock = require('mock-fs');

const handleExport = require('../handle-export');

const toolkit = {
  deserialize: JSON.parse,
  validate() {
    return {
      isValid: true, 
      errors: []
    };
  },
  export(configuration) {
    return {
      ...configuration,
      exported: true
    };
  }
};

// describe('handleExport()', function() {
//   test('throws an error when destination file already exists', async function() {
//     try {
//       await handleExport(toolkit, {
//         path: 'invalid-path-config.json'
//       });
//     } catch (e) {
//       expect(e.message).toBe("ENOENT, no such file or directory 'invalid-path-config.json'");
//     }
//   });
// });

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