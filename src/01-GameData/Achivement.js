D.Achivement = {}

//成就点: 简单 1~3, 一般 3~6, 困难 6~10, 地狱 10~20, 噩梦 20~30

D.Achivement.生还者 = {
    name: "生还者",
    name_en: "The Survivor",
    point: 2,
    text:"没有比活着更重要的事情了！",
    text_en:"Nothing important than surviving!",
    hint:"活过第100天",
    hint_en:"Live past the 100th day",
    condition(){
        return (V.dates > 100)
    }
}

D.Achivement.重生者 = {
    name:"重生者",
    name_en:"The Looper",
    point: 5,
    text:"你发现了这个世界的秘密，并重获新生！",
    text_en:"You discovered the secrets of the world and restarted!",
    hint:"到达结局然后选择重新开始。",
    hint_en:"Reach an endding then choose restart.",
    condition(){
        if(Flag.looper) return Flag.looper
    }
}
