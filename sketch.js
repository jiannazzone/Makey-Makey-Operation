// ------------------ Loading the sound files --------------------- //
let wilhelm;
let regular;
let danger;
let flatline;

function preload() {
  wilhelm = loadSound(["sounds/wilhelm.mp3", "sounds/wilhelm.ogg"]);
  regular = loadSound(["sounds/regular.mp3", "sounds/regular.ogg"]);
  danger1 = loadSound(["sounds/danger1.mp3", "sounds/danger1.ogg"]);
  danger2 = loadSound(["sounds/danger2.mp3", "sounds/danger2.ogg"]);
  dead = loadSound(["sounds/dead.mp3", "sounds/dead.ogg"]);
}

// ------------------- Declaring variables ------------------------ //

// Select your key by going to https://keycode.info and pressing any key.
// Store the number that appears in the variable below.
// By default, it is set to the space bar (32).
let yourKey = 32;

let bg_color = "#02c439"; //sets initial background color
                                                
// sets the number of lives for the game
let numLives = 5;

// ------------------ Setup and Draw Function --------------------- //

// creates the canvas and sets the background to white
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // settings for text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  
  createSoundEffects()
}

function draw() {
  background(bg_color); //makes the background
  
  //different texts to display depending on the number of lives
  if (numLives > 0) {
    text("Lives: " + numLives, width/2, height/2);
  } else if (numLives == 0) {
    text("The patient has died.", width/2, height/2);
  } else if (numLives < 0) {
    dead.stop(); //stops the sound
    clear(); //ends the program
  }
}

// ------------------- Register key presses ---------------------- //

// Makes the scream sound and changes background
// color when you press the designated key
function keyPressed() {
  if (keyCode == yourKey && numLives > 0) {
    bg_color = "#ff0000";
    wilhelm.loop();
  }
  return false;
}

// Stops the scream sound and changes the background
// color when you release the designated key
function keyReleased() {
  if (keyCode == yourKey) {
    wilhelm.stop();
    numLives -= 1; //subtract one life
    checkLives();
  }
  return false;
}

// ------------------- Playing sound files -------------------- //

// to have all of the sound effects ready to go they will be playing
// in the background a zero volume,
// their volumes will change to make them "stop" and "start"
// that will be done with the "checkLives()" function
function createSoundEffects() {
  regular.setVolume(1);
  danger1.setVolume(0);
  danger2.setVolume(0);
  dead.setVolume(0);
  regular.loop();
  danger1.loop();
  danger2.loop();
  dead.loop();
}

// ------------------- Checking Lives ---------------------- //

// As you run down the lives stop previous sound files
// and bring up volume of new sound files
// Also sets new background colors to reflect patient health
function checkLives() {
  if (numLives == 0) {
    danger2.stop();
    dead.setVolume(1);
    bg_color = "#000000";
    
  } else if (numLives == 1) {
    danger1.stop();
    danger2.setVolume(1);
    dead.setVolume(0);
    bg_color = "#59211e";
    
  } else if (numLives > 1 && numLives < 4) {
    regular.stop();
    danger1.setVolume(1);
    danger2.setVolume(0);
    dead.setVolume(0);
    bg_color = "#cf8600";
    
  } else if (numLives >= 4) {
    bg_color = "#02c439";
  }
}