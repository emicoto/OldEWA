//-- 游戏系统环境设定 
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

/* 各种记录 */
V.log = {
    dairy:[], anouce:[], remind:[],
}

V.record = {}

V.coredebug = false

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