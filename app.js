const display = document.querySelector('.display');
const sizeOptions = document.querySelector('.grid-size');
const columns = document.querySelector('#columns');
const rows = document.querySelector('#rows');

let dimensions = [16, 16];

generateGrid(dimensions);
sizeOptions.addEventListener('input', applyGridSize);
display.addEventListener('mouseover', paintSquare);

function applyGridSize(e) {
  dimensions = [columns.value, rows.value];
  [columns.nextElementSibling.value, rows.nextElementSibling.value] =
    dimensions;

  generateGrid(dimensions);
}

function generateGrid(dimensions) {
  display.innerHTML = '';
  display.style.setProperty('--columns', dimensions[0]);
  display.style.setProperty('--rows', dimensions[1]);

  for (let y = 0; y < dimensions[1]; y++) {
    for (let x = 0; x < dimensions[0]; x++) {
      const square = document.createElement('div');
      square.title = `(${x + 1}, ${y + 1})`;
      display.append(square);
    }
  }
}

function paintSquare(e) {
  const activeSquare = e.target;
  if (activeSquare === display) return;

  let opacity = parseInt(activeSquare.dataset.opacity) || 0;
  if (opacity < 100) opacity += 10;

  activeSquare.dataset.opacity = opacity;
  activeSquare.style.backgroundColor = `rgba(0, 0, 0, ${opacity}%)`;
}
