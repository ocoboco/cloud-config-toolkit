const checkCctConfig = require('../check-cct-config');

class ValidatorMock {
  isValid() {}
  getErrors() {}
}

const cctConfig = {
  validator: new ValidatorMock(),
  serialize: JSON.stringify,
  deserialize: JSON.parse
};

const obligatoryFields = [
  'validator',
  'serialize',
  'deserialize'
];

describe('checkCctConfig()', function () {
  test('checks obligatory cct config object fields', function () {
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

  test('checks whether validator implements Validator interface', function () {
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