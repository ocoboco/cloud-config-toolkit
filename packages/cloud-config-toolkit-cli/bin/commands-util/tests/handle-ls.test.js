const handleLs = require('../handle-ls');

const toolkit = {
  getItemNames() {
    return ['1.0.0', '1.0.1'];
  }
};

describe('handleLs()', function() {
  test('logs available versions', async function() {
    const log = console.log;
    console.log = jest.fn();
    await handleLs(toolkit, {
      namespace: 'default'
    });
    expect(console.log.mock.calls).toEqual([['1.0.0'], ['1.0.1']]);
    console.log = log;
  });

});