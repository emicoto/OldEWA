﻿/* 地点互动和事件相关 */
/* 总之先粗略地做一下... 符合条件的就显示出来 */
F.getsituation = function(args, series, key){
    let data = {}

    if(D.map.景南市[V.mapgroup][args]){
        data = D.map.景南市[V.mapgroup][args].situation
    }
    else if(D.map.景南市[args]){
        data = D.map.景南市[args].situation
    }
    else if(D.map.通用[args]){
        data = D.map.通用[args].situation
    }
 
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

F.getDescrips = function(args,group){
    let data = {}
    if(group) data = D.map.景南市[group][args]
    else data = D.map.景南市[args]

    return data.description()
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
    
    //更新local信息
    if(D.map.景南市[V.mapgroup][args]) V.local = clone(D.map.景南市[V.mapgroup][args])
    else if(D.map.景南市[args]) V.local = clone(D.map.景南市[args])
    else if(D.map.通用[args]) V.local = clone(D.map.通用[args])
    else {return "<div class='error-view'>error: 找不到对应地图: "+args+"</div>"}
    //减少存档错误
    delete V.local.situation
    delete V.local.description

    //记录上一个地点
    V.local.last = V.location

    //把地点名扔回去
    V.location = args

    //重置移动按钮
    ui.movebutton = false

     /* 设置事件随机概率 RandomEventRate */
    F.RER()

    //角色移动处理
    if(V.local){
        if(V.local.tag.includes("家"))V.local.chara.push("player");
    }

    //事件CHECK

    return ""
}

window.setLocation = setLocation
DefineMacroS("location",setLocation)

function navigation(){
    var text
    if(V.local && V.mapgroup){
        text = ""

        //先获取 出发点信息
        let stpoint = V.local.place

        //获取所在地图链接列表, 召唤当前地图范围内的快速链接
        let list = Object.keys(V.map.links)
        let linklist = []


        for(let i=0; i < list.length; i++){
            let n = list[i]
            if(n == V.local.place) continue;

            //获取目的地详细资料
            let dest = D.map.景南市[V.mapgroup][n]
            if(V.coredebug)console.log(dest);

            let name = dest.place
            if(dest.tag.includes("家")) name = "回家"

            let passage = name
            if(dest.passage) passage = dest.passage;

            //计算移动时间
            let t = Math.abs(V.map.links[stpoint] - V.map.links[n])

            text += `<div class="links" title="移动时间：${t}分钟"><<link "・ ${name}" "${passage}">><<passtime ${t}>><</link>></div>`

            if(V.coredebug) {
                console.log(`<div class="links" title="移动时间：${t}分钟"><<link "・ ${name}" "${passage}">><<passtime ${t}>><</link>></div>`)
            }
            linklist.push(n)
        }

        //如果处于地图出入口区, 则显示附近步行 30分钟内的地点
        if (V.local.place == V.map.enter) {
            let mapgroup = V.map.index
            let tmap = D.mapdata.景南市[mapgroup]
            
            console.log(mapgroup, tmap)
            let list = Object.keys(tmap.links)

            for(let i=0; i<list.length; i++){
                let n = list[i]
                if(n==V.local.place) continue;

                //获取目的地详细资料
                let dest = D.map.景南市[mapgroup][n]
                if(V.coredebug) console.log(dest);

                //排除还没实装的地图
                if(!dest) continue;
                //排除重复的通用地点链接
                if(linklist.includes(n)) continue;

                //计算移动时间
                let t = Math.abs(tmap.links[stpoint] -tmap.links[n])
                //大地图上,前往公交或地铁站的移动时间永远是 3~5分钟
                if(["公交站","地铁站"].includes(n) && t > 5) t = rand(3,5);

                if(t > 30) continue;

                let name = dest.place
                if(dest.tag.includes('家')) name = "回家"

                let passage = name
                if(dest.passage) passage = dest.passage;

                text += `<div class="links" title="移动时间：${t}分钟"><<link "・ ${name}" "${passage}">><<passtime ${t}>><</link>></div>`

                console.log(`<div class="links" title="移动时间：${t}分钟"><<link "・ ${name}" "${passage}">><<passtime ${t}>><</link>></div>`)

            }

            //如果有 car 或 bike 召唤对应的移动链接
        }     
        return text
    }
    return false
}
window.navigation = navigation