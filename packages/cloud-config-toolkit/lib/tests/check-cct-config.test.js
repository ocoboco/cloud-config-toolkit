const checkCctConfig = require('../check-cct-config');

const cctConfig = {
  validator: {
    isValid() {},
    getErrors() {}
  },
  serialize: JSON.stringify,
  deserialize: JSON.parse
};

const obligatoryFields = [
  'validator',
  'serialize',
  'deserialize'
];

describe('checkCctConfig()', function () {
  test('checks obligatory cct config fields', function () {
    expect(function() {
      checkCctConfig({});
    }).toThrow();

    obligatoryFields.forEach(function(field) {
      expect(function() {
        checkCctConfig({
          ...cctConfig,
          [field]: undefined
        });
      }).toThrow();
    });
    
    expect(function() {
      checkCctConfig(cctConfig);
    }).not.toThrow();
  });

  test('checks whether validator conforms to Validator', function () {
    expect(function() {
      checkCctConfig({
        ...cctConfig,
        validator: {
          isValid() {}
        }
      });
    }).toThrow();

    expect(function() {
      checkCctConfig({
        ...cctConfig,
        validator: {
          getErrors() {}
        }
      });
    }).toThrow();
  });
});