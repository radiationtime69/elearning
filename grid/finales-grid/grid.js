const usedCells = [
    [1, 1, 4], // Zeile 1, Spalte 1–4
    [2, 2, 3], // Zeile 2, Spalte 2–4 (span 3)
    [3, 2, 3], // Zeile 3, Spalte 2–4 (Teil der rowspan)
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
      if (isUsedCell(i)) continue;
      const div = document.createElement('div');
      div.className = 'grid-item';
      container.appendChild(div);
    }
  }
  
  document.addEventListener('DOMContentLoaded', createEmptyGridCells);
  