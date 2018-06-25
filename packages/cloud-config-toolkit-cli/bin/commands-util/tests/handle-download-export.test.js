const mock = require('mock-fs');
const fs = require('fs-extra');
const R = require('ramda');

const handleDownloadExport = require('../handle-download-export');

const toolkit = {
  deserialize: JSON.parse,
  validate() {
    return {
      isValid: true, 
      errors: []
    };
  },
  itemExists: R.always(true),
  download: R.always('{ "prop": "value" }')
}

describe('handleDownloadExport()', function() {
  test('throws an error when a file exists at destination', async function() {
    try {
      await handleDownloadExport(toolkit, {
        destination: 'exportedConfig.json',
        version: '1.0.0',
        namespace: 'default'
      });
    } catch (e) {
      expect(e.message).toBe('Cannot write to destination, a file already exists at "exportedConfig.json".');
    }
  });

  test('throws an error when version not found', async function() {
    try {
      await handleDownloadExport({
        ...toolkit,
        itemExists: R.always(false)
      }, {
        destination: 'exported.json',
        version: '1.0.0',
        namespace: 'default'
      });
    } catch (e) {
      expect(e.message).toBe('Exported configuration version "1.0.0" not found.');
    }
  });

  test('throws an error when cannot write to destination', async function() {
    try {
      await handleDownloadExport(toolkit, {
        destination: 'missing-folder/exported.json',
        version: '1.0.0',
        namespace: 'default'
      });
    } catch (e) {
      expect(e.message).toBe("ENOENT, no such file or directory 'missing-folder/exported.json'");
    }
  });

  test('writes exported config to destination file', async function() {
    await handleDownloadExport(toolkit, {
      destination: 'exported.json',
      version: '1.0.0',
      namespace: 'default'
    });
    const fileContent = await fs.readFile('exported.json', 'utf8');
    expect(fileContent).toBe(toolkit.download());
  });
});

beforeAll(function() {
  console.log = jest.fn();
  mock({
    'exportedConfig.json': '{ "prop": "value" }'
  });
});

afterAll(function() {
  mock.restore();
});