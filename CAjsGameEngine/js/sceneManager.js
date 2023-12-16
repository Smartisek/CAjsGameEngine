import myLevel from './game/myLevel.js';
import Menu from './game/menu.js';  
import Player from './game/player.js';
import Component from './engine/component.js';

class SceneManager extends Component{
    constructor(canvasId){
        super(canvasId);
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

        getCurrentScene(){
            return this.currentScene;
        }

        // update(deltaTime){
        //     console.log('updating scene');
        //     // const player = this.currentScene.gameObjects.find(obj => obj instanceof Player);
        //     // if(player.score > 1){
        //     //     this.switchScene('menu');
        //     //     console.log('switching scene');
        //     // }
        //     super.update(deltaTime);
        // }
}


// debugger;
// const sceneManager = new SceneManager('gameCanvas');
// sceneManager.switchScene('level');

export default SceneManager;

// const game = new Menu('gameCanvas');

// game.start();
