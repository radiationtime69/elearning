const usedCells = [
  [2, 1, 4], // Zeile 2, Spalte 1–4
  [3, 2, 3], // Zeile 3, Spalte 2–4
  [4, 2, 3], // Zeile 4, Spalte 2–4 (Teil von rowspan)
];

const totalCells = 64;
const columns = 8;

function isUsedCell(index) {
  const row = Math.floor(index / columns) + 1;
  const col = (index % columns) + 1;
  return usedCells.some(([r, c, span]) => r === row && col >= c && col < c + span);
}

function createEmptyGridCells() {
  const container = document.querySelector('.grid-container');
  for (let i = 0; i < totalCells; i++) {
    const row = Math.floor(i / columns) + 1;
    const col = (i % columns) + 1;
    if (isUsedCell(i)) continue;

    const div = document.createElement('div');
    div.className = 'grid-item';

    // Zeile 1 oder 8 → markieren
    if (row === 1 || row === 8) {
      div.classList.add('blocked');
    }

    container.appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', createEmptyGridCells);
