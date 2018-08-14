const pretty = require('pretty-time');

const timeManager = {
  start() {
    const start = process.hrtime();
    return {
      stop() {
        const diff = process.hrtime(start);
        const theDiff = diff[0] * 1e9 + diff[1];

        return {
          diff: theDiff,
          diffFormatted: pretty(theDiff, 'ms'),
        };
      },
    };
  },
};

module.exports = timeManager;
