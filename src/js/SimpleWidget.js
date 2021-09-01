
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

window.basepercent = function(name) {
    var min = V.PC.base[name][0]
    var max = V.PC.base[name][1]
    return Math.clamp(Math.trunc(((min/max)*100)),1,100)
};

// Make .divs-links clickable as if they're anchors
window.linkifyDivs = function (parentSelector = "") {
	$(document).ready(() => { $(parentSelector + " .div-link").click(function (e) { $(this).find('a').first().click(); }) });
	$(document).ready(() => { $(parentSelector + " .div-link a").click(function (e) { e.stopPropagation(); }) });
}

function bookmark(name) {
    var bk = {}
    bk[name] = V.event
    bk[name].visited = true

    Object.assign(V.bookmark,bk)

    return ""
}

DefineMacroS("bookmark", bookmark)


window.hairlenth = function(num){
    if( between(num,0,99)) return 1;
    else if(between(num,100,499)) return 2;
    else if(between(num,500,799)) return 3;
    else if(num>= 800) return 4;
    else return 1;
}