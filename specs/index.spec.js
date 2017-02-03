import cmdManager from '../source/index';

describe('index', () => {

  describe('create', () => {
    it('should return an instance of a cmdManager', () => {
      const cmdInstance = cmdManager.create();
      expect(cmdInstance.runCmds).to.be.a('function');
      expect(cmdInstance.run).to.be.a('function');
      expect(cmdInstance.getKillCommand).to.be.a('function');
      expect(cmdInstance.stopAll).to.be.a('function');
    });
  });

  describe('runCmds', () => {
    it('should execute all the passed commands', function test() {
      const me = this;
      const cmdInstance = cmdManager.create();

      const spy = cmdInstance.run = me.sandbox.spy();

      cmdInstance.runCmds([
        'echo "hello"',
        'echo "world"',
        'echo "test"',
      ]);

      expect(spy.callCount).to.equal(3);

      const calls = spy.getCalls().map(call => call.args[0]);

      expect(calls).to.deep.equal([
        'echo "hello"',
        'echo "world"',
        'echo "test"',
      ]);

    });
  });

});
