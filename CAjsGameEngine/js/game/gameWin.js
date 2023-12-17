import Game from '../engine/game.js';
import Input from '../engine/input.js';
import UI from '../engine/ui.js';
import Asteroid from './asteroid.js';
import GameObject from '../engine/gameobject.js';

class GameWin extends Game{
    constructor(canvasId){
        super(canvasId);
        this.objectInstance = new GameObject(this.canvas.width/2,this.canvas.height/2);
        this.addGameObject(this.objectInstance);

        this.uiComponents = [
            new UI("Congratulations!", this.canvas.width/2, 50, '70px Garamond', "white", "center"),
            new UI("You won!", this.canvas.width/2, 120, '70px Garamond', "white", "center"),
           
        ]
        
        for(const ui of this.uiComponents){
            this.objectInstance.addComponent(ui);
        }

        const asteroid = new Asteroid(1500, 1500 ,300);
        this.addGameObject(asteroid);

        this.input = new Input();
      
        this.camera.target = asteroid;
    }
}

export default GameWin;