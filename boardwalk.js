/* global
loadImage, createCanvas, image, textFont, fill, text, width, height, background
*/

var title, myFont, room;

function preload() {
//   myFont = loadFont('https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2FInconsolata.zip?v=1595960689205');
  room = loadImage("https://cdn.glitch.com/b075c885-b8f5-4cf7-b604-e0b21585599d%2FarcadeRoom.jpg?v=1595961020109");
}

function setup() {
  createCanvas(600, 400);
  image(room, 0, 0, width, height+50)
  // textFont(myFont);
  fill(255);
  textSize(30);
  text('THE C\.\A\.\S\.\ ARCADE', width/2-125, height/2);
}