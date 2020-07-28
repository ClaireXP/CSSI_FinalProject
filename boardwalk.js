/* global
loadImage, createCanvas, image, textFont, fill, text, width, height, background, createButton
textSize
*/

let title, myFont, room, balloon, basketball, connect4, duckHunt, pingpong, skeeball;
let button1, button2, button3, button4, button5, button6;

function preload() {
//   myFont = loadFont('https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2FInconsolata.zip?v=1595960689205');
  balloon = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2Fdart.jpg?v=1595961856017");
  basketball = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2Fbasketball.png?v=1595961978691");
  connect4 = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2Fconnect4.jpg?v=1595961309026");
  duckHunt = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2Fduck-hunt.png?v=1595962101966");
  pingpong = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2Fpingpong.webp?v=1595962174252");
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
  
  image(balloon, 0, 50, width/4, height-250)
  btn(button1, 'Balloon', 40, height/2-25, balloonChoice);
  
  image(basketball, width/3+30, 50, width/4, height-250)
  btn(button2, 'Basketball', 300, height/2-25, basketballChoice);
  
  image(connect4, 450, 50, width/4, height-250)
  btn(button3, 'Connect 4', 500, height/2-25, connect4Choice);
  
  image(duckHunt, 0, 0, width/4, height-250)
  btn(button4, 'Duck Hunt', 40, height-25, duckHunt);
  
  image(pingpong, width/3+30, 50, width/4, height-250)
  btn(button5, 'Ping Pong', 300, height-25, pingpongChoice);
  
  image(skeeball, 450, height-190, width/4, height-250)
  btn(button6, 'Skeeball', 500, height-25, skeeBallChoice);
}

function btn(button, words, x, y, func){
  button = createButton(`${words}`);
  button.position(x, y);
  button.mousePressed(func);
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

function backButton() {
  window.location.href = "./index.html";
}
