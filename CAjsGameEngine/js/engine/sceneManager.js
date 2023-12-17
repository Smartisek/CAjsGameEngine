import myLevel from '../game/myLevel.js';
import Menu from '../game/menu.js';  
import Component from './component.js';
// import Player from '../game/player.js';
import GameOver from '../game/gameOver.js';
import GameWin from '../game/gameWin.js';

// I was trying to get some scene manager for a few days and didnt now how to get it work 
// even with copilots help, but after a few days a figured out this code 
// I made a class scene manager that has a constructor with all the possible scenes 
class SceneManager extends Component{
    constructor(canvasId){
        super(canvasId);
        this.currentScene = null;
        this.scenes = {
            menu: new Menu(canvasId),
            level: new myLevel(canvasId),
            gameOver: new GameOver(canvasId),
            gameWin: new GameWin(canvasId),
        };
    }
    // switch scene function that takes in name of scene as parameter 
        switchScene(sceneName){
            // const currentScene = this.getCurrentScene();
            // if(currentScene){
            //     const player = currentScene.gameObjects.find(obj => obj instanceof Player);
            //     console.log("players score was: " + player.score);
            // }
            // console.log(this.getPlayerScore());
            
// if this.scenes from constructor and its name exists then set it to that required scene 
// and start the scene with start function from game.js 
            if(this.scenes[sceneName]){
                this.currentScene = this.scenes[sceneName];
                this.currentScene.start();
                // if scene does not exist just display error 
            } else {
                console.error(`Scene ${sceneName} does not exist!`);
            }
        }
// function for getting current scene, this function returns what scene we are on 
// which is important for my gameManager script 
        getCurrentScene(){
            return this.currentScene;
        }
// I created this function as well for accessing players score to be able to display it 
// in game over or win but my code architecture does not work with this yet and id have 
// to spend another few days how get it work and maybe even rewrtire my codes
    //     getPlayerScore(){
    //         const currentScene = this.getCurrentScene();
    //         if(currentScene){
    //         const player = currentScene.gameObjects.find(obj => obj instanceof Player);
    //         return player.score;
    //     }
    // }
}

export default SceneManager;
