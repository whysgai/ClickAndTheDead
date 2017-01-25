var status = "Not started";
var clickTime = 0;
var waitDelay = 0;
var miliseconds = 0;
var arrayClicks = [];
var avgClicks = 0;
var nIntervalID;
var nIntervalID2;



function buttonSwitch(){
  $("#clickButton").toggleClass("buttonLocked buttonGo").html("GO GO GO");
}
function delayTimer () {
  $("#clickButton").html("Wait For It");
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
function calcAvg(){
  arrayClicks.push(clickTime);
  for (var i = 0; i < arrayClicks.length; i++){
    avgClicks += arrayClicks[i];
  };
  avgClicks = avgClicks/arrayClicks.length;
}
function postClicks(){
  console.log(clickTime+" miliseconds");
  $("#clickDisplay").html(clickTime+" miliseconds");
  $("#avgDisplay").html("Average: "+Math.round(avgClicks)+" miliseconds");
}
function reset(){
  clickTime = 0;
  waitDelay = Math.round(Math.random() * (2000 - 25) + 25);
  secondsLeft = 3;
  miliseconds = 0;
  avgClicks = 0;
}

$(document).ready(function(){
  reset();
  $(window).on("keydown", function(e){
    if (e.which===32 && status=="Not started") {
      status = "Running";
      delayTimer();
    }
    else if (e.which===32 && status=="Stopped") {
      reset();
      status = "Running";
      delayTimer();
    }
  });
  $("#clickButton").on("click", function(e){
    e.preventDefault;
    if (status!="Running") {
      alert("Game is not running.");
    }
    else {
      status = "Stopped";
      stop(nIntervalID2);
      calcAvg();
      postClicks();
      buttonSwitch();
    }
  });
})
