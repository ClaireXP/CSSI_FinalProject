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
 *    collidePointEllipse
 *    text, textSize
 *    createButton
 *    round
 *    keyIsPressed
 *    getURLParams
 */

let xCan = window.innerWidth - 20;
let yCan = window.innerHeight - 20;

let balloons;
let minBallSize;
(xCan>yCan)? minBallSize = xCan/12 : minBallSize = yCan/12;
let maxBallSize;
(xCan>yCan)? maxBallSize = xCan/6 : maxBallSize = yCan/6;

let minSpeed = 1;
let maxSpeed = 3;
let balloonTotal = 3;
let balloonImg, dartImg;
let dartX = xCan/2;
let dartY = yCan/2;
var hit = false;
var tickets = 0;
let pop;
let button1;
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
  createCanvas(xCan, yCan);
  colorMode(HSB, 360, 100, 100);

  balloons = [];

  for (let i = 0; i < balloonTotal; i++) {
    balloons.push(new randomBalloons());
  }
  
  x2 = height;
  
  btn(button1, 'Back', width/2, 10, backButton);
}

function draw() {
  if(keyIsPressed){
    if (keyCode == RIGHT_ARROW) {
      dartX += width/100;
    }
    if (keyCode == LEFT_ARROW) {
      dartX -= width/100;
    }
    if (keyCode == UP_ARROW) {
      dartY -= height/100;
    }
    if (keyCode == DOWN_ARROW) {
      dartY += height/100;
    }
  }
  
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
  textSize(20);
  text('Move With Arrowkeys', xCan/2-70, height-20);
  text('TICKETS: ' + tickets, 10, 20);
  
  for (let i = 0; i < balloonTotal; i++) {
    balloons[i].display();
    balloons[i].float();
  }
  
  dart();
  
  time = time - .25;
  fill(0);
  text('TIME REMAINING: ' + round(time), xCan-215, 20);
  if (time < 0) {
    time = 100;
  }
  // if (time < 0) {
  //   text('GAME ENDED', width/2-50, height/2);
  //   time = 0;
  // }
}

class randomBalloons {
  constructor() {
    this.r = random(minBallSize, maxBallSize);
    this.x = random(0, width-5*this.r);
    this.y = random(height);
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
    image(balloonImg, this.x, this.y, this.r, this.r*1.5);
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

function bye(list, i){
  list = list.splice(i, 1);
}

function dart() {
  image(dartImg, dartX, dartY, 50, 80);
  
  if (dartY < 0) 
    dartY = height-100;
  if (dartY > height)
    dartY = 0;
  if (dartX < 0)
    dartX = width-100;
  if (dartX > width)
    dartX = 0;
  
  // collidePointEllipse(pointX, pointY, ellipseX, ellipseY, ellipseWidth, ellipseHeight )
  for(var i = 0; i < balloonTotal; i++) {
    var hit1 = collidePointEllipse(dartX, dartY, balloons[i].x, balloons[i].y, 100, 150)
    if (hit1) {
      tickets++;
      bye(balloons, i);
      balloons.push(new randomBalloons());
      break;
    }
  }
}

function btn(button, words, x, y, func){
  button = createButton(`${words}`);
  button.position(x, y);
  button.mousePressed(func);
}

function backButton() {
  if(getURLParams().tix!="undefined") tickets = getURLParams().tix;
  window.location.href = "./index.html?tix=" +tickets;
}