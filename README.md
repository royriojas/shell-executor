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
# or sx as it is alias for shell-exec
Usage: shell-exec [options] cmd1, cmd2, ... cmdn

Options:
  -d, --dashboard   Show the processes in a nice dashboard if space allows it. No more than 9 commands are allowed in this mode
  -b, --bail        Stop execution as soon as one of the task exit with an exit code different than 0 or an error happened
  -o, --sortOutput  Sort the stdout and stderr output from the commands
  -h, --help        Show this help
  -v, --version     Outputs the version number
  -q, --quiet       Show only the summary info - default: false
  --colored-output  Use colored output in logs
  --stack           if true, uncaught errors will show the stack trace if available
```

## Examples

```bash
# execute the npm commands lint, test and watch in parallel
shell-exec 'npm run lint' 'npm run test' 'npm run watch'
```
**Use colored output**
```bash
# execute the npm commands lint, test and watch in parallel
shell-exec --colored-output 'npm run lint' 'npm run test' 'npm run watch'
```

## [Changelog](./changelog.md)
