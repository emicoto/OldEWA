function FixValue() {

    V.money = Math.clamp(V.money, 0, 9999999999)

    /* 固定数值的修正 */

    V.fix.hot = parseFloat((26+(V.PC.abl.健身/200)).toFixed(2))
    V.fix.cold = parseFloat((20-(V.PC.abl.健身/200)).toFixed(2))
    V.fix.beauty = 1600
    V.PC.info.hairlen = Math.clamp(V.PC.info.hairlen,0,9999)
    V.PC.info.hairlenf = Math.clamp(V.PC.info.hairlenf,0,9999)
    V.PC.beauty = Math.clamp(V.fix.beauty*allureBuff(),0,9999)
    T.warmth = warmth()

    /* BASE条修正 */
    V.PC.base.体力[1] =  Math.round(Math.clamp(500+(V.PC.abl.健身*(V.PC.level/5)),0,2500))
    V.PC.base.体力[0] = Math.clamp(V.PC.base.体力[0],-100,V.PC.base.体力[1])

    V.PC.base.理智[1] =  Math.round(Math.clamp(500+(V.PC.abl.意志*(V.PC.level/5)),0,2500))  
    V.PC.base.理智[0] = Math.clamp(V.PC.base.理智[0],0,V.PC.base.理智[1])

    V.PC.base.魔力[1] =  Math.round(Math.clamp(100+V.PC.level*(V.PC.abl.意志/8),100,1200)) 
    V.PC.base.魔力[0] = Math.clamp(V.PC.base.魔力[0],0,V.PC.base.魔力[1])

    let g = Object.keys(V.PC.base)

    for(let i=0; i< g.length; i++){
        let n = g[i]

        if(["体力","理智","魔力"].includes(n)) continue;

        //[current,max] 最大值固定 1000 并且把现在值固定在 0-max值内
        if(["饮食","健康","酒精","药物","抑郁","欲望"].includes(n)) {
            V.PC.base[n][1] = 1000;
            V.PC.base[n][0] = Math.clamp(V.PC.base[n][0],0,V.PC.base[n][1]);
        }

        // max值可成长到5000，且现在值可以突破最大值
        if(["压力","疼痛","恐惧","耻辱","快M", "快B", "快C", "快V", "快U", "快A"].includes(n)){
            V.PC.base[n][1] = Math.round(Math.clamp(V.PC.base[n][1],1000,5000))
            V.PC.base[n][0] = Math.max(V.PC.base[n][0],0)  //防止出现负数
        }
        /* max值不可成长但现在值可突破最大值
        if([].includes(n)){
            V.PC.base[n][1] = 1000
        }*/
    }

    // 扩张的修正
    V.PC.stretch.anal = parseFloat(Math.clamp(V.PC.stretch.anal,1,(12+(V.PC.body*2))).toFixed(2))

    if(V.PC.info.tag == "少女") V.PC.stretch.ureth = Math.clamp(V.PC.stretch.ureth,0.5,6);
    else V.PC.stretch.ureth = parseFloat(Math.clamp(V.PC.stretch.ureth,0.2,(0.5+V.PC.genital.阴茎/10)).toFixed(2));

    if(V.PC.genital.子宫) V.PC.stretch.vagina = parseFloat(Math.clamp(V.PC.stretch.vagina,1,(12+(V.PC.body*2))).toFixed(2));
    else V.PC.stretch.vagina = null;

    // 液体分量的修正
    if(V.PC.genital.阴茎){
        V.PC.produce.精液[1] = Math.clamp(V.PC.produce.精液[1],V.PC.genital.阴茎*2.5,V.PC.genital.阴茎*10)
        V.PC.produce.精液[0] = Math.clamp(V.PC.produce.精液[0],0,V.PC.produce.精液[1])
    }

    if(V.PFlag.lactation){
        V.PC.produce.乳汁[1] = Math.clamp(V.PC.produce.乳汁[1],V.PC.breast*10,V.PC.breast*40)
        V.PC.produce.乳汁[0] = Math.clamp(V.PC.produce.乳汁[0],0,V.PC.produce.乳汁[1])
    }

    //体内液体的集算
    const b = Object.keys(V.PC.wet)
    for(let i=0;i<b.length;i++){
        let n = b[i]
        V.PC.wet[n] = sum(V.PC.bottom[n])
    }
    // RPG数值的修正
    V.PC.rpg.HP[1] = Math.round(Math.clamp((V.PC.base.体力[1]/5+100),1,1000)) //HP=体力/5+健康/10
    V.PC.rpg.HP[0] = Math.clamp(V.PC.rpg.HP[0],-1,V.PC.rpg.HP[1]) //战斗结束时按比例返回至体力和健康值

    V.PC.rpg.MP[1] = V.PC.base.魔力
    V.PC.rpg.MP[0] = V.PC.base.魔力

    V.PC.rpg.SP[1] = Math.round(Math.clamp(V.PC.rpg.SP[1],50,50+V.PC.eskl.性耐性/5))
    V.PC.rpg.SP[0] = Math.clamp(V.PC.rpg.SP[0],0,V.PC.rpg.SP[1])

    V.PC.rpg.ATK = parseFloat(Math.clamp((10+V.PC.abl.战技/10),1,500).toFixed(1))
    V.PC.rpg.DEF = parseFloat(Math.clamp((10+V.PC.abl.健身/10)+defBuff(),1,500).toFixed(1))
    V.PC.rpg.MATK = parseFloat(Math.clamp((10+(V.PC.abl.奥术/10*V.PC.school.自然/500)),1,500).toFixed(1))
    V.PC.rpg.MDEF = parseFloat(Math.clamp((10+(V.PC.abl.异能/10*V.PC.school.物理/500)),1,500).toFixed(1))
    V.PC.rpg.SPD = parseFloat(Math.clamp((10+(V.PC.abl.运动/10)),1,500).toFixed(1))

    /* 技能等级相关值修正 */
    const max = function(){
        switch(V.hardmode){
            case 0.5: return 1000;
            case 1: return 1200;
            case 2: return 2400;
            case 5: return 3600;
        }
    }

    const school = Object.keys(V.PC.school) //学校
    for(let i=0; i< school.length; i++){
        let n = school[i]
        V.PC.school[n] = Math.clamp(V.PC.school[n],0,1200)
    }

    const abl = Object.keys(V.PC.abl) //技能
    for(let i=0; i<abl.length; i++){
        let n = abl[i]
        V.PC.abl[n] = Math.clamp(V.PC.abl[n],0,max())
    }

    const eskl = Object.keys(V.PC.eskl) //性技
    for(let i=0; i<eskl.length; i++){
        let n = eskl[i]
        V.PC.eskl[n] = Math.clamp(V.PC.eskl[n],0,1000)
    }

    const lewd = Object.keys(V.PC.lewd) //变态度
    for(let i=0; i<lewd.length; i++){
        let n = lewd[i]
        V.PC.lewd[n] = Math.clamp(V.PC.lewd[n],-1000,1000)
    }

    setreveal()

    if(V.harddebug==true)console.log(V.PC);
    return ""
}
window.FixValue = FixValue
F.FixValue = FixValue
DefineMacroS("fixvalue",FixValue)