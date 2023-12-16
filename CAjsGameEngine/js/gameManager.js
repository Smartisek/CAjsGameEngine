import Game from "./engine/game.js";
import SceneManager from "./engine/sceneManager.js";
import Player from "./game/player.js";

const game = new Game('gameCanvas');
const sceneManager = new SceneManager('gameCanvas');    
sceneManager.switchScene('level');

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
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
