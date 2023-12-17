// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import Ladder from '../game/ladder.js';
import Trampoline from './trampoline.js';
import Jetpack from './jetpack.js';
import Bullet from './bullet.js';
import { AudioFiles } from '../engine/resources.js';



// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y);
    // this.sceneManager = sc;
    this.renderer = new Renderer('blue', 35, 45, Images.player); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 250;
    this.jumpTime = 0.05;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.isOnLadder = false;
    this.isOnTrampoline = false;
    this.trampolinePower = 300;
    this.jetpackOn = false;
// an empty array for bullets
    this.bullets = [];
    this.canFire = true;
  
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component


    // Handle player movement
    if (input.isKeyDown('KeyD')) {
      physics.velocity.x = 250;
      this.direction = -1;
    } else if (input.isKeyDown('KeyA')) {
      physics.velocity.x = -250;
      this.direction = 1;
    } else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
    }
    
    // Handle player jumping
    if (input.isKeyDown('Space') && this.isOnPlatform) {
      this.startJump();
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    //when boolean jetpackon is true and we press jump space, we can now fly since we picked up a jetpack
    if(this.jetpackOn && input.isKeyDown("Space")){
      this.jetpackFly();
    }

    //when control pressed and canfire is true, fire bullets 
    if(input.isKeyDown('ControlLeft') && this.canFire){
      this.fireBullet();
      this.emitBulletParticles();
    }

    //when firing bullets, we need to check if they are out of canvas and remove them for performance reasons 
    this.checkBulletRange();
  
    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }

    // using collision rect to circle, player has rect bouding box drawn and trampoline has circle bounding box drawn
    //then check if they are colliding
    const trampolines = this.game.gameObjects.filter((obj) => obj instanceof Trampoline);
    for(const trampoline of trampolines){
      if(physics.isCollidingCircleRect(trampoline.getComponent(Physics))){
        this.isOnTrampoline = true;
      } else {
        this.isOnTrampoline = false;
      }
      if(this.isOnTrampoline){
        this.trampolineJump();
        this.emitCollectParticles();
      }
    }

    // handle collision with ladders, if we are colliding with it set boolean to true otherwise set it to false so player can go up
    // anywhere else 
    const ladders = this.game.gameObjects.filter((obj) => obj instanceof Ladder);
    for(const ladder of ladders){
      if(physics.isColliding(ladder.getComponent(Physics))){
        this.isOnLadder = true;
        if(this.isOnLadder && input.isKeyDown('KeyW')){
          this.handleLadder();
          console.log("on ladder");
        }
      }else{
        this.isOnLadder = false;
      }
      
    }

    // Handle collisions with enemies, filter all instences of Enemy class in the scene and for each, if they are colliding
    // call the function collidewithenemy below  
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
        
      }
    }
  
    // Handle collisions with platforms
    this.isOnPlatform = false;  // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        if (!this.isJumping) { //if player is not currently jumping, set velocity ti 0 and acceleration in y dirrection to 0
          physics.velocity.y = 0;
          physics.acceleration.y = 0;
          this.y = platform.y - this.renderer.height;
          this.isOnPlatform = true; //set boolean to true so we can jump again
        }    
      }
    }

    //Check for all the instances of jetpack class in scene and for each found check if they are colliding with player
    const jetpacks = this.game.gameObjects.filter((obj) => obj instanceof Jetpack);
      for(const jetpack of jetpacks ){
        if(physics.isColliding(jetpack.getComponent(Physics))){
          this.jetpackOn = true; //if we collide set boolean to true 
          this.game.removeGameObject(jetpack); //remove object when we picked it up
        }
      }
  
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height) {
      this.lives--;
      this.resetPlayerState();
    }



    super.update(deltaTime);
  }


  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.isOnPlatform) { 
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce; //when we jump, set velocity in - direction with jumpforce value
      this.isOnPlatform = false; // when we jump we are not on platform so set boolean to false 
    }
  }

  //when function called, create a new bullet instance and push it into an array of bullets 
  fireBullet(){
    AudioFiles.fire.play();
    const bullet = new Bullet(this.x, this.y+15, 5,5, "black", this.direction); //this.direction is to determine which way to go(it is the direction of player)
    this.bullets.push(bullet);
    for(const bullet of this.bullets){ //go through all the bullets added into an array and add them into the game 
      this.game.addGameObject(bullet);
      if(bullet.direction ==1){ //set which way they go based on players direction 
        bullet.getComponent(Physics).velocity.x = -800;
      } else {
        bullet.getComponent(Physics).velocity.x = 800;
      }
    }
    if(this.canFire){ //set a timeout for firing for performance reasons after 500ms
      setTimeout(() => {
      this.canFire = true;
      }, 200);
    }
    this.canFire = false;
  }

checkBulletRange(){
  //using for loop to go through my bullet array (backwards because we are removing from the array) 
  //then check if the bullet is out of canvas, if yes remove it from the array and also from the game 
  for(let i = this.bullets.length - 1; i >= 0; i--){ 
    const bullet = this.bullets[i];
    if(bullet.x < 0 || bullet.x > this.game.canvas.width){
      this.bullets.splice(i,1);
    }
  }
}

// when flying with jetpack emit particles for jetpack and set velocity y to -200 to go up 
  jetpackFly(){
    // AudioFiles.jetpack.play();
    this.getComponent(Physics).velocity.y = -200;
    this.emitJetpackParticels();
  }

  // function for going up a ladder. set velocity y to -150 to go up
  handleLadder(){
    this.getComponent(Physics).velocity.y = -150;
  }

  //when collided with trampoline, set velocity y to -700 to bounce up 
  trampolineJump(){
    this.getComponent(Physics).velocity.y = -this.trampolinePower;
    this.isOnTrampoline = false;
  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) { //when in the air too long or velocity in y direction is positive, set jump to false
      this.isJumping = false;
    }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      AudioFiles.hurt.play();
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    AudioFiles.collect.play();
    this.score += collectible.value; //updating score variable with picked up value of collectible 
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  emitJetpackParticels(){
    const particleSystem = new ParticleSystem(this.x, this.y+20, 'orange', 20, 2, 1);
    this.game.addGameObject(particleSystem);
  }

  emitBulletParticles(){
    const particleSystem = new ParticleSystem(this.x, this.y+20, 'black', 15, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = 200;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}

export default Player;