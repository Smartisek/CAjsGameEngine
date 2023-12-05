import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class Ladder extends GameObject{
    constructor(x,y){
        super(x,y);
        this.addComponent(new Renderer("black", 50,200, Images.ladder));

        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}, {x:0, y:0}));

        this.tag = "ladder";
    }
}

export default Ladder;