//-- 游戏系统环境设定 
T.startTime = new Date().getTime()
T.startTime = new Date(T.startTime).toLocaleString()

V.Flag = {}
V.TFlag = {}
V.PFlag = {}
V.BFlag = {}
V.CFlag = {}
V.EFlag = {}
V.COM = {}
V.Base = {}
V.Source = {}
V.TCSV = {}
V.PC = {}
V.temp = {}
V.gametime = {hour:0, min:0, sec:0, day:0}

if(StartConfig.debug){
    V.debug = true
}else{
    V.debug = false
}

V.coredebug = false
V.COM.current = null

V.lang = "CN"

V.event = {
    type : "主线", name : "开幕", branch : "初次" , phrase: null,
}

V.eventexit = "你的家 单身公寓"
V.count = 0
V.eventend = false
V.eventnext = 0
V.anounce = {flag:false, text:"", type:"弹出通知"}

V.bookmark = {}
V.titles = {
    菜鸟: T.startTime,
}
V.achivement = {
    locked: false,
    points: 0,
    achived:{
        首次游戏:T.startTime,
    },
    loop:0,
}

//初始化游戏数据
F.InitGame = function(){

    V.intro = true; V.tutorial = false;

    // 总日数
    V.days = 1

    //不会因为时间进程而reset, 只有睡觉休息时才reset
    V.time = {
        wakeup:540, passed:540, stock:0 
    }

    // 日期相关
    V.date = {
        year : 2024,    month : 7,      day : 1,    week : 1,
        time : 540,     hour : 9,       min : 0,
        zone : "上午",  weekday : "周一",
        season: "夏",
    }

    // 天气相关
    V.weather = {
        C: 27,  now: "晴朗",  next:"晴朗",
        future:[]  //通过天气系统初始化 T▽ T
    }

    // 各种声望
    V.fame = {
        brave : 0,   /* 作为勇者的名声，影响主线任务发展和描述，也影响被强奸的概率 */
        slut  : 0,   /* 作为荡妇的名声，改变路人对主角的描述 */
        idol  : 0,   /* 作为偶像明星、网红的名声，对收入有影响 */
        rape  : 0,   /* 在强奸犯中的知名度，影响强奸率 */
        social: 0,   /* 在社交圈里的地位 */
        business:0,  /* 商业名声 */
    }

    // 商店种类
    V.shoptype = []; V.showcase = null;

    //Avatar
    V.avatar = {
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

    V.tryon = {
        neck        : null, hand        : null, face        : null,
        hat         : null, outter      : null, over_up     : null,
        over_bt      : null, inner_up    : null, inner_bt    : null,
        shoes       : null, legs       : null,
    }

    V.items = {
        foods: { 汉堡包:[], 可乐: [], }, medicine: {}, sextoy: {}, weapon: {}, accesory: {}, 
        material: {}, important:{}, other:{},
    }

    // 衣柜。身上的衣服会从衣柜里取出来放到 Equip里
    V.closet = {
        outter : [null,],       over_up : [null,],      over_bt : [null,],
        inner_up : [null,],     inner_bt : [null,],
        shoes : [null,],        legs : [null,],

        hat : [null,],      face : [null,],     neck : [null,],
        hand : [null,],     back : [null,],
        slot:{
            level:1,
            outter:5, over_up:10, over_bt:10, inner_up: 10, inner_bt: 10,
            shoes:10, legs:10, hat:5, face:5, neck:5, hand:5, back:5,
        }
    }

    //地点信息
    V.city = "景南市"
    V.mapgroup = "怡安小区"
    V.location = "单身公寓"
    V.local = D.map.景南市.怡安小区.单身公寓

    V.map = D.mapdata.景南市.怡安小区

    //宠物
    V.pet = clone(D.pet.史莱姆)

    //获取成就等
    if("EWA.Achivement" in localStorage){
        getAchivement()
        getGallery()        
    }
    else{
        updateAchivement()
        updateGallery()
    }
}

F.InitRecord = function(){

    /* 各种记录 */
    V.log = {
        dairy:[], anouce:[], remind:[],
    }

   V.record = {}
    for(let i=0; i<D.recordlist.length; i++){
        let n = D.recordlist[i]
        V.record[n] = 0
    }
}
