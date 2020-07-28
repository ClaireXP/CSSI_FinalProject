/*global
* createCanvas 
* mouseJustPressed
* textDisplay
* textAlign
* background 
* sqrt
* CENTER
* fill 
* noFill
* rect 
* circle
* textSize
* stroke
* strokeWeight
* text 
* ellipse
* quad 
* line
* endText
* random
* mouseIsPressed
* arc, PI, OPEN
* mouseX
* mouseY
* circle
* mouseJustPressed
* height
* width
* createButton
* getURLParams
*/

let xPosition, yPosition
let shotMade, score, shots, tries, rim, aim, streak 
let skyBall
let scoreCount
let x,y,g
let direction
let xHoop, yHoop
let xSpeed, ySpeed
let speed
let shot, radius
let rimX, rimY
let xBoard, yBoard 

let button;
let tickets = 0;


function setup() {
  createCanvas(650, 500); 
  
  // Starting position of the ball
  xPosition = width*5/65;
  yPosition = height*325/500;
  
  mouseJustPressed = 0;
  shotMade = 0;
  score = 0;
  shots = 0;
  tries = 0;
  rim = 0;
  aim = 0;
  textDisplay = 0;
  streak = 0;
  
  skyBall = 0;
  
  scoreCount = 0;

  
  
  x = xPosition;
  y = yPosition;
  
  // Hoop location
  xHoop = width*50/65
  yHoop = height*15/50
  
   
  direction=1;
  xSpeed = 0.3;
  
  ySpeed = -9;
  
  speed = sqrt(xSpeed*xSpeed + ySpeed*ySpeed);
  
  g = - 0.3;
  
  // Let Ball Fly
  shot = 0;
  
  // Basketball radius
  radius = 20;
  
  btn(button, "Back", window.innerWidth/2-20, 475, backButton);
}

function draw() {
  textAlign(CENTER)
  background(220);
  fill(210,180,140) 
  rect(0, 200, 600, 200)

  fill(0)
  textSize(20)
  text("Basket: " + score, 300, 35)
  fill(250, 100, 100)
  text("Shots: " + shots, 100, 35)
  fill(100, 200, 0)
  text("Streak: " + streak, 500, 35)
  textSize(17)
  text("https://editor.p5js.org/rjgilmour/sketches/uCw6P5waj", width-400, height - 50)
  
  noFill()
  stroke(0);
  strokeWeight(4);
  stroke(255,140,0);
  ellipse(xHoop,yHoop,radius*3,radius/2)
  stroke(0)
  fill(0,0,0)
  quad(xHoop + radius*3/2 - radius/5, yHoop-radius/5, xHoop + radius*3/2 + radius*0.75 - radius/5, yHoop + radius/5, xHoop + radius*3/2 + radius*0.75 - radius/5, yHoop - radius*3 + radius/5, xHoop + radius*3/2 - radius/5, yHoop - radius*3 - radius/5)
  line(xHoop + radius*3/2 + radius/10, yHoop, xHoop + radius*3/2 + radius/10,yPosition+radius)
 
  noFill()
  stroke(255)
 
  stroke(0)
  
  strokeWeight(1);
  
  
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
  
  rimX = xHoop-radius*3/2
  rimY = yHoop
  
  xBoard = xHoop + radius*3/2
  yBoard = yHoop - radius*3
  

  
  if (shot == 1){
    ySpeed = ySpeed - g;
    
    x = x + direction*xSpeed
  
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
  
  if ((rimX-x)*(rimX-x) + (rimY-y)*(rimY-y) <= radius*radius){
    speed = sqrt(xSpeed*xSpeed + ySpeed*ySpeed);
    xSpeed = -speed*(rimX-x)/radius;
    ySpeed = -speed*(rimY-y)/radius;
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
  if (textDisplay == 1 & y > yHoop & shotMade == 0){
    textSize(64);
    fill(0)
    strokeWeight(3)
    stroke(255, 0, 0)
    textAlign(CENTER)
    text("Air ball!", 300, yPosition) //unblocked shot that misses the basket, rim, net, and backboard entirely.
    noFill()
  }
  
  
  
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
        endText = "Draino!"
      }
      if (rim > 0 & aim >=2){
        endText = "Great Basket!"
      }
      if (xPosition < 75){
        endText = "Ballin'!"
      }
      if (tries > 10){
        endText = "Buzzer Beater!"
      }
      if (skyBall == 1){
        endText = "Sky Hook!"
      }
      if (tries == 1){
        endText = "First Try!"
        if (streak == 1){
          endText = "Keep it up"
        }
        if (streak == 2){
          endText = "Up the game!"
        }
        if (streak == 3){
          endText = "On Fire"
        }
        if (streak == 4){
          endText = "GOOO!"
        }
        if (streak == 5){
          endText = "Maybe pass sometimes"
        }
        if (streak == 6){
          endText = "Are you a pro"
        }
        if (streak == 7){
          endText = "You're a wizard!"
        }
        if (streak == 8){
          endText = "Ur a legend"
        }
        if (streak == 9){
          endText = "STOP. DROP. ROLL."
        }
        if (streak == 10){
          endText = "Jesus is that you!?"
        }
        if (streak == 11){
          endText = "U go hard in paint"
        }
        if (streak > 11){
          endText = "LEGEND!"
        }
        streak += 1;
      }
      else {
        streak = 0
      }
    
    }
    
    stroke(255)
    strokeWeight(4);
    line(xHoop-radius*3/4, yHoop , xHoop-radius, yHoop + 3*radius)
    line(xHoop +radius, yHoop + 3*radius, xHoop + radius*3/4, yHoop)
    line(xHoop + radius*3/4, yHoop, (xHoop - radius*3/2 + xHoop - radius)/4, yHoop+radius*3/2)
    line(xHoop - radius*3/5, yHoop, (xHoop + radius*3/6 + xHoop + radius)/8, yHoop+radius*3/4)
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
    if (mouseJustPressed == 0){
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
        mouseJustPressed = 1;
        xPosition = x
        yPosition = y
        shotMade = 0
        tries = 0
      }
      else {
        mouseJustPressed = 1;
        x = xPosition
        y = yPosition
      }
    }
    
    line(xPosition, yPosition, mouseX, mouseY)
  }
}


function mouseReleased() {
  if (mouseJustPressed == 1){
    shot = 1;
    xSpeed = -g*5*(mouseX - xPosition)/30;
    ySpeed = -g*5*(mouseY - yPosition)/30;
    mouseJustPressed = 0;
    shotMade = 0;
    shots += 1
    scoreCount = 0
    tries += 1;
    rim = 0
    aim = 0
  }
  
}

function btn(button, words, x, y, func){
  button = createButton(`${words}`);
  button.position(x, y);
  button.mousePressed(func);
}

function backButton() {
  if(getURLParams().tix!="undefined") tickets += getURLParams().tix;
  window.location.href = "./index.html?tix=" +tickets;
}


// credit to The Coding Train, How to do Basketball p5js, processing tutorial
//youtube.com/watch?v=YIKRXl3wH8Y&vl=en, https://www.youtube.com/watch?v=LO3Awjn_gyU
//https://editor.p5js.org/rjgilmour/sketches/uCw6P5waj