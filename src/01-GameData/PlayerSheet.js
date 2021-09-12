
function MagicGirlPlayer(){
    PC.type = 1
    PC.info.name = Lang("魔女","Majo")
    PC.info.tag = "伪娘"
    PC.info.race = "人类"
    PC.info.major = "自然科学"
    PC.attitude = 4
    PC.info.breast = 1
    PC.info.hips = 1
    PC.info.body = 1
    PC.info.hairlen = 100
    PC.info.hairlenf = 100
    PC.info.hairstyle = "straight"
    PC.info.haircolor = "aqua"
    PC.info.eyecolor = "aqua"
    PC.info.skin = "white" 
    PC.sens = {"m" : 2,  "b":2,  "c":2,  "v":null, "u":1, "a":4}
    PC.genital = { "阴茎" : 10, "子宫" : null }
    V.starttrait = "抖M体质"
}
DefineMacroS("PCCard_MG", MagicGirlPlayer)

function IdolPlayer(){
    PC.type = 2
    PC.info.name = Lang("沐歌","Claire")
    PC.info.tag = "少女"
    PC.info.race = "人类"
    PC.info.major = "音乐表演"
    PC.attitude = 1
    PC.info.breast = 2
    PC.info.hips = 2
    PC.info.body = 1
    PC.info.hairlen = 250
    PC.info.hairlenf = 250
    PC.info.hairstyle = "straight"
    PC.info.haircolor = "darkbrown"
    PC.info.eyecolor = "brown"
    PC.info.skin = "health"
    PC.sens = {"m" : 1,  "b":4,  "v":1, "c":1, "u":1, "a":1}             
    V.starttrait = "人气"

    PC.genital = { "阴茎" : null, "子宫" : 1 }
}
DefineMacroS("PCCard_Idol", IdolPlayer)

function XiuXianPlayer(){
    PC.type = 3
    PC.info.name = Lang("云鹿","Yun")
    PC.info.tag = "少年"
    PC.info.race = "兽族"
    PC.info.major = "运动格斗"
    PC.attitude = 1
    PC.info.breast = 0
    PC.info.hips = 1
    PC.info.body = 1
    PC.info.hairlen = 120
    PC.info.hairlenf = 120
    PC.info.hairstyle = "straight"
    PC.info.haircolor = "platinum"
    PC.info.eyecolor = "emerald"
    PC.info.skin = "white"
    PC.sens = {"m" : 1,  "b":2,  "c":2, "v":null, "u":1, "a":2}

    PC.genital = { "阴茎" : 10, "子宫" : null }

    V.starttrait = "菜鸟"
    PC.info.kemotype = "deer"  
}
DefineMacroS("PCCard_Yun", XiuXianPlayer)

F.InitPlayer = function(){

PC.money = 5000; PC.point = 0;
PC.follow = 1; PC.follower = 100;

PC.info = {
    name  : "魔女",   tag : "伪娘",    race : "人类",
    major  : "文艺创作", title: "魔法少女", gender:"m",
    eyes: 1, body: 1, breast: 1, hips: 2, beauty: 1600, 
    hairlen : 120,  hairlenf: 120,
    haircolor  : "aqua",   hairstyle : "natural", /* 不做修饰时的发型，只有自然、卷发、顺直三种，只能在美容店修改*/
    eyecolor  : "aqua",
    skin  : "white",
    kemotype: null,
    hot: 21, cold:21,
}

PC.equip = {
    weapon:null, shield: null, accesory:[null,null,null],
}

PC.base = {
    饮食 : [1000,1000],   健康 : [1000,1000],     魔力 : [20,100],
    体力 : [500,500],     理智 : [500,500],       清洁: [1000,1000],
    
    酒精 : [0,1000],      药物 : [0,1000], 
    欲望 : [0,1000],      快感 : [0,1000],
    
    压力 : [0,1000],      疼痛 : [0,1000],  抑郁 : [0,1000],
    恐惧 : [0,1000],      耻辱 : [0,1000],

    快M  : [0,1000],  快B  : [0,1000],  快C  : [0,1000],
    快V  : [0,1000],  快U  : [0,1000],  快A  : [0,1000],
}

PC.source = {
    饮食 : 0,   健康 : 0,     魔力 : 0,
    体力 : 0,   理智 : 0,     清洁 : 0,
    
    酒精 : 0,      药物 : 0, 
    欲望 : 0,      快感 : 0,
    
    压力 : 0,      疼痛 : 0,  抑郁 : 0,
    恐惧 : 0,      耻辱 : 0,

    快M  : 0,  快B  : 0,  快C  : 0,
    快V  : 0,  快U  : 0,  快A  : 0,
}

PC.genital = {阴茎: 10, 子宫: null}
PC.sens = {  m : 2,  b : 2,  v : 0, u :1, c : 1,  a : 4}

PC.stretch = {vagina: 3, anal: 2.5, ureth: 0.3}

PC.rpg = {
    HP : [200,200],   /* =体力/5+健康/10 */
    MP : [0,100],     /* =魔力 */
    SP : [100,100],   /* =理智/10+耐性/100 */

    ATK : 10,          /* =战技/10+10+装备加成 */
    DEF : 10,          /* =健身/10+10+装备加成 */
    MATK: 10,          /* =自然/10+10+装备加成 */
    MDEF: 10,          /* =物理/10+10+装备加成 */
    SPD : 10,          /* =运动/10+10+装备加成*/
}

PC.school = {
    文学 : 0,  /* 影响意志和心理数值 */
    数学 : 80,  /* 影响各种收益和效率 */
    物理 : 0,  /* 影响异能习得和效果 */
    生理 : 0,  /* 影响医疗效果，药物抵抗，性技巧 */
    自然 : 120,  /* 影响奥术习得和效果 */
    表演 : 0,  /* 影响人气获得，魅惑和欺骗的效果 */
    艺术 : 0  /* 影响特殊技能效果和收益 */
}

PC.abl = {
    异能 : 0,  /* 防御技能 */
    奥术 : 120,  /* 魔法技能 */
    战技 : 0,  /* 物理攻击 */
    健身 : 0,  /* 影响健康消耗，体力上限 */
    运动 : 0,  /* 影响速度、逃跑成功率 */  
    灵巧 : 0,  /* 解锁、解除机关、物品制作等 */
    意志 : 0,  /* 影响各种耐性和抵抗力 */
}

PC.eskl = {
    性技巧 : 0,  /* 影响性攻击效果 */
    性耐性 : 0,   /* 影响性抵抗效果 */
    口技 : 0,
    手技 : 0,
    脚技 : 0,
    腰技 : 0,
}

PC.lewd = {
    纯洁 : 800, /* 内心的纯洁度，影响欲望 */
    露出 : 0,    /* 露出接受程度 */
    滥交 : 0,    /* 滥交接受程度 */
    受虐 : 50,    /* 受虐接受程度 */
    顺从 : 0,    /* 顺从程度 */
    兽交 : 0,    /* 兽交接受程度 */
    药瘾 : 0,    /* 药物成瘾度 */
    性瘾 : 0    /* 性成瘾度 */
}

PC.exp = {}

//液体产出
PC.produce = { 精液 : [100,100],  乳汁 : [100,100],  尿液:[0,500]}

//下体状态
PC.bottom = {
    V:{slm:0,cum:0,goo:0,lub:0},
    A:{slm:0,cum:0,goo:0,lub:0},
    U:{slm:0,cum:0,goo:0,lub:0},
}

//湿润度
PC.wet = {V:0,A:0,U:0}

//素质
PC.trait = {}

//现在状态
PC.state = {}

for(let i=0; i< D.pcstatelist.length; i++){
    let n = D.pcstatelist[i]
    PC.state[n] = false
}


/*  童贞/处女记录
    失去时记录日期、情况、对象。 
    PC.vaginity.处女 = {date:X月X日,situation:强奸,person:路人的巨屌} 
    显示的时候：XX的处女在X年X月X日，被路人的巨屌强行贯穿了。
    和奸文：XX的处女在X年X月X日，献给了爱人的巨屌 
    自己破处：XX的处女在X年X月X日，用玩具自行贯穿了 
*/
PC.vaginity = { "初吻" : 1, "童贞" : 1, "处女" : 1, "A处女" : 1}

// 各种经验
for(let i=0; i < D.explist.length; i++){
    let n = D.explist[i]
    PC.exp[n] = 0
}


/* 当前事件中的次数/数量，今天总数，累计总数 c=current,t=today,a=alltime*/
PC.rec = {}
for(let i=0; i < D.dailyrec.length; i++){
    let n = D.dailyrec[i]

    if(i<=8)PC.rec[n] = { c: 0, t : 0};
    if(i>8)PC.rec[n] = { c: 0, t:0, a:0};    
}

PC.rec.产卵 = { tentacle:0, monster:0, slime:0}

PC.mark = {
    快乐 : clone(D.marksheet), 痛苦 : clone(D.marksheet),
    恐惧 : clone(D.marksheet), 耻辱 : clone(D.marksheet),
}

//皮肤上可刺青的图层
PC.skin = {}
for(let i=0; i< D.skinlayer.length; i++){
    let n = D.skinlayer[i]
    PC.skin[n] = null
}

//表情
V.PFace = {
    name    : "正常",
    eyebrow : "normal",    eyes    : "full",    mouth   : "smile",    frame   : null,
    tear    : false,    shy     : false,
    red     : false,    hurt    : false,
}

V.PFlag = {
    actmode : "free",

    /* 种族模样切换开关 */ 
    trueform : null, showmimi:null, showtail:null, showwing:null, showhorn:null,

    /* 状态记录开关 */
    疲劳 : 0, 营养不良: 0, 禁欲 : 0,  熬夜 : 0,  缺魔 : 0,

    /* 泌乳状态 */
    lactation : false,    lactatecd : 0,

    /* 裸露状态 */
    top      : 9,     bottom   : 4, 

    /* 浴精状态 */
    bukkake   : { body:false, face:false, hair:false, },

    /* 怀孕flag type:A怀孕还是正常怀孕 seed：孩子种类, father:父亲, phrase：阶段 date:预产期 */
    pregnant: { type:null, seed:null, phrase:null, date:null, },
}

PC.tcsv = {}
for(let i=0; i < D.tcsvflag.length; i++){
    let n = D.tcsvflag[i]
    PC.tcsv[n] = false
}
for(let i=0; i < D.tcsvnum.length; i++){
    let n = D.tcsvnum[i]
    PC.tcsv[n] = 0
}

//玩家角色对其他NPC的好感度
PC.favor = {
    lover:null, //目前的恋人
    bestfriend: null //挚交,最好的朋友,可以有三个?
}

}
