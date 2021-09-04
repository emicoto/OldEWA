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
               
               if(V.harddebug)console.log(data[i].condition());
        }
    }}
    if(text.before.length + text.content.length + text.after.length > 0){
        let result = (text.before.length > 0 ? text.before.join(" ") : "") + ( text.content.length > 0 ? text.content.join(" ") : "") + ( text.after.length > 0 ? text.after.join(" ") : "")

        return result
    }
}

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

        V.movebutton = false

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

