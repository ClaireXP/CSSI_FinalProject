/* global
loadImage, createCanvas, image, textFont, fill, text, width, height, background, createButton
textSize
*/

var title, myFont, room, balloon, basketball, connect4, duckHunt, pingpong, skeeball, duckHunt;
let button1, button2, button3, button4, button5, button6;

function preload() {
//   myFont = loadFont('https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2FInconsolata.zip?v=1595960689205');
  balloon = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2Fdart.jpg?v=1595961856017");
  // basketball = loadImage("");
  connect4 = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2Fconnect4.jpg?v=1595961309026");
  // duckHunt = loadImage("");
  // pingpong = loadImage("");
  skeeball = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2Fskeeball.png?v=1595961476559");
  room = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2FarcadeRoom.jpg?v=1595961020109");
}

function setup() {
  createCanvas(600, 400);
  image(room, 0, 0, width, height+50)
  // textFont(myFont);
  fill(255);
  textSize(30);
  text('THE C\.\A\.\S\.\ ARCADE', width/2-130, 50);
  
  button1 = createButton('Balloon');
  button1.position(19, 19);
  button1.mousePressed(balloonChoice);
  
  button2 = createButton('Basketball');
  button2.position(250, 30);
  button2.mousePressed(basketballChoice);
  
  button3 = createButton('Connect 4');
  button3.position(160, 50);
  button3.mousePressed(connect4Choice);
  
  button4 = createButton('Duck Hunt');
  button4.position(100, 190);
  button4.mousePressed(duckHunt);
  
  button5 = createButton('Ping Pong');
  button5.position(200, 200);
  button5.mousePressed(pingpongChoice);
  
  button6 = createButton('Skeeball');
  button6.position(300, 3000);
  button6.mousePressed(skeeBallChoice);
}

function balloonChoice() {
  window.location.href = "./balloon.html";
}

function basketballChoice() {
  window.location.href = "./basketball.html";
}

function connect4Choice() {
  window.location.href = "./connect4.html";
}

function skeeBallChoice() {
  window.location.href = "./skeeBall.html";
}

function duckHuntChoice() {
  window.location.href = "./dunkHunt.html";
}

function pingpongChoice() {
  window.location.href = "./pingpong.html";
}
