describe( 'index', function () {
  //  var proxyquire = require( 'proxyquire' );

  describe( 'create', function () {
    it( 'should return an instance of a cmdManager', function () {
      var cmdManager = require( '../index' );
      var cmdInstance = cmdManager.create();
      expect( cmdInstance.runCmds ).to.be.a( 'function' );
      expect( cmdInstance.run ).to.be.a( 'function' );
      expect( cmdInstance.getKillCommand ).to.be.a( 'function' );
      expect( cmdInstance.stopAll ).to.be.a( 'function' );
    } );
  } );

  describe( 'runCmds', function () {
    it( 'should execute all the passed commands', function () {
      var cmdManager = require( '../index' );
      var me = this;
      var cmdInstance = cmdManager.create();

      var spy = cmdInstance.run = me.sandbox.spy();

      cmdInstance.runCmds( [
        'echo "hello"',
        'echo "world"',
        'echo "test"'
      ] );

      expect( spy.callCount ).to.equal( 3 );

      var calls = spy.getCalls().map( function ( call ) {
        return call.args[ 0 ];
      } );

      expect( calls ).to.deep.equal( [
        'echo "hello"',
        'echo "world"',
        'echo "test"'
      ] );

    } );
  } );

} );
