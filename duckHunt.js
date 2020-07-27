// https://glitch.com/edit/#!/cas-duckhunt?path=script.js%3A1%3A0

/* global
loadImage, image, createCanvas
*/

let duckRight, duckLeft, target, player, ducks;

function preload(){
  duckLeft = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2FduckLeft.png?v=1595867578953");
  duckRight = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2FduckRight.png?v=1595867581448");
  target = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2Ftarget.png?v=1595867585848");
}

function setup(){
  createCanvas(500, 500);
  
  ducks = [];
  ducks.push(new duck(50, 50, 50, 50, "left", 5));
}

function draw(){
  for(var i=0; i<ducks.lenght; i++){
    ducks[i].drawDuck();
    ducks[i].move();
  }
  
  image(duckLeft, 50, 50, 50, 50)
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
    else image(duckLeft, this.x, this.y, this.w, this.h);
  }
  
  move(){
    this.x += this.vel;
  }
}