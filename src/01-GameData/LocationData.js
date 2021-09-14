D.list.locatags = [
    "无",

    "交通","公园","菜园","活动","停车场","景观","信仰","广场","餐厅","商店","便利店","仓库","夜店", 

    "家" , "厨房", "休息" , "沐浴" , "衣柜", "电脑" , "WIFI" , "学习" , "私宅" , //自己家是'家',别人家是私宅

    "更衣间","厕所","快餐","舞台","运动","移动餐车","移动摊位","通风口","下水道出入口","逃生口","电梯",

    "树丛","封闭","狭窄","开阔","高处","水源","地下","宽敞","藏匿点","历史", "神秘","特殊","光照","阴暗","风口","海边","高山","常雪","幻境","大道","小路",
]

D.list.mapgroup = [
    "通用","独立","特殊","幻境","异界",
    "怡安小区","嘉庆广场","中心大厦",
    "军事基地","大学城","度假村","影视基地",
    "工业园","游乐园","博物馆","西塘镇","城乡结合部",
    "大马岛", "柳明方向","长康方向","潘门方向","青松方向",
]

D.map = {}
D.mapdata = {}

/* 不属于特定地图的特有地点,而是哪里都可能有的通用地点 */
D.map.通用 = {
    公交站 : {
        place:"公交站", side:"室外", group: "通用",
        tag:["交通","大道"],
        chara:[],
        bus:true, bike: true,
        img:"busstop",
        situation:[],
    },
    地铁站 : {
        place:"地铁站", side:"室内", group: "通用",
        tag:["交通","地下"],
        chara:[],
        subway:true,
        img:"subway",
        situation:[],
    },
    加油站 : {
        place:"加油站", side:"室外", group: "通用",
        tag:["交通","厕所","停车场"],
        chara:[],
        car:true,
        img:null,
        situation:[],
    },
    更衣间 : {
        place:"更衣间", side:"室内", group: "通用",
        tag:["更衣间","狭窄"],
        chara:[], 
        img:"tryon",
        situation:[],
    },
    浴室 :{
        place:"浴室", side:"室内", group: "通用",
        tag:["沐浴","狭窄"],
        chara:[],
        img:"bathroom",
        situation:[],
    },
    AW服装店 : {
        place:"A&W", side:"室内", group: "通用",
        tag:["服装店","更衣间"],
        chara:[],
        img:"AWclothes",
        description(){
            return "知名日常品牌A&W的卖场。形形色色的商品让人眼花缭乱。";
        },
        situation:[],
    },
    汉堡王  : {
        place:"汉堡王", side:"室内", group: "通用",
        tag:["快餐","休息"],
        chara:[],
        img:"burgerking",
        description(){
            return "知名连锁快餐店汉堡王。就是卖各种汉堡的地方。";
        },
        situation:[],
    },
}

//先开放一个区域的地图
//数值是各地点所在位置, 移动时间计算两个数值之间的差
//公交车将移动时间缩减 5倍 +- 5,最少5分钟一趟
D.mapdata.景南市 = {
    单身公寓:{
        links:{  浴室:1, 阳台:1, 客厅:0, 睡房:1,  },
        index: "怡安小区",
    },
    怡安小区:{
        links:{  怡安小区:0, 单身公寓:5,小区公园:2, 共享菜园:1, 公交站:-1, },
        index:"南兴区",
        },
    嘉庆广场:{
        links:{ 嘉庆广场: 0, AW服装店:5, 汉堡王: 5, 公共厕所: 3, 停车场: -5, 地铁站: -3, 公交站: 2, },
        index: "南兴区",
    },    
    商业街:{
        links:{  商业街: 0, 早餐店: 3, 文具店: 2, 茶餐厅: 4, 蔬果店: 1, 药店: 5, 中医馆: 6,},
        index: "南兴区",
    },

    南兴区:{
        links: {
            怡安小区: 0, 箱庭托儿所: 10, 商业街: 12, 市十三中: 25, 嘉庆广场: 20, 金福酒家: 30, 市十三医院: 150, 派出所: 100, 消防所: 120,
        },
        index:"景南市",
    }

}

D.map.景南市 = {}

D.map.景南市.怡安小区 = {
    怡安小区 : {
        place:"怡安小区", side:"室外", group:"怡安小区",
        tag:["交通","WIFI",],
        chara:[], 
        bus:true, subway:true, car:true, bike:true,
        homebutton: true,
        img:"neiborhood",
        description(){
            return "位于景南市南兴区的一个住宅小区。<br>现代化设计的公寓高楼林立在住宅园区内，道路两侧种满了花草树木。小区中央有个公园，"+(V.Flag.chaos < 15 ? "时不时有人散布经过。" : "但已经没人在外散步。")+"<br>从小区大门往大道走，就能到达嘉庆广场和地铁站。小区门口的巴士站也能通向景南市各区。交通十分方便。<br>";
        },
        situation:[]
    }, 
    单身公寓 : {
        place:"单身公寓", side:"室内", group:"怡安小区",
        tag:["家","煮食","休息","沐浴","衣柜","电脑","WIFI"], 
        chara:[], 
        img:"singleapartment",
        situation:[
            {id:0, series:"城市生活", phrase: 5, display:"content", /* display里是事件文本放置的位置，before是前置文本，content是正文，after是后置文本+选项 */
             condition(){
                 if(V.days <= 7) return "城市生活_1";
                 else if(V.days <= 14) return "城市生活_2";
                 else if(V.days <= 28) return "城市生活_3";
                 else if(V.Flag.chaos < 20) return "城市生活_4";
                 else return "城市生活_5";
             }},
            {id:1, series:"有宠物的日子", phrase: 5, display:"before",
             condition(){
                 if(V.pet.active) return "宠物的日常_1"; /* 随机状况的话…… 直接 return either('事件A'，'事件B','事件C')*/
             }},              
        ]},

    小区公园 : {
        place:"小区公园", side:"室外", group:"怡安小区", passage: "怡安小区公园",
        tag:["公园","树丛","活动场所","WIFI"],
        chara:[], 
        bike:true, homebutton: true,
        img:"neiborhood_park",
        description(){
            let text = "绿意盎然，四周都种着花草树木。最吸引人的是南面一侧的用假山搭造的山泉景。<br>";
            if(V.Flag.chaos < 15) return text+"公园中央有个宽敞的小广场，偶尔会有大妈们在这里跳舞。<br>西面有儿童玩耍的设施。时不时能听到孩子们的欢声笑语。<br>";
            else return text+"公园中央有个宽敞的小广场，现在只有心大的年轻人会在这里活动。<br>";
        },
        situation:[]
    },

    共享菜园 : {
        place: "共享菜园", side: "室外", group: "怡安小区",
        tag: ["光照", "菜园"],
        chara: [],
        img: "neiborhood_park",
        homebutton: true,
        description(){
            return "为了满足小区住户种植需求而特地建造的一个小菜园。"
        }
    },
    公交站 : D.map.通用.公交站
}

D.map.景南市.嘉庆广场 = {
    嘉庆广场 : {
        place:"嘉庆广场", side:"室外", group: "嘉庆广场",
        tag:["交通","商业广场","活动场所"],
        chara:[],
        bus:true, subway:true, car:true, bike:true,
        img:"yiansquare",
        description(){
            let text = "位于怡安小区东面的一个中型商业广场。<br>广场主体面积占地近12万平方米，周围都种着树木，同时路边都有适合乘凉休息的桌椅和小亭。<br>最引人瞩目的是，并排在南面入口广场两侧的、树龄上百的木棉花树，";
            if(V.Flag.chaos < 15) return text+"每到花期会引来不少人聚集，广场上也会摆满小摊，让人一边享受美食一边观赏花景。<br>";
            else return text + "，附近时不时会有人聚众闹事。";
        },
        situation:[
            {id:0, series:"商场的日常风景", phrase:3, display:"before",
             condition(){
                 if(V.Flag.chaos < 15) return "商场的日常风景_1";
             }},

            {id:1, series:"商场闲逛", phrase:3, display:"content",
             condition(){
                 if(V.Flag.chaos < 15) return "商场闲逛_1";
             }},
        ],
    },
    景润超市 : {

    },
    AW服装店: D.map.通用.AW服装店,
    汉堡王: D.map.通用.汉堡王,
    公共厕所: D.map.通用.公共厕所,
    停车场: D.map.通用.停车场,
    地铁站: D.map.通用.地铁站,
    公交站: D.map.通用.公交站,
}