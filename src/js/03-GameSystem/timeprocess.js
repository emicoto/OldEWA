
function gettimezone(h) {
	switch(true){
		case select(2,3,4)(h):
			return "凌晨";
		case select(5,6,7)(h):
			return "黎明";
		case select(8,9,10)(h):
			return "上午";
		case select(11,12,13)(h):
			return "中午";
		case select(14,15,16)(h):
			return "下午";
		case select(17,18,19)(h):
			return "傍晚";			
		case select(20,21,22)(h):
			return "晚上";			
		case select(23,0,1)(h):
			return "深夜";
	};
}
F.gettimezone = gettimezone

function timeprocess() {
	var time = V.date.time;
	var day = V.date.day;
	var week = V.date.week;
	var month = V.date.month;
	var year = V.date.year;
	var min,hour,zone,weekday;


	/* 时间的处理 */
	if (time < 0) time = 0;

		min = time % 60;
		hour = Math.floor(time/60);

	if (time >= 1440) time -= 1440;

	if (hour > 23){
		day += Math.floor(hour/24);
		V.days += Math.floor(hour/24);

		week = week + Math.floor(hour/24);
		hour = hour % 24;
		V.daychange = true
	};

	zone = gettimezone(hour);

	/* 周的处理 */
	week = week%7;
	switch(week){
		case 0:
			weekday = "周日";
			break;
		case 1:
			weekday = "周一";
			break;
		case 2:
			weekday = "周二";
			break;
		case 3:
			weekday = "周三";
			break;
		case 4:
			weekday = "周四";
			break;
		case 5:
			weekday = "周五";
			break;
		case 6:
			weekday = "周六";
			break;
	};

	/* 月的处理，每月固定30天 */
	while(day > 30){
		month = month + 1;
		day = Math.max(day-30,1);
	};

	/* 年的处理 */
	if (month>12){
		year = year+Math.floor(month/12);
		month = Math.max(month%12,1);
	};

	V.date.time = time;
	V.date.min = min;
	V.date.hour = hour;

	V.date.zone = zone;
	V.date.weekday = weekday;

	V.date.day = day;
	V.date.week = week;
	V.date.month = month;
	V.date.year = year;

	return ""
}
window.timeprocess = timeprocess
F.timeprocess = timeprocess
DefineMacroS("timeprocess",timeprocess)

Macro.add('time', {
	handler: function () {
		var time = V.date.time;
		var min, hour, zone;

		if (time < 0) time = 0;

		if (time >= 24*60 ) time = 23*59+59;

		hour = Math.floor(time/60);
		min = time%60;

		zone = gettimezone(hour)

		V.date.min = min
		V.date.hour = hour
		V.date.zone = zone
	}
});

window.dailyMultiple = function(){
	let t = V.passtime - V.wakeuptime
	if(t/60 >= 4){
		return Math.floor(Math.pow(1.1,(t/60 - 4))*1000)/1000
	}
	else return 1;
}

function daychange(){

	V.daychange = false
	return ""
}

function passtime(t,mode){
	V.passtime += t  // 睡醒后的累计经过时间。只有进行睡眠休息时才会清除

	/* 经过时间加到现在时间前的处理 */
	let m = dailyMultiple()
	let hungry = Math.floor((1.3*t*m)*100)/100
	let sleepy = Math.floor((1.3*t*m)*100)/100


	/* 天气变化  累计的时间满3个小时或者一次经过3小时以上就换个天气，然后清零。 没满就*/
	if(V.timestock >= 180 || t >= 180){ weather(); V.timestock = 0;}
	else V.timestock += t;


	/* 把经过时间加到现在时间去 */
	V.date.time += t
	
	/* 时间经过处理 */
	timeprocess()

	/* 日期变更时的处理 */
	if(V.daychange)daychange();

}

