var curPlayer;
var started;
var board;
var emptyCells;

startGame();

function startGame() {
  curPlayer = "X";
  started = false;
  board = [[null, null, null],[null, null, null],[null, null, null]];
  emptyCells = 9;

  $(".tile").on("click.gameSpace", function() {
    if(!started){
      started = true;
      $(".display").css("visibility","hidden");
    }
    animateButton(this.id);
    var clickedCell = board[this.id[1]][this.id[2]];
    if(!clickedCell) {
      emptyCells--;
      if(emptyCells===0) {
        announceWinner(null,".tile");
      }
      board[this.id[1]][this.id[2]] = curPlayer;
      this.innerHTML = "<h1 class='mark'>"+curPlayer+"</h1>";
      var playerColor = (curPlayer==="X") ? "#C70039" : "#6930C3";
      $("#"+this.id).css("color", playerColor);
      if(curPlayer==="X")
        curPlayer = "O";
      else
        curPlayer = "X";
    }
    validateBoard();
  });

}


function validateBoard() {
  for(var i=0;i<3;i++) {
    if(board[i][0]!==null && board[i][0]===board[i][1] && board[i][1]===board[i][2]) {
      announceWinner(board[i][0], ".row"+i);
      return;
    }
  }
  for(var j=0;j<3;j++) {
    if(board[0][j]!==null && board[0][j]===board[1][j] && board[1][j]===board[2][j]) {
      announceWinner(board[0][j], ".col"+j);
      return;
    }
  }
  if(board[0][0]!==null && board[0][0]===board[1][1] && board[1][1]===board[2][2]) {
    announceWinner(board[0][0],  ".diagonal1");
    return;
  }
  if(board[2][0]!==null && board[2][0]===board[1][1] && board[1][1]===board[0][2]) {
    announceWinner(board[2][0], ".diagonal2");
    return;
  }
}


function clearBoard() {
  $(".tile").html("");
}

function announceWinner(winner, highlightArea) {
  $(".display").css("visibility","");
  if(!winner){
    $(".display").text("Game Over, nobody won! Press any key to restart the game!");

    playAudio("./sounds/failure.mp3");
    for(var i=0;i<5;i++){
      $(".display").fadeOut(400).fadeIn(400);
      $(highlightArea+" h1").fadeOut(400).fadeIn(400);
    }
  }
  else {
    if(winner==="X"){
      $(".display").text("Player 1 won! Press any key to restart the game!");
    }
    else {
      $(".display").text("Player 2 won! Press any key to restart the game!");
    }

    playAudio("./sounds/success.mp3");
    for(var i=0;i<5;i++){
      $(".display").fadeOut(400).fadeIn(400);
      $(highlightArea+" h1").fadeOut(400).fadeIn(400);
    }
  }
  // $(".display").

  $(".tile").off("click.gameSpace");

  $("body").on("keydown", function() {
    $("body").off("keydown");
    $(".display").text("Click on any tile to start the game.");
    clearBoard();

    startGame();
  });
}


function animateButton(button) {
  $("#"+button).addClass("pressed");
  setTimeout(function(){
    $("#"+button).removeClass("pressed");
  },100);
}


function playAudio(audioPath) {
  var audio = new Audio(audioPath);
  audio.play();
}



// function Cell(row, col, val) {
//   this.value = val;
//   this.row = row;
//   this.col = col;
// }
