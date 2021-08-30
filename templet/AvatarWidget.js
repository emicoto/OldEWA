/* 商店 */
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

function strip(arg) {
    console.log(arg)

    if (V.Equip[arg] != null) {
        V.closet[arg].push(V.Equip[arg])
        V.Equip[arg] = null
    }

    const group = ["face","neck","hand","back"]
    let id = arg
    if(group.includes(arg)) id = accesory
    new Wikifier(null,"<<replace '#"+id+"'>><<showcloset '"+id+"'>><</replace>>")
    setreveal()
}
window.strip = strip

function dressOn(args, arg) {

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

    if(args == "top"  && V.Equip.bottom != null && V.Equip.top.slot == "onepiece"){
        let obj = clone(V.Equip.bottom)
        V.closet.bottom.push(obj)
        V.Equip.bottom = null
        
    }else if (args == "bottom" && V.Equip.top != null && V.Equip.top.slot == "onepiece"){
        let obj = clone(V.Equip.top)
        V.closet.top.push(obj)
        V.Equip.top = null

    }else if (args == "inner_up" && V.Equip.inner_bt != null && V.Equip.inner_up.slot == "onepiece"){
        let obj = clone(V.Equip.inner_bt)
        V.closet.inner_bt.push(obj)
        V.Equip.inner_bt = null

    }else if (args == "inner_up" && V.Equip.inner_up.slot == "fullbody"){

        if(V.Equip.inner_bt != null){
            let obj = clone(V.Equip.inner_bt)
            V.closet.inner_bt.push(obj)
            V.Equip.inner_bt = null }

        if(V.Equip.top != null){
            let obj = clone(V.Equip.top)
            V.closet.top.push(obj)
            V.Equip.top = null
        }
        
        if(V.Equip.bottom != null){
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
}

window.dressOn = dressOn
