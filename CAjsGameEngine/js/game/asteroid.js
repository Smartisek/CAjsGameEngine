import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class Asteroid extends GameObject{
    constructor(x,y, size){
        super(x,y);

        this.addComponent(new Physics({x:0, y:0},{x:0, y:80},{x:0,y:0}));
        this.addComponent(new Renderer('black',size,size, Images.asteroid));
    }
}

export default Asteroid;