var exec = require( 'child_process' ).exec;
var path = require( 'path' );
var pretty = require( 'pretty-time' );
var nodeProcess = require( './process' );

module.exports = {
  _execute: function ( program, cmds ) {
    var cmdManager = require( '../index' ).create();

    cmdManager.on( 'command:start', function ( e, args ) {
      program.subtle( 'starting command', args.cmd );
    } );

    cmdManager.on( 'command:error', function ( e, args ) {
      program.subtle( 'command error', args, 'duration: ', pretty( args.duration, 's' ) );
    } );

    cmdManager.on( 'command:exit', function ( e, args ) {
      program.subtle( 'command', args.cmd, 'exited with code', args.exitCode + ', took: ', pretty( args.duration ) );
    } );

    cmdManager.on( 'command:killed', function ( e, args ) {
      program.subtle( 'command killed:', args.cmd, 'pid:', args.pid );
    } );

    var d = require( 'domain' ).create();

    d.on( 'error', function () {
      cmdManager.stopAll();
    } );

    cmdManager.runCmds( cmds );

    var lines = [
      'Commands execution started',
      '',
      '    To kill commands from the shell In case I become a zombie, execute:',
      '',
      '    ' + cmdManager.getKillCommand(),
      '',
      ''
    ];

    program.subtle( lines.join( '\n' ) );

    nodeProcess.on( 'SIGINT', function ( code ) {
      program.subtle( 'killing all processes' );
      cmdManager.stopAll();
      nodeProcess.exit( code );
    } );
  },
  run: function ( program ) {

    var cmds = program.opts._;

    var addNPMBinToPath = function ( cb ) {
      exec( 'npm bin', function ( error, stdout, stderr ) {
        if ( error ) {
          program.error( 'received error', error );
          stderr && program.error( stderr );
          return;
        }

        process.env.PATH += '' + path.delimiter + stdout.trim();

        cb && cb();
      } );
    };

    if ( cmds.length === 0 ) {
      program.error( 'please provide some commands to execute' );
      program.showHelp();
      return;
    }
    var me = this;
    addNPMBinToPath( function () {
      me._execute( program, cmds );
    } );
  }
};
