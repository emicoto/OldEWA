/* 地点互动和事件相关 */
/* 总之先粗略地做一下... 符合条件的就显示出来 */
F.getsituation = function(location, series, key){
    const data = D.placedata[location].situation    
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

function setBG() {

    let background = {src: imglocation(),}

    if(V.local?.side == "室外") background.outside = true;

    if(between(V.day.time,1020,1140) && background.outside) {
        background.color = "#D6981C"
        document.getElementById('avatar-overlay').className = "Layer sunset"

    }
    else if ((between(V.day.time,1140,1440)||between(V.day.time,0,240)) && background.outside){
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
    const data = D.placedata[location]
    
}

function setLocation(args) {
    if (typeof(args)=="string" && args.length > 0){
        V.location = args
        F.RER() /* 设置事件随机概率 RandomEventRate */

        if(D.placedata[args]){
            V.local = D.placedata[args]
        }else{
            V.local = null
        }

        ui.movebutton = false

        if(V.local){
            if(V.local.tag.includes("家"))V.local.chara.push("player");
        }
        return ""
    }
    else{
        return "<div id='error-view'>error: args不是string或为空, args:"+args+"</div>"
    }
}

window.setLocation = setLocation
DefineMacroS("location",setLocation)

