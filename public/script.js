Pusher.logToConsole = true;

      var pusher = new Pusher('405826115758c772ee2a', {
        cluster: 'eu',
        forceTLS: true
      });

      var channel = pusher.subscribe('my-channel');


var btn = document.getElementById("btnRaise");
  btn.onclick = function raise(){
    updateTime();
    updatePrice(500);
  }

basePrice = parseInt(document.getElementById("price").innerHTML);


function updatePrice(dollars){
	basePrice += dollars;
	document.getElementById("price").innerHTML = basePrice;
}

var currentTimer = document.getElementById("time").innerHTML;

startTimer();
function startTimer(){
	var arr = currentTimer.split(':');
	var minutes = arr[0];
	var seconds = arr[1];
	if (minutes == 0 && seconds == 0){
		alert("Your time left");
        btn.disabled = true;
		return;
	}
	else seconds -= 1;
	currentTimer = formatTime(minutes) + ":" + formatTime(seconds);
	document.getElementById("time").innerHTML = currentTimer;
	setTimeout(startTimer, 1000);
}

function formatTime(time){
	time = Number.parseInt(time);
	if (time < 10) return "0" + time
	else return time
}

function updateTime() {
	currentTimer = "00:50";
}