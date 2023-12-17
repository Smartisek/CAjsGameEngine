import Game from "./engine/game.js";
import SceneManager from "./engine/sceneManager.js";
import Player from "./game/player.js";
import Input from "./engine/input.js";

// when i created my scene manager i couldnt access it anywhere else than in this file
// if i tried id get an error cannot access before initialization
//so i made this script to be a "game manager"
const input = new Input(); //input so i can start game when clicked 
const game = new Game('gameCanvas'); //my instance of a game 
const sceneManager = new SceneManager('gameCanvas');    //instance of my scene manager 
sceneManager.switchScene('menu'); //first scene that is gonna get called when go live

//I needed to be able to do a few checks with update function but i couldnt access it
//so with copilots help i made this game loop that calls update function and does my checks 
//it is very similar to our game loop in game.js
let lastRenderTime = 0;

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastRenderTime; //check time between frames 
    lastRenderTime = currentTime; //update last render time

    game.update(deltaTime); //current time is passed to update function from game.js

    const currentScene = sceneManager.getCurrentScene(); //assigning variable the current scene function
    //from scene manager script

    //in current scene check all the game objects and find an instance of the player 
    // this is needed to access players lives and score
    const player = currentScene.gameObjects.find(obj => obj instanceof Player);

    //when current scene is menu and we press enter, swith scene to level
    if(currentScene == sceneManager.scenes.menu && input.isKeyDown('Enter')){
        sceneManager.switchScene('level')
    }

    // when current scene is level and player has no lives, call game over scene 
    if(currentScene == sceneManager.scenes.level && player.lives <= 0){
        game.pause();
        sceneManager.switchScene('gameOver');
    }

    // when current scene is level and player collected all the collectibles, switch to win scene 
    if(currentScene == sceneManager.scenes.level && player.score >= 9){
        sceneManager.switchScene('gameWin');
    }

    requestAnimationFrame(gameLoop); //call game loop again
}

requestAnimationFrame(gameLoop); //call game loop for the first time

