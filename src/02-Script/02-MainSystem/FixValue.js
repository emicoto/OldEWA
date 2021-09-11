window.fixfloat = function(v,n){
    return Math.floor(v*Math.pow(10,n))/Math.pow(10,n)
}


window.maxAbl = function() {
	switch(conf.hardmode){
		case 0.5: return 1000;
		case 1: return 1200;
		case 2: return 2400;
		case 5: return 3600;
	}
}

window.maxBase = function(){
	switch(conf.hardmode){
		case 0.5: return 2000;
		case 1: return 2500;
		case 2: return 3200;
		case 5: return 4200;
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

     return multip
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

window.healthwarn = function() {
    return (PC.base.饮食[0] <= 0 || PC.base.体力[0] <= 0 || PC.base.理智[0] <= 0 || PC.base.魔力[0] <= -10)
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

function FixValue() {

    PC.money = Math.clamp(PC.money, 0, 9999999999)

    /* 固定数值的修正 */
    let mrate = maxAbl()/10
    let maxbase = maxBase()

    V.fix.hot = fixfloat((30+(PC.abl.健身/(mrate*1.25))),2)
    V.fix.cold = fixfloat((20-(PC.abl.健身/(mrate*0.75))),2)
    V.fix.beauty = 1600
    PC.info.hairlen = Math.clamp(PC.info.hairlen,0,9999)
    PC.info.hairlenf = Math.clamp(PC.info.hairlenf,0,9999)
    PC.info.beauty = Math.clamp(V.fix.beauty*allureBuff(),0,9999)
    T.warmth = warmth()

    /* BASE条修正 */
    PC.base.体力[1] =  Math.round(Math.clamp(500+(PC.abl.健身*(PC.level/5)),0,maxbase))
    PC.base.体力[0] = Math.clamp(PC.base.体力[0],-100,PC.base.体力[1])

    PC.base.理智[1] =  Math.round(Math.clamp(500+(PC.abl.意志*(PC.level/5)),0,maxbase))  
    PC.base.理智[0] = Math.clamp(PC.base.理智[0],-10,PC.base.理智[1])

    PC.base.魔力[1] =  Math.round(Math.clamp(100+PC.level*(PC.abl.意志/8),100,maxbase/2)) 
    PC.base.魔力[0] = Math.clamp(PC.base.魔力[0],-10,PC.base.魔力[1])

    let g = Object.keys(PC.base)

    for(let i=0; i< g.length; i++){
        let n = g[i]

        if(["体力","理智","魔力"].includes(n)) continue;

        //[current,max] 最大值固定 1000 并且把现在值固定在 0-max值内
        if(["饮食","健康","酒精","药物","抑郁","清洁"].includes(n)) {
            PC.base[n][1] = 1000;
            PC.base[n][0] = Math.clamp(PC.base[n][0],0,PC.base[n][1]);
        }

        // max值可成长到5000，且现在值可以突破最大值
        if(["压力","疼痛","恐惧","耻辱","快M", "快B", "快C", "快V", "快U", "快A"].includes(n)){
            PC.base[n][1] = Math.round(Math.clamp(PC.base[n][1],1000,5000))
            PC.base[n][0] = Math.max(PC.base[n][0],0)  //防止出现负数
        }

        /* max值不可成长但现在值可突破最大值*/
        if(n=="欲望"){
            PC.base[n][1] = 1000
            PC.base[n][0] = fixfloat(Math.min(PC.base[n][0],10000),4)
        }
    }

    // 扩张的修正
    PC.stretch.anal = fixfloat(Math.clamp(PC.stretch.anal,1,(12+(PC.info.body*2))),2)

    if(PC.info.tag == "少女") PC.stretch.ureth = Math.clamp(PC.stretch.ureth,0.5,6);
    else PC.stretch.ureth = fixfloat(Math.clamp(PC.stretch.ureth,0.2,(0.5+PC.genital.阴茎/10)),2);

    if(PC.genital.子宫) PC.stretch.vagina = fixfloat(Math.clamp(PC.stretch.vagina,1,(12+(PC.info.body*2))),2);
    else PC.stretch.vagina = null;

    // 液体分量的修正
    if(PC.genital.阴茎){
        PC.produce.精液[1] = Math.clamp(PC.produce.精液[1],PC.genital.阴茎*2.5,PC.genital.阴茎*10)
        PC.produce.精液[0] = Math.clamp(PC.produce.精液[0],0,PC.produce.精液[1])
    }

    if(PFlag.lactation){
        PC.produce.乳汁[1] = Math.clamp(PC.produce.乳汁[1],PC.info.breast*10,PC.info.breast*40)
        PC.produce.乳汁[0] = Math.clamp(PC.produce.乳汁[0],0,PC.produce.乳汁[1])
    }

    //体内液体的集算
    const b = Object.keys(PC.wet)
    for(let i=0;i<b.length;i++){
        let n = b[i]
        PC.wet[n] = sum(PC.bottom[n])
    }
    // RPG数值的修正
    PC.rpg.HP[1] = Math.round(Math.clamp((PC.base.体力[1]/5+100),1,1000)) //HP=体力/5+健康/10
    PC.rpg.HP[0] = Math.clamp(PC.rpg.HP[0],-1,PC.rpg.HP[1]) //战斗结束时按比例返回至体力和健康值

    PC.rpg.MP[1] = PC.base.魔力
    PC.rpg.MP[0] = PC.base.魔力

    PC.rpg.SP[1] = Math.round(Math.clamp(PC.rpg.SP[1],50,50+PC.eskl.性耐性/5))
    PC.rpg.SP[0] = Math.clamp(PC.rpg.SP[0],0,PC.rpg.SP[1])

    PC.rpg.ATK = fixfloat(Math.clamp((10+PC.abl.战技/10),1,500),2)
    PC.rpg.DEF = fixfloat(Math.clamp((10+PC.abl.健身/10)+defBuff(),1,500),2)
    PC.rpg.MATK = fixfloat(Math.clamp((10+(PC.abl.奥术/10*PC.school.自然/500)),1,500),2)
    PC.rpg.MDEF = fixfloat(Math.clamp((10+(PC.abl.异能/10*PC.school.物理/500)),1,500),2)
    PC.rpg.SPD = fixfloat(Math.clamp((10+(PC.abl.运动/10)),1,500),2)

    /* 技能等级相关值修正 */
    const max = function(){
        switch(conf.hardmode){
            case 0.5: return 1000;
            case 1: return 1200;
            case 2: return 2400;
            case 5: return 3600;
        }
    }

    const school = Object.keys(PC.school) //学校
    for(let i=0; i< school.length; i++){
        let n = school[i]
        PC.school[n] = Math.clamp(PC.school[n],0,1200)
    }

    const abl = Object.keys(PC.abl) //技能
    for(let i=0; i<abl.length; i++){
        let n = abl[i]
        PC.abl[n] = Math.clamp(PC.abl[n],0,max())
    }

    const eskl = Object.keys(PC.eskl) //性技
    for(let i=0; i<eskl.length; i++){
        let n = eskl[i]
        PC.eskl[n] = Math.clamp(PC.eskl[n],0,1000)
    }

    const lewd = Object.keys(PC.lewd) //变态度
    for(let i=0; i<lewd.length; i++){
        let n = lewd[i]
        PC.lewd[n] = Math.clamp(PC.lewd[n],-1000,1000)
    }

    setreveal()

    if(V.coredebug==true)console.log(PC);
    return ""
}
window.FixValue = FixValue
F.FixValue = FixValue
DefineMacroS("fixvalue",FixValue)