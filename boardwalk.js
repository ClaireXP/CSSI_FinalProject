/* global
loadImage, createCanvas, image, textFont, fill, text, width, height, background, createButton
textSize, getURLParams
*/

let title, myFont, room, balloon, basketball, connect4, duckHunt, pingpong, skeeball, prop, marg;
let button1, button2, button3, button4, button5, button6;
let tickets = 0;

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
  let params = getURLParams();
  if(params!=null && params.tix!="NaN") tickets = Number(getURLParams().tix);
  
  let xCan = window.innerWidth;
  let yCan = window.innerHeight;
  (xCan<yCan)? prop = xCan-20 : prop = yCan*6/4-20;
  
  marg = (xCan-prop)/2;
  
  createCanvas(prop, prop*4/6);
  image(room, 0, 0, width, height+height*5/30)
  // textFont(myFont);
  fill(255);
  textSize(30);
  text('THE C\.\A\.\S\.\ ARCADE', width/2-140, 50);
  
  textSize(15);
  text(`Tickets: ${tickets}`, 12, 20);
  
  image(balloon, 15, height/2-width/5-20, width/5, width/5)
  btn(button1, 'Balloon', marg+width/12, height/2-5, balloonChoice);
  
  image(basketball, width/2.6, height/2-width/5-20, width/5, width/5)
  btn(button2, 'Basketball', marg+width/2.1, height/2-5, basketballChoice);
  
  image(connect4, width-width/4.5, height/2-width/5-20, width/5, width/5)
  btn(button3, 'Connect 4', window.innerWidth-marg-width/6.5, height/2-5, connect4Choice);
  
  image(duckHunt, 8, height-width/5-40, width/5, width/5)
  btn(button4, 'Duck Hunt', marg+width/15, height-25, duckHuntChoice);
  
  image(pingpong, width/2.5, height-width/5-40, width/5, width/5)
  btn(button5, 'Ping Pong', marg+width/2.1, height-25, pingpongChoice);
  
  image(skeeball, width-width/4.5, height-width/5-40, width/5, width/5)
  btn(button6, 'Skeeball', window.innerWidth-marg-width/6.75, height-25, skeeBallChoice);
}

function btn(button, words, x, y, func){
  button = createButton(`${words}`);
  button.position(x, y);
  button.mousePressed(func);
}

function balloonChoice() {
  window.location.href = "./balloon.html?tix=" +tickets;
}

function basketballChoice() {
  window.location.href = "./basketball.html?tix=" +tickets;
}

function connect4Choice() {
  window.location.href = "./connect4.html?tix=" +tickets;
}

function skeeBallChoice() {
  window.location.href = "./skeeball.html?tix=" +tickets;
}

function duckHuntChoice() {
  window.location.href = "./duckhunt.html?tix=" +tickets;
}

function pingpongChoice() {
  window.location.href = "./pingpong.html?tix=" +tickets;
}

function backButton() {
  window.location.href = "./index.html?tix=" +tickets;
}
