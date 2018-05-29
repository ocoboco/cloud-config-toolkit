const modulesExist = require('../modules-exist');

describe('modulesExist()', function() {
  test('returns an error for missing modules', function() {
    const { error, modulePath } = modulesExist(['./cct-config.js', './non-existing.js']);
    expect(error).toBeDefined();
    expect(modulePath).toEqual('./non-existing.js');
  });

  test('returns null for existing modules', function() {
    expect(modulesExist(['./cct-config.js'])).toBeNull();
  });
});

beforeAll(function() {
  process.chdir('./fixtures');
});

afterAll(function() {
  process.chdir('..');
});