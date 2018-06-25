const mock = require('mock-fs');
const fs = require('fs-extra');
const R = require('ramda');

const handlePush = require('../handle-push');

const toolkit = {
  deserialize: JSON.parse,
  validate() {
    return {
      isValid: true, 
      errors: []
    };
  },
  itemExists: R.always(false),
  exportEnabled: R.always(false),
  export: R.identity
};

describe('handlePush()', function() {
  test('throws an error when config file does not exist', async function() {
    try {
      await handlePush(toolkit, {
        path: 'configMissing.json',
        version: '1.0.0',
        namespace: 'default'
      });
    } catch (e) {
      expect(e.message).toBe("ENOENT, no such file or directory 'configMissing.json'");
    }
  });

  test('throws an error when same version is already pushed', async function() {
    try {
      await handlePush({
        ...toolkit,
        itemExists: R.always(true)
      }, {
        path: 'config.json',
        version: '1.0.0',
        namespace: 'default'
      });
    } catch (e) {
      expect(e.message).toBe('Configuration version "1.0.0" is already pushed to storage.');
    }
  });

  test('pushes the configuration to storage', async function() {
    const push = jest.fn();
    await handlePush({
      ...toolkit,
      push
    }, {
      path: 'config.json',
      version: '1.0.0',
      namespace: 'default'
    });
    expect(push.mock.calls).toEqual([
      [{ "prop": "value" }, '1.0.0', 'default/configs']
    ]);
  });

  test('pushes the configuration and export to storage', async function() {
    const push = jest.fn();
    await handlePush({
      ...toolkit,
      exportEnabled: R.always(true),
      push
    }, {
      path: 'config.json',
      version: '1.0.0',
      namespace: 'default'
    });
    expect(push.mock.calls).toEqual([
      [{ "prop": "value" }, '1.0.0', 'default/configs'],
      [{ "prop": "value" }, '1.0.0', 'default/exports']
    ]);
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