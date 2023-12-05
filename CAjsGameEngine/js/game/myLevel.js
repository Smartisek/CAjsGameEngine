import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';

class myLevel extends Game {

    constructor(canvasId) {
        super(canvasId);

        const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
        this.addGameObject(player);

        this.camera.target = player;


        const platformWidth = 800;
        const Platforms = [
            new Platform(0, this.canvas.height - 20, platformWidth, 20),
            new Platform(0, this.canvas.height - 100, platformWidth, 20),
        ];

        for (const platform of Platforms) {
            this.addGameObject(platform);
        }
    }
}

export default myLevel;
