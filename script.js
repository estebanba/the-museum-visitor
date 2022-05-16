// DEFINE START SCREEN

// DEFINE GAMEPLAY SCREEN

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start-button");

// DEFINE GAME OVER SCREEN



// DEFINE GLOBAL PARAMETERS

let gridSize = 20;

function randomPosition (min, max) {
    return Math.round((Math.random() * (max-min) + min) / gridSize) * gridSize;
}

let score = 0;

let gameOver = false;

// DEFINE PLAYER PARAMETERS

let playerX = randomPosition(0, canvas.width - gridSize);
let playerY = randomPosition(0, canvas.height - gridSize);
const playerW = gridSize;
const playerH = gridSize;
let speedX = gridSize;
let speedY = 0;

let player = [{x: gridSize * 4, y: gridSize * 2}];

let drawParts = (eachPart) => {
    ctx.fillStyle = "gray";
    ctx.fillRect(eachPart.x, eachPart.y, playerW, playerH);
}

let drawPlayer = () => {
    player.forEach(drawParts);

    // Game Over when touching the walls
    if (player[0].y < 0 || (player[0].y + gridSize) > canvas.height || player[0].x < 0 || (player[0].x + gridSize) > canvas.width) {
        gameOver = true;
    }
    // Game Over when touching it self
    for (let i = 4; i < player.length; i += 1) {
        const collided = player[i].x === player[0].x && player[i].y === player[0].y
        if (collided) {
            gameOver = true; 
        }
    }
}

// DEFINE PLAYER MOVEMENTS

function moveCharacter() {
    const head = {x: player[0].x + speedX, y: player[0].y + speedY};
    player.unshift(head);
    if (player[0].x === foodX && player[0].y === foodY) {
        gotFood();
    } else {
        player.pop();
    }
}

function changeDirection(event) {
    const goingDown = speedY === gridSize;
    const goingUp = speedY === -gridSize;
    const goingRight = speedX === gridSize; 
    const goingLeft = speedX === -gridSize;
    
    if (event.code === "ArrowDown" && !goingUp) {
        speedX = 0;
        speedY = gridSize;
    }
    if (event.code === "ArrowUp" && !goingDown) {
        speedX = 0;
        speedY = -gridSize;
    }
    if (event.code === "ArrowLeft" && !goingRight) {
        speedX = -gridSize;
        speedY = 0;
    }
    if (event.code === "ArrowRight" && !goingLeft) {
        speedX = gridSize;
        speedY = 0;
    }
}

// DEFINE FOOD PARAMETERS

let foodX;
let foodY;

function randomFood() {
    foodX = randomPosition(0, canvas.width - gridSize);
    foodY = randomPosition(0, canvas.height - gridSize);
    player.forEach(element => {
        const playerPosition = element.x === foodX && element.y === foodY;
        if (playerPosition) {
            randomFood();
        }
    });
}

randomFood();

let drawFood = () => {
    ctx.fillStyle = "orange";
    ctx.fillRect(foodX, foodY, gridSize, gridSize); 
}

function gotFood() {
    score += 1;
    randomFood();
    drawFood();
    console.log("score: " + score);
}

// DEFINE ANIMATION

let intervalId;

let animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood()
    moveCharacter()
    drawPlayer()
    if (gameOver) {
        cancelAnimationFrame(intervalId);
        console.log("Game Over!")
    } else {
        intervalId = setTimeout(() => {
        requestAnimationFrame(animate);    
    }, 100); 
    }
}

// DEFINE GAME EVENTS

let startGame = () => {
    animate();
}



window.addEventListener("load", () => {
    
});

startBtn.addEventListener("click", () => {
    
    startGame();
});

document.addEventListener("keydown", changeDirection)
