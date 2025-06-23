const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => makeMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  gameOver = false;
}

function makeMove(index) {
  if (cells[index].textContent || gameOver) return;
  cells[index].textContent = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
  } else if (cells.every(cell => cell.textContent)) {
    statusText.textContent = 'Draw!';
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]           // Diagonals
  ];
  return winCombos.some(combo => 
    combo.every(i => cells[i].textContent === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = 'X';
  createBoard();
}

createBoard();
