/* 地点互动和事件相关 */
/* 总之先粗略地做一下... 符合条件的就显示出来 */
F.getsituation = function(args, series, key){
    let data = {}

    if(D.map.景南市[V.mapgroup][args]) data = D.map.景南市[V.mapgroup][args].situation
    else if(D.map.景南市[args]) data = D.map.景南市[args].situation
    else if(D.map.通用[args]) data = D.map.通用[args].situation
 
    let text = {
        before:[], after:[], content:[],
    }

    if(data && data.length > 0){
        for(let i=0; i < data.length; i++ ){
           if(data[i].condition()){
               let result = "<<include '"+data[i].condition()+"'>>"
               text[data[i].display].push(result);
            }

        if(V.coredebug){
            console.log(data[i].condition());
            console.log(text)
        }
    }}

    if(text.before.length + text.content.length + text.after.length > 0){
        let result = (text.before.length > 0 ? text.before.join(" ") : "") + ( text.content.length > 0 ? text.content.join(" ") : "") + ( text.after.length > 0 ? text.after.join(" ") : "")

        return result
    }
}

/* 背景设置 */
function imglocation(){
    let location = V.location
    let list = Object.keys(D.map.通用)
    
    if(list.includes(location)){
        return D.map.通用[location].img
    }

    if (!V.local.img){
      return "dummy"
    }

    let img = V.local.img
    return img
}
window.imglocation = imglocation


function setBG() {

    let background = {src: imglocation(),}

    if(V.local.side == "室外") background.outside = true;

    if(between(V.date.time,1020,1140) && background.outside) {
        background.color = "#D6981C"
        document.getElementById('avatar-overlay').className = "Layer sunset"

    }
    else if ((between(V.date.time,1140,1440)||between(V.date.time,0,240)) && background.outside){
        background.color = "#242C8A"
        document.getElementById('avatar-overlay').className = "Layer night"
    }
    else{
        background.color = null;
        document.getElementById('avatar-overlay').className = "Layer"
    }
    V.avatar.background = setAvatar("background",background,true)
}
F.setBG = setBG

F.getInteraction = function(location, tags, key){
    const data = D.locations[location]
    
}

function setMap(args){
    V.mapgroup = args
    F.RER()

    if(D.mapdata.景南市[args]) V.map = D.mapdata.景南市[args]
    else {return "<div class='error-view'>error: 找不到对应地图: "+args+"</div>"}

    ui.movebutton = false

    return ""
}
window.setMap = setMap
DefineMacroS("setmap",setMap)

function setLocation(args) {
    V.location = args
    F.RER() /* 设置事件随机概率 RandomEventRate */

    if(D.map.景南市[V.mapgroup][args]) V.local = D.map.景南市[V.mapgroup][args]
    else if(D.map.景南市[args]) V.local = D.map.景南市[args]
    else if(D.map.通用[args]) V.local = D.map.通用[args]
    else {return "<div class='error-view'>error: 找不到对应地图: "+args+"</div>"}
    delete V.local.situation

    ui.movebutton = false

    if(V.local){
        if(V.local.tag.includes("家"))V.local.chara.push("player");
    }
    return ""
}

window.setLocation = setLocation
DefineMacroS("location",setLocation)

function navigation(){
    let text
    if(V.local && V.mapgroup){
        let list = Object.keys(V.map.links)
        for(let i=0; i < list; i++){
            let n = D.map.景南市[V.mapgroup][n]
            let t = V.map.links[V.local.place] - V.map.links[n.place]
            let passage = n.place
            if(n.passage) passage = n.passage

            text += `<div class="links" title="移动时间：${t}分钟"><<link "・ ${n.place}" "${passage}" >><<passtime ${t}>><</link>></div>`
        }
    }
}
