/* global
* createCanvas
* textDisplay
* sqrt
* textAlign
* CENTER
* fill
* text
* textSize
* noFill
* stroke
* ellipse
* quad
* line
* background
* strokeWeight
* rect
* endText
* mouseX
* mouseY
* random
* PI 
* arc
* circle
* mouseIsPressed
* OPEN
*/

let xPosition,yPosition
let mouseStart, shotMade
let score,shot
let rim,tries
let airBall, outOfBounds
let scoreCount, streak
let x,y
let xHoop, yHoop
let direction, xSpeed
let ySpeed
let speed
let aim, radius
let xRim, yRim
let xBoard, yBoard
let g, skyBall



function setup(){
  createCanvas(600,400) //court size
  
  xPosition = 100
  yPosition = 300
  
  mouseStart= 0
  shotMade = 0 // shot made inside
  score = 0 // scoreboard
  rim = 0
  airBall = 0; // shots that don't hit the rim or backboard
  textDisplay = 0;
  outOfBounds = 0; // exited the court
  scoreCount = 0;//counting the score
  streak = 0;
  //variable assigning to ball positions
  x = xPosition
  y = yPosition
  
  //Location of the Hoop
  xHoop = 500
  yHoop = 150
  
  direction = 1 // right side direction
  xSpeed = 0.2 //side speed
  ySpeed = -5 // upward and downward speed
  
  speed = sqrt(xSpeed*xSpeed + ySpeed*ySpeed);
  
  aim = 0; // shooting the ball 
  radius = 24 // basketball radius
}

function draw(){
  textAlign(CENTER)
  background(220);
  fill(152,23,23)
  rect(0, 200, 600, 200)

  textSize(20)
  
  fill(255, 100, 100)
  text("Shots: " + shotMade, 100, 35)
  
  fill(0)
  text("Basket: " + score, 300, 35)
  
  fill(120, 90, 100)
  text("Streak: " + streak, 500, 35)
  
//making the hoop(ellipse)
  noFill() 
  stroke(255,140,0);
  ellipse(xHoop,yHoop,radius*3,radius/4)
  fill(0,0,0)
  //backboard quad(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
  quad(xHoop + radius*3/2 - radius/4, yHoop-radius/4, xHoop + radius*3/2 + radius*0.75 - radius/4, yHoop + radius/4, xHoop + radius*3/2 + radius*0.75 - radius/4, yHoop - radius*3 + radius/4, xHoop + radius*3/2 - radius/4, yHoop - radius*3 - radius/4)
  //backboard to ground line line(x1, y1, x2, y2)
  line(xHoop + radius*3/2 + radius/4, yHoop, xHoop + radius*3/2 + radius/4,yPosition +radius)
  noFill()
  stroke(255)
  // making the net(many lines)
  stroke(255)
  strokeWeight(2);
  line(xHoop-radius*3/2, yHoop , xHoop-radius, yHoop + 3*radius)
  line(xHoop +radius, yHoop + 3*radius, xHoop + radius*3/2, yHoop)
  line(xHoop + radius*3/2, yHoop, (xHoop - radius*3/2 + xHoop - radius)/2, yHoop+radius*3/2)
  line(xHoop - radius*3/2, yHoop, (xHoop + radius*3/2 + xHoop + radius)/2, yHoop+radius*3/2)
  line((xHoop - radius*3/2 + xHoop - radius)/2, yHoop+radius*3/2, xHoop +radius, yHoop + 3*radius)
  line((xHoop + radius*3/2 + xHoop + radius)/2, yHoop+radius*3/2, xHoop -radius, yHoop + 3*radius)
  
//
  if (shot == 1){
    ySpeed = ySpeed - g;
    
    x = x + direction*ySpeed
  
    y = y + ySpeed;
  
    if (y > yPosition){
      y = yPosition;
      ySpeed = -ySpeed*0.5;
    }
    
    if (x > 600 - radius){
      x = 600 - radius;
      xSpeed = -xSpeed*0.5;
    }
    
    if (x < 0 + radius){
      x = radius;
      xSpeed = -xSpeed*0.5;
    }
    
  }
  
  if ((xRim-x)*(xRim-x) + (yRim-y)*(yRim-y) <= radius*radius){
    speed = sqrt(xSpeed*xSpeed + ySpeed*ySpeed);
    xSpeed = -speed*(xRim-x)/radius;
    ySpeed = -speed*(yRim-y)/radius;
    rim += 1;
  }
   if (yHoop - radius*3 - radius/5 < y & y < yHoop + radius/5){
    if (x > xHoop + radius*3/2 - radius/5 - radius & x < xHoop + radius*3/2 + radius*0.75 - radius/5 & xSpeed > 0){
      x = xHoop + radius*3/2 - radius/5 - radius
      xSpeed = -xSpeed*0.5;
      aim += 1;
    }
    if (x > xHoop + radius*3/2 + radius*0.75 & x < xHoop + radius*3/2 + radius*0.75  +radius - radius/5 & xSpeed < 0){
      x =xHoop + radius*3/2 + radius*0.75 + radius - radius/5
      xSpeed = -xSpeed*0.5;
    }
  }
  else if ((xBoard-x)*(xBoard-x) + (yBoard-y)*(yBoard-y) <= radius*radius){
    speed = sqrt(xSpeed*xSpeed + ySpeed*ySpeed);
    xSpeed = -speed*(xBoard-x)/radius;
    ySpeed = -speed*(yBoard-y)/radius;
    aim += 1;
  }
 
  if ((xHoop-x)*(xHoop-x) + (yHoop-y)*(yHoop-y) <= (0.6*radius)*(0.6*radius) & ySpeed > 0){
    shotMade = 1;
    xSpeed = 0.3*xSpeed;
    
  }
  
  if (y < -200){
    skyBall = 1;
  }
  
  if (aim > 0 & rim == 0 & y > yHoop & shotMade == 0 & textDisplay == 0){
    textSize(64);
    fill(0)
    strokeWeight(3)
    stroke(255, 0, 0)
    textAlign(CENTER)
    text("Brick!", 300, yPosition)
    noFill()
  }
  
  if (rim == 1 & aim == 2 & y > yHoop & shotMade == 0 & textDisplay == 0){
    textSize(64);
    fill(0)
    strokeWeight(3)
    stroke(255, 0, 0)
    textAlign(CENTER)
    text("in-and-out", 300, yPosition)
    noFill()
  }
  
  if (rim > 1 & aim > 1 & y > yHoop & shotMade == 0 & textDisplay == 0){
    textSize(64);
    fill(0)
    strokeWeight(3)
    stroke(255, 0, 0)
    textAlign(CENTER)
    text("robbed...", 300, yPosition)
    noFill()
  }
  
  if (rim > 6){
    xSpeed = xSpeed +0.1;
  }
  
  if (textDisplay == 0 & aim == 0 & rim == 0 & ySpeed > 4 & y < yHoop & y != yPosition & shotMade == 0 & x > xHoop +3*radius/2){
    textDisplay = 1
  }
  
  if (rim > 0){
    textDisplay = 0
  }
  if (textDisplay == 1 & y > x & shotMade == 0){
    textSize(64);
    fill(0)
    strokeWeight(3)
    stroke(255, 0, 0)
    textAlign(CENTER)
    text("Air ball!", 300, yPosition)
    noFill()
  }
  

  //console.log(y)
  
  // BOUNCING !!!! 
  
  //if(y > 400-diameter){
    //direction=-1
  //}
  
  //if(y < diameter){
    //direction=1
  //}
  
  // Draw the circle last!!!
  fill(230,105,0)
  stroke(0)
  strokeWeight(1)
  circle(x, y, radius*2)  // Draws a circle at (x,y,radius)
  noFill()
  if (shotMade == 1){
    
    if (scoreCount == 0){
      score += 1
      scoreCount = 1
      if (rim ==0 & aim == 0){
        endText = "Swish!"
      }
      if (aim > 0){
        endText = "Nice Shot!"
      }
      if (rim > 0 & aim < 2){
        endText = "Keep it up!"
      }
      if (rim > 0 & aim >=2){
        endText = "Buckets!"
      }
      if (xPosition < 75){
        endText = "Amazing'!"
      }
      if (tries > 10){
        endText = "Buzzer Beater!"
      }
    }
    
    stroke(255)
    strokeWeight(4);
    line(xHoop-radius*3/2, yHoop , xHoop-radius, yHoop + 3*radius)
    line(xHoop +radius, yHoop + 3*radius, xHoop + radius*3/2, yHoop)
    line(xHoop + radius*3/2, yHoop, (xHoop - radius*3/2 + xHoop - radius)/2, yHoop+radius*3/2)
    line(xHoop - radius*3/2, yHoop, (xHoop + radius*3/2 + xHoop + radius)/2, yHoop+radius*3/2)
    line((xHoop - radius*3/2 + xHoop - radius)/2, yHoop+radius*3/2, xHoop +radius, yHoop + 3*radius)
    line((xHoop + radius*3/2 + xHoop + radius)/2, yHoop+radius*3/2, xHoop -radius, yHoop + 3*radius)
    stroke(0)
    strokeWeight(1)
    textSize(64);
    fill(0)
    strokeWeight(3)
    stroke(255, 255, 0)
    textAlign(CENTER)
    text(endText, 300, yPosition)
    noFill()
  }
  stroke(0);
  strokeWeight(4);
  stroke(255,140,0)
  
  arc(xHoop, yHoop, radius*3, radius/2, 2*PI, PI, OPEN); 
  stroke(0)
  strokeWeight(1)
  
    
  
  if (mouseIsPressed){
    rim = 0
    aim = 0
    shot = 0;
    textDisplay = 0;
    skyBall = 0;
    if (mouseStart == 0){
      if (shotMade == 1){
        if (random(0,1) > 0.75){
          x = random(1.5*radius, xHoop - 3*radius/2 - 2*radius)
        }
        else {
          x = random(1.5*radius, xHoop - 3*radius/2 - 4*radius);
        }
        y = random(200, 400 - 2*radius);
        yHoop = random(100,150)
        xHoop = random(500-radius*2, 500)
        mouseStart = 1;
        xPosition = x
        yPosition = y
        shotMade = 0
        tries = 0
      }
      else {
        mouseStart = 1;
        x = xPosition
        y = yPosition
      }
    }
    
    line(xPosition, yPosition, mouseX, mouseY)
  }
}


function mouseReleased() {
  if (mouseStart == 1){
    shot = 1;
    xSpeed = -g*5*(mouseX - xPosition)/30;
    ySpeed = -g*5*(mouseY - yPosition)/30;
    mouseStart = 0;
    shotMade = 0;
    shot += 1
    scoreCount = 0
    tries += 1;
    rim = 0
    aim = 0
  }
  

}

