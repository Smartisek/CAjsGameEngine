import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';


class Bullet extends GameObject{
    constructor(x, y, width, heigth, color, direction){
        super(x, y);

        this.addComponent(new Renderer(color, width, heigth));
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}, {x:0, y:0}));
        this.direction = direction;

        this.tag = "bullet";
        }
}

export default Bullet;