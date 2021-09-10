

window.testpt = function(t){
	V.times.passed += t
	let m =dailyMultip()

	let sleepy = fixfloat((0.1*t*m*SanMultip()),4)
	let desired = fixfloat((((V.PC.genital > 5 ? 0.03 : 0.02)+(PC.base.理智[0]<= 0 ? 0.2 : 0)-(PC.base.体力[0] <= PC.base.体力[1]/10 ? 0.15: 0))*t*DesireMultip()),4)
	let hungry = fixfloat((1.2*t*(m*0.34)),4)
	let tired  = fixfloat((0.12*t*(m*0.8)),4)
	let lostmana = 0.01*t

	console.log('睡意'+sleepy,'欲望'+desired,'饥饿'+hungry,'疲劳'+tired,'流失魔力'+lostmana)

	PC.base.理智[0] = fixfloat(PC.base.理智[0]-sleepy,4)
	PC.base.欲望[0] = fixfloat(PC.base.欲望[0]+desired,4)
	PC.base.饮食[0] = fixfloat(PC.base.饮食[0]-hungry,4)
	PC.base.体力[0] = fixfloat(PC.base.体力[0]-tired,4)
	PC.base.魔力[0] = fixfloat(PC.base.魔力[0]-lostmana,4)

	FixValue()


	return `	理智:${PC.base.理智[0]}/${PC.base.理智[1]}, 欲望:${PC.base.欲望[0]}/${PC.base.欲望[1]},
	饮食：${PC.base.饮食[0]}/${PC.base.饮食[1]}, 体力：${PC.base.体力[0]}/${PC.base.体力[1]}, 
	魔力：${PC.base.魔力[0]}/${PC.base.魔力[1]}`
}

window.Testpasstime = function(t){
	for(let i=0; i < t; i++){
		let passedtime = (V.times.passed - V.times.wakeup)
		let min = passedtime%60
		let hour = fixfloat(passedtime/60,1)
		console.log(`醒来${hour}时${min}过后\n`,testpt(5))
	}
}

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
	var time = V.day.time;
	var day = V.day.day;
	var week = V.day.week;
	var month = V.day.month;
	var year = V.day.year;
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

	V.day.time = time;
	V.day.min = min;
	V.day.hour = hour;

	V.day.zone = zone;
	V.day.weekday = weekday;

	V.day.day = day;
	V.day.week = week;
	V.day.month = month;
	V.day.year = year;

	return ""
}
window.timeprocess = timeprocess
F.timeprocess = timeprocess
DefineMacroS("timeprocess",timeprocess)


window.dailyMultip = function(){
	let t = V.times.passed - V.times.wakeup
	if(t/60 >= 5){
		return fixfloat(Math.pow(1.09,(t/60 - 5)),4)
	}
	else return 1;
}

window.DesireMultip = function(){
	 let san = (1-(PC.base.理智[0]/PC.base.理智[1]))*12

	 if(PC.genital.阴茎 > 5 ) return fixfloat(Math.pow(1.25,san+1),4);
	 else return fixfloat(Math.pow(1.25,san+1)/2,4);
}

window.SanMultip = function(){
	let desire = (PC.base.欲望[0]/PC.base.欲望[1])*100
	if(desire >= 50){
		let d = (PC.base.欲望[0]/PC.base.欲望[1])
		return fixfloat(Math.pow(2,d),4)
	}
	return 1
}


window.OverTime = function(){
	let ot = Math.floor(V.times.passed - V.times.wakeup/1200)
	return ot > 0 && ot < Flag.overtime
}


function passtime(t,mode){
	let lapse = V.times.passed - V.times.wakeup
	let overtime = Math.floor(lapse/1200)

	/* 经过时间加到现在时间前的处理 */

	V.times.passed += t  // 睡醒后的累计经过时间。只有进行睡眠休息时才会清除
	if(V.day.time + t >= 1380) Flag.daychange = true; //先不加到现在时间，瞅瞅过23点没。
	if(PC.state.睡眠){
		V.times.passed = 0; //如果在睡觉，就清空经过时间,和超时活动flag
		Flag.ovetime = 0
	}
	

	//时间经过时基础数值的变动

	//没睡觉就会有所消耗。
	if(PC.state.睡眠 == false){
		let m = dailyMultip()
		let sleepy = fixfloat((0.1*t*m*SanMultip()),4)
		let desired = fixfloat((((V.PC.genital > 5 ? 0.03 : 0.02)+(PC.base.理智[0]<= 0 ? 0.2 : 0)-(PC.base.体力[0] <= PC.base.体力[1]/10 ? 0.15: 0))*t*DesireMultip()),4)
		let hungry = fixfloat((1.2*t*(m*0.34)),4)
		let tired  = fixfloat((0.12*t*(m*0.8)),4)
		let lostmana = 0.01*t

		PC.base.理智[0] = fixfloat(PC.base.理智[0]-sleepy,4)
		PC.base.欲望[0] = fixfloat(PC.base.欲望[0]+desired,4)
		PC.base.饮食[0] = fixfloat(PC.base.饮食[0]-hungry,4)
		PC.base.体力[0] = fixfloat(PC.base.体力[0]-tired,4)
		PC.base.魔力[0] = fixfloat(PC.base.魔力[0]-lostmana,4)
	}
	else
	{
		//睡眠时，流失的魔力大减
		let lostmana = 0.002*t
		PC.base.魔力[0] = fixfloat(PC.base.魔力[0]-lostmana,4)
	}


	//source值在base上变动前的处理。主要处理快感和心理素质一类
	SourceTrack()

	//处理完毕后，把SOURCE变动到 base里的处理	
	const g = Object.keys(PC.source)
	for (let v in g){

		PC.base[v][0] += PC.source[v]

		//累计加减值过后，突破上限获得成长时
		if(["压力","疼痛","恐惧","耻辱","快M", "快B", "快C", "快V", "快U", "快A"].includes(v)){
			if(PC.base[v][0] > PC.base[v][1]) PC.base[v][1] = PC.base[v][1]*1.01

			//高潮、以及获得刻印时的各种处理。
		}

		//计算完毕后把source清空。
		PC.source[v] = 0
	}

	

	//FLAG处理，每天只会累计一次。数值低于/高于安全线，就会+1. 如果当天没有低于安全线，就会扣除1个计数（如果计数大于0的话）
	//按实际活动时间来处理 //不吃不喝不休息最多也只能撑个两三天……
	if(PC.base.体力[0] <= PC.base.体力[1]/10 && OverTime()) PFlag.疲劳++  ;
	else if(PC.base.体力[0] >= PC.base.体力[1]*0.25 && PFlag.疲劳 > 0 && Flag.daychange) PFlag.疲劳 --;

	if(PC.base.饮食[0] <= PC.base.饮食[1]/10 && OverTime()) PFlag.营养不良++ ;
	else if(PC.base.饮食[0] >= PC.base.饮食[1]*0.8 && PFlag.营养不良 > 0 && Flag.daychange) PFlag.营养不良-- ;

	if(PC.base.欲望[0] >= PC.base.欲望[1]*0.8 && OverTime()) PFlag.禁欲 ++;
	else if(PC.base.欲望[0] <= PC.base.欲望[1]*0.3 && PFlag.禁欲 > 0 && Flag.daychange) PFlag.禁欲 --;

	if(!PC.state.睡眠 && OverTime() ) PFlag.熬夜 ++;
	else if(PC.state.睡眠 && V.day.time <= 1440) PFlag.熬夜 --;

	if(PC.base.魔力[0] <= 0 && Flag.daychange) PFlag.缺魔 ++;
	else if(PC.base.魔力[0] > 50 && Flag.daychange && PFlag.缺魔 > 0 ) PFlag.缺魔 = 0;


	if(PFlag.疲劳 >= 3)PC.state.疲劳 = true;
	else if(PFlag.疲劳 <= 0)PC.state.疲劳 = false

	if(PFlag.营养不良 >= 3)PC.state.营养不良 = true;
	else if(PFlag.营养不良 <= 0)PC.state.营养不良 = false

	if(PFlag.禁欲 >= 3)PC.state.禁欲 = true;
	else if(PFlag.禁欲 <= 0)PC.state.禁欲 = false

	if(PFlag.熬夜 >= 3)PC.state.熬夜 = true;
	else if(PFlag.熬夜 <= 0)PC.state.熬夜 = false

	if(PFlag.缺魔 >= 3)PC.state.缺魔 = true;
	else if(PFlag.缺魔 <= 0)PC.state.缺魔 = false

	//温度判定。如果现在的适应温度大于小于现在温度 3度以上，就会获得生病值

	//生病处理
	//先集算要扣的健康基础值
	let ills = 0.01*(1+(PFlag.疲劳 > 0 ? 0.05:0)+(PFlag.营养不良 > 0 ? 0.1:0)+(PFlag.禁欲 > 0? 0.005:0)+(PFlag.熬夜 > 0 ? 0.01:0)+(PFlag.缺魔  > 0 ? 0.005 : 0))*t

	//只要有基础数值低于安全值，就会扣健康
	if(PC.base.饮食[0] <= 0 || PC.base.体力[0] <= 0 || PC.base.理智[0] <= 0 || PC.base.魔力[0] <= -10) PC.base.健康[0] = fixfloat(PC.base.健康[0]-ills,4);

	//生病确定
	if(PC.base.健康[0] < PC.base.健康[1]*0.8 && !PC.state.生病){
		//健康低于80%就算生病了
		PC.state.生病 = true;
		let text = "不知是不是"
		let reason = []
			if(PC.state.疲劳) reason.push('太过疲劳');
			if(PC.state.营养不良) reason.push('营养不良');
			if(PC.state.禁欲) reason.push('禁欲过度');
			if(PC.state.熬夜) reason.push('熬夜过度');
			if(PC.state.缺魔) reason.push('严重缺魔');
		
		if(reason.length == 1) text =  text + reason[0]
		else if(reason.length > 1) text = text + reason.join('和') 
		else text = text + '天气变化还是什么'

		anounceAppend(text + "的关系，<<you>>生病了。<br>")
	 } 
	if(PC.base.健康[0] == PC.base.健康[1] && PC.state.生病) {
		PC.state.生病 = false; //痊愈处理
		anounceAppend("<<you>>的病好了，已经恢复了健康。<br>")
	}

	//压力值变化，如果熬夜、疲劳、生病等，陷入负面状态都会获得压力值。

	//抑郁变化，如果压力过高，就会自动获得抑郁值。


	FixValue()

	/* 天气变化  累计的时间满3个小时或者一次经过3小时以上就换个天气，然后清零。 没满就++*/
	if(V.times.stock >= 180 || t >= 180){ weather(); V.times.stock = 0;}
	else V.times.stock += t;


	/* 把经过时间加到现在时间去，以及检测累计超时活动计数 */
	if(overtime > Flag.overtime) Flag.overtime ++;	
	V.day.time += t


	/* 时间经过处理 */
	timeprocess()

	/* 日期变更时的处理 */
	if(Flag.daychange)daychange();

}

function SourceTrack(){

	//清醒时的处理
	if(PC.state.睡眠 == false) {

	}
	//睡着时的处理
	else{

	}

	return ""
}

function daychange(){

	//清醒时的处理
	if(PC.state.睡眠 == false) {

	}
	//睡着时的处理
	else{

	}
	Flag.daychange = false
	return ""
}

function weather(){

	return ""
}
