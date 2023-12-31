import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Ladder from './ladder.js';
import Trampoline from './trampoline.js';
import Jetpack from './jetpack.js';
import Bullet from './bullet.js';
import SceneManager from '../engine/sceneManager.js';
import Asteroid from './asteroid.js';

class myLevel extends Game {

    constructor(canvasId) {
        super(canvasId);
        // const sc = new SceneManager(canvasId);
        this.player = new Player(200, this.canvas.height/2);
        this.addGameObject(this.player);

        this.camera.target = this.player;
        const platformWidth = 500;
        const platforms = [
            // First floor 
            new Platform(-20, this.canvas.height/2, platformWidth),
            new Platform(650, this.canvas.height/2, platformWidth),
            
            // Second floor 
            new Platform(55, 180, platformWidth),
            new Platform(700, 180, platformWidth),
            new Platform(760, -100, platformWidth),
            new Platform(0, -100, platformWidth/2),
            // 3rd floor
            new Platform(1600, -610, platformWidth/2),
            new Platform(0, -610, platformWidth/2),
            new Platform(800, -610, platformWidth/2),
        ];
            for (const platform of platforms) {
                this.addGameObject(platform);
            }


        this.addGameObject(new PlayerUI(10, 10));
//add all enemies, i previously did this with for loop but i was getting errors with spawning 
            this.addGameObject(new Enemy(900, this.canvas.height/2));
            this.addGameObject(new Enemy(0, this.canvas.height/2));
            this.addGameObject(new Enemy(60, this.canvas.height/2));
            this.addGameObject(new Enemy(750, 120));
            this.addGameObject(new Enemy(900, 120));
            this.addGameObject(new Enemy(800, -90));
            this.addGameObject(new Enemy(-10, -90));
            this.addGameObject(new Enemy(1600, -600));
            this.addGameObject(new Enemy(0, -600));
        
        const ladders = [
            new Ladder(710, -100),
            new Ladder(10, 180),
        ]

        for(const ladder of ladders){
            this.addGameObject(ladder);
        }

        const trampolines = [
            new Trampoline(450, -100),
        ]

        for(const trampoline of trampolines){
            this.addGameObject(trampoline);
        }

        const jetpack = new Jetpack(60, -250);
        this.addGameObject(jetpack);


//I also wanted to get an asteroids that player has to dodge but due to time I just commented it out         
        // const asteroids= [
        //     new Asteroid(this.getRandom(0, this.canvas.width), -300 - this.canvas.height/2, 100),
        //     new Asteroid(this.getRandom(0, this.canvas.width), -100 - this.canvas.height/2, 100),
        //     new Asteroid(this.getRandom(0, this.canvas.width), -200 - this.canvas.height/2, 100),
        //     new Asteroid(this.getRandom(0, this.canvas.width), -100 - this.canvas.height/2, 100),
        // ]

        // for(const asteroid of asteroids){
        //     this.addGameObject(asteroid);
        // }  

    }

    // update(deltaTime) {
    //     const asteroid = this.gameObjects.find(obj => obj instanceof Asteroid);
    //     if(asteroid.y > this.canvas.height){
    //         this.asteroid.y = -300 - this.canvas.height/2;
    //     }
    //     super.update(deltaTime);
    // }
//function for random asteroid spawn but not being used
    getRandom(min, max){
        return Math.random() * (max - min) + min;
    }

}

export default myLevel;
