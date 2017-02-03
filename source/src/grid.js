import blessed from 'blessed';
import contrib from 'blessed-contrib';
import spawn from 'spawnly';

export const getGridAndScreen = () => {
  const screen = blessed.screen();
  const grid = new contrib.grid({ rows: 12, cols: 12, screen }); // eslint-disable-line

  return {
    screen,
    grid,
  };
};

const getPositionByIndex = (index) => {
  const positions = [
    { row: 0, col: 0 },
    { row: 0, col: 4 },
    { row: 0, col: 8 },
    { row: 6, col: 0 },
    { row: 6, col: 4 },
    { row: 6, col: 8 },
  ];

  return positions[index];
};

export const setProcessLogToGrid = (cmd, grid, index) => {
  const { row, col } = getPositionByIndex(index);

  const box = grid.set(row, col, 6, 4, blessed.box, {
      label: cmd.substr(0, 40),
      padding: { top: 0, left: 0, right: 0, bottom: 0 },
      border: {
        type: 'line',
      },
      style: {
        border: {
          fg: 'yellow',
        },
      },
    });

  const log = blessed.log({
    parent: box,
    tags: true,
    width: '100%-5',
    scrollable: true,
    input: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      inverse: true,
    },
    keys: true,
    vi: true,
    mouse: true,
  });

  const addListener = (stream) => {
    if (!stream.readable) return;
    stream.on('data', chunk =>
      log.log(chunk.toString()),
    );
  };

  let cp;
  return {
    start() {
      cp = spawn(cmd, { stdio: 'pipe' });

      addListener(cp.stdout);
      addListener(cp.stderr);

      cp.on('close', (exitCode) => {
        log.log(`process exit with code ${ exitCode }`);
      });
    },
    stop() {
      if (cp && !cp.exitCode) {
        cp.stdout.removeAllListeners('data');
        cp.stderr.removeAllListeners('data');
        cp.removeAllListeners('close');
        cp.kill('SIGINT');
      }
    },
  };
};
