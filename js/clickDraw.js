var status = "Not started";
var clickTime = 0;
var waitDelay = Math.round(Math.random() * (2000 - 25) + 25);
var secondsLeft = 3;
var miliseconds = 0;
var nIntervalID;
var nIntervalID2;

function buttonSwitch(){
  $("#clickButton").toggleClass("buttonLocked buttonGo");
}
function countdownPost (secondsLeft){
  console.log("Called timer: "+ secondsLeft);
  $(".seconds").html(secondsLeft);
}
function countdownStart () {
  nIntervalID = setInterval(function(){
    console.log("CountDown INTERVAL GO");
    countdownPost(secondsLeft);
    if (secondsLeft == 0){
      stop(nIntervalID);
      $(".seconds").html("GO!");
      $(".smalltext").html("");
      delayTimer();
    }
    else {
      secondsLeft--;
    }
  },1000);
}

function delayTimer () {
  nIntervalID = setInterval(function(){
    console.log("DelayTimer INTERVAL GO");
    if (miliseconds == waitDelay){
      clickTimer();
      buttonSwitch();
      stop(nIntervalID);
    }
    else {
      miliseconds++;
      console.log("waitDelay is "+waitDelay);
      console.log("ms left "+miliseconds);
    }
  });
}
function clickTimer () {
  console.log("Start Click Timer");
  nIntervalID2 = setInterval(function(){
      clickTime++;
  });
}
function stop (intVar) {
  clearInterval(intVar);
}
function postClicks(){
  console.log(clickTime+" miliseconds");
  $("#clickDisplay").html(clickTime+" miliseconds");
}
$(document).ready(function(){
  $(window).on("keydown", function(e){
    if (e.which===32 && (status=="Not started" || status == "Paused")){
      status = "Running";
      countdownStart();

    }
  });
  $("#clickButton").on("click", function(e){
    e.preventDefault;
    stop(nIntervalID2);
    postClicks();
    buttonSwitch();
  });
})
