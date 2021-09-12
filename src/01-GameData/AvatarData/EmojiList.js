A.list.eyebrows = [
    "angry","confuse","happy","normal","sad"
]

A.list.eyes = [
    "ahe","blink1","blink2","blink2",
    "close1","close2",
    "full","idle","half","quater1","quater2",
    "lookdown","lookleft","lookup1","lookup2","lookup3",
]

A.list.mouth = [
    "angry","laugh","oop","open","sad","sign","smile","unhappy"
]

A.emote = {
    正常 : {
        name : "正常",
        eyebrow : "normal",  eyes : "full",  mouth : "smile",  frame : null,
        tear : false,   shy  : false,   red  : false,   hurt : false,          
    },
    开心:  {
        name :"开心",           
        eyebrow :"happy",   eyes :"quater2",  mouth :"laugh",  frame :null,
        tear :false,    shy  :true,     red  :false,    hurt :false,
    },
    伤心: {
        name : "伤心",
        eyebrow : "sad",  eyes : "quater1",  mouth : "sad",  frame : null,
        tear : true,    shy  : false,   red  : false,   hurt : false,
    },
    生气: {
        name : "生气",
        eyebrow : "angry",  eyes : "quater2",  mouth : "open",  frame : null,
        tear : false,    shy  : false,  red  : false,    hurt : false,
    },
    害羞:{
        name : "害羞",             
        eyebrow : "happy",  eyes : "lookleft",  mouth : "smile",  frame : null,
        tear : false,   shy  : true,    red  : false,   hurt : false,
    },
    羞耻:{
        name: "羞耻",
        eyebrow:'sad', eyes:'full', mouth:'oop', frame:null,
        tear : false,   shy  : true,    red  : false,   hurt : false,
    },
    困惑:{
        name : "困惑", 
        eyebrow : "confuse",  eyes : "quater2",    mouth : "unhappy", frame : "confuse",
        tear : false,   shy  : false,   red  : false,   hurt : false,
    },
    受伤: {
        name : "受伤",            
        eyebrow : "angry",  eyes : "blink1", mouth : "open",  frame : null,
        tear : false,    shy  : false,  red  : false,    hurt : true,
    },
    快感1: {
        name : "快感",           
        eyebrow : "sad",    eyes : "quater2",  mouth : "open",  frame : null,
        tear : false,    shy  : false,  red  : true,     hurt : false,
    },
    快感2: {
        name : "快感",            
        eyebrow : "confuse",    eyes : "lookup2",  mouth : "open",  frame : null,
        tear : true,    shy  : false,   red  : true,    hurt : false,
    },
    高潮:{
        name : "高潮",             
        eyebrow : "sad",    eyes : "lookup1",  mouth : "open",  frame : null,
        tear : true,    shy  : false,   red  : true,    hurt : false,
    },
}

A.facelist = Object.keys(A.emote)