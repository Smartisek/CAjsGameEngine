import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';


class Trampoline extends GameObject{
    constructor(x, y){
        super(x,y);

        this.addComponent(new Renderer("red", 200, 105, Images.trampoline));
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}, {x:0, y:0}));

        this.tag = "trampoline";
    }
}

export default Trampoline;