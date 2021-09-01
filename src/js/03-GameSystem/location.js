function setLocation(args) {
    if (typeof(args)=="string" && args.length > 0){
        V.location = args

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