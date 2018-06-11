const ExporterDelegate = require('../exporter');

const exporter = {
  export(configuration) {
    return {
      ...configuration,
      exported: true
    };
  }
};

describe('ExporterDelegate', function () {
  describe('export()', function() {
    test('throws an error when configuration is invalid', function () {
      const delegate = new ExporterDelegate({
        exporter,
        validator: {
          isValid() { 
            return false; 
          } 
        }
      });
      expect(function() {
        delegate.export({});
      }).toThrow('Configuration is invalid.');
    });

    test('returns the exported configuration', function () {
      const delegate = new ExporterDelegate({
        exporter,
        validator: {
          isValid() { 
            return true; 
          } 
        }
      });
      const exportedConfiguration = delegate.export({
        prop: 'value'
      });
      expect(exportedConfiguration).toEqual({
        prop: 'value',
        exported: true
      });
    });
  });
});