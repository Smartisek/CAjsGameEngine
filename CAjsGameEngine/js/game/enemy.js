// Import the GameObject class from the 'engine' directory
import GameObject from '../engine/gameobject.js';

// Import the Renderer class from the 'engine' directory
import Renderer from '../engine/renderer.js';

// Import the Physics class from the 'engine' directory
import Physics from '../engine/physics.js';

// Import the Images object from the 'engine' directory. This object contains all the game's image resources
import {Images} from '../engine/resources.js';
import { AudioFiles } from '../engine/resources.js';

// Import the Player and Platform classes from the current directory
import Player from './player.js';
import Platform from './platform.js';
import Bullet from './bullet.js';
import ParticleSystem from '../engine/particleSystem.js';
import Collectible from './collectible.js';

// Define a new class, Enemy, which extends (i.e., inherits from) GameObject
class Enemy extends GameObject {

  // Define the constructor for this class, which takes two arguments for the x and y coordinates
  constructor(x, y) {
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    
    // Add a Renderer component to this enemy, responsible for rendering it in the game.
    // The renderer uses the color 'green', dimensions 50x50, and an enemy image from the Images object
    this.addComponent(new Renderer('green', 35, 35, Images.enemy));
    
    // Add a Physics component to this enemy, responsible for managing its physical interactions
    // Sets the initial velocity and acceleration
    this.addComponent(new Physics({ x: 50, y: 0 }, { x: 0, y: 0 }));
    
    // Initialize variables related to enemy's movement
    this.movementDistance = 0;
    this.movementLimit = 100;
    this.movingRight = true;
    this.enemyHealth = 3;
  }

  // Define an update method that will run every frame of the game. It takes deltaTime as an argument
  // which represents the time passed since the last frame
  update(deltaTime) {
    // Get the Physics component of this enemy
    const physics = this.getComponent(Physics);

    // Check if the enemy is moving to the right
    if (this.movingRight) {
      // If it hasn't reached its movement limit, make it move right
      if (this.movementDistance < this.movementLimit) {
        physics.velocity.x = 50;
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
        this.getComponent(Renderer).gameObject.direction = 1;
      } else {
        // If it reached the limit, make it move left
        this.movingRight = false;
        this.movementDistance = 0;
      }
    } else {
      // If it hasn't reached its movement limit, make it move left
      if (this.movementDistance < this.movementLimit) {
        physics.velocity.x = -50;
        this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
        this.getComponent(Renderer).gameObject.direction = -1;
      } else {
        // If it reached the limit, make it move right
        this.movingRight = true;
        this.movementDistance = 0;
      }
    }

    // Check if the enemy is colliding with the player, same as in the player script 
    const player = this.game.gameObjects.find(obj => obj instanceof Player);
    if (physics.isColliding(player.getComponent(Physics))) {
      player.collidedWithEnemy();
    }

    // Check if the enemy is colliding with any platforms
    const platforms = this.game.gameObjects.filter(obj => obj instanceof Platform);
    this.isOnPlatform = false;
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        // If it is, stop its vertical movement and position it on top of the platform
        physics.velocity.y = 0;
        physics.acceleration.y = 0;
        this.y = platform.y - this.getComponent(Renderer).height;
        this.isOnPlatform = true;
      }
    }

    // Collision with bullets and enemy, we filter all of the bullets in game objects and check if they are colliding with the enemy
    const bullets = this.game.gameObjects.filter(obj => obj instanceof Bullet);
    for(const bullet of bullets){
      if(physics.isCollidingCircleRect(bullet.getComponent(Physics))){  //if they collide, remove enemy and bullet too
        AudioFiles.hurt.play();
        this.enemyHealth--;
        this.game.removeGameObject(bullet);
        player.bullets.splice(player.bullets.indexOf(bullet), 1); //we also need to remove from bullet array becuase if we were to fire again, the bullet that 
        //hit an enemy would still be in the array and would be rendered
        this.emitHurtParticles();
        if(this.enemyHealth <= 0){
          this.game.removeGameObject(this);
          const collectible = new Collectible(this.x, this.y+10, 10,10, 'gold');
          this.game.addGameObject(collectible);
        }
      }
      }
    // Call the update method of the superclass (GameObject), passing along deltaTime
    super.update(deltaTime);
  }

  emitHurtParticles() {
    //create particles when enemy is destroyed
    const particleSystem = new ParticleSystem(this.x, this.y, 'red', 20, 2, 1);
    this.game.addGameObject(particleSystem);
  }
}

// Export the Enemy class as the default export of this module
export default Enemy;
