// const --> variable value won't be changed
// let --> value can be changed

// Tutorial Credit: youtube.com/watch?v=4Alop6P-jHE

var game_active = false; // boolean used to prevent being able to drop peices once game is over
var active_player = 0; // the # of current player - 1 or 2. 0 represents no active player
var gameboard = []; // define the gameboard as an array
var player_color = []; // array to hold colors for both players
player_color[1] = "red"; // player 1 is red
player_color[2] = "blue"; // player 2 is blue
var ticket1 = 0;
var ticket2 = 0;
var button1;

let tickets = 0;

function beginGame() {
  // don't want to reset game until the last one is done. If game is still active, RETURN b/c that will stop the
  // rest of the functions and the game. Since beginGame is not called as part of a different function,
  // it doesn't matter if you return true or false

  // game isn't active --> returning and ending game
  if (game_active == true) {
    return false;
  }

  // game_active was previously false, so now we're making it true and starting the game.

  game_active == true;

  ticket1 = 0;
  ticket2 = 0;
  empty();
  document.getElementById("game_info").innerHTML = "";
  document.getElementById("ticket1_info").innerHTML =
    "Player1 Tickets: " + ticket1;
  document.getElementById("ticket2_info").innerHTML =
    "Player2 Tickets: " + ticket2;
  /*
  Reset the gameboard to be all 0.  We are going to use a multi-dimensional array - so every
	section of the board will be represented by a point on the grid - X and Y (col and row).  Top left will be 
	0,0 and as it moves to the right, that will be +x and down will be +y.
	For example, the values of the board will be: 
		    | 0,0 | 0,1 | 0,2 | 0,3 | 0,4 | 0,5 | 0,6 |
				| 1,0 | 1,1 | 1,2 | 1,3 | 1,4 | 1,5 | 1,6 |
				| 2,0 | 2,1 | 2,2 | 2,3 | 2,4 | 2,5 | 2,6 |
				| 3,0 | 3,1 | 3,2 | 3,3 | 3,4 | 3,5 | 3,6 |
				| 4,0 | 4,1 | 4,2 | 4,3 | 4,4 | 4,5 | 4,6 |
				| 5,0 | 5,1 | 5,2 | 5,3 | 5,4 | 5,5 | 5,6 |
        
       row is horizontal, column is vertical
       6 rows, 7 cols
	*/
  // creating empty game board w/ 2D array
  for (var row = 0; row <= 5; row++) {
    // each row has its own array
    gameboard[row] = [];
    for (var col = 0; col <= 6; col++) {
      // each row has its own column
      // setting every value to 0
      gameboard[row][col] = 0;
    }
  }
}

function empty() {
  for (var row = 0; row <= 5; row++) {
    // each row has its own array
    gameboard[row] = [];
    for (var col = 0; col <= 6; col++) {
      // each row has its own column
      // setting every value to 0
      gameboard[row][col] = 0;
    }
  }
}

beginGame();
active_player = 1; // set the first player to go
drawBoard(); // call the function to draw the board

// will add a piece to the lowest available column
function drop(col) {
  // start from bottom of column and work your way up until you find an empty spot
  for (var row = 5; row >= 0; row--) {
    // 0 means not owned by any player / empty
    if (gameboard[row][col] == 0) {
      // set empty spot to whoever the active player is b/c it'll change to their color
      gameboard[row][col] = active_player;
      drawBoard();

      // after filling in spot, change to next player's turn
      if (active_player == 1) {
        active_player = 2;
      } else {
        active_player = 1;
      }

      // stop looking for empty spaces
      return true;
    }
  }
}

function drawBoard() {
  // can change row/col first for loop doesn't matter which comes first
  for (var col = 0; col <= 6; col++) {
    for (var row = 0; row <= 5; row++) {
      // will go through whole board and determine what 'num'/color each piece has
      // 0 = gray/empty 1 = red 2 = blue
      // if someone clicks button and wants to put in a blue piece in a gray spot, this will change it to 0 --> 2
      // and then will call the class that identifies the 2 and makes the spot blue
      document.getElementById("square_" + row + "_" + col).innerHTML =
        "<span class='piece player" + gameboard[row][col] + "'> </span>";
    }
  }
  checkForWin(); // check to see if any player has won
}

let winner = 0;
function checkForWin() {
  /* There are many ways this algorithm can be accomplished.  Basically you want to check all possibility for a win.
				Given the size of the board, checking all possibilities will not be a huge task for the computer, so I will go 
				with an easy to understand, straightforward algorithm */
  /* Ultimately there are 4 ways to win - left-to-right, diagnol up, diagnol down, and top to bottom.  This 
				function will check each of these situations twice - one for each player. */

  //check left-to-right
  //check for player 1 and 2
  for (var i = 1; i <= 2; i++) {
    //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
    for (var col = 0; col <= 3; col++) {
      for (var row = 0; row <= 5; row++) {
        //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
        if (gameboard[row][col] == i) {
          if (
            gameboard[row][col + 1] == i &&
            gameboard[row][col + 2] == i &&
            gameboard[row][col + 3] == i
          ) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }

  //check top-to-bottom
  for (var i = 1; i <= 2; i++) {
    //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
    for (col = 0; col <= 6; col++) {
      for (row = 0; row <= 2; row++) {
        //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
        if (gameboard[row][col] == i) {
          if (
            gameboard[row + 1][col] == i &&
            gameboard[row + 2][col] == i &&
            gameboard[row + 3][col] == i
          ) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }

  //check diagnol down
  for (var i = 1; i <= 2; i++) {
    //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
    for (col = 0; col <= 3; col++) {
      //we also only need to check the bottom most columns - as the win must be upwards
      for (row = 0; row <= 2; row++) {
        //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
        if (gameboard[row][col] == i) {
          if (
            gameboard[row + 1][col + 1] == i &&
            gameboard[row + 2][col + 2] == i &&
            gameboard[row + 3][col + 3] == i
          ) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }

  //check diagnol up
  for (var i = 1; i <= 2; i++) {
    //since a winning row must be 4 long, we only need to check the first 3 rows, 0,1,and 2
    for (col = 0; col <= 3; col++) {
      //we also only need to check the bottom most columns - as the win must be upwards
      for (row = 3; row <= 5; row++) {
        //check to see if the gameboard item is set to the player we are checking, if so, lets check the next 3 for a match
        if (gameboard[row][col] == i) {
          if (
            gameboard[row - 1][col + 1] == i &&
            gameboard[row - 2][col + 2] == i &&
            gameboard[row - 3][col + 3] == i
          ) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }
}

// we're giving it 'i' aka winningPlayer in checkForWin function
/* endGame will end the game - any additional functions or things you want to happen when the game is over can go here */

// drawBoard will draw the board & will update each time

// span tag is used for grouping and applying styles to inline elements
// kinda like div

function endGame(winningPlayer) {
  document.getElementById("game_info").innerHTML =
    "Winner is Player " + winningPlayer + "!"; //set the "game_info" to the winner and the winning player
  if (winningPlayer == 1) ticket1 += 1;
  else ticket2 += 1;
  document.getElementById("ticket1_info").innerHTML =
    "Player1 Tickets: " + ticket1;
  document.getElementById("ticket2_info").innerHTML =
    "Player2 Tickets: " + ticket2;
  game_active = false; //set the "game_active" to false, so that it can be started again.
  // beginGame();
  empty();
}

function backButton() {
  // if(getURLParams().tix!="undefined") tickets += Number(getURLParams().tix);
  window.location.href = "./index.html";
}
