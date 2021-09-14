type ATags = ("裸露"|"日常"|"睡衣"|"正式"|"商务"|"舞台"|"社交"|"泳装"|"运动"|"学生"|"仆从"|"制服"|"COSPLAY"|"情趣"|"变态"|"神圣"|"古风"|"洛丽塔"|"时尚"|"防水"|"雨衣"|"潜水"|"福瑞"|"高跟"|"战斗"|"闪耀"|"魔力"|"特殊")

type shopline = ( "none" | "general" | "mens" | "womens" | "brand" | "lingerie" | "lewd" | "spring" | "summer" | "autumn" | "winter" | "fashional" | "classic" | "special")

declare interface AvatarItems{
    id: number, uid: 0,
    index: string, 
    name: string, 
    gender:"n"|"f"|"m",
    text: string,
    name_en: string,
    text_en: string,
    tag : Array<ATags>,
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
    colors: Array<string>

    category:"帽子"|"头饰"|"眼镜"|"面罩"|"耳饰"|"外搭"|"连衣裙"|"连体服"|"上衣"|"下衣"|"内衣"|"内裤"|"袜子"|"鞋子"|"装饰"|"无",

    layer : "hat"|"neck"|"face"|"outter"|"over_up"|"inner_up"|"hand"|"over_bt"|"inner_bt"|"shoes"|"legs"|"back",

    shop: "none" | "all" | "online" | "offline" | "adluts" | "unique" | "special" | "event" | "ordermade",
    lineup: [shopline,shopline?],

    slot: "top" | "bottom" | "head" | "hands" | "feet" | "legs" | "onepiece" | "wholebody" | "overall",

    tuckinable?: false | true,
    tuckin?: false | true,
    acc?: null | string,
    patterns?: Array<string>
    fixacc?: true | false,
    subcolor?: null | string,

    Functional?: true | false,
    effect?(min:number)
}

declare interface HairItems {
    id: number, index: string, fixcolor: false | true, max: 1| 2| 3| 4,
}

declare interface LewdItems {
    name: string,
    name_en: string,
    text: string,
    text_en: string,


    hasImg: false | true,
    png: string | null,
    hasDif?:{breast:false|true, pregnant:false|true},

    functional: true | false,

    cost: number, energy: number, maxenergy: number,
    category: "特殊", layer: "nipple" | "penis" | "plus",
    shop: "adults" | "unique"
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

type foodtags =("肉类"|"蔬菜"|"水果"|"米饭"|"薯片"|"汽水"|"酒类"|"主食"|"便当"|"中餐"|"西餐"|"日料"|"海鲜"|"魔力"|"活物"|"史莱姆"|"虫"|"特殊"|"无")
declare interface FoodItems {
    id: number,
    uid:number,
    name: string,
    name_en?:string,
    text: string,
    text_en?: string,

    type: "食物"|"饮料"|"零食",
    category: "foods",
    tags:[foodtags,foodtags?,foodtags?],
    thumb: null | string,

    price: number,
    fresh: number,

    shop: null | "快餐" | "便利店" | "超市" | "贩售机" | "商店" | "餐厅" | "神秘" | "暗网" | "外卖" | "all",

    effect(target:string)
}

declare interface MedicineItems {
    name: string,
    name_en?:string,
    text: string,
    text_en?: string,

    type: "治疗"|"强化"|"美容"|"毒药"|"改造"|"特殊",
    category: "medicine",
    thumb: null | string,

    price: number,
    num: 0,
    shop: null | "药店" | "超市" | "便利店" | "医院" | "神秘" | "暗网" | "网购" | "all"

    effect()

}

declare interface GeneralItems {
    name: string,
    name_en?:string,
    text: string,
    text_en?: string,

    type: string,
    category: "tool" | "collection" | "material" | "other" | "important",

    shop?: null | string,
    price: number,
    num: 0,
}

declare interface FunctionalItems {
    name: string,
    name_en?:string,
    text: string,
    text_en?: string,

    type: string,
    category: "weapon" | "adluts" | "accesory",
    tags?: [string] | [],

    shop?: null | string,
    price: number,
    num: 0,

    effect(target:string,time:number),
}

declare interface SituationSheet {
    id: number, series: string, phrase: number, display: "before" | "content" | "after",
    condition()
}


type locationtag = (
        /* 家 */
        "家" | "厨房"| "休息" | "沐浴" | "衣柜"| "电脑" | "WIFI" | "学习" | "私人" |

        /* 设施类 */
        "更衣间" | "厕所" | "快餐" | "舞台" | "运动" | "移动餐车" | "移动摊位" |
        "通风口" | "下水道出入口" | "逃生口" | "电梯" |

        /*地点属性 */
        "树丛" | "封闭" | "狭窄" | "开阔" | "高处" | "水源" | "地下" | "宽敞" | "藏匿点" | "历史" |  "神秘" | "特殊" | "光照" | "阴暗" | "风口" | "海边" | "高山" | "常雪" | "幻境" | "大道" | "小路" |

        /* 地点功能 */
        "交通" | "公园" | "活动" | "停车场" | "景观" | "信仰" | "广场" | "餐厅" | "商店" | "便利店" | "仓库" |"夜店" | "菜园" | "无" );

type area = ( "东兴区" | "北兴区" | "南兴区" | "北昌区" | "南昌区" | "东昌区"| "景湾区" | "景中区" | "景禾区" | "景秀区" | "西乡区"   | "南岭区" |  "大马岛" | "柳明方向" | "长康方向" | "潘门方向" | "青松方向" | "通用" );

type city = ("景南市" | "柳明市" | "青松市" | "潘门市" | "松江市" | "长康市" | "通用");

type mapgroup = ("通用" | "独立" | "特殊" | "幻境" | "异界" | "怡安小区" | "嘉庆广场" | "中心大厦" | "军事基地" | "大学城" | "度假村" | "影视基地" | "工业园" | "游乐园" | "博物馆" | "西塘镇" | "城乡结合部" | "大马岛" | "柳明方向" | "长康方向" | "潘门方向" | "青松方向" );

declare interface LocationData {
    place: string, side: "室内" | "室外", group: mapgroup,

    tag:[locationtag,locationtag?,locationtag?,locationtag?,locationtag?],

    chara: [] | [string],

    bus?: false | true, subway?: false | true, car?: false | true, bike?: false | true,
    homebutton?: false | true,
    img: string,
    
    description?(),
    situation?: [SituationSheet],
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
    export let hairfront: [HairItems];
    export let hairback: [HairItems];
    export let lewdup : [LewdItems];
    export let lewdbt : [LewdItems];
    export let emote : [EmojiItems];
}

const data : AvatarItems = {
    id: 0,
    uid: 0,
    index: "",
    name: "",
    gender: "n",
    text: "",
    name_en: "",
    text_en: "",
    tag: ['裸露'],
    hasImg: false,
    cost: 0,
    reveal: 0,
    durable: 0,
    maxdurable: 0,
    fixcolor: false,
    color: "",
    colorname: "",
    colors: [],
    category: "无",
    layer: 'inner_up',
    shop: 'none',
    lineup: ['none'],
    slot: "legs"
}

const emoji : EmojiItems = {
    name: "羞耻",
    eyebrow:'sad', eyes:'full', mouth:'oop', frame:null,
    tear:false, shy:true, red:false, hurt:false,
}

const lewd : LewdItems = {
    name: "",
    name_en: "",
    text: "",
    text_en: "",
    hasImg: false,
    png: "",
    functional: false,
    cost: 0,
    energy: 0,
    maxenergy: 0,
    category: "特殊",
    layer: "nipple",
    shop: "unique",
}

const newfoods : FoodItems = {
    id: 0,
    uid: 0,
    name: "",
    text: "",
    type: "食物",
    category: "foods",
    tags: ["无"],
    thumb: "",
    price: 0,
    fresh: 0,
    shop: "all",
    effect: function () {
        ;
    }
}

const newplace : LocationData = {
    place: "共享菜园", side: "室外", group: "怡安小区",
    tag: ["光照", "菜园"],
    chara: [],
    img: "neiborhood_park",
    homebutton: true,
    description(){
        return "为了满足小区住户种植需求而特地建造的一个小菜园。"
    }
}