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
    const tops =[isReveal("coat"),isReveal("top"),isReveal("undertop"),]
    const bottoms=[isReveal("bottom"),isReveal("underbottom")]
    tops.sort((a,b)=>b-a)
    bottoms.sort((a,b)=>b-a)
    console.log("上衣:",tops)
    console.log("下衣:",bottoms)
    V.PFlag.tops = !tops[0]?0: tops[0]
    V.PFlag.bottoms=!bottoms[0]?0: bottoms[0]
}
window.setreveal = setreveal

window.basepercent = function(name) {
    var min = V.PC.base[name][0]
    var max = V.PC.base[name][1]
    return Math.clamp(Math.trunc(((min/max)*100)),1,100)
};