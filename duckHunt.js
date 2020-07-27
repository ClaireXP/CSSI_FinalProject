// https://glitch.com/edit/#!/cas-duckhunt?path=script.js%3A1%3A0

/* global
loadImage, image, createCanvas, background, frameRate, mouseX, mouseY, width,
*/

let duckRight, duckLeft, target, p, ducks, can;

function preload(){
  duckLeft = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2FduckLeft.png?v=1595867578953");
  duckRight = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2FduckRight.png?v=1595867581448");
  target = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2Ftarget.png?v=1595867585848");
}

function setup(){
  can = createCanvas(600, 500);
  background(51);
  frameRate(60);
  
  ducks = [];
  ducks.push(new duck(0, 50, 50, 50, "right", 3));
  
  p = {
    x: width/2-20,
    y: 380,
    size: 40,
  }
}

function draw(){
  background(51);
  
  for(var i=0; i<ducks.length; i++){
    ducks[i].drawDuck();
    ducks[i].move();
  }
  
  image(target, p.x, p.y, p.size, p.size)
}

function mouseMoved(can){
  p.x = mouseX - p.size/2;
  p.y = mouseY - p.size/2;
}

class duck {
  constructor(x, y, width, height, direction, speed){
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.pointing = direction;
    
    this.vel = speed;
    if(this.pointing == "left") this.vel = -this.vel;
  }
  
  drawDuck(){
    if(this.pointing=="left") image(duckLeft, this.x, this.y, this.w, this.h);
    else image(duckRight, this.x, this.y, this.w, this.h);
  }
  
  move(){
    this.x += this.vel;
  }
}
