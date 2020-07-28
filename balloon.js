/* ____    ___       _      _       ____  
  / ___|  / _ \     / \    | |     / ___| 
 | |  _  | | | |   / _ \   | |     \___ \ 
 | |_| | | |_| |  / ___ \  | |___   ___) |
  \____|  \___/  /_/   \_\ |_____| |____/ 
                       
1) Have a bunch of random balloons pop up using for loop
2) Have a dart image people can aim and shot at
3) If the dart collides with the balloon maybe add a pop sound and make the balloon pop
4) Increase the tickets each time as the time goes on or if they keep hitting the balloons
5) Have balloons of random colors + don't have them touch canvas edge
*/

// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, width, height, windowWidth, windowHeight,
 *    colorMode, HSB,
 *    background,
 *    fill,
 *    noStroke,
 *    ellipse,
 *    image,
 *    loadImage,
 *    keyCode,
 *    RIGHT_ARROW,
 *    UP_ARROW,
 *    DOWN_ARROW,
 *    LEFT_ARROW,
 *    random,
 */

let balloons,
  minBallSize = 12;
let maxBallSize = 30;
let minSpeed = 1;
let maxSpeed = 3;
let balloonTotal = 3;
let balloonImg, dartImg;
let dartX = 200;
let dartY = 300;
var hit = false;
var tickets = 0;
let pop;
var bgImg;
var time = 100;
var x1 = 0;
var x2;
var scrollSpeed = 2;

function preload() {
  balloonImg = loadImage(
    "https://cdn.glitch.com/3f624198-4015-42a8-ad2e-61828d0aa467%2Fballoon.png?v=1595941987173"
  );
  dartImg = loadImage(
    "https://cdn.glitch.com/3f624198-4015-42a8-ad2e-61828d0aa467%2Fimage.png?v=1595944534045"
  );

  bgImg = loadImage(
    "https://cdn.glitch.com/3f624198-4015-42a8-ad2e-61828d0aa467%2Fsky.jpg?v=1595952163420"
  );
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);

  balloons = [];

  for (let i = 0; i < balloonTotal; i++) {
    balloons.push(new randomBalloons());
  }
  
  x2 = height;
}

function draw() {
  
  image(bgImg, 0, x1, width, height);
  image(bgImg, 0, x2, width, height);
  
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -height){
    x1 = height;
  }
  if (x2 < -height){
    x2 = height;
  }
  
  // background(200, 20, 180);
  // image(img, width/2, height/2, 100, 150);

  for (let i = 0; i < balloonTotal; i++) {
    balloons[i].display();
    balloons[i].float();
  }
  
  dart();
  
  time = time - .25;
  fill(0);
  text('TIME REMAINING: ' + round(time), 270, 20);
  if (time < 0) {
    time = 100;
  }
  // if (time < 0) {
  //   text('GAME ENDED', width/2-50, height/2);
  //   time = 0;
  // }
}

var hit1 = false;
class randomBalloons {
  constructor() {
    this.x = random(100, width / 2);
    this.y = random(height);
    this.r = random(minBallSize, maxBallSize);
    this.color = random(360);
    this.velocityY = random(minSpeed, maxSpeed);
  }

  float() {
    this.y += this.velocityY;
    if (this.y > height) {
      // want it to keep appearing at random positions
      this.x = random(width);
      this.y = 0;
      this.velocityY = random(minSpeed, maxSpeed);
      this.color = random(360);
    }
    if (this.x < 0) {
      this.x = 0;
    }
  }

  display() {
    image(balloonImg, this.x, this.y, 100, 150);
    fill(this.color, 30, 100);
    // }
    // if (hit1) {
    // image(pop, this.x, this.y, 100, 150);
    // }
    // imageMode(CENTER);
    // noStroke();
    // ellipse(this.x, this.y, this.r*2);
    // rect(x, y, width, height)
  }
  
}

function dart() {
  image(dartImg, dartX, dartY, 50, 80);
  
  if (dartY < 0) 
    dartY = height-100;
  if (dartY > height)
    dartY = height-100;
  if (dartX < 0)
    dartX = width-100;
  if (dartX > width)
    dartX = width-100;
  
  // collidePointEllipse(pointX, pointY, ellipseX, ellipseY, ellipseWidth, ellipseHeight )
  
  for(var i = 0; i < balloonTotal; i++) {
    hit1 = collidePointEllipse(dartX, dartY, balloons[i].x, balloons[i].y, 100, 150)
    if (hit1) {
    text('TRUE', 50, 50);
    }
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    dartX += 20;
  }
  if (keyCode == LEFT_ARROW) {
    dartX -= 20;
  }
  if (keyCode == UP_ARROW) {
    dartY -= 20;
  }
  if (keyCode == DOWN_ARROW) {
    dartY += 20;
  }
}
