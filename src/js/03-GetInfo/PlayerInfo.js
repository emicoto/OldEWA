/* 名字和称呼的处理 */
function you() {
    var name = V.PC.名字;
    switch (V.persons){
    case 1:
      return "我"
    case 2:
      return "你"
    default:
    return name;
    }
  }
DefineMacroS("you", you);

function he() {
  var gender = V.currentchara.genital
    if(!gender.子宫){
      return "他"
    }else{
      return "她"
    }
}
DefineMacroS("he", he);
/* 头发 */
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
  const hairlength = select.has(num);
  return `${setup.L[V.lang]["发色"][V.PC.发色] + setup.L[V.lang]["发型"][V.PC.发型] + hairlength}`;
}

window.hairlenth = function(num){
  const select = new SelectCase();
  select.add(0,99, 1);
  select.add(100,499, 2);
  select.add(500,799,3)
  select.default = 4
  const lenth = select.has(num)
  return lenth
}
DefineMacroS("hair",hair);

/* 容貌描述 */
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

/* 眼睛 */
function eye(){
  return setup.L[V.lang]["瞳色"][V.PC.瞳色] + setup.L[V.lang]["瞳色"]["eyes"]
}
DefineMacroS("eye", eye);

/* 皮肤 */
function skin(){
  return setup.L[V.lang]["肤色"][V.PC.肤色] + setup.L[V.lang]["肤色"]["skin"]
}
DefineMacroS("skin", skin);

/*胸部 */
window.breastsize = function() {
  var size = V.PC.胸部
  if (between(size,0,1)){
    return 1;
  }
  else if (between(size,2,3)){
    return 2;
  }
  else if (size>=4){
    return 3;
  }
}

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

/* 阴茎 */
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

/* 宠物类型 */
function petstype(){
  switch (V.pet.type) {
    case 1:
      return "史莱姆"
    case 2:
      return "魔狼"
    case 3: 
      return "恶魔"
    case 4:
      return "触手"
  }
}
DefineMacroS("petstype", petstype);

/* 宠物的第三人称 */
function it(){
  switch (V.pet.type) {
    case 1:  case 4:
      return "它"
    case 2:  case 3:
      return "他"
  }
}
DefineMacroS("it", it);
