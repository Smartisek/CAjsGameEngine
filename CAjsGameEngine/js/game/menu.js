import Game from '../engine/game.js';
import Input from '../engine/input.js';
import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Asteroid from './asteroid.js';

class Menu extends Game{
    constructor(canvasId){
        super(canvasId);

        this.objectInstance = new GameObject(this.canvas.width/2,this.canvas.height/2);
        this.addGameObject(this.objectInstance);

        this.uiComponents = [
            new UI("Press Enter To Start", this.canvas.width/2, 50, '70px Garamond', "white", "center"),
            new UI("Movement LEFT/RIGHT: A/D", this.canvas.width/2, 140, '20px Garamond', "white", "center"),
            new UI("Jump: Space", this.canvas.width/2, 170, '20px Garamond', "white", "center"),   
            new UI("Climb ladder: W", this.canvas.width/2, 200, '20px Garamond', "white", "center"),
            new UI("Fly Jetpack: Hold Space", this.canvas.width/2, 230, '20px Garamond', "white", "center"),
            new UI("Shoot: Left CTRL", this.canvas.width/2, 260, '20px Garamond', "white", "center"),
            new UI("Pause: HOLD P", this.canvas.width/2, 290, '20px Garamond', "white", "center"),
        ]
        
        for(const ui of this.uiComponents){
            this.objectInstance.addComponent(ui);
        }

        // this.uiComponent = new UI("Press Enter To Start", this.canvas.width/2, 50, '50px Arial', "black", "center");
        // this.uiTutorial = new UI("Movement LEFT/RIGHT: A/D", this.canvas.width/2, 150, '30px Arial', "black", "center");
        // this.objectInstance.addComponent(this.uiComponent);

        const asteroid = new Asteroid(1500, 1500 ,300);
        this.addGameObject(asteroid);

        this.input = new Input();
      
        this.camera.target = asteroid;
    }

    update(deltaTime){
        super.isRunning = false;
      super.update(deltaTime);
    }
}

export default Menu;