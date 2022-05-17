// DEFINE START SCREEN

const startBtn = document.getElementById("start-button");
const centralPanel = document.querySelector(".central-panel");
const instructions = document.querySelector("#instructions");
const dashboard = document.querySelector("#dashboard");

function setStartBtn() {
    startBtn.innerText = "Start Game";
}

// DEFINE GAMEPLAY SCREEN

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext("2d");
const theScore = document.getElementById('score');
const highScore = document.getElementById('hi-score');

function setStopBtn() {
    startBtn.innerText = "Stop Game";
}

function drawScore() {
    theScore.innerText = score;
}

function drawHiScore() {
    console.log(score);
    if (newHiScore < score) {
        newHiScore = score;
        highScore.innerHTML = newHiScore;
    }
}

// DEFINE GAME OVER SCREEN

function setRestartBtn() {
    startBtn.innerText = "Restart Game";
}

// DEFINE GLOBAL PARAMETERS

let gridSize = 25;

function randomPosition (min, max) {
    return Math.round((Math.random() * (max-min) + min) / gridSize) * gridSize;
}

let score = 0;
let newHiScore = 0;

let gameOver = false;

// DEFINE PLAYER PARAMETERS

// const playerImgArray = {a: "/images/player.png", b: "/images/staff.png"};
// const playerImg = new Image();
// playerImg.src = playerImgArray.a;

let playerX = randomPosition(0, canvas.width - gridSize);
let playerY = randomPosition(0, canvas.height - gridSize);
const playerW = gridSize;
const playerH = gridSize;
let speedX = gridSize;
let speedY = 0;

let theHead = {x: playerX, y: playerY};
let theTailPart = {x: playerX, y: playerY};

let player = [{x: playerX, y: playerY}]

let drawParts = (eachPart) => {
    // ctx.drawImage(playerImg, eachPart.x, eachPart.y, playerW, playerH);
    ctx.fillStyle = "#90a4ae";
    ctx.strokeStyle = "black";
    ctx.fillRect(eachPart.x, eachPart.y, playerW, playerH);
    ctx.strokeRect(eachPart.x, eachPart.y, playerW, playerH);
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
    if (player[0].x === artX && player[0].y === artY) {
        gotArt();
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

const artImg = new Image();

let artArray = ["/images/1.png", "/images/2.png", "/images/3.png", "/images/4.png", "/images/5.png", "/images/6.png", "/images/7.png",];

artImg.src = artArray[parseInt(Math.random() * (artArray.length))];

let randomArt = () => {
    artImg.src = artArray[parseInt(Math.random() * (artArray.length))];
};

let artX;
let artY;

function randomArtPosition() {
    artX = randomPosition(0, canvas.width - gridSize);
    artY = randomPosition(0, canvas.height - gridSize);
    player.forEach(element => {
        const playerPosition = element.x === artX && element.y === artY;
        if (playerPosition) {
            randomArtPosition();
        }
    });
}

randomArtPosition();

let drawArt = () => {
    ctx.drawImage(artImg, artX, artY, gridSize, gridSize);
    // ctx.fillStyle = "orange";
    // ctx.fillRect(artX, artY, gridSize, gridSize); 
}

function gotArt() {
    score += 1;
    randomArtPosition();
    randomArt();
    drawArt();
}

// DEFINE ANIMATION

let intervalId;

let animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawArt()
    drawPlayer()
    moveCharacter()
    drawScore()
    if (gameOver) {
        cancelAnimationFrame(intervalId);
        setRestartBtn()
        console.log("Game Over!")
    } else {
        intervalId = setTimeout(() => {
        requestAnimationFrame(animate);    
    }, 100); 
    }
}

// DEFINE GAME EVENTS

let startGame = () => {
    instructions.style.visibility = "hidden";
    instructions.style.display = "none";
    canvas.style.visibility = "visible";
    canvas.style.display = "block";
    dashboard.style.visibility = "visible";
    animate();
}

let stopGame = () => {
    console.log("Game Stopped")
    gameOver = true
}
    
let restartGame = () => {
    console.log("Game Restarted")
    // reset player
    playerX = randomPosition(0, canvas.width - gridSize);
    playerY = randomPosition(0, canvas.height - gridSize);
    speedX = gridSize;
    speedY = 0;
    player = [{x: gridSize * 4, y: gridSize * 2}];
    // reset food
    randomArtPosition();
    drawArt();
    // reset global
    gameOver = false;
    drawHiScore();
    score = 0;
    animate();
}

window.addEventListener("load", () => {
});

startBtn.addEventListener("click", () => {
    if (startBtn.innerText === "Start Game"){
        startGame();
        setStopBtn();
    } else if (startBtn.innerText === "Stop Game") {
        stopGame();
        setRestartBtn();
    } else if (startBtn.innerText === "Restart Game") {
        restartGame();
        setStopBtn();
    }
});

document.addEventListener("keydown", changeDirection)

