/* global
* createCanvas
* width
* height
* field
* ball
* goal
* player
* textAlign
* background
* fill
* noStroke
* rect
* noFill
* stroke
* strokeWeight
* circle
* mouseX
* mouseY
* text
* textSize
* CENTER
* barrier
*/
let xBall
let yBall
let goalOneSpeed
let goalTwoSpeed
let direction
let runWidth
let playerOne
let playerTwo
let ballOneSpeed
let ballTwoSpeed

function setup() {
  createCanvas(600, 600);
  xBall = width / 2;
  yBall = height / 2;
  ballOneSpeed = 5
  ballTwoSpeed = 5
  goalOneSpeed = 200
  goalTwoSpeed = 1
  runWidth = 60

}

function draw() {
  background(0,100,0);
  field();
  ball();
  ballMove();
  barrier();
  player();
  goal();

}

function field() {
  fill(135, 201, 129)
  noStroke();
  rect(0, 0, width * 2 / 5, 20);
  rect(width * 3 / 5, 0, width * 2 / 5, 20);
  rect(0, 0, 10, height)
  rect(width - 10, 0, 10, height)
  rect(0, height - 10, width * 2 / 5, 20)
  rect(width * 3 / 5, height - 10, width * 2 / 5, 20);
  rect(0, height / 2, width, 20);
  noFill();
  stroke(255);
  strokeWeight(10);
  circle(width / 2, height / 2, width / 2)
  rect(width / 3, -100, 200, 200)
  rect(width / 3, 500, 200, 200)
}

function ball() {
  fill(0);
  circle(xBall, yBall, 10);
  xBall += ballOneSpeed;
  yBall += ballTwoSpeed;
}

function ballMove() {

  //if the ball offside
  if (xBall > width || xBall <= 0) {
    ballOneSpeed = -ballOneSpeed
  }
  if (yBall > height || yBall <= 0) {
    ballTwoSpeed = -ballTwoSpeed
  }

  if (xBall <= goalOneSpeed && xBall >= goalOneSpeed +50 && yBall <= 50 && yBall>= 20) {
    ballTwoSpeed = -ballTwoSpeed
  }
  
  if (xBall >= mouseX - 30 && xBall < mouseX + 30 && yBall >= mouseY - 10 && yBall <= mouseY + 20) {
    ballTwoSpeed = -ballTwoSpeed
  }
}

function goalKeeper() {
  rect(goalOneSpeed, 20, 30, 10)
  if (goalOneSpeed > 250 || goalOneSpeed < 120) {
    goalOneSpeed = -goalOneSpeed
  }
  goalOneSpeed = goalOneSpeed + goalOneSpeed
}

function player() {
  fill(0);
  noStroke();
  rect(playerOne, playerTwo, runWidth, 10);
  playerOne = mouseX - runWidth / 2
  playerTwo = mouseY
}


function goal() {
  if (xBall > width * 2 / 5 && xBall < width * 3 / 5 && yBall < 10) {
    fill(255, 0, 0);
    textSize(30);
    textAlign(CENTER);
    text('YOU GOT IT: GOAL!!!!', width / 2, height / 2);
    
  }
}