function test() {
  var text = "testing...";
    return text+"123456";
}

DefineMacroS("test", test);

function you() {
  var name = V.PC.名字;
  return name;
}

DefineMacroS("you", you);

function printmoney(num) {
  return num && num.toString()
      .replace(/\d+/, function(s){
           return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
       })
}

DefineMacroS("printmoney", printmoney);

window.basepercent = function(name) {
  var min = V.PC.base[name][0]
  var max = V.PC.base[name][1]
  return Math.clamp(Math.trunc(((min/max)*100)),1,100)
};

window.showcharainfo = function () {
	new Wikifier(null, '<<replace #charainfo>><<charainfo>><</replace>><<CMApply>>');
}