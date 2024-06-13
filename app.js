const display = document.querySelector('.display');
const dimensions = [16, 16];

generateGrid(dimensions);
display.addEventListener('mouseover', paintSquare);

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

function paintSquare(e) {
  const activeSquare = e.target;

  let opacity = parseInt(activeSquare.dataset.opacity) || 0;
  if (opacity < 100) opacity += 10;

  activeSquare.dataset.opacity = opacity;
  activeSquare.style.backgroundColor = `rgba(0, 0, 0, ${opacity}%)`;
}
