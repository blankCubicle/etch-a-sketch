const display = document.querySelector('.display');
const resetButton = document.querySelector('#reset');
const linkCheckbox = document.querySelector('#link');
const sizeOptions = document.querySelector('.grid-size');
const drawOptions = document.querySelectorAll('.draw-options input');
const columns = document.querySelector('#columns');
const rows = document.querySelector('#rows');

let dimensions = [16, 16];
let linked = true;
let randomColors = false;
let opaqueColors = false;

generateGrid(dimensions);

resetButton.addEventListener('click', () => generateGrid(dimensions));
linkCheckbox.addEventListener('click', setLinked);
sizeOptions.addEventListener('input', applyGridSize);
drawOptions.forEach((input) =>
  input.addEventListener('click', applyDrawOptions),
);
display.addEventListener('mouseover', paintSquare);

function applyDrawOptions(e) {
  const box = e.target;

  if (box.id === 'random-color') return (randomColors = box.checked);
  opaqueColors = box.checked;
}

function setLinked() {
  linked = linkCheckbox.checked;
  rows.disabled = linked ? true : false;
}

function applyGridSize(e) {
  if (linked) rows.value = columns.value;

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

function getRGBA(square) {
  const values = square.style.backgroundColor.match(/(\d+(\.\d+)?)/g);
  if (values) return [...values].map(Number);
  return false;
}

function randomRGB() {
  return [...Array(3)].map(() => Math.round(Math.random() * 255));
}

function addRGBValues(a, b) {
  return [...Array(3)].map((_, i) => Math.round((a[i] + b[i]) / 2));
}

function paintSquare(e) {
  const activeSquare = e.target;
  if (activeSquare === display) return;

  const currentRGBA = getRGBA(activeSquare);
  let newRGB = randomColors ? randomRGB() : [0, 0, 0];
  let alpha = 0;

  if (currentRGBA && !opaqueColors) {
    newRGB = addRGBValues(currentRGBA, newRGB);
    alpha = currentRGBA[3] ? currentRGBA[3] * 100 : 100;
  }
  if (alpha < 100) alpha = opaqueColors ? 100 : alpha + 10;

  activeSquare.style.backgroundColor = `rgba(${newRGB}, ${alpha}%)`;
}
