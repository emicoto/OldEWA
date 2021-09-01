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
window.skillrank = skillrank
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