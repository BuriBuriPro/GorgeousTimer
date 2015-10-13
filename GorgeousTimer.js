var windowWidth = 1024,
	windowHeight = 600,
	marginTop = 60,
	marginLeft = 30,
	radius = 8;
const pi = Math.PI;

var endTime = new Date(2015, 9, 13, 24, 0, 0),
	curTime = 0,
	curHour = 0,
	curMinute = 0,
	curSecond = 0,
	hourFirstX = marginLeft,
	hourSecondX = marginLeft + 15 * (radius + 1),	
	minuteFirstX = marginLeft + 39 * (radius + 1),
	minuteSecondX = marginLeft + 54 * (radius + 1),
	secondFirstX = marginLeft + 78 * (radius + 1),
	secondSecondX = marginLeft + 93 * (radius + 1),
	posY = marginTop;

window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");
	canvas.width = windowWidth;
	canvas.height = windowHeight;
	curTime = getCurTime();
	setInterval(function(){
	render(context);
	update();
 	}, 50);
}

function getCurTime(){
	var tempTime = new Date(),
		rest = endTime.getTime() - tempTime.getTime();
	rest = Math.round(rest / 1000);
	return (rest > 0)? rest : 0;
}
function render(cxt){
	// clean the whole canvas
	cxt.clearRect(0, 0, windowWidth, windowHeight);
	// get the numbers of hour, minute, second
	curHour = parseInt(curTime / 3600);
	curMinute = parseInt((curTime - curHour * 3600) / 60);
	curSecond = curTime % 60;
	// hour
	renderNumber(hourFirstX, posY, parseInt(curHour / 10), cxt);
	renderNumber(hourSecondX, posY, parseInt(curHour % 10), cxt);
	// colon
	renderNumber(marginLeft + 30 * (radius + 1), posY, 10, cxt);
	// minute
	renderNumber(minuteFirstX, posY, parseInt(curMinute / 10), cxt);
	renderNumber(minuteSecondX, posY, parseInt(curMinute % 10), cxt);
	// colon
	renderNumber(marginLeft + 69 * (radius + 1), posY, 10, cxt);
	// second
	renderNumber(secondFirstX, posY, parseInt(curSecond / 10), cxt);
	renderNumber(secondSecondX, posY, parseInt(curSecond % 10), cxt);
}
function renderNumber(x, y, num, cxt){
	var i, j;
	cxt.fillStyle = "rgb(0, 102, 153)";
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
function update(){
	// change to the number of timer
	var nextTime = getCurTime(),
		nextHour = parseInt(nextTime / 3600);
		nextMinute = parseInt((nextTime - nextHour * 3600) / 60);
		nextSecond = nextTime % 60;
	// judge which numbers changed
	// changed numbers are transformed into balls
	// if(parseInt(curHour / 10) != parseInt(nextHour / 10)){
	// 	addBalls()
	// }
	curTime = nextTime;
}