#!/usr/bin/env node
require('babel-polyfill');
const main = require('../src/main');

const cliLauncher = require('clix');
cliLauncher.launch(require('../src/options'), program => main.run(program));
