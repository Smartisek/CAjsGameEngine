import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Ladder from './ladder.js';
import Trampoline from './trampoline.js';
import Jetpack from './jetpack.js';
import Input from '../engine/input.js';


class myLevel extends Game {

    constructor(canvasId) {
        super(canvasId);

        const player = new Player(0, this.canvas.height);
        this.addGameObject(player);

        this.camera.target = player;

        const platformWidth = 500;
        const platforms = [
            // First floor 
            new Platform(-20, this.canvas.height/2, platformWidth*2),
            
            // Second floor 
            new Platform(55, 110, platformWidth),
            new Platform(700, 110, platformWidth),
            new Platform(760, -160, platformWidth),
            // platform with trampoline 
            new Platform(1600, 200, 280),

            // 3rd floor
            new Platform(2000, -610, platformWidth/2),
            // 4th floor
            new Platform(760, -1300, 2*platformWidth),
        ];
        this.addGameObject(new PlayerUI(10, 10));

        this.addGameObject(new Enemy(40, this.canvas.height/2));



        for (const platform of platforms) {
            this.addGameObject(platform);
        }

        const ladders = [
            new Ladder(710, -150),
            new Ladder(10, 110),
        ]

        for(const ladder of ladders){
            this.addGameObject(ladder);
        }

        const trampolines = [
            new Trampoline(1625, 120),
            new Trampoline(2020, -680),
        ]

        for(const trampoline of trampolines){
            this.addGameObject(trampoline);
        }

        const jetpack = new Jetpack(60, 0);
        this.addGameObject(jetpack);
    }

}

export default myLevel;
