let history = [Array(9).fill(null)];
let current = 0;

const gameContainer = document.querySelector("#game-container");

function process(number) {
  const squares = [...history[current]];
  squares[number] = current % 2 === 1 ? 'X' : 'O';
  history = history.slice(0, current + 1);
  history.push(squares);
  current++;
  refreshBoard();
}

function refreshBoard() {
  const winner = calculateWinner(history[current]);

  const winnerContainer = document.querySelector("#winner-container");
  if (winner) {
    winnerContainer.textContent = `Winner is ${winner}.`;
    winnerContainer.style.display = "block";
  } else {
    winnerContainer.textContent = "";
    winnerContainer.style.display = "hidden";
  }

  gameContainer.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const gameRow = document.createElement("div");
    gameRow.classList.add("game-row");
    for (let j = 0; j < 3; j++) {
      const button = document.createElement("button");
      button.classList.add("game-square");
      button.textContent = history[current][i * 3 + j];
      if (!winner && !button.textContent) {
        button.addEventListener('click', () => process(i * 3 + j));
      }
      gameRow.appendChild(button);
    }
    gameContainer.appendChild(gameRow);
  }

  drawHistory();
}

function drawHistory() {
  const historyContainer = document.querySelector("#history-container");
  historyContainer.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
    const historyListItem = document.createElement("li");
    const historyLink = document.createElement("a");
    historyLink.textContent = `Back to step ${i}`;
    historyLink.href = "#";
    historyLink.addEventListener('click', ev => {
      current = i;
      refreshBoard();
    });
    historyListItem.appendChild(historyLink);
    historyContainer.appendChild(historyListItem);
  }
}

function calculateWinner(squares) {
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

refreshBoard();
