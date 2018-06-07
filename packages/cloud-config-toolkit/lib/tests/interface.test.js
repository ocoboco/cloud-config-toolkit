const Interface = require('../interface');

const Company = new Interface('Company', ['getName', 'getAddress']);

describe('Interface', function () {
  test('throws on insuficient arguments', function () {
    expect(function() {
      new Interface('SomeInterface');
    }).toThrow();
  });
});

describe('Interface.ensureImplements()', function () {
  test('throws when object does not conform to interface', function () {
    expect(function() {
      Interface.ensureImplements(Company, {});
    }).toThrow();

    expect(function() {
      Interface.ensureImplements(Company, {
        getAddress() {}
      });
    }).toThrow();
  });

  test('does not throw when object conforms to interface', function () {
    expect(function() {
      Interface.ensureImplements({
        getName() {},
        getAddress() {}
      }, Company);
    }).not.toThrow();
  });
});