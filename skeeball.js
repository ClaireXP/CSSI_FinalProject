//https://glitch.com/edit/#!/cas-skeeball?path=script.js%3A4%3A0

/* global
createCanvas, background, beginShape, endShape, vertex, rect, fill, strokeWeight, image, loadImage
*/

let xCan = 500;
let yCan = 800;

let arrow;

function preload(){
  arrow = loadImage("https://cdn.glitch.com/9ffc4761-79d4-40de-97ac-089782a08e10%2Fbright-arrow.png?v=1595624276573");
}

function setup(){
  createCanvas(xCan, yCan);
}

function draw(){
  background(51);
  buildMachine();
  image(arrow, xCan/2.8, yCan/2);
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

function quad(x, y, x1, y1, x2, y2, x3, y3){
  beginShape();
  vertex(x, y);
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  endShape();
}

function hole(x, y){
  
}