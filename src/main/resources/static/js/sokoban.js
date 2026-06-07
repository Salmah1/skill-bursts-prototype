const CELL_SIZE = 40;

let level = 1;
let moves = 0;
let idealMoves = 0;
let gridSize = 10;
let gameBoard = [];
let player = { x: 0, y: 0 };
let target = { x: 0, y: 0 };
let stopwatch = 0;
let stopwatchInterval = null;
let isFirstMove = true;
let randomPrompt = "";

function renderBoard() {
  const gameBoardElement = document.getElementById("game-board");
  gameBoardElement.innerHTML = "";
  gameBoardElement.style.gridTemplateColumns = `repeat(${gridSize}, ${CELL_SIZE}px)`;
  gameBoardElement.style.gridTemplateRows = `repeat(${gridSize}, ${CELL_SIZE}px)`;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.width = `${CELL_SIZE}px`;
      cell.style.height = `${CELL_SIZE}px`;

      if (gameBoard[row][col] === "W") {
        cell.classList.add("wall");
      } else if (gameBoard[row][col] === "P") {
        cell.classList.add("player");
      } else if (gameBoard[row][col] === "T") {
        cell.classList.add("target");
      }

      gameBoardElement.appendChild(cell);
    }
  }

  document.getElementById("level").textContent = level;
  document.getElementById("moves").textContent = moves;
  updateStopwatch();
}

function loadLevel(levelData) {
  gameBoard = levelData.board;
  gridSize = gameBoard.length;
  player = levelData.player;
  target = levelData.target;
  idealMoves = levelData.idealMoves;
  moves = 0;
  stopwatch = 0; // Reset the stopwatch for each level
  isFirstMove = true;
  const progress = (level / 100) * 100;

  // Retrieve the random prompt from local storage or generate a new one if not available
  randomPrompt = localStorage.getItem("randomPrompt");
  if (!randomPrompt) {
    randomPrompt = getRandomPrompt();
    localStorage.setItem("randomPrompt", randomPrompt);
  }
  document.body.style.filter = `grayscale(${100 - progress}%)`;

  if (progress >= 100) {
    document.body.classList.add("color");
  }

  renderBoard();
  updateImportanceMessage();
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (isValidMove(newX, newY)) {
    gameBoard[player.y][player.x] = " ";
    gameBoard[newY][newX] = "P";
    player.x = newX;
    player.y = newY;

    moves++;
    renderBoard();

    if (isFirstMove) {
      isFirstMove = false;
      startStopwatch(); // Start the stopwatch on the first move
    }

    if (isLevelComplete()) {
      clearInterval(stopwatchInterval);
      performSummativeAssessment();
    }
  }
}

function isValidMove(x, y) {
  if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
    return false;
  }

  const cellType = gameBoard[y][x];
  return cellType !== "W";
}

function isLevelComplete() {
  return player.x === target.x && player.y === target.y;
}

async function loadSavedLevel() {
  const savedLevel = localStorage.getItem("currentLevel");
  if (savedLevel) {
    level = parseInt(savedLevel);
    if (level === 0) {
      loadNextLevel();
    } else if (level === 100) {
      loadFinalLevel();
    } else {
      const response = await fetch(`/level/${level}`);
      const levelData = await response.json();
      loadLevel(levelData);
    }
  } else {
    loadNextLevel();
  }
}

async function loadFinalLevel() {
  const response = await fetch("/level/final");
  const levelData = await response.json();
  loadLevel(levelData);
}

function performSummativeAssessment() {
  const moveDifference = moves - idealMoves;

  if (level === 100) {
    if (isLevelComplete()) {
      alert(
        "Congratulations! You have completed the final challenge! Keep playing to further improve your skill!",
      );
      level = 100;
    } else {
      level = 99;
      alert("You failed the final challenge. Try again from level 99.");
    }
  } else if (moveDifference === 0) {
    level = Math.min(level + 10, 99);
  } else if (moveDifference <= 2) {
    level = Math.min(level + 5, 99);
  } else if (moveDifference >= 10) {
    level = Math.max(1, level - 10);
  }

  localStorage.setItem("currentLevel", level);

  // Generate a new random prompt and store it in local storage
  randomPrompt = getRandomPrompt();
  localStorage.setItem("randomPrompt", randomPrompt);
  updateImportanceMessage(); // Update the importance message at the end of each minigame

  if (level === 100) {
    loadFinalLevel();
  } else {
    loadNextLevel();
  }
}

function startStopwatch() {
  stopwatchInterval = setInterval(() => {
    stopwatch++;
    updateStopwatch();

    if (stopwatch >= 10) {
      clearInterval(stopwatchInterval);
      level = Math.max(1, level - 10);
      alert("Time is up! Level failed.");
      loadNextLevel();
    }
  }, 1000);
}

function updateStopwatch() {
  document.getElementById("stopwatch").textContent = stopwatch;
}

async function loadNextLevel() {
  const response = await fetch(`/level/${level}`);
  const levelData = await response.json();
  loadLevel(levelData);
}

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
  }
});

function checkLevel99() {
  const level99Message = document.getElementById("level-99-message");
  const level100Message = document.getElementById("level-100-message");
  if (level === 99) {
    level99Message.style.display = "block";
    level100Message.style.display = "none";
  } else if (level === 100) {
    level99Message.style.display = "none";
    level100Message.style.display = "block";
  } else {
    level99Message.style.display = "none";
    level100Message.style.display = "none";
  }
}

function getRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * IMPORTANCE_PROMPTS.length);

  return IMPORTANCE_PROMPTS[randomIndex];
}

function resetLevel() {
  level = 0;
  localStorage.setItem("currentLevel", level);
  loadNextLevel();
}

function goToBossLevel() {
  level = 100;
  localStorage.setItem("currentLevel", level);
  loadFinalLevel();
}

function goToProblemSolving() {
  localStorage.setItem("currentLevel", level);
}

function updateImportanceMessage() {
  const importanceMessage = document.getElementById("importance-message");
  importanceMessage.textContent = randomPrompt;
}

async function initializeGame() {
  await loadSavedLevel();
  checkLevel99();
}

initializeGame();
