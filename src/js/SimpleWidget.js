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


window.imglocation = function(){
    var location = V.location
    
    if (GameData.placedata[location].img == undefined  || GameData.placedata[location].img == null){
      return "dummy"

    }else{
      
      let img = GameData.placedata[location].img
      return img

    }
}

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

function hasLength(table) {
    if (table.long == true) {
        return "_" + hairlenth(V.PC.前发长)
    }else{
        return "_1"
    }
}

window.hasLength = hasLength

// Make .divs-links clickable as if they're anchors
window.linkifyDivs = function (parentSelector = "") {
	$(document).ready(() => { $(parentSelector + " .div-link").click(function (e) { $(this).find('a').first().click(); }) });
	$(document).ready(() => { $(parentSelector + " .div-link a").click(function (e) { e.stopPropagation(); }) });
}
