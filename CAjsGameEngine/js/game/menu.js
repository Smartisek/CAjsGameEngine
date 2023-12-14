import Game from '../engine/game.js';
import Jetpack from './jetpack.js';

class Menu extends Game{
    constructor(canvasId){
        super(canvasId);


        const jetpack = new Jetpack(this.canvas.width/2, this.canvas.height/2);
        this.addGameObject(jetpack);

        this.camera.target = jetpack;
    }
}

export default Menu;