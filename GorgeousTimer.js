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
	posY = marginTop,
	balls = [],
	colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

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
	if(curTime != nextTime){
		// judge which numbers changed
		// changed numbers are transformed into balls
		// hour
		if(parseInt(curHour / 10) != parseInt(nextHour / 10)){
			addBalls(hourFirstX, posY, parseInt(nextHour / 10));
		}
		if(parseInt(curHour % 10) != parseInt(nextHour % 10)){
			addBalls(hourSecondX, posY, parseInt(nextHour % 10));
		}
		// minute
		if(parseInt(curMinute / 10) != parseInt(nextMinute / 10)){
			addBalls(minuteFirstX, posY, parseInt(nextMinute / 10));
		}
		if(parseInt(curMinute % 10) != parseInt(nextMinute % 10)){
			addBalls(minuteSecondX, posY, parseInt(nextMinute % 10));
		}
		// second
		if(parseInt(curSecond / 10) != parseInt(nextSecond / 10)){
			addBalls(secondFirstX, posY, parseInt(nextSecond / 10));
		}
		if(parseInt(curSecond % 10) != parseInt(nextSecond % 10)){
			addBalls(secondSecondX, posY, parseInt(nextSecond % 10));
		}
	curTime = nextTime;
	}
	updateBalls();
}
function addBalls(x, y, num){
	var i, j;
	for(i = 0; i < digit[num].length; i ++)
		for(j = 0; j < digit[num][i].length; j ++){
			if(digit[num][i][j] == 1){
				var ball = {
					x: j * 2 * (radius + 1),
					y: i * 2 * (radius + 1),
					// use random to set the params
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 8,
					vy: -3,
					color: colors[Math.floor(Math.random() * colors.length)]
				};
				balls.push(ball);				
			}
		}
}
function updateBalls(){
	var i;
	for(i = 0; i < balls.length; i ++){
		// move the balls and add the speed
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		// detect collision
		if(balls[i].x + radius > 0 || balls[i].x - radius < windowHeight){
			// slow down the speed
			balls[i].vy = - balls[i].vy * 0.75;
		}
	}
}