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
let xRim, yRim
let xBoard, yBoard 



function setup() {
  createCanvas(600, 600); //basketball field 
  
  // Starting position of the ball
  xPosition = 50;
  yPosition = 325;
  
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

  
  // Initialize variables x and y to ball start position
  // x and y are the screen coordinates of the ball---makes easier
  x = xPosition;
  y = yPosition;
  
  // Hoop location
  xHoop = 500
  yHoop = 150
  
  
  direction=1;
  xSpeed = 0.3; 
  
  ySpeed = -9;
  
  speed = sqrt(xSpeed*xSpeed + ySpeed*ySpeed);
  
  g = - 0.3;
  
  //  Ball Fly
  shot = 0;
  
  // Basketball radius
  radius = 20;

}

function draw() {
  textAlign(CENTER)
  background(220);
  fill(210,180,140) // This is color of rect below
  rect(0, 200, 600, 200) // (x, y, width, height)

  fill(0)
  textSize(20)
  text("Basket: " + score, 300, 35)
  fill(250, 100, 100)
  text("Shots: " + shots, 100, 35)
  fill(100, 200, 0)
  text("Streak: " + streak, 500, 35)
  
    

  
  // Hoop is an ellipse and some lines for the net
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
  
  xRim = xHoop-radius*3/2
  yRim = yHoop
  
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
  
  if ((xRim-x)*(xRim-x) + (yRim-y)*(xRim-y) <= radius*radius){
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
  
  if (rim > 7){
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
  
  
  // Draw the circle last!!!
  fill(230,105,0)
  stroke(0)
  strokeWeight(1)
  circle(x, y, radius*2)  
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
        endText = "Buckets!"
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
          endText = "Heatin' up!"
        }
        if (streak == 2){
          endText = "On Fire!"
        }
        if (streak == 3){
          endText = "Respect..."
        }
        if (streak == 4){
          endText = "Wet!"
        }
        if (streak == 5){
          endText = "Maybe pass sometimes"
        }
        if (streak == 6){
          endText = "LeBron is that you!?"
        }
        if (streak == 7){
          endText = "You're a wizard Harry!"
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
          endText = "LEGEND STATUS!"
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
    line(xHoop + radius*3/4, yHoop, (xHoop - radius*3/4 + xHoop - radius)/4, yHoop+radius*3/4)
    line(xHoop - radius*3/4, yHoop, (xHoop + radius*3/4 + xHoop + radius)/4, yHoop+radius*3/4)
    line((xHoop - radius*3/4 + xHoop - radius)/4, yHoop+radius*3/4, xHoop +radius, yHoop + 3*radius)
    line((xHoop + radius*3/4 + xHoop + radius)/4, yHoop+radius*3/4, xHoop -radius, yHoop + 3*radius)
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
    shot += 1
    scoreCount = 0
    tries += 1;
    rim = 0
    aim = 0
  }
  
}

//BasketBall Terms
/*Air Ball: The ball misses the hoop and backboard entirely.
Alley-oop: A high arc pass to a teammate in a position near the basket to leap and score.
Alternating-possession rule: A rule in which teams take turns possessing the ball after stopped plays.
Assist: A pass that sets up a score.
Backboard: The surface to which the basket is mounted.
Back Court: Area of the court farthest from the offensive team's goal.
Back Door Cut: A player approaches quickly from behind a defender toward the basket.
Back Screen: An offensive player moves away from the basket to set a screen for teammate.
Ball Fake: To fake a pass or shot.
Bang the Boards: An aggressive rebound.
Bank Shot: The ball bounces off the backboard and into the basket.
Baselines: Also known as "end lines", the boundary lines extending across both ends of the court behind the baskets.
Baseline Pass: A player passes the ball single-handedly to a cutter advancing toward the basket.
Basket: The scoring goal attached to the backboard and is comprised of a metal rim from which a corded net hangs.
Behind-the-back Dribble: A dribble from one hand to the other behind the back.
Behind-the-back Pass: A pass made behind the body.
Between the Legs Dribble: A dribble between the legs from one hand to the other.
Blocked Shot: A shot deflected on its way to the basket.
Blocking: Using the body to block an opponent.
Bonus Free-throw: Also called "one-on-one"; a free-throw awarded a team whose opponent exceeds the number of fouls allowed in a half.
Bounce Pass: A pass is deflected off the floor before being received by a team player.
Box Out: In an attempt to block an opponent and set up rebound opportunities, a defense player gets between a teammate and the basket.
Carrying the Ball: Also called "palming"; an illegal dribbling of the ball with both hands at the same time, turning the ball over in your hands, or placing the hands underneath the ball as if holding or carrying it.
Catch and Face: Catching a pass and turning directly toward the basket before taking a shot.
Center: In position near the basket to capture rebounds and block shots.
Change of Pace Dribble: Slowing down and speeding up dribble to get past an opponent.
Charging: An offensive player fouls by illegally contacting a stationary defense player.
Chest Pass: A chest-to-chest pass with both hands.
Chin it: After receiving a rebound, the ball is under the chin with elbows and fingers pointing up.
Clear Out: To make room for the ball handler.
Control Dribble: A closely guarded low dribble.
Controlling the Boards: Otherwise known as "banging the boards"; controlling most of the rebounds.
Conversion: A dunked free-throw.
Court: The floor upon which the game of basketball is played.
Crossover Dribble: A front-of-the-body dribble from one hand to the other.
Cross Screen: A lateral advance to set up a screen.
Crossover Step: A jab step, then a step in the opposite direction.
Curl Cut: Used when the defender is behind the cutter, an offensive player cuts off a screen and heads toward the basket.
Cut: A quick advance by the offense toward a position to shoot or receive the ball.
Cylinder: The closely guarded circular area above the basket.
Dead Ball: A ball that is not "alive" or in play.
Defense: The team not in possession of the ball.
Defense Rebound: Rebound by the defense player.
Double Dribble: The illegal act of dribbling, stopping, then dribbling again.
Double Team: Two teammates move in to guard one offensive player.
Down Court: Moving from the back court toward the offensive basket.
Down Screen: An offensive player moves toward the baseline to set a screen.
Dribble: Bouncing the ball off the floor with one hand.
Drive: A brisk advance toward the basket with the aim of shooting.
Dunk: Slamming the ball into the basket.
Elbow: Illegal contact with the elbow by an opponent.
End Lines: Otherwise known as "baselines"; the lines that run the width of the court behind the baskets.
Fake: A deceptive move by the offense in order to offset the defense.
Fast Break: A rush down court to beat the opponent to the basket.
Field Goal: A basket made while the ball is in play.
Fishhook Cut: Quickly changing direction.
Five-second Violation: Taking longer than five seconds to pass the ball inbounds to a teammate.
Forwards: Players positioned along the free-throw lane and who are generally closer to the basket than the guards.
Flagrant Foul: Excessive or aggressive contact with an opponent.
Floor Violation: See Violation.
Floor: The court area bordered by end-lines and sidelines.
Foul: An illegal play other than a floor violation.
Foul Line: The line 15 feet in front of the backboard paralleling the end-line from which free-throws are shot.
Free-throw: A free shot taken from the foul line awarded a player whose opponent committed a foul.
Free-throw Lane: Also called "the key", the area designated for free-throws 12 feet wide and running from the baseline to the free-throw line.
Free-throw Line: The foul line.
Foul Trouble: A player runs up too many fouls in one game.
Front Court: The offensive area running from mid-court to the end-line.
Full-court Press: Opponents are guarded over the full range of the court.
Goal-tending: Intercepting a shot that is either in the basket, or directly above it.
Guard: To closely watch an opponent with intent to keep the player from gaining possession of the ball, or from making a pass or shot.
Half Court Press: Defense pressure placed on the opponent in the front court area.
Hash Mark: The mid-court mark.
Hand Check: A defender fouls by touching the opposing ball handler with one or both hands too many times.
Held Ball: Two opposing players attempt but fail to possess the ball.
Help Side: Otherwise known as "weak side"; the half of the court absent the ball.
High Post: The area near the free-throw line.
Holding: Use of the hands to hinder an opponent's freedom of movement.
Hook Shot: While standing sideways in front of the basket, the hand farthest from the net tosses the ball above the head and toward the basket.
Hoop: Another word for basket.
Inbounds Pass: A toss of the ball inbounds from out-of-bounds.
Incidental Contact: Normal, legal contact between players.
Inside Cut: An offensive player passes the ball to a teammate and then quickly advances toward the basket in order to receive a return pass.
Inside Shot: A shot from beside or in front of the basket.
Intentional Foul: A defense player fouls in order to stop the clock.
In the Paint: Refers to the area within the free-throw lane that is painted a different color than the rest of the court.
Jab Step: Small sharp step with the non-pivot foot toward the defense player.
Jump Ball: The ball tossed into the air by the referee between two opposing players in order to start the game.
Jump Shot: A shot in which an offensive player's feet leave the floor.
Jump Stop: Jumping off of one foot, and returning on both feet at the same time in a parallel or staggered position.
Key: The free-throw and foul lane area of the court.
"L" Cut: An L-shaped cut sometimes used when a defender is in the passing lane.
Lane: Also called the "paint"; area extending from the end line to the free-throw line and 12 feet across.
Lane Violation: Moving into the lane in an attempt to intercept a possible rebound on a foul shot before the ball actually hits the rim.
Lay-up: Advancing close to the basket in an effort to bank a shot off the backboard.
Live Ball: A ball in play.
Loading the Gun: Preparing to shoot with a cock of the wrist.
Low Post: The area close to the basket.
Man-to-man Defense: One-on-one guarding of opponents.
Mid-court Line: The center line dividing the front from the back courts.
Net: The corded mesh that hangs 15-18 inches from the basket's rim.
Offense: The team in possession of the ball.
Off the Dribble: Shooting the ball while advancing toward the basket.
Offensive Rebound: A rebound taken by an offensive player.
One-and-one: A bonus free-throw is awarded when the opponent accumulates too many fouls in a half; the free-thrower takes a shot and if a basket is made, gets a second free- throw.
Open: When a defender is unguarded he is said to be "open".
Out-of-Bounds: Outside the end lines and sidelines.
Outlet Pass: A rebounder passes the ball to an offensive teammate.
Over-and-back Violation: An offensive teammate returns a ball from the front court to the back court.
Overhand lay-up Shot: With the palm facing the basket, the shooting hand is positioned on the back of the ball.
Overhead Pass: A two-handed overhead shot.
Overtime: Extra time given a tied regulation game.
Paint: The free-throw lane area.
Palming: Another word for "carrying the ball".
Pass: A play from one teammate to another.
Period: A segment of game time; either quarter, half, or overtime.
Perimeter: The part of the court that extends beyond the foul circle.
Personal Foul: Contacting a player in a way that may injure him.
Pick: An offensive player sets up a screen.
Pivot: The center position; also the foot that remains stationary until a dribbler passes the ball.
Player-to-player Defense: Defense strategy in which each player is assigned an opponent to guard; also called "man-to-man defense".
Point Guard: A strategy in which a guard advances the ball up court to begin an offensive play.
Possession: To have the ball.
Post: The space on both sides of the free-throw lane.
Post Up: To be in a position near, but facing away from, the basket in order to receive a pass.
Power Forward: A strong player positioned close to the basket.
Power Layup Shot: A closely-guarded layup shot.
Press: Defense strategy with intent to force opponents into erring by guarding them too closely.
Pull-back Dribble: Pulling dribble away from the defense as a way to avert pressure.
Push Pass: A strategy used to get past a defender guarding too closely.
Quadruple Double: A player earns two-digit figures in four out of five offensive categories during a single game.
Rebound: Gaining possession of the ball after it bounces off the backboard or rim on a missed shot.
Reverse Dribble: Otherwise known as "spin dribble" and is used to reverse direction of the ball.
Reverse Pivot: Turning on the pivot foot while taking a step back.
Rocker Step: A jab step followed by a step back in preparation for shooting or driving the ball.
Screen: A offense player is positioned between a teammate and the opponent to clear the way for the teammate's shot at the basket.
Shot: To throw the ball toward the basket.
Shot Clock: A device that keeps track of the limited time the team in possession of the ball has to take a shot at the basket.
Shooter: The ball handler who takes aim at the basket.
Shooting Guard: The player who generally takes most of the shots from the perimeter.
Sidelines: The boundary lines that run the length of the court on either side.
Small Forward: The smaller of the players positioned near the free-throw lane who moves inside and out.
Spacing: The space between offensive players, generally 15-18 feet.
Squaring Up: Standing shoulder-square in front of the basket when preparing to shoot the ball.
Starting Lineup: The five players that begin the game.
Stride Stop: Stopping on one foot, and then the other.
Strong Side: The side of the court containing the live ball.
Substitute: A player comes in to replace a teammate on the court.
Swing-man: One who plays both guard and forward.
Team Fouls: The number of fouls that a team has against it before going over the limit and its opponent is awarded a free-throw.
Technical Foul: A foul called as a result of misconduct in which the opponent is awarded a free-throw.
Ten-second Lane: The offensive team has 10 seconds to advance the ball from the back court area over the mid-court line, or "ten-second lane".
Three-point Field Goal: A basket shot from a distance of more than 19'/9" during a high school or college game.
Three-point Play: Two points on a field goal immediately followed by a free-throw point.
Three-point Shot: From outside the three-point line, an attempt at earning a field goal is made.
Three-second Lane: Otherwise known as the "key", the area running from the baseline underneath the basket to the free-throw lane.
Three-second Violation: An offensive player is in the free-throw lane for longer than three seconds.
Timeout: An official temporarily suspends the game due to injury, or to allow the team to discuss strategy.
Tip Off: The jump that starts the game.
Top-of-the-key: The arc that runs beyond the free-throw lane.
Transition: A team switches from offense to defense, and visa versa.
Trap: Two defense players team up on the ball handler.
Traveling: Also known as "walking"; a violation in which the ball handler takes fewer than two steps without dribbling, or holds the ball while changing or moving the pivot foot.
Triple-double: A player achieves double figures in three out of five offensive categories.
Turnover: The offensive team gives the ball up to defense.
Underhand lay-up Shot: With the palm underneath and facing up, a player shoots the ball.
Up-court: The offense advances from down court to front court in the direction of the basket.
"V"-cut: Switching quickly from one direction to the other in order to get a shot.
Violation: Breaking of a rule not resulting in a free-throw, but rather a throw-in.
Walking: See Traveling.
Weak Side: The side of the court absent the live ball.
Zone Defense: A defender carefully guards an area.*/
