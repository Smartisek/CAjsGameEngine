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
        const Platforms = [
            new Platform(0, this.canvas.height/2 , platformWidth, 20),
            new Platform(0, this.canvas.height/2, platformWidth*2, 20),
            new Platform(1000, 200, -1.8*platformWidth,20),
        ];

        for (const platform of Platforms) {
            this.addGameObject(platform);
        }

        const ladder = new Ladder(0,200);
        this.addGameObject(ladder);
    }
}

export default myLevel;
