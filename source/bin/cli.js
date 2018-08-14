#!/usr/bin/env node
require('babel-polyfill');
const cliLauncher = require('clix');
const main = require('../src/main');

cliLauncher.launch(require('../src/options'), program => main.run(program));
