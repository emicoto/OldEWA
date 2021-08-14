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

function hair(){
  const select = new SelectCase();
  var num = V.PC.发长
  select.add(0, 49, "超短发");
  select.add(50, 99, "齐耳短发");
  select.add(100, 249, "及脖中发");
  select.add(250, 499, "及肩中发");
  select.add(500, 799, "及胸长发");
  select.add(800, 1200, "及腰长发");
  select.default = "超长长发";
  const hairlenth = select.has(num);
  return `${setup.L[V.lang]["发色"][V.PC.发色] + setup.L[V.lang]["发型"][V.PC.发型] + hairlenth}`;
}

window.hairlenth = function(){
  const select = new SelectCase();
  var num= V.PC.发长
  select.add(0,99, 1);
  select.add(100,499, 2);
  select.add(500,799,3)
  select.default = 4
  const lenth = select.has(num)
  return lenth
}

window.fhairlenth = function(){
  const select = new SelectCase();
  var num= V.PC.前发长
  select.add(0,99, 1);
  select.add(100,499, 2);
  select.add(500,799,3)
  select.default = 4
  const lenth = select.has(num)
  return lenth
}


DefineMacroS("hair",hair);

function beauty(){
  var num = V.PC.魅力
  const select = new SelectCase()
  select.add(0,100,"脸部被毁容，丑得惨绝人寰")
  select.add(101,200,"脸上有重大伤痕，显得很狰狞")
  select.add(201,300,"脸看着像被打成了猪头")
  select.add(301,500,"长得有点丑")
  select.add(501,700,"脸上有点脏，看着有点丑")
  select.add(701,1000,"长得很一般，扔人群里就找不着的样子")
  select.add(1001,1200,"长得还不错")
  select.add(1201,1500,"长得有点可爱")
  select.add(1501,1800,"长得很可爱")
  select.add(1801,2300,"长得挺漂亮")
  select.add(2300,3000,"长得很漂亮，一眼就能从人群中找到")
  select.add(3001,4500,"气质出众，长得十分有魅力")
  select.add(4501,6000,"有着倾国倾城的美貌")
  select.default = "有着能颠覆世界的绝美神颜";
  return `${select.has(num)}`
}

DefineMacroS("beauty", beauty);

function displayskillrank(num){
  const select = new SelectCase()
  select.add(0,100,"<span style='color:#839EC0;'><b>F</b></span>")
  select.add(101,200,"<span style='color:#B07455;'><b>E</b></span>")
  select.add(201,400,"<span style='color:#8E57E6;'><b>D</b></span>")
  select.add(401,600,"<span style='color:#4DE4C1;'><b>C</b></span>")
  select.add(601,800,"<span style='color:#2AAAFF;'><b>B</b></span>")
  select.add(800,1000,"<span style='color:#FF2A52;'><b>A</b></span>")
  select.add(1000,1200,"<span style='color:#D7A800;'><b>S</b></span>")
  return `${select.has(num)}`
}

DefineMacroS("displayskillrank", displayskillrank);

window.skillrank = function(num){
  const select = new SelectCase()
  select
  select.add(0,100,"F")
  select.add(101,200,"E")
  select.add(201,400,"D")
  select.add(401,600,"C")
  select.add(601,800,"B")
  select.add(801,1000,"A")
  select.add(1000,1200,"S")
    
  return `${select.has(num)}`
}

function skillrank(num){
  const select = new SelectCase()
  select
  select.add(0,100,"F")
  select.add(101,200,"E")
  select.add(201,400,"D")
  select.add(401,600,"C")
  select.add(601,800,"B")
  select.add(801,1000,"A")
  select.add(1000,1200,"S")
    
  return `${select.has(num)}`
}

DefineMacroS("skillrank", skillrank);

window.skillrequire = function(args){
  switch(args){
    case "E":
      return 101;
    case "D":
      return 201;
    case "C":
      return 401;
    case "B":
      return 601;
    case "A":
      return 801;
    case "S":
      return 1000;
  }
}


window.skillprocess = function (num){
  var rank = skillrank(num)
  switch(rank){
    case "F":
      return num
    case "E":
      return (num-100)
    case "D":
      return ((num-200)/2)
    case "C":
      return ((num-400)/2)
    case "B":
      return ((num-600)/2)
    case "A":
      return ((num-800)/2)
    case "S":
      return ((num-1000)/2)
  }
}

window.rankcolor = function(num){
  var rank = skillrank(num)
  switch(rank){
    case "F":
      return "#839EC0";
    case "E":
      return "#B07455";
    case "D":
      return "#8E57E6";
    case "C":
      return "#4DE4C1";
    case "B":
      return "#2AAAFF";
    case "A":
      return "#FF2A52";
    case "S":
      return "#D7A800";
  }
}

function eye(){
  return setup.L[V.lang]["瞳色"][V.PC.瞳色] + setup.L[V.lang]["瞳色"]["eyes"]
}

DefineMacroS("eye", eye);

function skin(){
  return setup.L[V.lang][肤色][V.PC.皮肤] + setup.L[V.lang][肤色]["skin"]
}

DefineMacroS("skin", skin);

function breast(){
  switch(V.PC.胸部){
    case 1:
      return "微微隆起的胸部"
    case 2:
      return "可爱小巧的胸部"
    case 3:
      return "小山峰一样的胸部"
    case 4:
      return "有着傲人曲线的胸部"
    case 5:
      return "有着惊人吸引力的胸部"
    default:
      return "平坦的胸部"
  }
}

DefineMacroS("breast", breast);

function penis(){
  var size = V.PC.genital.阴茎
  var a = random(0,2)
  const text1 = ["惊人的","魔鬼般的","巨大无比的"]
  const text2 = ["可爱的","小孩一般的","短小"]
  const text3 = ["幼儿一般的","迷你可爱的","牙签般的"]
  const select = new SelectCase()
  select
  select.add(1,8,text3[a]+"小丁丁")
  select.add(9,12,text2[a]+"阴茎")
  select.add(13,16,"阴茎")
  select.add(17,19,"粗长阴茎")
  select.add(20,24,"巨大阴茎")
  select.add(25,30,"超大阴茎")
  select.add(30,50,text1[0]+"马屌")
  return `${select.has(size)}`
}

DefineMacroS("penis", penis);

window.breastsize = function() {
  var size = V.PC.胸部
  if (size >= 0 && size <= 2){
    return 1;
  }
  else if (size==3){
    return 2;
  }
  else if (size>=4){
    return 3;
  }
}

window.imglocation = function(){
  var location = V.location
    if (location == "单身公寓"){
      return "singleapartment"
    }
    else{
      return "dummy"
    }

}

function setreveal(){
  const tops = [V.PEquip.coat.reveal,V.PEquip.top.reveal,V.PEquip.undertop.reveal]
  const bottoms = [V.PEquip.bottoms.reveal,V.PEquip.underbottom.reveal]
  tops.sort()
  bottoms.sort()
  if (!tops[0]){
    V.PFlag.tops = 0
  }else{
    V.PFlag.tops = tops[0]
  }

  if (!bottoms[0]){
    V.PFlag.bottoms = 0
  }else{
    V.PFlag.bottoms = bottoms[0]
  }
}

DefineMacroS("setreveal", setreveal);