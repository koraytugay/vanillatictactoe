const gameState = {
  history: [Array(9).fill(null)],
  current: 0
}

function clickSquare(squareNumber) {
  console.log(gameState.history[gameState.current]);
  const squares = [...gameState.history[gameState.current]];
  squares[squareNumber] = gameState.current % 2 === 0 ? 'X' : 'O';
  gameState.history = gameState.history.slice(0, gameState.current + 1);
  gameState.history.push(squares);
  gameState.current++;
}

function calculateWinner() {
  const squares = gameState.history[gameState.current];
  const lines = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function setCurrent(timestamp) {
  gameState.current = timestamp;
}

export {
  gameState,
  clickSquare,
  calculateWinner,
  setCurrent
};
