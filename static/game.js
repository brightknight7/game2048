// JavaScript 2048 Game Logic
const grid = Array.from(document.querySelectorAll(".tile"));
const currentScoreElement = document.getElementById("currentScore");
const highScoreElement = document.getElementById("highScore");

let board = Array(4).fill().map(() => Array(4).fill(0));
let currentScore = 0;

function updateGrid() {
    grid.forEach((tile, i) => {
        const value = board[Math.floor(i / 4)][i % 4];
        tile.textContent = value ? value : "";
        tile.setAttribute("data-value", value);
    });
}

function spawnTile() {
    const emptyTiles = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) emptyTiles.push([r, c]);
        }
    }
    if (emptyTiles.length > 0) {
        const [r, c] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateScore(newScore) {
    currentScore = newScore;
    currentScoreElement.textContent = currentScore;
    if (currentScore > parseInt(highScoreElement.textContent)) {
        highScoreElement.textContent = currentScore;
        fetch("/update_score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: currentScore })
        });
    }
}

// Implement movement functions and merging logic as in Python code
function moveLeft() {
    // Add the movement and merging logic
    // Update score accordingly
    updateGrid();
    updateScore(currentScore);
}

// Add moveRight, moveUp, moveDown

document.addEventListener("keydown", event => {
    switch(event.key) {
        case "ArrowLeft": moveLeft(); break;
        case "ArrowRight": moveRight(); break;
        case "ArrowUp": moveUp(); break;
        case "ArrowDown": moveDown(); break;
    }
});

// Initial Setup
spawnTile();
spawnTile();
updateGrid();
