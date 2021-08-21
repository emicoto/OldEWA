function printmoney(num) {
    return num && num.toString()
        .replace(/\d+/, function(s){
             return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
         })
  }
DefineMacroS("printmoney", printmoney);


window.showcharainfo = function () {
	new Wikifier(null, '<<replace #charainfo>><<charainfo>><</replace>><<CMApply>>');
}

function setreveal(){
    const isReveal=w=>V.Equip[w] ?V.Equip[w].reveal :0;
    const tops =[isReveal("outter"),isReveal("top"),isReveal("inner_up"),]
    const bottoms=[isReveal("bottom"),isReveal("inner_bt")]
    tops.sort((a,b)=>b-a)
    bottoms.sort((a,b)=>b-a)
    console.log("上衣:",tops)
    console.log("下衣:",bottoms)
    V.PFlag.top = !tops[0]?0: tops[0]
    V.PFlag.bottom=!bottoms[0]?0: bottoms[0]
}
window.setreveal = setreveal

window.basepercent = function(name) {
    var min = V.PC.base[name][0]
    var max = V.PC.base[name][1]
    return Math.clamp(Math.trunc(((min/max)*100)),1,100)
};

function isPregnant() {
    if (V.PC.stats.怀孕 == true || V.PC.stats.肠内受孕 == true){
        return "p"
    }else{
        return ""
    }
}

window.isPregnant = isPregnant

function isFixhair(table) {
    if (table.fixcolor == true) {
        return V.PC.发色
    }else{
        return "basic"
    }
}

window.isFixhair = isFixhair


// Make .divs-links clickable as if they're anchors
window.linkifyDivs = function (parentSelector = "") {
	$(document).ready(() => { $(parentSelector + " .div-link").click(function (e) { $(this).find('a').first().click(); }) });
	$(document).ready(() => { $(parentSelector + " .div-link a").click(function (e) { e.stopPropagation(); }) });
}

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

    $('#action-popup').removeClass('hidden'); setTimeout(() => { $('#action-popup').addClass('hidden') }, 3200);
    $('#action-popup').addClass('popup'); setTimeout(() => { $('#action-popup').removeClass('popup') }, 1000);
    $('#action-text2').addClass('notransition flash'); setTimeout(() => { $('#action-text2').removeClass('notransition flash') }, 100);
}
window.BuyOutFit = BuyOutFit