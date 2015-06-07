module.exports = {
  run: function ( program ) {

    var cmds = program.opts._;

    if ( cmds.length === 0 ) {
      program.error( 'please provide some commands to execute' );
      program.showHelp();
      return;
    }

    var nodeProcess = require( './process' );

    var cmdManager = require( '../index' ).create( nodeProcess );

    cmdManager.on( 'command:start', function ( e, args ) {
      program.subtle( 'starting command', args.cmd );
    } );

    cmdManager.on( 'command:exit', function ( e, args ) {
      program.subtle( 'command exited', args.exitCode );
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
      'Executing commands done',
      'To kill commands from the shell In case I become a zombie, execute:',
      '',
      '',
      cmdManager.getKillCommand(),
      '',
      ''
    ];

    program.subtle( lines.join( '\n' ) );

    nodeProcess.on( 'SIGINT', function ( code ) {
      program.subtle( 'killing all processes' );
      cmdManager.stopAll();
      nodeProcess.exit( code );
    } );

  }
};
