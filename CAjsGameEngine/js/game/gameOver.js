import Game from '../engine/game.js';
import Input from '../engine/input.js';
import UI from '../engine/ui.js';
import Asteroid from './asteroid.js';
import GameObject from '../engine/gameobject.js';

class GameOver extends Game{
    constructor(canvasId){
        super(canvasId);

         //Creating an instance of game object to be able to add components to this scene below with UIs
        this.objectInstance = new GameObject(this.canvas.width/2,this.canvas.height/2);
        this.addGameObject(this.objectInstance);

        this.uiComponents = [
            new UI("You lost!", this.canvas.width/2, 50, '50px Garamond', "white", "center"),
            new UI("Better luck next time!", this.canvas.width/2, 120, '50px Garamond', "white", "center"),
            new UI("Press Enter to restart", this.canvas.width/2, 200, '70px Garamond', "white", "center"),
           
        ]
        //add all ui components 
        for(const ui of this.uiComponents){
            this.objectInstance.addComponent(ui);
        }

        const asteroid = new Asteroid(1500, 1500 ,300);
        this.addGameObject(asteroid);

        this.input = new Input();
      
        //camera needs some game object to target 
        this.camera.target = asteroid;
    }

    //calling super update and checking input 
    update(deltaTime){
        if(this.input.isKeyDown("Enter")){
            location.reload();
        }
      super.update(deltaTime);
    }
    
}

export default GameOver;