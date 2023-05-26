let cells = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restart = document.getElementById("restartButton");
let xTurn;
let xClass = "x";
let oClass = "o";
const winningCombination = [
  [0, 1, 2],
  [0, 3, 6],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
];
startGame();

restart.addEventListener("click", startGame);
function startGame() {
  xTurn = true;
  cells.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(oClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.remove("show");
}
function handleClick(e) {
  const place = e.target;
  const currClass = xTurn ? xClass : oClass;
  placeMark(place, currClass);

  if (isItWin(currClass)) {
    winningMessageTextElement.innerText = `${xTurn ? "X's" : "O's"} Wins!`;

    winningMessageElement.classList.add("show");
  } else if (draw()) {
    winningMessageTextElement.innerText = "Draw!";

    winningMessageElement.classList.add("show");
  } else {
    switchTurns();
  }
}

function placeMark(place, currClass) {
  place.classList.add(currClass);
}
function switchTurns() {
  xTurn = !xTurn;
}
function isItWin(currClass) {
  return winningCombination.some((comb) => {
    return comb.every((index) => {
      return cells[index].classList.contains(currClass);
    });
  });
}
function draw() {
  return [...cells].every((index) => {
    return index.classList.contains(xClass) || index.classList.contains(oClass);
  });
}
