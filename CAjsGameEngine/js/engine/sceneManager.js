import myLevel from '../game/myLevel.js';
import Menu from '../game/menu.js';  
import Component from './component.js';
import Player from '../game/player.js';

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
            const currentScene = this.getCurrentScene();
            // if(currentScene){
            //     const player = currentScene.gameObjects.find(obj => obj instanceof Player);
            //     console.log("players score was: " + player.score);
            // }
            // console.log(this.getPlayerScore());

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

    //     getPlayerScore(){
    //         const currentScene = this.getCurrentScene();
    //         if(currentScene){
    //         const player = currentScene.gameObjects.find(obj => obj instanceof Player);
    //         return player.score;
    //     }
    // }
}

export default SceneManager;
