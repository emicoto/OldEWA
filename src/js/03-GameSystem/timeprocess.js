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

window.maxAbl = function() {
	switch(conf.hardmode){
		case 0.5: return 1000;
		case 1: return 1200;
		case 2: return 2400;
		case 5: return 3600;
	}
}

window.dailyMultip = function(){
	let t = V.times.passed - V.times.wakeup
	let max = maxAbl()/10
	let wil = fixfloat(1 - (((PC.abl.意志)/max)*0.04),4)

	if(t/60 >= 5){
		let multip = Math.pow(1.09,(t/60 - 5))
		multip = Math.max(fixfloat(1 + ((multip - 1)*wil),4),1)
		return multip
	}
	else return 1;
}

window.DesireMultip = function(){
	 let multip = 1
	 let san = (1-(PC.base.理智[0]/PC.base.理智[1]))*12

	 //根据丁丁有无，获得率也不同
	 if(PC.genital.阴茎 > 5 )  multip = (Math.pow(1.25,san+1),4);
	 else  multip = (Math.pow(1.25,san+1)/2,4);

	 let max = maxAbl()/10
	 //意志加成，每120意志削减 7.5%，最终削减 75% 倍率获得
	 let wil = fixfloat(1 - (((PC.abl.意志)/max)*0.075),4)
	 multip = Math.max(fixfloat(1 + ((multip - 1)*wil),4),1)


}

window.SanMultip = function(){
	let desire = (PC.base.欲望[0]/PC.base.欲望[1])*100

	let max = maxAbl()/10
	let wil = fixfloat(1 - (((PC.abl.意志)/max)*0.075),4)

	if(desire >= 50){
		let d = (PC.base.欲望[0]/PC.base.欲望[1])
		let multip = Math.pow(2,d)
		multip = Math.max(fixfloat(1 + ((multip - 1)*wil),4),1)

		return multip
	}
	return 1
}

window.HealthMultip = function(){
	var multip = 1

	if(tempDiff()){
		let cold = Math.abs( V.weather.temp - PC.cold )
		let heat = Math.abs( V.weather.temp - PC.hot )

		if (cold > 3) multip = Math.pow(1.233,cold-3)
		else if (heat > 3) multip = fixfloat(Math.pow(1.233,heat-3),4)	
		else multip = 1
	}

	if(healthwarn()){
		multip += ( 0.01
			+ (PFlag.营养不良 > 0 ? 0.1 : 0)
			+ (PFlag.疲劳 > 0 ? 0.05 : 0)
			+ (PFlag.熬夜 > 0 ? 0.02 : 0)
			+ (PFlag.禁欲 > 0 ? 0.002 : 0)
			+ (PFlag.缺魔  > 0 ? 0.005 : 0)
		)
	}

	//根据健身（体质）进行补正， 每 120健身 减少 6.5%,最多削减 65%的获得加成
	let max = maxAbl()/10
	let vit = fixfloat(1 - (((PC.abl.健身)/max)*0.065),4)

	multip = Math.max(fixfloat(1 + ((multip - 1)*vit),4),1)
	
	return multip
}

window.tempDiff = function(){
	let cold = Math.abs( V.weather.temp - PC.cold )
	let heat = Math.abs( V.weather.temp - PC.hot )
	return ((cold > 3 || heat > 3) && V.local?.side == "室外")
}


window.OverTime = function(){
	let ot = Math.floor(V.times.passed - V.times.wakeup/1200)
	return ot > 0 && ot < Flag.overtime
}

window.desireGain = function(){
	//有丁丁的情况
		let d = 0
		let min = 0

	if(V.PC.genital.阴茎 > 5){
		d = random(1,6)/100
		min = 0.005
	}
	//没有丁丁欲望减半
	else{
		d = random(5,30)/1000
		min = 0.002
	}

	//根据理智和身体状况+-基础值。
	d = d + (PC.base.理智[0]<= 0 ? 0.2 : 0) - ((PC.base.体力[0] <= PC.base.体力[1]/10 || PFlag.疲劳 > 0 ) ? 0.15: 0)

	//最后根据纯洁度调整
	d = Math.max(d *((1000-PC.lewd.纯洁)/1000),min)
	//根据性成瘾度调整,性瘾满了每分钟就彪涨1.25点欲望，无加成下差不多半天就满
	if(PC.lewd.性瘾 > 0){
		d += (PC.lewd.性瘾/800)
	}

	return fixfloat(d,4)
}

window.dirtyMultip = function(){
	if(V.weather.temp > PC.info.hot){
		let multip = 1 + ((V.weather.temp - PC.info.hot)/3)*0.5
		return multip
	}
	return 1
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
	let desired = fixfloat((desiredGain()*t*DesireMultip()),4)
	let dirty = 0.5*t*dirtyMultip()

	//没睡觉就会有所消耗。
	if(PC.state.睡眠 == false){

		let m = dailyMultip()
		let sleepy = fixfloat((0.1*t*m*SanMultip()),4)
		let hungry = fixfloat((1.2*t*(m*0.34)),4)
		let tired  = fixfloat((0.12*t*(m*0.8)),4)
		let lostmana = 0.01*t

		PC.base.理智[0] = fixfloat(PC.base.理智[0]-sleepy,4)
		PC.base.欲望[0] = fixfloat(PC.base.欲望[0]+desired,4)
		PC.base.饮食[0] = fixfloat(PC.base.饮食[0]-hungry,4)
		PC.base.体力[0] = fixfloat(PC.base.体力[0]-tired,4)
		PC.base.魔力[0] = fixfloat(PC.base.魔力[0]-lostmana,4)
		PC.base.清洁[0] = fixfloat(PC.base.清洁[0]-dirty,4)
	}
	else
	{
		//睡眠时，流失的魔力大减
		let lostmana = 0.002*t
		PC.base.魔力[0] = fixfloat(PC.base.魔力[0]-lostmana,4)

		//睡眠也会获得欲望，但会减半
		desired = desired/2
		PC.base.欲望[0] = fixfloat(PC.base.欲望[0]+desired,4)

		//清洁度掉率也大减
		dirty = dirty*0.25
		PC.base.清洁[0] = fixfloat(PC.base.清洁[0]-dirty,4)

		//体力、理智的恢复
		let energy = fixfloat((PC.base.体力[1]*0.00166)*t,4)
		let sanity = fixfloat((PC.base.理智[1]*0.00125)*t,4)

		PC.base.体力[0] = fixfloat(PC.base.体力[0]+energy,4)
		PC.base.理智[0] = fixfloat(PC.base.理智[0]+sanity,4)
	}

	//source值在base上变动前的处理。主要处理快感和心理素质一类
	SourceTrack()

	//处理完毕后，把SOURCE变动到 base里的处理	
	const g = Object.keys(PC.source)
	for (let v in g){
		let n = g[v]
		PC.base[n][0] += PC.source[n]

		//累计加减值过后，突破上限获得成长时
		if(["压力","疼痛","恐惧","耻辱","快M", "快B", "快C", "快V", "快U", "快A"].includes(n)){
			if(PC.base[n][0] > PC.base[n][1]) PC.base[n][1] = PC.base[n][1]*1.01

			//高潮、以及获得刻印时的各种处理。
			MarkCheck()
		}

		//计算完毕后把source清空。
		PC.source[n] = 0
	}

	//FLAG处理，每天只会累计一次。数值低于/高于安全线，就会+1. 如果当天没有低于安全线，就会扣除1个计数（如果计数大于0的话）
	//按实际活动时间来处理 //不吃不喝不休息最多也只能撑个两三天……
	if(PC.base.体力[0] <= PC.base.体力[1]/10 && OverTime()) PFlag.疲劳++  ;
	if(PC.base.体力[0] >= PC.base.体力[1]*0.25 && PFlag.疲劳 > 0 && Flag.daychange) PFlag.疲劳 --;

	if(PC.base.饮食[0] <= PC.base.饮食[1]/10 && OverTime()) PFlag.营养不良++ ;
	if(PC.base.饮食[0] >= PC.base.饮食[1]*0.8 && PFlag.营养不良 > 0 && Flag.daychange) PFlag.营养不良-- ;

	if(PC.base.欲望[0] >= PC.base.欲望[1]*0.8 && OverTime()) PFlag.禁欲 ++;
	if(PC.base.欲望[0] <= PC.base.欲望[1]*0.3 && PFlag.禁欲 > 0 && Flag.daychange) PFlag.禁欲 --;

	if(!PC.state.睡眠 && OverTime() ) PFlag.熬夜 ++;
	if(PC.state.睡眠 && V.day.time <= 1440) PFlag.熬夜 --;

	if(PC.base.魔力[0] <= 0 && Flag.daychange) PFlag.缺魔 ++;
	if(PC.base.魔力[0] > 50 && Flag.daychange && PFlag.缺魔 > 0 ) PFlag.缺魔 = 0;


	if(PFlag.疲劳 >= 3)PC.state.疲劳 = true;
	if(PFlag.疲劳 <= 0)PC.state.疲劳 = false

	if(PFlag.营养不良 >= 3)PC.state.营养不良 = true;
	if(PFlag.营养不良 <= 0)PC.state.营养不良 = false

	if(PFlag.禁欲 >= 3)PC.state.禁欲 = true;
	if(PFlag.禁欲 <= 0)PC.state.禁欲 = false

	if(PFlag.熬夜 >= 3)PC.state.熬夜 = true;
	if(PFlag.熬夜 <= 0)PC.state.熬夜 = false

	if(PFlag.缺魔 >= 3)PC.state.缺魔 = true;
	if(PFlag.缺魔 <= 0)PC.state.缺魔 = false


	//生病处理
	//先集算要扣的健康基础值，温度变化，或者各种负面状态都会获得生病值
	let healthwarn = function(){
		return (PC.base.饮食[0] <= 0 || PC.base.体力[0] <= 0 || PC.base.理智[0] <= 0 || PC.base.魔力[0] <= -10)
	}

	let ills = (
		( (healthwarn()? 0.1 : 0)
		+ (tempDiff() ? 0.15 : 0)
		+ (PFlag.营养不良 > 0 ? 0.2:0)
		+ (PFlag.疲劳 > 0 ? 0.1 : 0)
		+ (PFlag.熬夜 > 0 ? 0.05:0)
		+ (PFlag.禁欲 > 0 ? 0.01:0)
		+ (PFlag.缺魔  > 0 ? 0.01 : 0)
		)
		*t * HealthMultip()
	)

	//只要有基础数值低于安全值,或者温差过大，就会扣健康
	if(healthwarn() || tempDiff() ) PC.base.健康[0] = fixfloat(PC.base.健康[0]-ills,4);

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

		anounceAppend(text + "的关系，<<you>>好像生病了。<br>")
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


}

function MarkCheck() {

}

function daychange(){

	//清醒时的处理
	if(PC.state.睡眠 == false) {

	}
	//睡着时的处理
	else{

	}
	Flag.daychange = false

}

function weather(){

	return ""
}
