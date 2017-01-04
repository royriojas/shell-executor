var spawnly = require( 'spawnly' );
var extend = require( 'extend' );
var dispatchy = require( 'dispatchy' );
var Promise = require( 'es6-promise' ).Promise;

var timeManager = require( './time-manager' );

function streamToString( stream ) {
  var chunks = [ ];
  return new Promise( function ( resolve, reject ) {
    if ( !stream.readable ) {
      return resolve( '' );
    }
    stream.on( 'data', function ( chunk ) {
      chunks.push( chunk.toString() );
    } );
    stream.on( 'end', function () {
      resolve( chunks.join( '' ) );
    } );
    stream.on( 'error', function ( err ) {
      reject( err );
    } );
  } );
}

module.exports = {
  create: function () {
    var commands = [ ];

    return extend( dispatchy.create(), {
      runCmds: function ( cmds, options ) {
        var me = this;
        cmds = cmds || [ ];

        var promises = cmds.map( function ( cmd ) {
          return me.run( cmd, options );
        } );

        return Promise.all( promises );
      },
      run: function ( cmd, options ) {
        var me = this;

        var opts = extend( { stdio: 'inherit' }, options );

        var timer = timeManager.start();

        var cp = spawnly( cmd, opts );

        me.fire( 'command:start', { cp: cp, cmd: cmd } );

        cp.cmd = cmd;
        commands.push( cp );

        return new Promise( function ( resolve, reject ) {
          cp.on( 'exit', function ( exitCode ) {
            var res = timer.stop();

            var stdoutPromise = Promise.resolve( '' );
            var stderrPromise = Promise.resolve( '' );

            if ( cp.stdout ) {
              stdoutPromise = streamToString( cp.stdout );
            }

            if ( cp.stderr ) {
              stderrPromise = streamToString( cp.stderr );
            }

            Promise.all( [ stdoutPromise, stderrPromise ] ).then( function ( results ) {
              var args = {
                cp: cp,
                stdout: results[ 0 ],
                stderr: results[ 1 ],
                cmd: cmd,
                exitCode: exitCode,
                duration: res.diff,
                durationFormmated: res.diffFormatted
              };
              me.fire( 'command:exit', args );
              resolve( args );
            } );

          } );

          cp.on( 'error', function ( err ) {
            err = err || { };
            var res = timer.stop();
            err.duration = res.diff;
            err.durationFormmated = res.diffFormatted;
            me.fire( 'command:error', err );
            reject( err );
          } );
        } );
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

            cp.removeAllListeners( 'exit' );
            cp.removeAllListeners( 'error' );
            me.fire( 'command:killed', cp );
            cp.kill( 'SIGINT' );
          }
        } );
      }
    } );
  }
};
