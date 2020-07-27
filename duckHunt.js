// https://glitch.com/edit/#!/cas-duckhunt?path=script.js%3A1%3A0

/* global
loadImage, image, createCanvas, background, frameRate, mouseX, mouseY, width,
ellipse,
*/

let duckRight, duckLeft, target, waves, p, ducks, can, rows, shots;

function preload(){
  duckLeft = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2FduckLeft.png?v=1595867578953");
  duckRight = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2FduckRight.png?v=1595867581448");
  target = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2Ftarget.png?v=1595867585848");
  waves = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2Fwaves.png?v=1595875394719");
}

function setup(){
  can = createCanvas(600, 500);
  background(51);
  frameRate(60);
  
  shots = [];
  ducks = [];
  addRow(125, 3, "left", 5, 30);
  addRow(200, 4, "right", 3.5, 40);
  addRow(300, 5, "left", 2, 50);
  
  p = {
    x: width/2-20,
    y: 380,
    size: 40,
  }
}

function draw(){
  background(51);
  
  for(const s of shots){
    ellipse(s.x + p.size/2, s.y + p.size/2, 10);
  }
  
  for(var i=0; i<ducks.length; i++){
    ducks[i].drawDuck();
    ducks[i].move();
  }
  
  drawWave(139, 25);
  drawWave(216, 40);
  drawWave(314, 65);
  
  image(target, p.x, p.y, p.size, p.size);
}

function mouseMoved(can){
  p.x = mouseX - p.size/2;
  p.y = mouseY - p.size/2;
}

function mouseClicked(){
  shots.push(new shot(p.x, p.y));
}

function addRow(y, num, direction, speed, scale){
  for(let i=0; i<num; i++) ducks.push(new duck(i*width/num, y, scale, scale, direction, speed));
}

function drawWave(y, size){
  image(waves, 0, y, width, size);
}

class duck {
  constructor(x, y, width, height, direction, speed){
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.pointing = direction;
    this.tint = "0"
    
    this.vel = speed;
    if(this.pointing == "left") this.vel = -this.vel;
  }
  
  drawDuck(){
    if(this.pointing=="left") image(duckLeft, this.x, this.y, this.w, this.h);
    else image(duckRight, this.x, this.y, this.w, this.h);
  }
  
  move(){
    this.x += this.vel;
    
    if(this.x<0) this.x = width;
    if(this.x>width) this.x = 0;
  }
}

class shot {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}