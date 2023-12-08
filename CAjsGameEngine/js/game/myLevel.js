import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Ladder from './ladder.js';

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
            new Platform(1600, 200, 250),
        ];

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
    }
}

export default myLevel;
