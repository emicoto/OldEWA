window.fixfloat = function(v,n){
    return Math.floor(v*Math.pow(10,n))/Math.pow(10,n)
}

function FixValue() {

    PC.money = Math.clamp(PC.money, 0, 9999999999)

    /* 固定数值的修正 */

    V.fix.hot = fixfloat((26+(PC.abl.健身/200)),2)
    V.fix.cold = fixfloat((20-(PC.abl.健身/200)),2)
    V.fix.beauty = 1600
    PC.info.hairlen = Math.clamp(PC.info.hairlen,0,9999)
    PC.info.hairlenf = Math.clamp(PC.info.hairlenf,0,9999)
    PC.info.beauty = Math.clamp(V.fix.beauty*allureBuff(),0,9999)
    T.warmth = warmth()

    /* BASE条修正 */
    PC.base.体力[1] =  Math.round(Math.clamp(500+(PC.abl.健身*(PC.level/5)),0,2500))
    PC.base.体力[0] = Math.clamp(PC.base.体力[0],-100,PC.base.体力[1])

    PC.base.理智[1] =  Math.round(Math.clamp(500+(PC.abl.意志*(PC.level/5)),0,2500))  
    PC.base.理智[0] = Math.clamp(PC.base.理智[0],-10,PC.base.理智[1])

    PC.base.魔力[1] =  Math.round(Math.clamp(100+PC.level*(PC.abl.意志/8),100,1200)) 
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