import myLevel from './game/myLevel.js';
import Menu from './game/menu.js';  
import Input from './engine/input.js';
import GameObject from './engine/gameobject.js';

class SceneManager{
    constructor(canvasId){

        this.currentScene = null;
        this.scenes = {
            menu: new Menu(canvasId),
            level: new myLevel(canvasId),
        };

    }
        switchScene(sceneName){
            if(this.scenes[sceneName]){
                this.currentScene = this.scenes[sceneName];
                this.currentScene.start();
            } else {
                console.error(`Scene ${sceneName} does not exist!`);
            }
        }
}


const sceneManager = new SceneManager('gameCanvas');
sceneManager.switchScene('menu');

export default SceneManager;

// const game = new Menu('gameCanvas');

// game.start();
