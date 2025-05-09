const columns = 8;
const rows = 8;
const totalCells = columns * rows;

const usedCells = [
  [1, 1, 4], // Zeile 1, Spalte 1, spannt 4 Spalten
  [2, 1, 4], // Zeile 2, selbe Spalten (grid-row: 1 / span 2)
];

function isUsedCell(index) {
  const row = Math.floor(index / columns) + 1;
  const col = (index % columns) + 1;
  return usedCells.some(([r, c, span]) => r === row && col >= c && col < c + span);
}

function createGridBase() {
  const container = document.querySelector('.grid-container');
  for (let i = 0; i < totalCells; i++) {
    if (isUsedCell(i)) continue;

    const div = document.createElement('div');
    div.className = 'grid-item';
    container.appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', createGridBase);
