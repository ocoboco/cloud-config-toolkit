const mock = require('mock-fs');
const fs = require('fs-extra');

const handleExport = require('../handle-export');

const toolkit = {
  deserialize: JSON.parse,
  serialize: JSON.stringify,
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

describe('handleExport()', function() {
  test('throws an error when destination file already exists', async function() {
    try {
      await handleExport(toolkit, {
        path: 'config.json',
        destination: 'exportedConfig.json'
      });
    } catch (e) {
      expect(e.message).toBe(`Cannot write to destination file, a file already exists at 'exportedConfig.json'`);
    }
  });

  test('throws an error when destination directory does not exist', async function() {
    try {
      await handleExport(toolkit, {
        path: 'config.json',
        destination: 'no-dir/exportedConfig.json'
      });
    } catch (e) {
      expect(e.message).toBe(`ENOENT, no such file or directory 'no-dir/exportedConfig.json'`);
    }
  });

  test('writes exported config to destination file', async function() {
    await handleExport(toolkit, {
      path: 'config.json',
      destination: 'config-dir/exportedConfig.json'
    });
    const fileContent = await fs.readFile('config-dir/exportedConfig.json', 'utf8');
    expect(fileContent).toBe(JSON.stringify({ prop: "value", exported: true }));
  });
});

beforeAll(function() {
  console.log = jest.fn();
  mock({
    'config.json': '{ "prop": "value" }',
    'exportedConfig.json': '{ "prop": "value", "exported": true }',
    'config-dir/': {}
  });
});

afterAll(function() {
  mock.restore();
});