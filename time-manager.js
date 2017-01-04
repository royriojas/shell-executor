var pretty = require( 'pretty-time' );

var timeManager = {
  start: function () {
    var start = process.hrtime();
    return {
      stop: function () {
        var diff = process.hrtime( start );
        var theDiff = (diff[ 0 ] * 1e9) + diff[ 1 ];

        return {
          diff: theDiff,
          diffFormatted: pretty(theDiff, 'ms')
        };
      }
    };
  }
};

module.exports = timeManager;