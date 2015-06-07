[![NPM Version](http://img.shields.io/npm/v/shell-executor.svg?style=flat)](https://npmjs.org/package/shell-executor)
[![Build Status](http://img.shields.io/travis/royriojas/shell-executor.svg?style=flat)](https://travis-ci.org/royriojas/shell-executor)

# shell-executor
A small nodejs module to execute shell commands in parallel 

## Motivation
Heavily inspired by [parallelshell](https://github.com/keithamus/parallelshell). The main reason this module exists is that
`parallelshell` was somehow leaving zombie processes. This version will print the command that you can run in case you detect the 
program didn't kill all the process it created.

## Install

```bash
npm i -g shell-executor
```

## Usage

```
Usage: shell-exec [options] cmd1, cmd2, ... cmdn

Options:
  -h, --help     Show this help
  -v, --version  Outputs the version number
  -q, --quiet    Show only the summary info
```

## Examples

```bash
# execute the npm commands lint, test and watch in parallel
shell-exec 'npm run lint' 'npm run test' 'npm run watch' 
```

## [Changelog](./changelog.md)