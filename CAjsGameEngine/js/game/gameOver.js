import Game from '../engine/game.js';
import Jetpack from './jetpack.js';
import Input from '../engine/input.js';

class GameOver extends Game{
    constructor(canvasId){
        super(canvasId);


        
        this.input = new Input();
        const jetpack = new Jetpack(this.canvas.width/2, this.canvas.height/2);
        this.addGameObject(jetpack);
        this.camera.target = jetpack;
    }

    update(deltaTime){
        // const getScore = this.sceneManager.getPlayerScore();
        // console.log(getScore);
     
      super.update(deltaTime);
    }
}

export default GameOver;