import Game from '../engine/game.js';
import Input from '../engine/input.js';
import UI from '../engine/ui.js';
import Asteroid from './asteroid.js';
import GameObject from '../engine/gameobject.js';

class GameWin extends Game{
    constructor(canvasId){
        super(canvasId);
        //Creating an instance of game object to be able to add components to this scene below with UIs
        this.objectInstance = new GameObject(this.canvas.width/2,this.canvas.height/2);
        this.addGameObject(this.objectInstance);

        //text for game over screen
        this.uiComponents = [
            new UI("Congratulations!", this.canvas.width/2, 50, '70px Garamond', "white", "center"),
            new UI("You won!", this.canvas.width/2, 120, '70px Garamond', "white", "center"),
            new UI("Press Enter to restart", this.canvas.width/2, 210, '70px Garamond', "white", "center")
           
        ]
        
        for(const ui of this.uiComponents){
            this.objectInstance.addComponent(ui);
        }

        const asteroid = new Asteroid(1500, 1500 ,300);
        this.addGameObject(asteroid);

        this.input = new Input();
      
        //camera needs some game object to target
        this.camera.target = asteroid;
    }

    update(deltaTime){
        if(this.input.isKeyDown("Enter")){
            location.reload();
        }
      super.update(deltaTime);
    }
}

export default GameWin;