D.list = {
    态度 : {"正常":2,"开放":4,"保守":1},
    体型 : {"普通":2,"高大":3,"娇小":1},
    胸型 : {"平坦":0,"微隆":1,"贫乳":2,"普乳":3,"巨乳":4,"魔乳":5},
    臀型 : {"窄小":1,"普通":2,"圆润":3,"丰臀":4,"安产":5},
    发长 : {"齐耳短发":50,"及脖中发":100,"及肩中发":250,"及胸长发":500,"及腰长发":800},
基础发型 : {"自然":"natural","卷发":"curly","直发":"straight"},
    眼型 : ["普通","吊眼","垂眼"],
    感度 : {钝感:0.2, 普通:1, 敏感:2, 较敏感: 4, 十分敏感: 6},
    阴茎 : {迷你:[0,6], 短小:[7,10], 普通:[11,15], 粗长:[16,18], 巨大:[19,24]},

    性别 : ["伪娘","扶她","少年","少女"],
    种族 : ["人类","兽族","灵族","羽族","夜族","龙族"],
    专长 : ["文艺创作","物理科学","自然科学","生理科学","音乐表演","运动格斗"],
初期角色 : ["魔法少女","爱抖露","修仙者"],
    兽型 : ["cat","dog","wolf","fox","deer","sheep","cow"],
    
    肤色 : ["dark","black","mugi","health","white","pale","gold","yoru","furry"],
    发色 : ["black","darkbrown","wine","brown","milktea","blond","softblond","platinum","silver","white","purple","green","blue","aqua","pink","red","orange"],
    瞳色 : ["black","brown","emerald","green","blue","aqua","purple","white","amber","red","lightgreen","lightpurple"],

    /* 特殊素质，部分可在游戏开始时选择，部分需要通过游戏达成 */
    素质 : ["菜鸟","天使心","倾国倾城","轻浮","人气","经商头脑","泌乳体质","好色","淫乱","肉便器","抖M体质","被虐倾向","被虐狂","触手的俘虏","触手的苗床","露出癖","暴露狂","反抗","顺从","奴隶","玩具","福瑞爱","瘾君子","兽耳","兽角","兽尾","利爪","OMEGA"],

    /* 初期头衔无buff，通过成就获得的头衔装备时，可以获得对应的buff*/
    头衔 : ["菜鸟勇者","爱抖露","小道童","富二代","二次元","魔法少女","直播主","顶流爱豆","穿越者","超脱者","武术大师","奥术大师","保卫者","恐怖分子","老司机","打工仔","守财奴"],
}

D.pcstatelist = [
    //日常状态
    "睡眠","好心情","满足",

    //日常负面状态
    "疲劳","生病","缺魔","失眠","营养不良","欲求不满","发情"/* 指兽人发情期 */,

    //精神状态
    "自闭","精神崩溃","梦魇","毒瘾发作","性瘾发作",

    //战斗状态
    "失明","耳聋","石化","束缚","口球","眼罩","伤痕","重伤",

    //怀孕和特殊
    "怀孕","肠内受孕","寄生","中毒",
]

D.eventflag = [
    "预知梦","穿越者","非人类"
]

/* 精神刻印，心灵创伤。MAX5。满了就失去对应的抵抗力。
    无法完全消除，但只要还没满级就可以接受催眠来降低等级。每个刻印最多可以接受5次治疗。
    当前等级、历史最高等级、刻印的成因（会被最新的覆盖），通过催眠治疗压制的次数。
*/

D.marksheet = { lv : 0,   max : 0,  fac : "无",   hyp : 0 }

D.explist = [
    "打工","下厨","清扫","唱歌","演戏",
    "舞台","直播","交涉","销售",
    "探索","狩猎","钓鱼",  
 
    "战斗","战败","诱惑","被诱惑","被猥琐",
 

    "射精","高潮",
    "M高潮","B高潮","C高潮","U高潮","V高潮","A高潮","多重高潮",
    "自慰","口交","性交","肛交","喷乳",
    
    "被猥琐","被眠奸","被迷奸","被强奸","被轮奸","被兽奸","被触手奸",
    "兽交","触手","史莱姆",
    
    "怀孕","A怀孕","分娩","尿道开发","阴道扩张","肛门扩张",
    
    "产卵","寄生","监禁","SM"
]

D.recordlist = [
    /* 行为 */
    "洗澡",  "上厕所",  "健身",  "自拍",  "自慰",

    /* 时间累计 */
    "总游戏时间",  "总健身时间",  "总睡眠时间",
    "总泡澡时间",

    /* 消费 */
    "衣物",  "食物",  "药物",  "道具",  "武器",  "辅助物品",  "素材",
    "性爱玩具",

    /* 细节记录 */
    "工作被投诉",    "洗过的碗筷",    "卖出物品",

    "被打赏累计",       "点赞",
    "画作发表数",    "更新的小说文字量",
    "演出主角",    "演出配角",    "演出龙套",   "被私生粉堵门",

    "舔过的脚",     "舔过的屁眼",    "含过的丁丁",    "挨操",
    "尝试反攻",    "反攻成功",    "反攻失败",

    "杀人",    "杀怪物",    "杀不可名状之物",
    "吃触手",    "吃史莱姆",    "吃虫子",
    "异常经验",
]

D.tcsvflag = [ //true | false
    "入浴", "休息", "工作", "学习",
    "今天上过厕所了", "今天洗过澡了", "今天自慰过了",
    "安全套",
]

D.tcsvnum = [ // Number
    "贤者时间", "饱腹","睡眠深度",
]

/*其他使用的 TCSV, 不会在初始化时写入的列表:
各种刻印获得确认, 高潮确认, 射精确认, 处女/童贞丧失确认

*/
D.dailyrec = [
    "高潮", "射精", "喷乳", "A高潮", "M高潮", "B高潮", "C高潮", "V高潮", "U高潮",
    "浴精", "饮精", "肛内射", "内射", "射精", "产卵"
]

D.skinlayer = [
    '额头','脸颊','锁骨','左胸','右胸','后脖根',
    '左臂','右臂','腹部','背部','腰窝',
    '左臀','右臀','左腿','右腿',
]

D.NPCbase = {
    渴望:[0,1000], 快感:[0,1000],
    愤怒:[0,1000], 射精:[0,1000],
    满意:[0,1000],
    快M  : [0,1000],  快B  : [0,1000],  快C  : [0,1000],
    快V  : [0,1000],  快U  : [0,1000],  快A  : [0,1000],
}

D.NPCsource = {
    渴望:0,     快感:0,
    愤怒:0,     射精:0,
    满意:0,
    快M  : 0,  快B  : 0,  快C  : 0,
    快V  : 0,  快U  : 0,  快A  : 0,
}

D.NPCflag = {
    intro : 0,
    encount : 0,
    event : 0,
    date : 0,
}

D.NPCsheet = {
    CID : "0",     名字 : "NPC",     性别 : "男",
    type : 1,  /* 行为模式 */   

    genital : { "阴茎":18, "子宫":null},
    vaginity : {"初吻":0, "童贞":0,"处女":0,"A处女":1},
    好感 : 0,     信赖 : 0,    欲望 : 0,     依存 : 0,    支配 : 0,
    items : {},  /* 持有道具 */     equip : {}, /* 身上的穿着 */
    avatar: {},

    rpg: {},  state : {},
    base : {},     source : {},     cflag : {},

    money: 10000, point: 500,
    follow: 1, follower:1000,
    schedule : {},
}

/* SP作为防御方=性抵抗力，作为攻击方=精力 */
D.pet = {
    史莱姆 : {
        name:"史莱姆", type:"史莱姆",
        level:1, 
        HP:[50,50], SP:[200,200], MP:[200,200],
        ATK:3, DEF:18, MATK:4, MDEF:8, SPD:3,

        好感:100, 忠诚:10, 欲望:10, 支配:0,

        gender:"m", genital: {"阴茎":16, "子宫":null},
        genitype: "史莱姆",
        special: ["液态"],

        base: clone(D.NPCbase),
        sourse:clone(D.NPCsource),
        state: {},
        active:false,
        flag:{},
    },

    魔狼 : {
        name:"魔狼", type:"魔狼", 
        level:1,
        HP:[200,200], SP:[100,100], MP:[100,100],
        ATK:10, DEF:5, MATK:5, MDEF:5, SPD:12,

        好感:20, 忠诚:80, 欲望:20, 支配:0,

        gender:"m", genital: {"阴茎":24, "子宫":null},
        genitype: "狼阴茎",
        special: ["变身"],

        base: clone(D.NPCbase),
        sourse:clone(D.NPCsource),
        state: {},
        active:false,
        flag:{},
    },

    灵虫 : {
        name:"灵虫", type:"灵虫", 
        level:1,
        HP:[500,500], SP:[100,100], MP:[150,150],
        ATK:2, DEF:10, MATK:2, MDEF:15, SPD:1,

        好感:0, 忠诚:20, 欲望:100, 支配:0,

        gender:"m", genital: {"阴茎":24, "子宫":null},
        genitype: "幽灵触手",
        special: ["再生"],

        base: clone(D.NPCbase),
        sourse:clone(D.NPCsource),
        state: {},
        active:false,
        flag:{},
    }
}

//CharaMaking Sheet

D.CMlist = {}

D.CMlist.GenderTag = {
    CN: ["伪娘","扶她","少年","少女"],
    EN: { Trap:"伪娘", Futa:"扶她", Boy:"少年", Girl:"少女" }
}

D.CMlist.title = {
    CN: {魔法少女:1, 小爱豆:2, 修仙者:3},
    EN: {MagicalGirl:1, Idol: 2, Xiuxianer:3},
}

D.CMlist.atti = {
    CN: {正常:2, 开放:4, 保守:1},
    EN: {Normal:2, Accept:4, Guard:1},
}

D.CMlist.race = {
    CN: { 适应力: '人类', 兽耳: '兽族', 魔纹: '灵族', 羽翼:'羽族', 蓝肤:'夜族'},
    EN: { Adaptable: '人类', Kemomimi: '兽族', Ancient: '灵族', Feather : '羽族', Nightar: '夜族'},
}

D.CMlist.major = {
    CN: ["文艺创作","物理科学","自然科学","生理科学","音乐表演","运动格斗"],
    EN: {Creative: "文艺创作", Science: "物理科学", Natural: "自然科学",
        Biologic: "生理科学", "PerformanceArts" : "音乐表演", Sports: "运动格斗"}
}

D.CMlist.body = {
    CN: {"普通":2,"高大":3,"娇小":1},
    EN :{"Normal":2,"Tall":3,"Tiny":1},
}

D.CMlist.skin = {
    CN: {"健康":"health","白皙":"white","麦色":"mugi","棕色":"dark","黝黑":"black","苍白":"pale"},
    EN: ['health','white','mugi','dark','black','pale']
}

D.CMlist.furtype = {
    CN: {"猫":"cat","狗":"dog","狼":"wolf","狐":"fox","鹿":"deer","羊":"sheep","牛":"cow"},
    EN : ["cat","dog","wolf","fox","deer","sheep","cow"],
}

D.CMlist.breast = {
    CN: {"平坦":0,"微隆":1,"贫乳":2,"普乳":3,"巨乳":4,"魔乳":5},
    EN: {"Flat":0,"Pudding":1,"Small":2,"Normal":3,"Big":4,"Huge":5},
}

D.CMlist.butts = {
    CN: {"窄小":1,"普通":2,"圆润":3,"丰臀":4,"安产":5},
    EN: {"Slim":1,"Normal":2,"Cushioned ":3,"Rounded":4,"Wide":5},
}

D.CMlist.haircolor = {
    CN: {"黑色":"black","深棕色":"darkbrown","酒红色":"wine","棕色":"brown","奶茶色":"milktea","金色":"blond","米黄色":"softblond","白金色":"platinum","银色":"silver","纯白色":"white","紫色":"purple","绿色":"green","蓝色":"blue","水色":"aqua","粉色":"pink","红色":"red","橙色":"orange"},
    EN: ["black","darkbrown","wine","brown","milktea","blond","softblond","platinum","silver","white","purple","green","blue","aqua","pink","red","orange"]
}

D.CMlist.hairlength = {
    CN: {"齐耳短发":50,"及脖中发":100,"及肩中发":250,"及胸长发":500,"及腰长发":800},
    EN: {"Short":50, "Medium":100, "Shoulder":250,"Long":500,"Verylong":800}
}

D.CMlist.hairstyle = {
    CN: {"自然":"natural","卷发":"curly","直发":"straight"},
    EN: ['natural','curly','strainght'],
}

D.CMlist.eyecolor = {
    CN: {"黑色":"black","棕色":"brown","碧绿色":"emerald","绿色":"green","淡绿色":"lightgreen","蓝色":"blue","水色":"aqua","紫色":"purple","淡紫色":"lightpurple","银色":"white","金色":"amber","红色":"red"},
    EN : ["black","brown","emerald","green","blue","aqua","purple","white","amber","red","lightgreen","lightpurple"],
}

D.CMlist.eyetype = {
    CN: {"普通":1,"吊眼":2},
    EN: {"Round":1,"Sharp":2}
}

D.equipsheet = {
	hat     : null,     neck    : null,	    face : null,
	outter  : null,	    over_up : null,     inner_up: null,
    hand    : null,     over_bt : null,     inner_bt: null,
    shoes   : null,     legs    : null,
    back    : null,
    hairfront : "natural",    hairback  : "straight",
    emote     : "正常",

    /* 特殊装备，不属于衣服，而是属于道具装备的范围 */
    vagina : null, penis: null, ureth: null, anal: null,
    nipple : null,
}

D.avatarsheet = {
    frame       : null,
    addon       : {body:false,bottom:false,face:false,hair:false,mouth:false,penis:false},
        
    neck        : null, hand        : null, face        : null,
    hat         : null, outter      : null, over_up     : null,
    over_bt     : null, inner_up    : null, inner_bt    : null,
    shoes       : null, legs       : null,

    emoadd      : {tear:false, shy:false, red:false, hurt:false},

    eyebrow     : null, hairfront   : null, kemofront: {mimi:null, horn:null}, eyes : null,
    mouth       : null, tatoos      : null, dick       : null,
    penis       : null, nipple      : null, plus       : null,
    body        : null, hairback    : null, kemoback: {wing:null, tail:null},  back : null,
    background  : null,
}