// 1. Define Canvas and Interface
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("start-button");

// 2. Define Player

let gridSize = 10;
let playerSpeed = gridSize;
const playerW = gridSize;
const playerH = gridSize;


let gameOver = false;

// 5. create directional actions (what about mobile?)

let command;

const directionSelect = {
    ArrowDown: [0, playerSpeed],
    ArrowUp: [0, -playerSpeed],
    ArrowRight: [playerSpeed, 0],
    ArrowLeft: [-playerSpeed, 0],
}

// Define how the player moves

// let character = {
//     player:[{x:1, y:0}], 
//     currentDirection:{x:1, y:0}, 
//     victim: {x:0, y:100},
//     playing: false,
//     growing: 0
// }

let player = [{x:10, y:0}];


let drawCharacterPart = (color, x, y) => {
    // assigns color
    ctx.fillStyle = color;
    // draws a rectangle for the player
    ctx.fillRect(x, y, playerW, playerH);
}

let drawPlayer = () => {
    character.player.forEach(drawCharacterPart);
}
 

function moveCharacter() {
    const head = {x: player[0].x + dx, y: player[0].y + dy};
    player.unshift(head);
    player.pop();
}
    

let detectCollision = () => {
    // Detect if collision is with borders
    const head = character.player[0];
    if(head.x < 0 || head.x >= canvas.width - playerW || head.y >= canvas.height - playerH || head.y < 0) {
        return true
    }
    // Detect if collision with itself
    for(let idx = 1; idx < character.player.length; idx++) {
        const theHead = character.player[idx];
        if(theHead.x === head.x && theHead.y === head.y) {
            return true;
        }
    }
}

// 7. Define function to animate and draw on each frame

let intervalId;

let animate = () => {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "gray";
    // create and instance of the player

    // 13. Creates the tail
    let tail = {};
    // clonar las position of character in its tail
    Object.assign(tail, character.player[character.player.length-1]);
    // make instance of the player head
    const theHead = character.player[0];
    // 12. create collision conditions
    let collision = theHead.x === character.victim.x && theHead.y === character.victim.y;
    // detect if there is a collition
    if(detectCollision()) {
        character.playing = false;
        gameOver = true;
        reset();
        console.log("Game Over");
    }
    
    //  reference to the current position
    let dx = character.currentDirection.x;
    let dy = character.currentDirection.y;
    // store new Player's size
    let playerSize = character.player.length - 1;
    // Check if game is still running
    if (character.playing) {
        // 14. define condition to create tail movement
        for (let idx = playerSize; idx > -1; idx--) {
            const theHead = character.player[idx];
            if (idx === 0) {
                theHead.x += dx;
                theHead.y += dy; 
            } else {
                theHead.x = character.player[idx-1].x;
                theHead.y = character.player[idx-1].y;
            }
        }   
    }
    
    // 12.1 validate what happens if there is a collition 
    if (collision) {
        character.growing += 10
        drawNextVictim()
    }

    if(character.growing > 0) {
        character.player.push(tail);
        character.growing -= 10;
    }

    // 16. change players declaration to for loop
    for (let idx = 0; idx < character.player.length; idx++) {
        const {x, y} = character.player[idx];
        drawCharacterPart("gray", x, y)
    }
    const victim = character.victim;
    // draws a rectangle for the player
    drawCharacterPart("red", victim.x, victim.y);

    // calls animation function to draw elements again
    intervalId = requestAnimationFrame(animate);
    // calls function after interval (in intervalId)
}



// 9. Creates a random position generator

let randomPosition = () => {
    let directionArr = Object.values(directionSelect)
    return {
        x: parseInt(Math.round(Math.random()*canvas.width / 10) * 10),
        y: parseInt(Math.round(Math.random()*canvas.height / 10) * 10), 
        d: directionArr[parseInt(Math.random()*3)]
    }
}

let drawNextVictim = () => {
    let nextPosition = randomPosition();
    let victim = character.victim;
    victim.x = nextPosition.x;
    victim.y = nextPosition.y;
}

// 16. Reset the game

let reset = () => {
    character = {
        currentDirection: {x:10, y:0},
        player: [{x: 10, y:0}],
        victim: {x: 0, y: 100},
        playing: false,
        growing: 0
    }
    console.log("reset")
    position = randomPosition();
    let player1 = character.player[0];
    player1.x = position.x;
    player1.y = position.y;
    character.currentDirection.x = position.d[0];
    character.currentDirection.y = position.d[1];
    // Victim
    positionVictim = randomPosition();
    let victim = character.victim;
    victim.x = positionVictim.x;
    victim.y = positionVictim.y;
    character.playing = true;
}

let startGame = () => {
    animate();
}


// 3. When windows loads, function calls the looper
window.addEventListener("load", () => {
    reset()
});

startBtn.addEventListener("click", () => {
    startGame();
});

// 4. Add key event listener for commands
window.onkeydown = (e) => {
    // stores in command the new directionSelect
    command = directionSelect[e.code]
    // get x and y from command
    const [x, y] = command;
    // validate that it cannot come back on the same currentDirection
    if(-x !== character.currentDirection.x && -y !== character.currentDirection.y) {
        // asign directionSelect to character
        character.currentDirection.x = x;
        character.currentDirection.y = y;
    }
}