const ValidatorDelegate = require('../validator');

describe('ValidatorDelegate', function () {
  describe('validate()', function() {
    test('returns no errors when valid', function () {
      const delegate = new ValidatorDelegate({
        validator: {
          isValid() {
            return true;
          },
          getErrors() {
            return [];
          }
        }
      });
      expect(delegate.validate()).toMatchSnapshot();
    });

    test('returns errors when invalid', function () {
      const delegate = new ValidatorDelegate({
        validator: {
          isValid() {
            return false;
          },
          getErrors() {
            return [
              { message: 'Oops, something went wrong' }
            ];
          }
        }
      });
      expect(delegate.validate()).toMatchSnapshot();
    });
  });
});