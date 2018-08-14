const spawnly = require('spawnly');
const extend = require('extend');
const dispatchy = require('dispatchy');
const Promise = require('es6-promise').Promise;

const timeManager = require('./time-manager');

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    if (!stream.readable) {
      resolve('');
      return;
    }
    stream.on('data', chunk => {
      chunks.push(chunk.toString());
    });
    stream.on('end', () => {
      resolve(chunks.join(''));
    });
    stream.on('error', err => {
      reject(err);
    });
  });
}

module.exports = {
  create() {
    const commands = [];

    return extend(dispatchy.create(), {
      runCmds(cmds, options) {
        const me = this;
        cmds = cmds || [];

        const promises = cmds.map(cmd => me.run(cmd, options));

        return Promise.all(promises);
      },
      run(cmd, options) {
        const me = this;

        const opts = extend({ stdio: 'inherit' }, options);

        const timer = timeManager.start();

        const cp = spawnly(cmd, opts);

        me.fire('command:start', { cp, cmd });

        cp.cmd = cmd;
        commands.push(cp);

        const commandPromise = new Promise((resolve, reject) => {
          cp.on('exit', exitCode => {
            const res = timer.stop();

            let stdoutPromise = Promise.resolve('');
            let stderrPromise = Promise.resolve('');

            if (cp.stdout) {
              stdoutPromise = streamToString(cp.stdout);
            }

            if (cp.stderr) {
              stderrPromise = streamToString(cp.stderr);
            }

            Promise.all([stdoutPromise, stderrPromise]).then(results => {
              const args = {
                cp,
                stdout: results[0],
                stderr: results[1],
                cmd,
                exitCode,
                duration: res.diff,
                durationFormatted: res.diffFormatted,
              };
              me.fire('command:exit', args);
              resolve(args);
            });
          });

          cp.on('error', err => {
            err = err || {};
            const res = timer.stop();
            err.duration = res.diff;
            err.durationFormatted = res.diffFormatted;
            me.fire('command:error', err);
            reject(err);
          });
        });

        commandPromise.cp = cp;

        return commandPromise;
      },
      getKillCommand() {
        return `kill -9 ${commands.map(cmd => cmd.pid).join(' ')}`;
      },
      stopAll() {
        const me = this;
        commands.forEach(cp => {
          if (!cp.exitCode) {
            cp.removeAllListeners('exit');
            cp.removeAllListeners('error');
            me.fire('command:killed', cp);
            cp.kill('SIGINT');
          }
        });
      },
    });
  },
};
