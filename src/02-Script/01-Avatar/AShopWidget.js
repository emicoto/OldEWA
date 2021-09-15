/* 商店处理 */

window.setShowCaseUID = function(){
    if(V.showcase){
        V.showcase.uid = random(100000,999999)
    }
}


function setShowCase(table) {
    if (typeof(table) == "object") {
        V.showcase = clone(table)
        setShowCaseUID()

        new Wikifier(null,"<<replace '#show_container'>><<ShowCase>><</replace>>")
    }else{
        console.log(table,"error: is not object")
    }

}
window.setShowCase = setShowCase

function setPatterns(arg) {
    V.showcase.acc = arg
    setShowCaseUID()

    Avatar.setShop()
    /*new Wikifier(null,"<<replace '#showcase'>><<ShowManequin>><</replace>>")*/
}
window.setPatterns = setPatterns

function setColors(arg,name,change = false, mode="base") {
    if (mode == "base") {
        V.showcase.color = arg
        V.showcase.colorname = name
    }
    if (mode == "acc") {
        V.showcase.subcolor = arg
    }
    if (change) {
        Avatar.setShop(arg, mode)
        setShowCaseUID()
        return
    }
    
    setShowCaseUID()
    Avatar.setShop()
    /*new Wikifier(null,"<<replace '#showcase'>><<ShowManequin>><</replace>>")*/
}
window.setColors = setColors

function tryoncheck() {
    const group = A.category
    var i,n
    for ( i=0; i<group.length; i++){
        if (V.tryon[group[i]]) return true;
        else n++
    }

    if(n==group.length) return false
}
window.tryoncheck = tryoncheck

function tryoncost() {
    const group = Object.keys(V.tryon)
    var n = 0

    for (let i=0; i < group.length; i++){
        if(V.tryon[group[i]] && V.tryon[group[i]].cost > 0) n += V.tryon[group[i]].cost;
    }
    return n
}
window.tryoncost = tryoncost

window.putTryon = function(layer){
    let clothes = clone(V.showcase)

    clothes = clearAItems(clothes)

    V.Equip[layer] = clone(clothes)
    V.tryon[layer] = clone(clothes)

    checkEquipSlot(Equip[layer])

    FixValue()
    stAvatar()
}

function BuyOutFit(args) {
    var layer = V.showcase.layer
    var leftslot = getClosetSlot(args)
    var text

    if(leftslot <= 0){
        text = "衣柜的空位不够了,先回去整理下吧……"
    }
    else if (args=="select" && PC.money > V.showcase.cost) {
        PC.money = PC.money - V.showcase.cost
        let buystuff = clone(V.showcase)

        buystuff = clearAItems(buystuff)
        closet[layer].push(buystuff)

        /* 如果买了就直接清除掉 */
        if (V.tryon[layer] && V.tryon[layer].uid==Equip[layer].uid && V.tryon[layer].uid == V.showcase.uid){
        V.tryon[layer] = null;
        }

        text = "你花费了"+V.showcase.cost+"元购买了"+V.showcase.name+"。"
    }
    else if (args=="tryon" && PC.money > tryoncost() ){
        PC.money = PC.money - tryoncost()

        let group = Object.keys(V.tryon)

        for (let i=0; i < group.length; i++){
            let n = group[i]

            if (V.tryon[n] && V.TEquip[n]){
                let leftstuff = clone(V.TEquip[n])
                let layer = leftstuff.layer
                closet[layer].push(leftstuff)
            }
        }
        
        text = "你花费了"+tryoncost()+"元购买了身上试穿的衣服。"
        
        V.tryon = {neck: null, hand: null, face: null,hat: null, outter: null, over_up: null,over_bt: null,inner_up: null, inner_bt: null,shoes: null, legs: null,}
        V.TEquip = clone(V.Equip)
        
    }
    else{
        if (args =="select") text = "虽然你想买"+V.showcase.name+"，但钱不够……";
        if (args == "tryon") text = "虽然你想买身上试穿的衣服，但钱不够……"
    }

    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
    
}
window.BuyOutFit = BuyOutFit