var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100);
  playSound(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100);

  level++;
  $("h1").text("Level "+level);
}

$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(sound) {
  var audio = new Audio("sounds/"+sound+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() { $("."+currentColour).removeClass("pressed"); }, 100);
}

$("body").keypress(function() {
  if(!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
})

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(currentLevel === (gamePattern.length-1)) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  }
  else {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gameStarted = false;
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
}
