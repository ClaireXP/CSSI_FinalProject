//https://glitch.com/edit/#!/cas-skeeball?path=script.js%3A4%3A0

/* global
createCanvas, background, beginShape, endShape, vertex, rect, fill, strokeWeight, 
image, loadImage, ellipse, mouseX, mouseY, mouseIsPressed, collidePointCircle, 
quad, millis, frameRate, arc, PI, OPEN, stroke, noStroke, collidePointEllipse, text,
textSize,
*/

let xCan = 500;
let yCan = 800;

let arrow, currentBall, can, holes;
let tickets = 0;

function preload(){
  arrow = loadImage("https://cdn.glitch.com/9ffc4761-79d4-40de-97ac-089782a08e10%2Fbright-arrow.png?v=1595624276573");
}

function setup(){
  can = createCanvas(xCan, yCan);
  frameRate(60);
  
  currentBall = new ball();
  
  holes = [];
  addHoles();
}

function draw(){
  background(51);
  buildMachine();
  image(arrow, xCan/2.8, yCan/2);
  
  for(const h of holes) h.drawHole();
  
  currentBall.drawBall();
  if(currentBall.released) currentBall.roll();
  
  if(currentBall.stopped){
    for(var i=0; i<holes.length; i++){
      holes[i].checkCollision();
      if(holes[i].touching){
        holes[i].color = "red";
        holes[i].drawHole();
        currentBall = "";
        tickets+=holes[i].score;
        break;
      }if(i==holes.length-1) break;
    }
    
    let t = millis();
    while(millis()<t+1*1000){
      console.log(`${holes[i].score}`);
    }
    holes[i].color = "black";
    currentBall = new ball();
  }
  
  textSize(20);
  text(`Tickets: ${tickets}`, 5, 20);
}

function mouseMoved(can){
  if(!currentBall.held && !mouseIsPressed && !currentBall.released){
    let x = mouseX;
    if(x>xCan/5 && x<4*xCan/5) currentBall.x = mouseX;
    else if(x<=xCan/5) currentBall.x = xCan/5;
    else currentBall.x = 4*xCan/5;
  }
}

function mouseDragged(can){
  if(!currentBall.released){
    let y = mouseY;
    let x = mouseX;

    if(y>2*yCan/3 && (x>xCan/4 && x<3*xCan/4)){
      let holding = collidePointCircle(x, y, currentBall.x, currentBall.y, currentBall.w*6);
      if(holding){
        currentBall.x = x;
        currentBall.y = y;
        
        currentBall.held = true;
      } 
    }

    if(x<=xCan/5) currentBall.x = xCan/4;
    if(x>=4*xCan/5) currentBall.x = 3*xCan/4;
    if(y<=2*yCan/3) currentBall.y = 2*yCan/3;
  }
}

function mousePressed(){
  if(!currentBall.released && !currentBall.held){
    let y = mouseY;
    let x = mouseX;

    if(y>2*yCan/3 && (x>xCan/4 && x<3*xCan/4)){
      let holding = collidePointCircle(x, y, currentBall.x, currentBall.y, currentBall.w*6);
      if(holding){
        currentBall.x1 = x;
        currentBall.y1 = y;
        currentBall.msInit = millis();
        currentBall.held = true;
      }
    }
  }
}

function mouseReleased(){
  if(currentBall.held && !currentBall.released){
    let y = mouseY;
    let x = mouseX;

    if(y<2*yCan/3 && (x<xCan/4 && x>3*xCan/4)){
      currentBall.x = x;
      currentBall.y = y;
    } 
    
    currentBall.msFinal = millis();
    currentBall.released = true;
    currentBall.calculateVel();
  }
}

function addHoles(){
  holes.push(new hole(xCan/2, yCan/8.5, xCan/10, yCan/40, 5));
  holes.push(new hole(xCan/3, yCan/8.5, xCan/12, yCan/40, 10));
  holes.push(new hole(2*xCan/3, yCan/8.5, xCan/12, yCan/40, 10));
  holes.push(new hole(xCan/2, yCan/6.5, xCan/9, yCan/40, 4));
  holes.push(new hole(xCan/2, yCan/5.25, xCan/8.5, yCan/40, 3));
  holes.push(new hole(xCan/2, yCan/4.2, xCan/2.5, yCan/20, 1));
  holes.push(new hole(xCan/2, yCan/4.2, xCan/6, yCan/30, 2));
}

function buildMachine(){
  //Ramp
  strokeWeight(2);
  fill(71, 209, 209);
  quad(xCan/8, yCan, xCan/4, 3*yCan/7, 3*xCan/4, 3*yCan/7, 7*xCan/8, yCan);
  fill(36, 143, 143);
  quad(xCan/5, 3*yCan/7, xCan/4, yCan/10, 3*xCan/4, yCan/10, 4*xCan/5, 3*yCan/7);
  
  //Rails
  strokeWeight(1);
  fill(255, 198, 26);
  quad(xCan/4, 3*yCan/7, xCan/4, yCan/3, xCan/8, yCan*7.5/9, xCan/8, yCan);  
  quad(3*xCan/4, 3*yCan/7, 3*xCan/4, yCan/3, 7*xCan/8, yCan*7.5/9, 7*xCan/8, yCan);
  
  quad(xCan/4, yCan/3, xCan/8, yCan/3, 0, yCan*7.5/9, xCan/8, yCan*7.5/9);
  quad(3*xCan/4, yCan/3, 7*xCan/8, yCan/3, xCan, yCan*7.5/9, 7*xCan/8, yCan*7.5/9);
  
  rect(0, yCan*7.5/9, xCan/8, yCan*(1-7.5/9));
  rect(xCan-xCan/8, yCan*7.5/9, xCan/8, yCan*(1-7.5/9));
  
  //Jump
  strokeWeight(2);
  fill(61, 194, 194);
  quad(xCan/4, yCan*7/18, xCan/4.275, yCan/2, 3*xCan/3.915, yCan/2, 3*xCan/4, yCan*7/18);
  
  //Side Shields
  strokeWeight(1);
  fill(204, 230, 255, 50);
  rect(xCan/5.75, yCan/3, xCan/50, -yCan/3.5);
  rect(4*xCan/5, yCan/3, xCan/50, -yCan/3.5);
  rect(xCan/5.75, yCan/3-yCan/3.5, xCan/1.55, yCan/100);
}

class ball {
  constructor(){
    this.w = xCan/20 + (yCan-xCan/20)/30;
    this.x = xCan/2;
    this.y = yCan - this.w;
    this.x1 = null;
    this.y1 = null;
    this.held = false;
    this.released = false;
    this.stopped = false;
    this.msInit = null;
    this.msFinal = null;
    this.deltaT = null;
    this.dist = null;
    this.vel = null;
  }

  drawBall(){
    fill(255);
    stroke("black");
    ellipse(this.x, this.y, (xCan/20) + this.y/30);
  }
  
  roll(){
    if(this.y>yCan/2 && this.vel>0) this.y -= 15*this.vel;
    else if(this.y>yCan/3-this.vel*this.deltaT-25 && this.y>yCan/8) this.y -= 4*this.vel;
    else if(!this.stopped) this.stopped = true;
    
    if(this.y>yCan/2-this.vel*this.deltaT-25 && this.y>yCan/8) this.x -= 2*this.xDist/this.deltaT;
    if((this.x<=xCan/3.5 && this.xDist>0) || (this.x>=2.625*xCan/3.5 && this.xDist<0)) this.xDist=-this.xDist;
  }
  
  calculateVel(){
    this.deltaT = (this.msFinal-this.msInit);
    this.xDist = (this.x1-this.x);
    this.yDist = (this.y1-this.y);
    this.dist = Math.sqrt(Math.pow(this.x1-this.x, 2)+Math.pow(this.y1-this.y, 2));
    this.vel = 1.15*(this.dist/this.deltaT);
    
    console.log(`vel: ${this.vel}`);
    console.log(`${this.vel*this.deltaT}`);
  }
}

class hole {
  constructor(x, y, width, height, score){
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.color = "black";
    this.touching = false;
    this.score = score;
  }
  
  drawHole(){
    fill("white");
    noStroke();
    rect(this.x-this.w/2, this.y+this.h/8, this.w, this.h);
    
    stroke("white");
    arc(this.x, this.y+this.h, this.w, this.h, 0, PI, OPEN);
    
    fill(this.color);
    ellipse(this.x, this.y, this.w, this.h);
    
    textSize(13);
    text(`${this.score}`, this.x-3, this.y);
  }
  
  checkCollision(){
    this.touching = collidePointEllipse(currentBall.x, currentBall.y, this.x, this.y, this.w+20, this.h+20);
  }
}
