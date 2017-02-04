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

const layouts = {
  1: [{ row: 0, col: 0, rowSpan: 12, colSpan: 12 }],
  2: [
    { row: 0, col: 0, rowSpan: 12, colSpan: 6 },
    { row: 0, col: 6, rowSpan: 12, colSpan: 6 },
  ],
  3: [
    { row: 0, col: 0, rowSpan: 6, colSpan: 6 },
    { row: 0, col: 6, rowSpan: 6, colSpan: 6 },
    { row: 6, col: 0, rowSpan: 6, colSpan: 12 },
  ],
  4: [
    { row: 0, col: 0, rowSpan: 6, colSpan: 6 },
    { row: 0, col: 6, rowSpan: 6, colSpan: 6 },
    { row: 6, col: 0, rowSpan: 6, colSpan: 6 },
    { row: 6, col: 6, rowSpan: 6, colSpan: 6 },
  ],
  5: [
    { row: 0, col: 0, rowSpan: 6, colSpan: 4 },
    { row: 0, col: 4, rowSpan: 6, colSpan: 4 },
    { row: 0, col: 8, rowSpan: 6, colSpan: 4 },
    { row: 6, col: 0, rowSpan: 6, colSpan: 6 },
    { row: 6, col: 6, rowSpan: 6, colSpan: 6 },
  ],
  6: [
    { row: 0, col: 0, rowSpan: 6, colSpan: 4 },
    { row: 0, col: 4, rowSpan: 6, colSpan: 4 },
    { row: 0, col: 8, rowSpan: 6, colSpan: 4 },
    { row: 6, col: 0, rowSpan: 6, colSpan: 4 },
    { row: 6, col: 4, rowSpan: 6, colSpan: 4 },
    { row: 6, col: 8, rowSpan: 6, colSpan: 4 },
  ],
  7: [
    { row: 0, col: 0, rowSpan: 4, colSpan: 4 },
    { row: 0, col: 4, rowSpan: 4, colSpan: 4 },
    { row: 0, col: 8, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 0, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 4, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 8, rowSpan: 4, colSpan: 4 },
    { row: 8, col: 0, rowSpan: 4, colSpan: 12 },
  ],
  8: [
    { row: 0, col: 0, rowSpan: 4, colSpan: 4 },
    { row: 0, col: 4, rowSpan: 4, colSpan: 4 },
    { row: 0, col: 8, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 0, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 4, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 8, rowSpan: 4, colSpan: 4 },
    { row: 8, col: 0, rowSpan: 4, colSpan: 6 },
    { row: 8, col: 6, rowSpan: 4, colSpan: 6 },
  ],
  9: [
    { row: 0, col: 0, rowSpan: 4, colSpan: 4 },
    { row: 0, col: 4, rowSpan: 4, colSpan: 4 },
    { row: 0, col: 8, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 0, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 4, rowSpan: 4, colSpan: 4 },
    { row: 4, col: 8, rowSpan: 4, colSpan: 4 },
    { row: 8, col: 0, rowSpan: 4, colSpan: 4 },
    { row: 8, col: 4, rowSpan: 4, colSpan: 4 },
    { row: 8, col: 8, rowSpan: 4, colSpan: 4 },
  ],
};

// TODO: Generalize this, no need to have fixed layouts.
const getLayoutByIndexAndCount = (index, count) => {
  const positions = layouts[count];
  return positions[index];
};

export const setProcessLogToGrid = (cmd, grid, index, count) => {
  const { row, col, rowSpan, colSpan } = getLayoutByIndexAndCount(index, count);

  const box = grid.set(row, col, rowSpan, colSpan, blessed.box, {
      label: cmd.substr(0, 40),
      padding: { top: 1, left: 1, right: 1, bottom: 1 },
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
      cp = spawn(cmd, { stdio: 'pipe', detached: true });

      addListener(cp.stdout);
      addListener(cp.stderr);

      cp.on('close', (exitCode) => {
        log.log(`process exit with code ${ exitCode }`);
        cp.__closed = true;
      });
    },
    stop() {
      if (cp && !cp.exitCode && !cp.__closed) {
        process.kill(-cp.pid, 'SIGTERM');
      }
    },
  };
};
