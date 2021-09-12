
V.Flag = {
    daychange : false, mode: "日常", //游戏模式,
    chaos : 0, overtime : 0, charamaking: null,
}

V.Enemy = [null,null,null,null,null]

V.BFlag = {
    turns: 0, /*current*/ actor: "pc", target: "enemy", action: "attack",
    waitlist:[
         /* com是使用的技能id， id是使用的道具id */
        {actor:"pc", target:"enemy", action:"item", com:0, id:0,},
        /* 动作队列 */
        {},{},{},{},{},{},{}
    ], 
}

V.record = {}
for(let i=0; i<D.recordlist.length; i++){
    let n = D.recordlist[i]
    V.record[n] = 0
}
