import "./styles.css";

var possibleWins = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20]
];

var countX = 0;
var countO = 0;
var seconds = 10;
//var movesMade = 0;
//var playerTurn = parseInt(prompt("Are you player 1 or 2?", "Type 1 or 2"), 10);
var playerTurn = 1;
var tid = setInterval(timer, 1000);

function changeValue(tdID) {
  var square = document.getElementById(tdID).innerHTML;
  if (square === "X" || square === "O") {
    alert("Already taken! Pick another one.");
  } else {
    if (playerTurn === 1) {
      const att = document.createAttribute("class");
      att.value = "p1";
      document.getElementById(tdID).setAttributeNode(att);
      document.getElementById(tdID).innerHTML = "X";
      playerTurn++;
      //movesMade++;
      isGameOver();
      resetTimer();
    } else {
      if (playerTurn === 2) {
        const att = document.createAttribute("class");
        att.value = "p2";
        document.getElementById(tdID).setAttributeNode(att);
        document.getElementById(tdID).innerHTML = "O";
        playerTurn--;
        //movesMade++;
        isGameOver();
        resetTimer();
      }
    }
  }
}
window.changeValue = changeValue; //calling made possible from HTML

function isGameOver() {
  for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 5; j++) {
      var square = document.getElementById(possibleWins[i][j]).innerHTML;
      if (square === "X") {
        countX++;
      }
      if (square === "O") {
        countO++;
      }
    }
    if (countX === 5) {
      alert("Player 1 wins!");
      //alert("Game is over, new game initializing...");
      newGame();
      break;
    }
    if (countO === 5) {
      alert("Player 2 wins!");
      //alert("Game is over, new game initializing...");
      newGame();
      break;
    } else {
      countX = 0;
      countO = 0;
      //checkForDraw();
    }
  }
}
/*
function checkForDraw() {
  for (var i = 0; i < 25; i++) {
    if (document.getElementById(i).innerHTML === "") {
      movesMade = 0;
      break;
    } else {
      movesMade++;
    }
  }
  alert(movesMade);
  if (movesMade === 24) {
    alert("Draw!");
    alert("Game is over, new game initializing...");
    newGame();
  } else {
    movesMade = 0;
  }
}
*/
function newGame() {
  for (var i = 0; i < 25; i++) {
    document.getElementById(i).innerHTML = "";
    const att = document.createAttribute("class");
    att.value = "";
    document.getElementById(i).setAttributeNode(att);
  }

  countX = 0;
  countO = 0;
  //movesMade = 0;
  //playerTurn = parseInt(prompt("Are you player 1 or 2?", "Type 1 or 2"), 10);
}

function resetTimer() {
  abortTimer();
  seconds = 10;
  tid = setInterval(timer, 1000);
}

function timer() {
  var element = document.getElementById("status");
  element.innerHTML = "Player " + playerTurn + " has " + seconds + " seconds";
  if (seconds < 1) {
    //abortTimer();
    if (playerTurn === 1) {
      playerTurn++;
      seconds = 10;
    } else {
      playerTurn--;
      seconds = 10;
    }
  }
  seconds--;
}

function abortTimer() {
  clearInterval(tid);
}
