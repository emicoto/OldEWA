D.list.locatags = [
    "无",

    "交通","公园","菜园","活动","停车点","景观","信仰","广场","餐厅","商店","便利店","仓库","夜店", "营业",

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
        open: 300, close: 60,
        chara:[],
        bus:true, bike: true,
        img:"busstop",
        situation:[],
    },
    地铁站 : {
        place:"地铁站", side:"室内", group: "通用",
        open: 300, close: 60, 
        tag:["交通","地下"],
        chara:[],
        subway:true,
        img:"subway",
        situation:[],
    },
    加油站 : {
        place:"加油站", side:"室外", group: "通用",
        tag:["交通","厕所","停车点"],
        chara:[],
        car:true,
        img:"gasstation",
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
    卧室 :{
        place:"卧室", side:"室内", group: "通用",
        tag:["休息","学习","电脑"],
        chara:[],
        img:"bedroom",
        situation:[],
    },
    公共厕所 : {
        place:"公共厕所", side:"室内", group:"通用",
        tag:["厕所","狭窄"],
        chara:[],
        img:"pubtoilet",
        situation:[],
    },
    停车场 : {
        place:"停车场", side:"室外", group:"通用",
        tag:["停车点","宽敞"],
        chara:[],
        img:"parking",
        situation:[],
    },
    地下停车场 : {
        place:"地下停车场", side:"室内", group:"通用",
        tag:["停车点","宽敞","地下","通风口"],
        chara:[],
        img:"ugparking",
        situation:[],
    },
    AW服装店 : {
        place:"AW服装店", side:"室内", group: "通用",
        open:600, close: 1110, 
        tag:["服装店","更衣间","营业"],
        chara:[],
        img:"AWclothes",
        description(){
            return "知名日常品牌A&W的卖场。形形色色的商品让人眼花缭乱。";
        },
        situation:[],
    },
    汉堡王  : {
        place:"汉堡王", side:"室内", group: "通用",
        open: 360, close: 1380, 
        tag:["快餐","休息","营业"],
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
        links:{  阳台:-1, 单身公寓:0, 浴室:1,  睡房:1,  },
        index: "怡安小区", enter:"单身公寓",
    },
    怡安小区:{
        links:{ 单身公寓:5, 怡安小区:0, 小卖部:-5, 小区公园:2, 共享菜园:1, 公交站:-3, },
        index:"南兴区", enter: "怡安小区",
        },
    嘉庆广场:{
        links:{  嘉庆广场: 0, 地下停车场: -5, 停车场:1, 公交站: 2, 地铁站: -3, 汉堡王: -1, 景润超市:-4, 公共厕所: 3, AW服装店:5,},
        index: "南兴区", enter:"嘉庆广场",
    },    
    商店街:{
        links:{ 商店街: 0, 公交站:1, 生鲜市场: -15, 五金店: -2, 旺记茶铺: 2, 天地书店: 3, 开封菜: 4, 药店: 5, 发廊: 8 ,中医馆: 10, 逸安武馆: 13,},
        index: "南兴区", enter:"商业街",
    },

    //位于公交站或地铁站时是不会有 移动按钮. 而是显示路线图, 直接到全市各个站点.
    南兴区:{
        links: {
            公交站:0, 地铁站:15, 怡安小区: 0, 商店街: -12, 箱庭幼儿园: -10,  嘉庆广场: 15, 市十三中: 30, 金福酒家: 40, 市第七医院: 150, 派出所: 100, 消防所: 120, 
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
            return "位于景南市南兴区的一个住宅小区。<br>现代化设计的公寓高楼林立在住宅园区内，道路两侧种满了花草树木。小区中央有个公园，"+(Flag.chaos < 15 ? "时不时有人散布经过。" : "但已经没人在外散步。")+"<br>从小区大门往大道走，就能到达嘉庆广场和地铁站。小区门口的巴士站也能通向景南市各区。交通十分方便。<br>";
        },
        situation:[]
    }, 
    单身公寓 : {
        place:"单身公寓", side:"室内", group:"怡安小区", passage:"你的家 单身公寓",
        tag:["家","煮食","休息","沐浴","衣柜","电脑","WIFI"], 
        chara:[], 
        img:"singleapartment",
        description(){
            return "一个60平方米左右的单身公寓。简约现代风的装修，巨大的落地窗，还有一个阳台，两个人住也相当舒适的公寓。"
        },
        situation:[
            {id:0, series:"城市生活", phrase: 5, display:"content", /* display里是事件文本放置的位置，before是前置文本，content是正文，after是后置文本+选项 */
             condition(){
                 if(V.days <= 7) return "城市生活_1";
                 else if(V.days <= 14) return "城市生活_2";
                 else if(V.days <= 28) return "城市生活_3";
                 else if(Flag.chaos < 20) return "城市生活_4";
                 else return "城市生活_5";
             }},
            {id:1, series:"有宠物的日子", phrase: 5, display:"before",
             condition(){
                 if(V.pet.active) return "宠物的日常_1"; /* 随机状况的话…… 直接 return either('事件A'，'事件B','事件C')*/
             }},              
        ]},

    小区公园 : {
        place:"小区公园", side:"室外", group:"怡安小区", passage: "怡安小区公园",
        title: "怡安小区 - 公园",
        tag:["公园","树丛","活动场所","WIFI"],
        chara:[], 
        bike:true, homebutton: true,
        img:"neiborhood_park",
        description(){
            let text = "绿意盎然，四周都种着花草树木。最吸引人的是南面一侧的用假山搭造的山泉景。<br>";
            if(Flag.chaos < 15) return text+"公园中央有个宽敞的小广场，偶尔会有大妈们在这里跳舞。<br>西面有儿童玩耍的设施。时不时能听到孩子们的欢声笑语。<br>";
            else return text+"公园中央有个宽敞的小广场，现在只有心大的年轻人会在这里活动。<br>";
        },
        situation:[]
    },

    小卖部 : {
        place: "小卖部", side:"室外", group: "怡安小区", passage: "虹猫小店",
        title: "虹猫小店",
        open: 360, close:1200,
        tag:["便利店","移动摊位","营业"],
        chara:[],
        bike:true,
        img:"conbini",
        description(){
            return "小区门前的便利店。基本的生活用品都能在这里找到。便利店旁时不时会有贩卖各种熟食的小摊。"
        }
    },

    虹猫小店 : {
        place: "虹猫小店", side:"室内", group:"怡安小区", passage:"虹猫小店-内部",
        open: 360, close:1200,
        tag:["便利店","移动摊位","营业"],
        chara:[],
        bike:true,
        img:"conbini_inter",
    },

    共享菜园 : {
        place: "共享菜园", side: "室外", group: "怡安小区",
        title:"怡安小区 - 菜园",
        tag: ["光照", "菜园"],
        chara: [],
        img: "saien",
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
        tag:["交通","商业广场","活动场所","停车点","移动摊位","移动餐车"],
        open: 600, close:1260,
        chara:[],
        bus:true, subway:true, car:true, bike:true,
        img:"yiansquare",
        description(){
            let text = "位于怡安小区东面的一个小型商业广场。<br>广场主体面积占地几万平方米，周围都种着树木，同时路边都有适合乘凉休息的桌椅和小亭。<br>最引人瞩目的是，并排在广场两侧的、树龄上百的木棉花树，";
            if(Flag.chaos < 15) return text+"每到花期会引来不少人聚集，广场上也会摆满小摊，让人一边享受美食一边观赏花景。<br>";
            else return text + "，附近时不时会有人聚众闹事。";
        },
        situation:[
            {id:0, series:"商场的日常风景", phrase:3, display:"before",
             condition(){
                 if(Flag.chaos < 15) return "商场的日常风景_1";
             }},

            {id:1, series:"商场闲逛", phrase:3, display:"content",
             condition(){
                 if(Flag.chaos < 15) return "商场闲逛_1";
             }},
        ],
    },
    景润超市 : {
        place:"景润超市", side:"室内", group: "嘉庆广场",
        tag:["交通","商店","快餐","通风口","逃生口","营业"],
        open: 600, close: 1200,
        chara:[],
        subway:true,
        img:"supermark",
        description(){
            return "大型超市，各色商品琳琅满目。"
        },
        situation:[],
    },
    AW服装店: D.map.通用.AW服装店,
    汉堡王: D.map.通用.汉堡王,
    公共厕所: D.map.通用.公共厕所,
    停车场: D.map.通用.停车场,
    地下停车场: D.map.通用.地下停车场,
    地铁站: D.map.通用.地铁站,
    公交站: D.map.通用.公交站,
}

D.map.景南市.商店街 = {
    商店街 : {
        place: "商店街", side: "室外", group: "商店街", passage: "宜兴步行街",
        title:"宜兴商业步行街",
        tag: ["交通","停车点","移动摊位","移动餐车","下水道出入口"],
        chara: [],
        img: "shoutenkai",
        bus: true, bike: true, car: true,
        description(){
            return "怡安小区南面的宜兴步行街。都是老街坊开的店了，建筑复古，烟火气十足。"
        },
        situation:[],
    },
    生鲜市场 : {
        place:"生鲜市场", side:"室外", group:"商店街",
        title:"宜兴菜市场",
        tag: ["下水道出入口","宽敞","停车点"],
        open: 270, close:1080,
        chara: [],
        img: "ichiba",
        bike: true, car: true,
        description(){
            return "这一带的本地生鲜市场，价格比超市的便宜还新鲜，只是卫生环境比超市差。"
        },
        situation:[],
    },
    五金店 : {
        place: "五金店", side: "室内", group: "商店街",
        title:"百合五金铺",
        tag: ["商店","营业"],
        open: 570, close:1080,
        chara: [],
        img: "gokin",
        bike: true, car: true,
        description(){
            return "相当有年代感的老建筑，贩售的工具十分齐全。"
        },
        situation:[],
    },
    //五金店能学开锁技能

    旺记茶铺 : {
        place: "旺记茶铺", side:"室内", group:"商店街",
        tag: ["餐厅","休息","营业"],
        open: 570, close: 1230,
        chara: [],
        img: "chashi",
        bike: true, car: true,
        description(){
            return "这附近的比较知名的茶点店。除了各种特色小点心，凉茶和糖水也很知名。"
        },
        situation:[],
    },
    天地书店 : {
        place: "天地书店", side: "室内", group: "商店街",
        tag: ["商店","WIFI","休息","营业"],
        open: 510, close: 1140,
        chara: [],
        img: "bookstore",
        bike: true, car: true,
        description(){
            return "这附近的老牌书店，同时是一个网红店。开放式的两层结构，加上星光般的点点灯光，充满了浪漫氛围。除了图书，也有各种文具周边贩售。"
        },
    },
    开封菜 : {
        place: "开封菜", side: "室内", group: "商店街",
        tag: ["餐厅","厕所","营业"],
        open: 660, close: 1290,
        chara: [],
        img: "famiresu",
        bike: true, car: true,
        description(){
            return "具有本地特色的家庭餐馆。"
        },
        situation:[],
    },
    药店 : {
        place: "药店", side: "室内", group: "商店街",
        tag: ["商店","营业"],
        title:"健康药房",
        open: 450, close: 1110,
        chara: [],
        img: "phamacy",
        bike: true, car: true,
        description(){
            return "到处可见的连锁药店。常用的药物这里都有。"
        },
        situation:[],
    },
    发廊 : {
        place: "发廊", side: "室内", group: "商店街",
        tag: ["理发","美容","厕所","营业"],
        title:"梦丽沙龙",
        open: 600, close: 1320,
        chara: [],
        img: "hairsalon",
        bike: true, car: true,
        description(){
            return "这附近唯一的一家发廊。现代化的装修为这家有点年纪的发廊增添了些许时尚感。除了理发，也做点美容护肤、推拿按摩之类的活。"
        },
        situation:[],
    },
    中医馆 :{
        place: "中医馆", side: "室内", group: "商店街", title:"柳安堂",
        tag: ["医疗","营业"],
        open: 480, close:1020,
        chara: [],
        img: "zhongyi",
        bike: true, car: true,
        description(){
            return "这一带比较知名的中医馆。现代化的中式装修，平静沉稳的色调能让人放松下来。"
        },
        situation:[],
    },
    逸安武馆 : {
        place: "逸安武馆", side: "室内", group: "商店街",
        tag: ["武馆","比武","江湖人士"],
        open: 270, close: 1080, //晚上六点后就不开学堂了
        chara: [],
        img: "dojo",
        bike: true, car: true,
        description(){
            if(Flag.chaos < 15) return "古色古香的武馆。这里能学习到真功夫。";
            else return "附近有志之士的大本营。在杨馆主的镇压下这附近还算安稳。"
        },
        situation:[],
    },
    公交站 : D.map.通用.公交站,
}

D.map.景南市.南兴区 = {
    箱庭幼儿园 : {
        place: "箱庭幼儿园", side: "室外", group: "南兴区",
        tag: ["托儿所","儿童","大道","光照","停车点","营业"],
        open: 540, close: 960,
        chara: [],
        img: "kidsgarden",
        bike: true, car: true, bus:true,
        description(){
            return "这附近的一所中型幼儿园。明亮的色彩十分讨喜。"
        },
        situation:[],
    },
    市十三中 : {
        place: "市十三中", side: "室外", group: "南兴区",
        tag: ["学校","学习","大道","光照","停车点"],
        open: 360, close: 1320,
        chara: [],
        img: "qischool",
        bike: true, car: true, bus:true,
        description(){
            return "公立中学。虽然是建立在市镇中的学校，但占地面积也相当大。"
        },
        situation:[],
    },
    金福酒家 : {
        place: "金福酒家", side: "室内", group: "南兴区",
        tag: ["餐厅","大道","停车点","休息","厕所","营业"],
        open: 540, close: 1320,
        chara: [],
        img: "jiujia",
        bike: true, car: true, bus:true,
        description(){
            return "这一带比较高级的中餐馆。华丽的装修和地道精湛的手艺让人流连忘返。"
        },
        situation:[],
    },
    市第七医院 : {
        place: "市第七医院", side: "室外", group: "南兴区",
        tag: ["医疗","大道","下水道出入口","光照","停车点"],
        chara: [],
        img: "hospital",
        bike: true, car: true, bus:true, subway:true,
        description(){
            return "这一带最近的市立医院。据说曾经闹过鬼，也不知道是真是假。"
        },
        situation:[],
    },
    派出所 : {
        place: "派出所", side: "室外", group: "南兴区",
        tag: ["警察","大道"],
        chara: [],
        img: "police",
        bike: true, car: true, bus:true,
        description(){
            return "这个管辖区的派出所。民警们24小时待命，为人民服务。"
        },
        situation:[],
    },
    消防所 : {
        place: "消防所", side: "室外", group: "南兴区",
        tag: ["消防","大道"],
        chara: [],
        img: "firestation",
        bike: true, car: true, bus:true,
        description(){
            return "这个管辖区的消防所。消防员们24小时待命，为人民服务。"
        },
        situation:[],
    },
    怡安小区 : D.map.景南市.怡安小区.怡安小区,
    嘉庆广场 : D.map.景南市.嘉庆广场.嘉庆广场,

    商店街 : D.map.景南市.商店街.商店街,
    地铁站 : D.map.通用.地铁站,
    公交站 : D.map.通用.公交站,

}