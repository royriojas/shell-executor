
# shell-executor - Changelog
## v3.1.0
- **Refactoring**
  - dashboard option improved - [3d53cca]( https://github.com/royriojas/shell-executor/commit/3d53cca ), [Roy Riojas](https://github.com/Roy Riojas), 03/02/2017 03:18:10

    
## v3.0.0
- **Refactoring**
  - remove cache folder - [36e1411]( https://github.com/royriojas/shell-executor/commit/36e1411 ), [Roy Riojas](https://github.com/Roy Riojas), 03/02/2017 02:32:59

    
  - migrate to es7ish code - [27f141e]( https://github.com/royriojas/shell-executor/commit/27f141e ), [Roy Riojas](https://github.com/Roy Riojas), 18/01/2017 10:17:36

    
- **Features**
  - dashboard option added - [a25a923]( https://github.com/royriojas/shell-executor/commit/a25a923 ), [Roy Riojas](https://github.com/Roy Riojas), 03/02/2017 02:31:21

    
## v2.0.6
- **Bug Fixes**
  - fix typo reporting formatted diff - [667f198]( https://github.com/royriojas/shell-executor/commit/667f198 ), [Roy Riojas](https://github.com/Roy Riojas), 03/01/2017 23:30:44

    
## v2.0.5
- **Refactoring**
  - Factorize time-manager - [e4289a4]( https://github.com/royriojas/shell-executor/commit/e4289a4 ), [Roy Riojas](https://github.com/Roy Riojas), 03/01/2017 20:57:22

    
## v2.0.4
- **Refactoring**
  - duration is formatted from shell-executor module - [1eb98c1]( https://github.com/royriojas/shell-executor/commit/1eb98c1 ), [Roy Riojas](https://github.com/Roy Riojas), 03/01/2017 20:29:20

    
## v2.0.3
- **Bug Fixes**
  - use ms instead of no min unit - [49544d7]( https://github.com/royriojas/shell-executor/commit/49544d7 ), [Roy Riojas](https://github.com/Roy Riojas), 03/01/2017 19:12:45

    
## v2.0.2
- **Features**
  - Add color to processes using stdin pipe instead of inherit stdio - [8b96a7d]( https://github.com/royriojas/shell-executor/commit/8b96a7d ), [Roy Riojas](https://github.com/Roy Riojas), 03/01/2017 18:14:49

    
## v2.0.1
- **Build Scripts Changes**
  - Fix missing module - [a906f4f]( https://github.com/royriojas/shell-executor/commit/a906f4f ), [Roy Riojas](https://github.com/Roy Riojas), 02/01/2017 06:03:51

    
## v2.0.0
- **Features**
  - add options to control the execution flow, bail and sortOutput - [6ea3800]( https://github.com/royriojas/shell-executor/commit/6ea3800 ), [Roy Riojas](https://github.com/Roy Riojas), 02/01/2017 05:20:56

    
## v1.0.0
- **Features**
  - add npm bin path to the env - [11843bc]( https://github.com/royriojas/shell-executor/commit/11843bc ), [Roy Riojas](https://github.com/Roy Riojas), 02/01/2017 03:20:35

    
## v0.6.0
- **Build Scripts Changes**
  - update deps - [abd80de]( https://github.com/royriojas/shell-executor/commit/abd80de ), [Roy Riojas](https://github.com/Roy Riojas), 02/01/2017 03:09:05

    
## v0.4.0
- **Refactoring**
  - Add duration for the execution of each command - [660866c]( https://github.com/royriojas/shell-executor/commit/660866c ), [Roy Riojas](https://github.com/Roy Riojas), 02/01/2017 02:19:30

    
## v0.3.2
- **Enhancements**
  - Update clix to get better error management - [5b55ba4]( https://github.com/royriojas/shell-executor/commit/5b55ba4 ), [royriojas](https://github.com/royriojas), 17/08/2015 05:29:40

    
## v0.3.1
- **Refactoring**
  - Use latest spawnly - [451b41d]( https://github.com/royriojas/shell-executor/commit/451b41d ), [royriojas](https://github.com/royriojas), 13/08/2015 00:34:21

    
## v0.3.0
- **Refactoring**
  - use spawnly as a way to normalize the `child_process.spawn` utility interface - [de9c0aa]( https://github.com/royriojas/shell-executor/commit/de9c0aa ), [royriojas](https://github.com/royriojas), 30/07/2015 18:27:25

    
## v0.2.4
- **Bug Fixes**
  - properly pass the current working directory to the spwaned script - [ace2c91]( https://github.com/royriojas/shell-executor/commit/ace2c91 ), [royriojas](https://github.com/royriojas), 30/07/2015 17:57:31

    
## v0.2.3
- **Features**
  - Add support for commands in sequence, using `&&`. Fixes [#2](https://github.com/royriojas/shell-executor/issues/2) - [50bd398]( https://github.com/royriojas/shell-executor/commit/50bd398 ), [royriojas](https://github.com/royriojas), 30/07/2015 04:24:40

    
## v0.2.2
- **Refactoring**
  - Beautified code - [2ea617d]( https://github.com/royriojas/shell-executor/commit/2ea617d ), [royriojas](https://github.com/royriojas), 30/07/2015 03:08:36

    
- **Build Scripts Changes**
  - Update dependencies and include npm scripts for bumping versions - [3d6279c]( https://github.com/royriojas/shell-executor/commit/3d6279c ), [royriojas](https://github.com/royriojas), 30/07/2015 03:08:13

    
  -  remove `bumpery` in favor of npm scripts - [6fce0eb]( https://github.com/royriojas/shell-executor/commit/6fce0eb ), [royriojas](https://github.com/royriojas), 30/07/2015 03:06:29

    
  - ignore .eslintrc - [4a82f52]( https://github.com/royriojas/shell-executor/commit/4a82f52 ), [royriojas](https://github.com/royriojas), 30/07/2015 02:33:21

    
## v0.2.1
- **Documentation**
  - Add documentation about the removal of the colored output. Fixes [#1](https://github.com/royriojas/shell-executor/issues/1) - [91c2d4f]( https://github.com/royriojas/shell-executor/commit/91c2d4f ), [royriojas](https://github.com/royriojas), 03/07/2015 18:52:46

    
- **Build Scripts Changes**
  - Add do-changelog npm script - [41f9172]( https://github.com/royriojas/shell-executor/commit/41f9172 ), [royriojas](https://github.com/royriojas), 03/07/2015 18:50:38

    
## v0.1.1
- **Build Scripts Changes**
  - Ignore ide generated files - [16e4960]( https://github.com/royriojas/shell-executor/commit/16e4960 ), [royriojas](https://github.com/royriojas), 08/06/2015 03:07:13

    
## v0.1.0
- **Features**
  - First working version - [9dc3258]( https://github.com/royriojas/shell-executor/commit/9dc3258 ), [royriojas](https://github.com/royriojas), 07/06/2015 03:23:16

    
- **Other changes**
  - Initial commit - [ffdaba1]( https://github.com/royriojas/shell-executor/commit/ffdaba1 ), [Roy Riojas](https://github.com/Roy Riojas), 07/06/2015 02:05:06

    
