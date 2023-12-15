// Import the required modules and classes.
import Component from './component.js';
import Renderer from './renderer.js';

// The Physics class extends Component and handles the physics behavior of a game object.
class Physics extends Component {
  // The constructor initializes the physics component with optional initial velocity, acceleration, and gravity.
  constructor(velocity = { x: 0, y: 0 }, acceleration = { x: 0, y: 0 }, gravity = { x: 0, y: 500 }) {
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

  // using my code p5.js from first year: https://studentdkit-my.sharepoint.com/:f:/g/personal/d00260467_student_dkit_ie/EhgLj71i7UBPsDS-By0lZPEBApIr2RzHLjeLu5MLaNdFJw?e=PpGXam
  isCollidingCircleRect(otherPhysics){
    const[left, right, top, bottom] = otherPhysics.getBoundingBox(); //get bounding boxes of other rectangle
    const [circleX, circleY, radiusX, radiusY] = this.getCircle(); // get bounding boxes of circle from function below 
    let testX = circleX;
    // test width edge
    if(circleX < left){ //comparing circle x to left edge of other rectangle
      testX = left; 
    } else if(circleX > right){
      testX = right;  //width of other rectangle
    }
    // test height edge
    let testY = circleY;
    if(circleY < top){ //compering circle y to top edge of rectangle 
      testY = top;
    } else if(circleY > bottom){
      testY = bottom; //height of other rectangle
    }
    
    const distX = circleX - testX; //getting distance between circle and rectangle in x axes 
    const distY = circleY - testY;  //getting distance between circle and rectangle in y axes
    const distance = Math.sqrt((distX*distX) + (distY*distY)); // this is a known formula for getting distance between two points 
    if(distance <= radiusX || distance <= radiusY){ //if our distance between two points if less of equal to radius x or radius y, then it is true
      //they collide
      return true;
    }else {
      return false; //otherwise they dont collide
    }
  
  }

  //My code wasnt working right and was colliding with wrong values maybe 10x earlier, that was due 
  //to in radius i was adding renderCir.widht/2 + this.gameobject.x and same for height so my code wasnt working right 
  //I decided to ask copilot where the mistake is because the code was right from my own code from first year 
  //copilot showed me that the mistake was in radius and now the code works properly 
  getCircle(){
    const rendererCir = this.gameObject.getComponent(Renderer); //create circle from renderer component
    const circleX = this.gameObject.x;  //get x point of circle which is this gameobject x 
    const circleY = this.gameObject.y;  //get y point of circle which is this gameobject y
    const radiusX = rendererCir.width/2;  //get radius x which is half a width of that circle(rebdererCir)
    const radiusY = rendererCir.height/2; //get radius y which is half a height of that circle(rebdererCir)
    
    return [circleX, circleY, radiusX, radiusY]; //get the bounding boxes of our circle 

  }
}

// The Physics class is then exported as the default export of this module.
export default Physics;
