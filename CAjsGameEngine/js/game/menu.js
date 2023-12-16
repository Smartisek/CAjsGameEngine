import Game from '../engine/game.js';
import Jetpack from './jetpack.js';
import Player from './player.js';

class Menu extends Game{
    constructor(canvasId){
        super(canvasId);


        const jetpack = new Jetpack(this.canvas.width/2, this.canvas.height/2);
        this.addGameObject(jetpack);
        this.camera.target = jetpack;
    }

    update(deltaTime){
        const player = this.gameObjects.find(obj => obj instanceof Player);
        if(player){
            console.log("player");
        } else {
            console.log("no player");
        }
      super.update(deltaTime);
    }
}

export default Menu;