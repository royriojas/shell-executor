const path = require('path');

module.exports = {
  pkgJSONPath: path.resolve(__dirname, '../package.json'),
  // useDefaultOptions: true,
  optionator: {
    prepend: 'Usage: shell-exec [options] cmd1, cmd2, ... cmdn',
    options: [
      {
        heading: 'Options',
      },
      {
        option: 'dashboard',
        alias: 'd',
        type: 'Boolean',
        description: 'Show the processes in a nice dashboard if space allows it. No more than 9 commands are allowed in this mode. Requires the install of blessed@0.1.81 and blessed-contrib@4.7.5',
      },
      {
        option: 'bail',
        alias: 'b',
        type: 'Boolean',
        description: 'Stop execution as soon as one of the task exit with an exit code different than 0 or an error happened',
      },
      {
        option: 'sortOutput',
        alias: 'o',
        type: 'Boolean',
        description: 'Sort the stdout and stderr output from the commands',
      },
    ],
  },
};
