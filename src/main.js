import {gameState, clickSquare, calculateWinner, setCurrent} from './game.js';

const gameContainer = document.querySelector("#game-container");

function process(square) {
  clickSquare(square);
  refreshBoard();
}

function refreshBoard() {
  const winner = calculateWinner();

  const winnerContainer = document.querySelector("#winner-container");
  if (winner) {
    winnerContainer.textContent = `Winner is ${winner}.`;
    winnerContainer.style.display = "block";
  }
  else {
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
      button.textContent = gameState.history[gameState.current][i * 3 + j];
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
  const historyContainer = document.querySelector("#history-list");
  historyContainer.innerHTML = "";
  for (let i = 0; i < gameState.history.length; i++) {
    const historyListItem = document.createElement("li");
    const historyLink = document.createElement("a");
    historyLink.textContent = `Back to step ${i}`;
    historyLink.href = "#";
    historyLink.addEventListener('click', () => {
      setCurrent(i);
      refreshBoard();
    });
    historyListItem.appendChild(historyLink);
    historyContainer.appendChild(historyListItem);
  }
}

refreshBoard();
