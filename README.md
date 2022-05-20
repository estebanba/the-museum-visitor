# The Museum's Visitor

[Click here to see deployed game](https://estebanba.github.io/the-museum-visitor/)

## Description

The Museum Visitor is a game where the player has to move inside a room to reach different art pieces one after another. Once the player reached the art piece, a new one will appear in a random position inside the room. Every time the player gets to an art piece, it will start being followed by a museum staff.
The game ends whenever the player crashes against one of the four walls of the room, or against one of its followers.

## MVP

- one player mode where the main character moves forward automatically
- player can change movement direction right or left
- player has to reach the art pieces
- score increases for each art piece that is reached
- new random art pieces show up in random positions
- player starts to get followed by museum staff
- museum staff number increases after each art piece is reached

## Backlog

- Bigger paintings (pictures)
- Activate / deactivate sound

## Data structure

### Build Screens

- startScreen()
- setStartBtn()

- gameScreen()
- drawScore()
- drawHighScroe()

- gameOverScreen()
- isGameOver()
- setRestartBtn()

### Global Parameters

- randomPosition()

### Player

- drawParts()
- drawPlayer()
- moveCharacter()
- changeDirection()

### The Art

- randomArt()
- randomArtPosition()
- drawArt()

### Game

- animate()
- startGame()
- restartGame()

## States y States Transitions Functions

- startScreen
- gameScreen
- gameOverScreen

## Tasks

- Dom
- Start screen
- Canvas
- Interface elements
- Event Listeners
- Player parts
- Canvas animation
- Player drawing
- Player movement
- Player growing
- Art drawing
- Art drawing random image
- Art drawing random position
- Art regeneration
- Art new position randomization
- Game Over screen
- Restart functionality
- Score
- Highscore
- Styling
- Music and Sounds

## Links

- [Slides Link](https://docs.google.com/presentation/d/1tSAvRVX4xd_4RpUuZ46hdHM9TWx0E94PeJHiooeXWfs/edit#slide=id.g12c83e1429a_0_10)
- [Github repository Link](https://github.com/estebanba/the-museum-visitor)
- [Deployment Link](https://estebanba.github.io/the-museum-visitor/)
