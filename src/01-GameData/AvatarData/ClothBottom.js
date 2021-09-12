﻿A.over_bt = [
        {
        id: 0, uid: 0,
        index: 'naked',  name:'没穿裤子', gender: 'n',
        text: '你什么裤子裙子都没穿。',
        name_en: 'naked',
        text_en: "you didn't wear any pants or skirt.",
        tag:['裸露'],
        hasImg: false,
        hasDif:{breast: false, pregnant: false},

        cost:0, reveal: 0, hot: 0, cold: 0,
        durable: 0, maxdurable: 0, beauty: 0, defence: 0,
        fixcolor: true, color: null, colorname: null,
        colors: [],

        category:'无', layer: 'over_bt',
        shop: null,
        slot: 'bottom',
        
        acc: null,
        patterns: [],
        fixacc: true,
        subcolor: null,
    },
    {
        id: 1, uid: 0,
        index : "shortpant",    name : "短裤",     gender : "n",
        text : "一条简单的短裤。",   
        name_en:"shortpant",
        text_en:"A simple shortpant.",
        tag  : ["日常"],
        hasImg : true,
        hasDif : {breast:false, pregnant:true},

        cost : 50,        reveal : 4,   hot : -0.5,   cold : -0.5, 
        durable : 20,     maxdurable : 20,     beauty: 0,     defence: 0.2,
        fixcolor: false,    color:"#787878",  colorname: "黑",
        colors : [],
        
        category: "下衣", layer : "over_bt", slot : "bottom", 
        shop : "all", 
        
        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
    {
        id: 2, uid: 0,
        index : "shortskirt",    name : "短裙",     gender : "f",
        text : "一条简单的短裙。",  
        name_en:"skirt",
        text_en:"A simple skirt.",
        tag  : ["日常"],
        hasImg : true,
        hasDif : {breast:false, pregnant:true},

        cost : 60,        reveal : 4,   hot : -0.2,   cold : -0.2, 
        durable : 12,     maxdurable : 12,     beauty: 0.01,     defence: 0,
        fixcolor: false,    color:"#787878",  colorname: "黑",
        colors : ["black"],
        
        category: "下衣", layer : "over_bt", slot : "bottom",
        shop : "all", 
            
        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
    {
        id: 3, uid: 0,
        index : "bskirt",    name : "西装短裙",     gender : "f",
        text : "一条简单的西式短裙。毕竟是廉价款，不能指望耐久度。",  
        name_en:"business skirt",
        text_en:"A simple business skirt. Because it's cheap so you can't expect its durability." ,
        tag  : ["日常","商务"],
        hasImg : true,
        hasDif : {breast:false, pregnant:true},

        cost : 120,        reveal : 4,   hot : -0.2,   cold : -0.2, 
        durable : 10,     maxdurable : 10,     beauty: 0.03,     defence: 0,
        fixcolor: false,    color:"#787878",  colorname: "黑",
        colors : ["black"],
        
        category: "下衣", layer : "over_bt", slot : "bottom", 
        shop : "all", 
        
        acc : null,
        patterns: [],
        fixacc  : true,
        subcolor : null,
    },
    {
        id: 4, uid: 0,
        index : "slpshortbt",    name : "睡衣短裤",     gender : "n",
        text : "一件设计简单的睡衣短裤。轻柔透气的布料给你带来好梦。",  
        name_en:"summer pajamas",
        text_en:"A simple design pajamas. The light and breathable fabric brings you good dreams.", 
        tag  : ["日常","睡衣"],
        hasImg : true,
        hasDif : {breast:false, pregnant:true},

        cost : 50,        reveal : 4,   hot : -0.5,   cold : -0.5, 
        durable : 10,     maxdurable : 10,     beauty: 0,     defence: 0.2,
        fixcolor: false,    color:"#FDFFFF",  colorname: "白",
        colors : [],
        
        category: "下衣", layer : "over_bt", slot : "bottom", 
        shop : "all", 
        
        acc : "line",
        patterns: ["line","dot","star"],
        fixacc  : false,
        subcolor : "#787878",
    },
]