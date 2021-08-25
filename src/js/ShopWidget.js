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
    new Wikifier(null,"<<replace '#showcase'>><<ShowManequin>><</replace>>")
}
window.setPatterns = setPatterns

function setColors(arg,name) {
    V.showcase.color = arg
    V.showcase.colorname = name
    new Wikifier(null,"<<replace '#showcase'>><<ShowManequin>><</replace>>")
}
window.setColors = setColors

function BuyOutFit() {
    if (V.money > V.showcase.cost) {
        V.money = V.money - V.showcase.cost
        V.closet[V.showcase.layer].push(V.showcase)
        var text = "你花费了"+V.showcase.cost+"元购买了"+V.showcase.name+"<</replace>>"
    }else{
        var text = "虽然你想买"+V.showcase.name+"，但钱不够……"
    }

    new Wikifier(null,"<<replace '#action-text'>>"+text)
    new Wikifier(null,"<<replace '#action-text2'>>"+text)
    ShowPopUP()
    
}
window.BuyOutFit = BuyOutFit