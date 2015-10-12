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
		ret = endTime.getTime() - tempTime.getTime();
	ret = Math.round(ret / 1000);
	return (ret > 0)? ret : 0;
}
