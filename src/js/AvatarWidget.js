/* 属性集算 */
function setreveal(){
    const isReveal=w=>V.Equip[w] ?V.Equip[w].reveal :0;
    const tops =[isReveal("outter"),isReveal("top"),isReveal("inner_up"),]
    const bottoms=[isReveal("bottom"),isReveal("inner_bt")]
    tops.sort((a,b)=>b-a)
    bottoms.sort((a,b)=>b-a)
    /*console.log("上衣:",tops)
    console.log("下衣:",bottoms)*/
    V.Pflag.top = !tops[0]?0: tops[0]
    V.Pflag.bottom=!bottoms[0]?0: bottoms[0]
}
window.setreveal = setreveal

function allureBuff() {
    const isAllure = w => V.Equip[w] ? V.Equip[w].beauty : 0;
    const items = ["hat","outter","top","bottom","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

    var a = 0
    for(let i = 0; i < items.length; i++){
            a = a+isAllure(items[i])
        }

    if(V.PC.trait.倾国倾城 == true) a += 3;

    return 1+a
}

window.allureBuff = allureBuff

function defBuff() {
    const isDef = w => V.Equip[w] ? V.Equip[w].defence : 0;
    const items = ["hat","outter","top","bottom","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

    var a = 0
    for(let i = 0; i < items.length; i++){
            a = a+isDef(items[i])
        }

    return 1+a
}

window.defBuff = defBuff

function warmth() {
    const isHot = w => V.Equip[w] ? V.Equip[w].hot : 0;
    const isCold = w => V.Equip[w] ? V.Equip[w].cold : 0;
    const items = ["hat","outter","top","bottom","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

    var a = [0,0]
    for(let i = 0; i < items.length; i++){
        a[0] += isHot(items[i])
        a[1] += isCold(items[i])
    }
    V.PC.hot = V.fix.hot + a[0]
    V.PC.cold = V.fix.cold + a[1]
    return a
}

window.warmth = warmth

/* 商店处理 */
function setShowCase(table) {
    if (typeof(table) == "object") {
        V.showcase = table
        new Wikifier(null,"<<replace '#show_container'>><<ShowCase>><</replace>>")
    }else{
        console.log(table,"error: is not object")
    }

}
window.setShowCase = setShowCase

function setPatterns(arg) {
    V.showcase.acc = arg
    Avatar.setShop()
    /*new Wikifier(null,"<<replace '#showcase'>><<ShowManequin>><</replace>>")*/
}
window.setPatterns = setPatterns

function setColors(arg,name,change = false) {
    if (change) {
        Avatar.setShop(arg)
        return
    }
    V.showcase.color = arg
    V.showcase.colorname = name
    Avatar.setShop()
    /*new Wikifier(null,"<<replace '#showcase'>><<ShowManequin>><</replace>>")*/
}
window.setColors = setColors

function BuyOutFit() {
    if (V.money > V.showcase.cost) {
        V.money = V.money - V.showcase.cost
        let buystuff = clone(V.showcase)
        V.closet[V.showcase.layer].push(buystuff)

        var text = "你花费了"+V.showcase.cost+"元购买了"+V.showcase.name+"<</replace>>"
    }else{
        var text = "虽然你想买"+V.showcase.name+"，但钱不够……"
    }

    new Wikifier(null,"<<replace '#action-text'>>"+text)
    new Wikifier(null,"<<replace '#action-text2'>>"+text)
    ShowPopUP()
    
}
window.BuyOutFit = BuyOutFit

/* 衣柜处理 */
function strip(arg) {
    if (V.Equip[arg]) {

        var text = "你脱下了"+V.Equip[arg].name;

        V.closet[arg].push(V.Equip[arg])
        V.Equip[arg] = null
    }else{
        var text = "你打算脱下"+A.categoryname[arg]+"，但是你身上并没有穿任何"+A.categoryname[arg]+"。";
    }

    const group = ["face","neck","hand","back"]
    let id = arg
    if(group.includes(arg)) id = accesory
    new Wikifier(null,"<<replace '#"+id+"'>><<showcloset '"+id+"'>><</replace>>")
    setreveal()

    
    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
}
window.strip = strip

function dressOn(args, arg) {

    var text = "你穿上了"+V.closet[args][arg].name+"。";

    /* 身上没有衣服，直接穿上 */
    if ( V.Equip[args] == null){
     V.Equip[args] = V.closet[args][arg]
     V.closet[args].deleteAt(arg)

    }else if(V.Equip[args].index.length > 0){
        let obj = clone(V.Equip[args])
        V.Equip[args] = V.closet[args][arg]
        V.closet[args].deleteAt(arg)
        V.closet[args].push(obj)
    }

    if(args == "top"  && V.Equip.bottom && V.Equip.top.slot == "onepiece"){
        let obj = clone(V.Equip.bottom)
        V.closet.bottom.push(obj)
        V.Equip.bottom = null
        
    }else if (args == "bottom" && V.Equip.top && V.Equip.top.slot == "onepiece"){
        let obj = clone(V.Equip.top)
        V.closet.top.push(obj)
        V.Equip.top = null

    }else if (args == "inner_up" && V.Equip.inner_bt && V.Equip.inner_up.slot == "onepiece"){
        let obj = clone(V.Equip.inner_bt)
        V.closet.inner_bt.push(obj)
        V.Equip.inner_bt = null

    }else if (args == "inner_up" && V.Equip.inner_up.slot == "fullbody"){

        if(V.Equip.inner_bt){
            let obj = clone(V.Equip.inner_bt)
            V.closet.inner_bt.push(obj)
            V.Equip.inner_bt = null }

        if(V.Equip.top){
            let obj = clone(V.Equip.top)
            V.closet.top.push(obj)
            V.Equip.top = null
        }
        
        if(V.Equip.bottom){
            let obj = clone(V.Equip.bottom)
            V.closet.bottom.push(obj)
            V.Equip.bottom = null
        }
    }

    const group = ["face","neck","hand","back"]
    let id = args
    if(group.includes(args)) id = accesory
    new Wikifier(null,"<<replace '#"+id+"'>><<showcloset '"+id+"'>><</replace>>")
    setreveal()

    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
}

window.dressOn = dressOn

