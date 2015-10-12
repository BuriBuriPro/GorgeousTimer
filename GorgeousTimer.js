var windowWidth = 1024,
	windowHeight = 600,
	marginTop = 60,
	marginLeft = 30,
	radius = 8;
const pi = Math.PI;

var endTime = new Date(2015, 9, 13, 0, 0, 0),
	curTime = 0;

window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");
	canvas.width = windowWidth;
	canvas.height = windowHeight;
	curTime = getCurTime();
	
	render(context);
}

function getCurTime(){
	var tempTime = new Date(),
		rest = endTime.getTime() - tempTime.getTime();
	rest = Math.round(rest / 1000);
	return (rest > 0)? rest : 0;
}
function render(cxt){
	// get the numbers of hour, minute, second
	var hour = parseInt(curTime / 3600),
		minute = parseInt((curTime - hour * 3600) / 60),
		second = curTime % 60;
	// hour
	renderNumber(marginLeft, marginTop, parseInt(hour / 10), cxt);
	renderNumber(marginLeft + 15 * (radius + 1), marginTop, parseInt(hour % 10), cxt);
	// colon
	renderNumber(marginLeft + 30 * (radius + 1), marginTop, 10, cxt);
	// minute
	renderNumber(marginLeft + 39 * (radius + 1), marginTop, parseInt(minute / 10), cxt);
	renderNumber(marginLeft + 54 * (radius + 1), marginTop, parseInt(minute % 10), cxt);
	// colon
	renderNumber(marginLeft + 69 * (radius + 1), marginTop, 10, cxt);
	// second
	renderNumber(marginLeft + 78 * (radius + 1), marginTop, parseInt(second / 10), cxt);
	renderNumber(marginLeft + 93 * (radius + 1), marginTop, parseInt(second % 10), cxt);
}
function renderNumber(x, y, num, cxt){
	var i, j;
	cxt.fillStyle = "blue";
	for(i = 0; i < digit[num].length; i ++)
		for(j = 0; j < digit[num][i].length; j ++){
			if(digit[num][i][j] === 1){
				cxt.beginPath();
				cxt.arc(x + j * 2 * (radius + 1) + radius + 1, y + i * 2 * (radius + 1) + radius + 1, radius, 0, 2 * pi);
				cxt.fill();
				cxt.closePath();
			}
		}	
}