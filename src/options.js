var path = require( 'path' );

module.exports = {
  pkgJSONPath: path.resolve( __dirname, '../package.json' ),
  //useDefaultOptions: true,
  optionator: {
    prepend: 'Usage: shell-exec [options] cmd1, cmd2, ... cmdn',
    options: [
      {
        heading: 'Options'
      }
    ]
  }
};
