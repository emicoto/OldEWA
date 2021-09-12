A.shoes = [
    {
        id: 0, uid: 0,
        index: "naked",  name:"没穿鞋子", gender: "n",
        text: "你什么鞋子都没穿。",
        name_en: "naked",
        text_en: "you didn't wear any shoes.",
        tag:["裸露"],
        hasImg: false,
        hasDif:{breast: false, pregnant: false},

        cost:0, reveal: 0, hot: 0, cold: 0,
        durable: 0, maxdurable: 0, beauty: 0, defence: 0,
        fixcolor: true, color: null, colorname: null,
        colors: [],

        category:"无", layer: "shoes",
        shop: null,
        slot: "feet",

        acc: null,
        patterns: [],
        fixacc: true,
        subcolor: null,
    },
    {
        id: 1, uid: 0,
        index : "sportshoes",    name : "运动鞋",     gender : "n",
        text : "一双普通的白色运动鞋。",
        name_en:"sport shoes",
        text_en:"A simple designed sport shoes.",
        tag  : ["日常","运动"], 
        hasImg : true,

        cost : 60,       reveal : 0,    hot : -0.1,    cold : -0.1,
        durable : 30,    maxdurable : 30,     beauty: 0,     defence: 0,
        fixcolor: true,    color:"white",  colorname: "白",
        colors : ["white"],
        
        category: "鞋子",     layer : "shoes",      slot : "feet",
        shop : "all", 

        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
    {
        id: 2, uid: 0,
        index : "highheel",    name : "高跟鞋",     gender : "f",
        text : "一双简单设计的高跟鞋。", 
        name_en:"high heel",
        text_en:"A simple design high heel",
        tag  : ["日常","商务","高跟鞋"], 
        hasImg : true,

        cost : 80,       reveal : 0,    hot : 0,    cold : 0,
        durable : 20,    maxdurable : 20,     beauty: 0.02,     defence: 0,
        fixcolor: false,    color:"#FDFFFF",  colorname: "白",
        colors : [],
        
        category: "鞋子",     layer : "shoes",      slot : "feet",
        shop : "all", 

        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
]

A.legs = [
    {
        id: 0, uid: 0,
        index: "naked",  name:"没穿袜子", gender: "n",
        text: "你什么袜子都没穿。",
        name_en: "naked",
        text_en: "you didn't wear any socks.",
        tag:["裸露"],
        hasImg: false,
        hasDif:{breast: false, pregnant: false},

        cost:0, reveal: 0, hot: 0, cold: 0,
        durable: 0, maxdurable: 0, beauty: 0, defence: 0,
        fixcolor: true, color: null, colorname: null,
        colors: [],

        category:"无", layer: "legs",
        shop: null,
        slot: "legs",

        acc: null,
        patterns: [],
        fixacc: true,
        subcolor: null,
    },
    {
        id: 1, uid: 0,
        index : "sportsocks",    name : "运动短袜",     gender : "n",
        text : "一双简单的运动袜。",
        name_en:"sports socks",
        text_en:"A simple design sports socks",  
        tag  : ["日常","运动"], 
        hasImg : true,

        cost : 10,       reveal : 0,    hot : -0.2,    cold : -0.2,
        durable : 0,    maxdurable : 0,     beauty: 0,     defence: 0,
        fixcolor: false,    color:"#FDFFFF",  colorname: "白",
        colors : [],
        
        category: "袜子",     layer : "legs",      slot : "legs",
        shop : "all", 

        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
]