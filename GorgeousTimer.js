var windowWidth = 1024,
	windowHeight = 768,
	marginTop = 60,
	marginLeft = 30,
	radius = 8;

var endTime = new Date(2015, 9, 13, 0, 0, 0),
	curTime = 0;

window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");
	canvas.width = windowWidth;
	canvas.height = windowHeight;
	curTime = getCurTime();
	// console.log(curTime);
}

function getCurTime(){
	var tempTime = new Date(),
		rest = endTime.getTime() - tempTime.getTime();
	rest = Math.round(ret / 1000);
	return (rest > 0)? rest : 0;
}