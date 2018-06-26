const checkCctConfig = require('../check-cct-config');

const cctConfig = {
  validator: {
    isValid() {},
    getErrors() {}
  },
  storage: {
    createItem() {},
    getItemContent() {},
    itemExists() {},
    getItemNames() {}
  },
  serialize: JSON.stringify,
  deserialize: JSON.parse
};

const obligatoryFields = [
  'validator',
  'serialize',
  'deserialize',
  'storage'
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

  test('checks whether storage conforms to Storage', function () {
    expect(function() {
      checkCctConfig({
        ...cctConfig,
        storage: {}
      });
    }).toThrow();

    expect(function() {
      checkCctConfig({
        ...cctConfig,
        storage: {
          createItem() {},
          getItemContent() {}
        }
      });
    }).toThrow();
  });

  test('checks whether env conforms to Env', function () {
    expect(function() {
      checkCctConfig({
        ...cctConfig,
        env: {}
      });
    }).toThrow();

    expect(function() {
      checkCctConfig({
        ...cctConfig,
        env: {
          dummy() {}
        }
      });
    }).toThrow();

    expect(function() {
      checkCctConfig({
        ...cctConfig,
        env: {
          getVars() {
            return { var: 'value'};
          }
        }
      });
    }).not.toThrow();
  });
});