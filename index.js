var spawn = require( 'child_process' ).spawn;
var extend = require( 'extend' );
var dispatchy = require( 'dispatchy' );
var process = require( './src/process' );

var trim = require( 'jq-trim' );

function normalizeArgs( command ) {
  var shell, args;
  var options = {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env
  };

  command = trim( command );

  if ( process.platform === 'win32' ) {
    shell = process.env.comspec || 'cmd.exe';
    args = [ '/s', '/c', '"' + command + '"' ];
    options.windowsVerbatimArguments = true;
  } else {
    shell = '/bin/sh';
    args = [ '-c', command ];
  }

  return {
    cmd: command,
    shell: shell,
    args: args,
    options: options
  };
}

module.exports = {
  create: function () {
    var commands = [ ];

    return extend( dispatchy.create(), {
      runCmds: function ( cmds ) {
        var me = this;
        cmds = cmds || [ ];

        cmds.forEach( function ( cmd ) {
          me.run( cmd );
        } );
      },
      run: function ( cmd ) {
        var me = this;

        var res = normalizeArgs( cmd );

        var cp = spawn( res.shell, res.args, res.options );

        me.fire( 'command:start', { cp: cp, cmd: cmd } );

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
