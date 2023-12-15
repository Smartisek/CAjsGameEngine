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
import SceneManager from '../sceneManager.js';

class myLevel extends Game {

    constructor(canvasId) {
        super(canvasId);
      
        const player = new Player(0, this.canvas.height);
        this.addGameObject(player);


        this.camera.target = player;

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
        ];
            for (const platform of platforms) {
                this.addGameObject(platform);
            }


        this.addGameObject(new PlayerUI(10, 10));

        const enemies = [
            new Enemy(1050, this.canvas.height/2.3),
            new Enemy(40, this.canvas.height/2.3),
            new Enemy(750, 130),
            new Enemy(900, 130),
            new Enemy(800, -60),
            new Enemy(-10, -60),
        ]

        for(const enemy of enemies){
            this.addGameObject(enemy);
        }

        
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

        const jetpack = new Jetpack(60, 0);
        this.addGameObject(jetpack);
    }

       
}

export default myLevel;
