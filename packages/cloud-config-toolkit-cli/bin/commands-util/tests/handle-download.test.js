const mock = require('mock-fs');
const fs = require('fs-extra');
const R = require('ramda');

const handleDownload = require('../handle-download');

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
      await handleDownload(toolkit, {
        destination: 'config.json',
        version: '1.0.0',
        namespace: 'default'
      });
    } catch (e) {
      expect(e.message).toBe('Cannot write to destination, a file already exists at "config.json".');
    }
  });

  test('throws an error when version not found', async function() {
    try {
      await handleDownload({
        ...toolkit,
        itemExists: R.always(false)
      }, {
        destination: 'configDest.json',
        version: '1.0.0',
        namespace: 'default'
      });
    } catch (e) {
      expect(e.message).toBe('Configuration version "1.0.0" not found.');
    }
  });

  test('throws an error when cannot write to destination', async function() {
    try {
      await handleDownload(toolkit, {
        destination: 'missing-folder/config.json',
        version: '1.0.0',
        namespace: 'default'
      });
    } catch (e) {
      expect(e.message).toBe("ENOENT, no such file or directory 'missing-folder/config.json'");
    }
  });

  test('writes exported config to destination file', async function() {
    await handleDownload(toolkit, {
      destination: 'configDest.json',
      version: '1.0.0',
      namespace: 'default'
    });
    const fileContent = await fs.readFile('configDest.json', 'utf8');
    expect(fileContent).toBe(toolkit.download());
  });
});

beforeAll(function() {
  mock({
    'config.json': '{ "prop": "value" }'
  });
});

afterAll(function() {
  mock.restore();
});