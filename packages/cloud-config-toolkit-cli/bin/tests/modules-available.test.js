const modulesAvailable = require('../modules-available');

describe('modulesAvailable()', function() {
  test('returns an error for missing modules', function() {
    const { error, modulePath } = modulesAvailable(['./cct-config.js', './non-existing.js']);
    expect(error.code).toBe('MODULE_NOT_FOUND');
    expect(modulePath).toEqual('./non-existing.js');
  });

  test('returns null for existing modules', function() {
    expect(modulesAvailable(['./cct-config.js'])).toBeNull();
  });
});

const dir = process.cwd();

beforeAll(function() {
  process.chdir(__dirname + '/fixtures');
});

afterAll(function() {
  process.chdir(dir);
});