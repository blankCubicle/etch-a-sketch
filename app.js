const display = document.querySelector('.display');
const dimensions = [16, 16];

function generateGrid(dimensions) {
  for (let x = 0; x < dimensions[0]; x++) {
    for (let y = 0; y < dimensions[1]; y++) {
      const square = document.createElement('div');
      square.dataset.x = x + 1;
      square.dataset.y = y + 1;
      display.append(square);
    }
  }
}
