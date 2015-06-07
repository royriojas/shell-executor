var spawn = require( 'child_process' ).spawn;
var extend = require( 'extend' );
var dispatchy = require( 'dispatchy' );

module.exports = {
  create: function ( process ) {
    var commands = [];

    return extend( dispatchy.create(), {
      runCmds: function ( cmds ) {
        var me = this;
        cmds = cmds || [];

        cmds.forEach( function ( cmd ) {
          me.run( cmd );
        } );
      },
      run: function ( cmd ) {
        var me = this;
        var args = cmd.split( ' ' );
        var command = args.shift();

        var cp = spawn( command, args, {
          stdio: 'inherit',
          cwd: process.cwd,
          env: process.env
        } );

        me.fire( 'command:start', {
          cp: cp,
          cmd: cmd
        } );

        cp.on( 'exit', function ( exitCode ) {
          me.fire( 'command:exit', {
            cp: cp,
            cmd: cmd,
            exitCode: exitCode
          } );
        } );

        cp.on( 'error', function ( err ) {
          me.fire( 'command:error', err );
        } );

        cp.cmd = cmd;
        commands.push( cp );

      },
      getKillCommand: function () {
        return 'kill -9 ' + commands.map( function ( cmd ) {
            return cmd.pid;
          } ).join( ' ' );
      },
      stopAll: function () {
        var me = this;
        commands.forEach( function ( cp ) {
          if ( !cp.exitCode ) {
            cp.removeAllListeners( 'close' );
            cp.removeAllListeners( 'error' );
            me.fire( 'command:killed', cp );
            cp.kill( 'SIGINT' );
          }
        } );
      }
    } );
  }
};
