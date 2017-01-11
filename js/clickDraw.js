var status = "Not started";
var clicks = 0;
var secondsLeft = 3;
var nIntervalID;

function clicking(){
  if(status=="Running"){
    clicks++;
  }
  else {
    alert("Game is not running.");
  }
}
function buttonSwitch(){
  $("#clickButton").toggleClass("buttonLocked buttonGo");
}
function timer (secondsLeft){
  console.log("Called timer: "+ secondsLeft);
  $(".seconds").html(secondsLeft);
}
function clockStart () {
  nIntervalID = setInterval(function(){
    console.log("SET INTERVAL GO");
    timer(secondsLeft);
    if (secondsLeft == 0){
      clockStop();
      $(".seconds").html("GO!");
      $(".smalltext").html("");
    }
    else {
      secondsLeft--;
    }
  },1000);
}
function clockStop () {
  clearInterval(nIntervalID);
}
function postClicks(){
  $("#clickDisplay").html(clicks+" clicks per minute");
}


$(document).ready(function(){
  $(window).on("keydown", function(e){
    if (e.which===32 && (status=="Not started" || status == "Paused")){
      status = "Running";
      buttonSwitch();
      clockStart();
    }
    else if (e.which===32 && status=="Running") {
      status = "Paused";
      buttonSwitch();
    }
  });
  $("#clickButton").on("click", function(e){
    e.preventDefault;
    clicking()
  });
})
