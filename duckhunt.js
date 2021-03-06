// https://glitch.com/edit/#!/cas-duckhunt?path=script.js%3A1%3A0

/* global
loadImage, image, createCanvas, background, frameRate, mouseX, mouseY, width,
ellipse, collideCircleCircle, fill, textSize, text, ARROW, cursor, noCursor,
createButton, height, getURLParams
*/

let duckRight, duckLeft, target, waves, p, ducks, can, rows, shots, misses, btn, button, sizing;
let noBtn = true;
let tickets = 0;

let prop = window.innerWidth - 20;
let y = window.innerHeight;

function preload(){
  duckLeft = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2FduckLeft.png?v=1595867578953");
  duckRight = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2FduckRight.png?v=1595867581448");
  target = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2Ftarget.png?v=1595867585848");
  waves = loadImage("https://cdn.glitch.com/575c96d4-ad40-4b02-a190-89164f072325%2Fwaves.png?v=1595875394719");
}

function setup(){
  if(prop*5/6 >= y) prop = 6/5*y - 20;
  can = createCanvas(prop, prop*5/6);
  sizing = height/13;
  
  background(51);
  frameRate(60);
  
  p = {
    x: width/2-10,
    y: height*4/5,
    size: sizing,
  }
  
  reset();
  makeBtn(button, "Back", window.innerWidth/2+5, height-25, backButton);
}

function draw(){
  if(shots>0){
    updatePix();
  }else{
    cursor(ARROW);
    if(noBtn){
      updatePix();
      btn = createButton('Play Again!');
      btn.mousePressed(playAgain);
      btn.position(window.innerWidth/2-25, height/2)
      noBtn = false;
    }
  }
}

function mouseMoved(can){
  p.x = mouseX - p.size/2;
  p.y = mouseY - p.size/2;
}

function mouseClicked(can){
  if(shots>0 && noBtn){
    let miss = true;
    for(var i=0; i<ducks.length; i++){
      if(mouseY<=ducks[i].y+100 && mouseY>=ducks[i].y-100){
        let hit = collideCircleCircle(p.x, p.y, p.size, ducks[i].x+ducks[i].w/2, ducks[i].y+ducks[i].w/2, ducks[i].w*.5);
        if(hit){
          miss = false;
          tickets += ducks[i].score;
          bye(ducks, i);
          break;
        } 
      }
    }if(miss) misses.push(new shot(p.x, p.y));
    shots--;
  }
}

function reset(){
  shots = 5;
  
  noCursor();
  misses = [];
  ducks = [];
  addRow(height*1.25/5, 3, "left", 5, sizing*3/4, 10);
  addRow(height*2/5, 4, "right", 3.5, sizing, 5);
  addRow(height*3/5, 5, "left", 2, sizing*5/4, 1);
}

function addRow(y, num, direction, speed, scale, score){
  for(let i=0; i<num; i++) ducks.push(new duck(i*width/num, y, scale, direction, speed, score));
}

function updatePix(){
  background(51);

  for(const m of misses){
    ellipse(m.x + p.size/2, m.y + p.size/2, 10);
  }

  for(var i=0; i<ducks.length; i++){
    ducks[i].drawDuck();
    ducks[i].move();
  }

  drawWave(height*139/500, sizing*25/40);
  drawWave(height*216/500, sizing);
  drawWave(height*314/500, sizing*65/40);

  image(target, p.x, p.y, p.size, p.size);

  fill("white");
  textSize(20);
  text(`Tickets: ${tickets}`, 5, 20);
  textSize(15);
  text(`Shots Left: ${shots}`, 5, 40);
}

function drawWave(y, size){
  image(waves, 0, y, width, size);
}

function bye(list, i){
  list = list.splice(i, 1);
}

function playAgain(){
  reset();
  btn.remove();
  noBtn = true;
}

function makeBtn(button, words, x, y, func){
  button = createButton(`${words}`);
  button.position(x, y);
  button.mousePressed(func);
}

function backButton() {
  if(getURLParams().tix!="undefined") tickets += Number(getURLParams().tix);
  window.location.href = "./index.html?tix=" +tickets;
}

class duck {
  constructor(x, y, width, direction, speed, amt){
    this.x = x;
    this.y = y;
    this.w = width;
    this.pointing = direction;
    this.score = amt;
    
    this.vel = speed;
    if(this.pointing == "left") this.vel = -this.vel;
  }
  
  drawDuck(){
    if(this.pointing=="left") image(duckLeft, this.x, this.y, this.w, this.w);
    else image(duckRight, this.x, this.y, this.w, this.w);
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