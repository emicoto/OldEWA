
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

window.basepercent = function(name) {
    var min = V.PC.base[name][0]
    var max = V.PC.base[name][1]
    return Math.clamp(Math.trunc(((min/max)*100)),1,100)
};

function isPregnant() {
    if (V.PC.state.怀孕 == true || V.PC.state.肠内受孕 == true){
        return "p"
    }else{
        return ""
    }
}

window.isPregnant = isPregnant

function isFixhair(table) {
    if (table.fixcolor == true) {
        return V.PC.info.haircolor
    }else{
        return "basic"
    }
}

window.isFixhair = isFixhair

function hasLength(table) {
    if (table.long == true) {
        return "_" + hairlenth(V.PC.info.fhairlen)
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

function bookmark(name) {
    var bk = {}
    bk[name] = V.event
    bk[name].visited = true

    Object.assign(V.bookmark,bk)

    return ""
}

DefineMacroS("bookmark", bookmark)

function setEvent() {
    var event = V.event
    event.lang = V.lang

    if (event == null || event.type == null || event.name == null){
        return false
    }

    var eventname

    if (event.branch != null && event.phrase != null){
        eventname = event.type + " " + event.name + "  "+ event.branch + " " +  event.phrase

    }else if (event.phrase == null && event.branch != null){
        eventname = event.type + " " + event.name + " " + event.branch 

    }else if (event.branch == null && event.phrase != null){
        eventname = event.type + " " + event.name + " " + event.phrase

    }else{
        eventname = event.type + " " + event.name
    }

    V.event.passage = eventname

    if (Story.has(eventname+" "+event.lang)==true) eventname += " "+event.lang;
    else if (V.lang == "EN" && Story.has(eventname+" CN")) eventname += " CN";
    else if (V.lang == "CN" && Story.has(eventname+" EN")) eventname += " EN";

    if(Story.has(eventname)==true){       
        return eventname
    }
    else{
        return false
    }
}

window.setEvent = setEvent

function setEventSelect() {
    if (V.event.passage.length > 0){
        var eventname

        if(Story.has(V.event.passage+"S "+V.lang)==true){
            eventname = V.event.passage+"S "+V.lang
        }

        else if (V.lang == "EN" && Story.has(V.event.passage+"S CN")==true) {
            eventname = V.event.passage + "S CN"
        }

        else if (V.lang == "CN" && Story.has(V.event.passage+"S EN")==true) {
            eventname = V.event.passage + "S EN"
        }
        else if (Story.has(V.event.passage+"S")==true){
            eventname = V.event.passage+"S"
        }
        else{
            return false
        }

        return eventname

    }else{
        return false
    }
}
window.setEventSelect = setEventSelect

function setEventEffect() {

    if (V.event.passage.length > 0){
        var eventname

        if(Story.has(V.event.passage+"E")==true){
            eventname = V.event.passage+"E"
        }       
        else{

            if(Story.has(V.event.type+" "+V.event.name+" "+V.event.branch+"E")==true){
                eventname = V.event.type+" "+V.event.name+" "+V.event.branch+"E"
            }
            else if(Story.has(V.event.type+" "+V.event.name+"E")==true){
                eventname= V.event.type+" "+V.event.name+"E"
            }
            else{
                return false
            }
        }
        return eventname

    }else{
        return false
    }

}
window.setEventEffect = setEventEffect