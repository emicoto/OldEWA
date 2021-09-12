A.inner_up = [
    {
        id: 0, uid: 0,
        index: "naked",  name:"没穿内衣", gender: "n",
        text: "你什么内衣都没穿。",
        name_en: "naked",
        text_en: "you didn't wear any bras.",
        tag:["裸露"],
        hasImg: false,
        hasDif:{breast: false, pregnant: false},

        cost:0, reveal: 0, hot: 0, cold: 0,
        durable: 0, maxdurable: 0, beauty: 0, defence: 0,
        fixcolor: true, color: null, colorname: null,
        colors: [],

        category:"无", layer: "inner_up",
        shop: null,
        slot: "top",

        acc: null,
        patterns: [],
        fixacc: true,
        subcolor: null,
    },
    {
        id: 1, uid: 0,
        index : "camisole",    name : "吊带背心",     gender : "f",
        text : "一件简单的吊带背心，给胸部小小的你带来些许安全感。",   
        tag  : ["日常"],
        name_en:"camisole",
        text_en:"A simple camisole, can give you a little bit comfort.", 
        hasDif : {breast:false, pregnant:false},
        hasImg : false,

        cost : 30,        reveal : 7,        hot : -0.2, cold : -0.2,
        durable : 10,     maxdurable : 10,     beauty: 0,     defence: 0,
        fixcolor: false,    color:"#FFFFF",  colorname: "白",
        colors : [],
        
        category: "内衣", layer : "inner_up",
        shop : "all", 
        slot : "top",

        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
    {
        id: 2, uid: 0,
        index : "simplebra",    name : "胸罩",     gender : "f",
        text : "一件设计朴素的胸罩。",   
        tag  : ["日常"],
        name_en:"bra",
        text_en:"A simple design bra.", 
        hasDif : {breast:false, pregnant:false},
        hasImg : false,

        cost : 60,        reveal : 4,        hot : 0, cold : 0,
        durable : 10,     maxdurable : 10,     beauty: 0,     defence: 0,
        fixcolor: false,    color:"#FFFFF",  colorname: "白",
        colors : [],
        
        category: "内衣", layer : "inner_up",
        shop : "all", 
        slot : "top",

        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
]

A.inner_bt = [
    {
        id: 0, uid: 0,
        index: "naked",  name:"没穿内裤", gender: "n",
        text: "你什么内裤都没穿。",
        name_en: "naked bottom",
        text_en: "you didn't wear any underwear.",
        tag:["裸露"],
        hasImg: false,
        hasDif:{breast: false, pregnant: false},

        cost:0, reveal: 0, hot: 0, cold: 0,
        durable: 0, maxdurable: 0, beauty: 0, defence: 0,
        fixcolor: false, color: null, colorname: null,
        colors: [],

        category:"无", layer: "inner_bt",
        shop: null,
        slot: "bottom",

        acc: null,
        patterns: [],
        fixacc: false,
        subcolor: null,
    },
    {
        id: 1, uid: 0,
        index : "boxer",    name : "四角内裤",     gender : "m",
        text : "一条简单的四角内裤。",
        name_en:"boxer brief",
        text_en:"A simple boxer brief.",
        tag  : ["日常"],
        hasImg : true,
        hasDif : {breast:false, pregnant:false},

        cost : 12,        reveal : 2,    hot : -0.1,    cold : -0.1,
        durable : 10,     maxdurable : 10,     beauty: 0,     defence: 0,
        fixcolor: false,    color:"#FDFFFF",  colorname: "白",
        colors : [],
        
        category: "内裤", layer : "inner_bt", slot : "bottom", 
        shop : "all", 
        
        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
    {
        id: 2, uid: 0,
        index : "pantie",    name : "内裤",     gender : "f",
        text : "一款简单朴素的内裤。",
        name_en:"pantie",
        text_en:"A simple pantie.",
        tag  : ["日常"],
        hasImg : true,
        hasDif : {breast:false, pregnant:false},

        cost : 15,        reveal : 2,    hot : 0,    cold : 0,
        durable : 10,     maxdurable : 10,     beauty: 0,     defence: 0,
        fixcolor: false,    color:"#FDFFFF",  colorname: "白",
        colors : [],
        
        category: "内裤", layer : "inner_bt", slot : "bottom", 
        shop : "all", 
        
        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
]