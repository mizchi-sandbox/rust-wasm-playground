// dom setup
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

// These must match `Cell::Alive` and `Cell::Dead` in `src/lib.rs`.
const DEAD = 0;
const ALIVE = 1;

function drawGrid(ctx, width, height) {
  ctx.beginPath();
  ctx.lineWidth = 1 / window.devicePixelRatio;
  ctx.strokeStyle = GRID_COLOR;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
}

function drawCells(ctx, universe, memory, width, height) {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col, width);

      ctx.fillStyle = cells[idx] === DEAD ? DEAD_COLOR : ALIVE_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
}

function getIndex(row, column, width) {
  return row * width + column;
}

const main = async () => {
  const { memory } = await import("../gen/rust_wasm_bg");
  const { Universe } = await import("../gen/rust_wasm");

  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();

  canvas.height = (CELL_SIZE + 1) * height + 1;
  canvas.width = (CELL_SIZE + 1) * width + 1;

  const renderLoop = () => {
    universe.tick();
    drawGrid(ctx, width, height);
    drawCells(ctx, universe, memory, width, height);

    requestAnimationFrame(renderLoop);
  };

  requestAnimationFrame(renderLoop);
};

main();
