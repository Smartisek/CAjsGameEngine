// Import the required modules and classes.
import Component from './component.js';
import Renderer from './renderer.js';

// The Physics class extends Component and handles the physics behavior of a game object.
class Physics extends Component {
  // The constructor initializes the physics component with optional initial velocity, acceleration, and gravity.
  constructor(velocity = { x: 0, y: 0 }, acceleration = { x: 0, y: 0 }, gravity = { x: 0, y: 300 }) {
    super(); // Call the parent constructor.
    this.velocity = velocity; // Initialize the velocity.
    this.acceleration = acceleration; // Initialize the acceleration.
    this.gravity = gravity; // Initialize the gravity.
  }

  // The update method handles how the component's state changes over time.
  update(deltaTime) {
    // Update velocity based on acceleration and gravity.
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += (this.acceleration.y + this.gravity.y) * deltaTime;
    // Move the game object based on the velocity.
    this.gameObject.x += this.velocity.x * deltaTime;
    this.gameObject.y += this.velocity.y * deltaTime;
  }

  // The isColliding method checks if this game object is colliding with another game object.
  isColliding(otherPhysics) {
    // Get the bounding boxes of both game objects.
    const [left, right, top, bottom] = this.getBoundingBox();
    const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox();

    // Check if the bounding boxes overlap. If they do, return true. If not, return false.
    return left < otherRight && right > otherLeft && top < otherBottom && bottom > otherTop;
  }

  // The getBoundingBox method returns the bounding box of the game object in terms of its left, right, top, and bottom edges.
  getBoundingBox() {
    // Get the Renderer component of the game object to get its width and height.
    const renderer = this.gameObject.getComponent(Renderer);
    // Calculate the left, right, top, and bottom edges of the bounding box.
    const left = this.gameObject.x;
    const right = this.gameObject.x + renderer.width;
    const top = this.gameObject.y;
    const bottom = this.gameObject.y + renderer.height;

    // Return the bounding box.
    return [left, right, top, bottom];
  }

  isCollidingCircleRect(otherPhysics){
    const[left, right, top, bottom] = otherPhysics.getBoundingBox();
    const [circleX, circleY, radiusX, radiusY] = this.getCircle();
    let testX = circleX;
    // test width edge
    if(circleX < left){
      testX = left;
    } else if(circleX > right){
      testX = right;  //width of other rectangle
    }
    // test height edge
    let testY = circleY;
    if(circleY < top){
      testY = top;
    } else if(circleY > bottom){
      testY = bottom; //height of other rectangle
    }
    
    const distX = circleX - testX;
    const distY = circleY - testY;
    const distance = Math.sqrt((distX*distX) + (distY*distY));
    if(distance <= radiusX || distance <= radiusY){
      return true;
    }else {
      return false;
    }
  
  }

  getCircle(){
    const rendererCir = this.gameObject.getComponent(Renderer);
    const circleX = this.gameObject.x;
    const circleY = this.gameObject.y;
    const radiusX = this.gameObject.x + rendererCir.width/2;
    const radiusY = this.gameObject.y + rendererCir.height/2;
    
    return [circleX, circleY, radiusX, radiusY];

  }
}

// The Physics class is then exported as the default export of this module.
export default Physics;
