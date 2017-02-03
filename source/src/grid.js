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

  const log = grid.set(row, col, 6, 4, contrib.log, {
    fg: 'green',
    selectedFg: 'green',
    label: cmd.substr(0, 40),
  });

  const addListener = (stream) => {
    if (!stream.readable) return;
    stream.on('data', chunk =>
      log.log(chunk.toString()),
    );
  };

  return {
    start: () => {
      const cp = spawn(cmd, { stdio: 'pipe' });

      addListener(cp.stdout);
      addListener(cp.stderr);

      cp.on('close', (exitCode) => {
        log.log(`process exit with code ${ exitCode }`);
      });
    },
  };
};
