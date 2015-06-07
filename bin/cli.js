#!/usr/bin/env node

var main = require( '../src/main' );

var cliLauncher = require( 'clix' );
cliLauncher.launch( require( '../src/options' ), function ( program ) {
  main.run( program );
} );
