declare interface AvatarItems{
    id: number, uid: 0,
    index: string, 
    name: string, 
    gender:"n"|"f"|"m",
    text: string,
    name_en: string,
    text_en: string,
    tag : ["裸露"|"日常"|"睡衣"|"正式"|"商务"|"舞台"|"泳装"|"运动"|"学生"|"服务"|"制服"|"COSPLAY"|"情趣"|"变态"|"神圣"|"古风"|"洛丽塔"|"时尚"|"雨衣"|"潜水"|"福瑞"|"高跟鞋"|"战斗服"],
    hasImg: false | true,
    hasDif?: {breast: false|true, pregnant: false | true,},

    cost: number,
    reveal: 0 | 1| 2| 3| 4| 5| 6| 7| 8| 9,
    hot?: number,
    cold?: number,
    durable: number,
    maxdurable: number,
    beauty?: number,
    defence?: number,
    fixcolor: true | false,
    color: string | null,
    colorname: string | null,
    colors:[string] | [],

    category:"帽子"|"头饰"|"眼镜"|"面罩"|"耳饰"|"外搭"|"连衣裙"|"连体服"|"上衣"|"下衣"|"内衣"|"内裤"|"袜子"|"鞋子"|"装饰"|"无",

    layer : "hat"|"neck"|"face"|"outter"|"over_up"|"inner_up"|"hand"|"over_bt"|"inner_bt"|"shoes"|"legs"|"back",

    shop: [null | "all" | "online" | "offline" | "adluts" | "unique" | "special" | "limit" | "event" | "seasonal" | "spring" | "summer" | "autumn" | "winter"],

    slot: "top" | "bottom" | "head" | "hands" | "feet" | "legs" | "onepiece" | "wholebody" | "overall",

    tuckinable?: false | true,
    tuckin?: false | true,
    acc?: null | string,
    patterns?: [string] | [],
    fixacc?: true | false,
    subcolor?: null | string,

    Functional?: true | false,
    effect?()
}

declare interface HairItems {
    id: number, index: string, fixcolor: false | true, max: 1| 2| 3| 4,
}

declare interface LewdItems {
    name: string, png: string | null,
    hasDif?:{breast:false|true, pregnant:false|true},
    hasImg: false | true,
    functional: true | false,

    cost: number, energy: number,
    category: "特殊", layer: "nipple" | "penis" | "plus",
    shop: "adults" | "unique" | "online"
}

declare interface EmojiItems{
    name: string,

    eyebrow: "angry"|"confuse"|"happy"|"normal"|"sad",
    eyes: "ahe"|"blink1"|"blink2"|"blink2"|"close1"|"close2"| "full"|"idle"|"half"|"quater1"|"quater2"| "lookdown"|"lookleft"|"lookup1"|"lookup2"|"lookup3"|"maru"|"jido",
    mouth:"angry"|"laugh"|"oop"|"open"|"sad"|"sign"|"smile"|"unhappy"|"neko",

    frame: null | string,
    tear: false | true;
    shy: false | true;
    red: false | true;
    hurt: false | true;
}

declare namespace Avatars {
    export let list : {};
    export let layer : {};
    export let over_up : AvatarItems[];
    export let over_bt : AvatarItems[];
    export let inner_up : AvatarItems[];
    export let inner_bt : AvatarItems[];
    export let hat : AvatarItems[];
    export let outter: AvatarItems[];
    export let legs: AvatarItems[];
    export let shoes: AvatarItems[];
    export let hand: AvatarItems[];
    export let neck: AvatarItems[];
    export let face: AvatarItems[];
    export let hairfront: {};
    export let hairback: {};
    export let lewdup : {};
    export let lewdbt : {};
    export let emote : {};
}

const data : AvatarItems = {
    id: 0, uid: 0,
    index : "naked",    name : "裸",     gender : "n",
    text : "无",   
    name_en:"",
    text_en:"", 
    tag  : ["裸露"],
    hasDif : {breast:false, pregnant:false},
    hasImg : false,

    cost : 0,        reveal : 0,        hot : 0, cold : 0,
    durable : 0,     maxdurable : 0,     beauty: 0,     defence: 0,
    fixcolor: true,    color:null,  colorname: null,
    colors : [],
    
    category: "外搭", layer : "outter",
    shop : null, 
    
    slot : "top", 
    tuckinable: false,        tuckin : false, 
    acc : null,
    patterns: [],
    fixacc  : true,
    subcolor : null,
}

const emoji : EmojiItems = {
    name: "羞耻",
    eyebrow:'sad', eyes:'full', mouth:'oop', frame:null,
    tear:false, shy:true, red:false, hurt:false,
}