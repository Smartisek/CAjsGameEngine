import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class Jetpack extends GameObject{
    constructor(x,y){
        super(x,y);

        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}, {x:0, y:0}));
        this.addComponent(new Renderer("white", 100, 100, Images.jetpack));

    }
}

export default Jetpack;