// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
  ladder: new Image(),
  platform: new Image(),
  trampoline: new Image(),
  sign: new Image(),
  jetpack: new Image(),
  asteroid: new Image(),
  gameOver: new Image(),
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump.mp3', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player.src = './resources/images/player/mainPlayer.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path

Images.ladder.src = './resources/images/map/ladder.png';

Images.platform.src = './resources/images/map/platform.png';

Images.trampoline.src = './resources/images/map/trampoline.png';

Images.sign.src = './resources/images/map/sign.png';

Images.jetpack.src = './resources/images/map/jetpack.png';

Images.asteroid.src = './resources/images/map/asteroid.png';

Images.gameOver.src = './resources/images/UI/gameover.png';
// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
