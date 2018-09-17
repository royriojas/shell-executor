#!/usr/bin/env node

try {
  require('@babel/polyfill'); // eslint-disable-line global-require
} catch (err) {
  console.log('@babel/polyfill not found please install it');
}

const cliLauncher = require('clix');
const main = require('../src/main');

cliLauncher.launch(require('../src/options'), program => main.run(program));
