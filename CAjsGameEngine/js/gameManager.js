import Game from "./engine/game.js";
import SceneManager from "./engine/sceneManager.js";
import Player from "./game/player.js";
import Input from "./engine/input.js";

const input = new Input();
const game = new Game('gameCanvas');
const sceneManager = new SceneManager('gameCanvas');    
sceneManager.switchScene('menu');

let lastRenderTime = 0;


function gameLoop(currentTime) {
    const deltaTime = currentTime - lastRenderTime;
    lastRenderTime = currentTime;

    game.update(deltaTime); 
    const currentScene = sceneManager.getCurrentScene();
    const player = currentScene.gameObjects.find(obj => obj instanceof Player);
    if(player && player.score > 1){
        console.log('now');
        sceneManager.switchScene('menu');
    }

    if(currentScene == sceneManager.scenes.menu && input.isKeyDown('Enter')){
        sceneManager.switchScene('level')
    }
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
