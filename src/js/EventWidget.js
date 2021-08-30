function setEvent() {
    var event = V.event
    event.lang = V.lang

    if (event == null || event.type == null || event.name == null){
        return false
    }

    var eventname

    if (event.branch != null && event.phrase != null){
        eventname = event.type + " " + event.name + "-"+ event.branch + "-" +  event.phrase

    }else if (event.phrase == null && event.branch != null){
        eventname = event.type + " " + event.name + "-" + event.branch 

    }else if (event.branch == null && event.phrase != null){
        eventname = event.type + " " + event.name + "-" + event.phrase

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

        if(Story.has(V.event.passage+"：S "+V.lang)==true){
            eventname = V.event.passage+"：S "+V.lang
        }

        else if (V.lang == "EN" && Story.has(V.event.passage+"：S CN")==true) {
            eventname = V.event.passage + "：S CN"
        }

        else if (V.lang == "CN" && Story.has(V.event.passage+"：S EN")==true) {
            eventname = V.event.passage + "：S EN"
        }
        else if (Story.has(V.event.passage+"：S")==true){
            eventname = V.event.passage+"：S"
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

        if(Story.has(V.event.passage+"：E")==true){
            eventname = V.event.passage+"：E"
        }       
        else{

            if(Story.has(V.event.type+" "+V.event.name+" "+V.event.branch+"：E")==true){
                eventname = V.event.type+" "+V.event.name+" "+V.event.branch+"：E"
            }
            else if(Story.has(V.event.type+" "+V.event.name+"：E")==true){
                eventname= V.event.type+" "+V.event.name+"：E"
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

function kojo(pc,uid,type,name,branch=null,phrase=null){
/* 最少关键词必须有 pc uid type name
  例：PC, 1, 主线, 事件名
  最后组合
  PC-1 主线 开幕-房间描述-1
*/
  var kojoname
  
  if(branch != null && phrase != null){
      kojoname = `${pc}-${uid} ${type}-${name}-${branch}-${phrase}`
  }
  else if (phrase != null){
      kojoname = `${pc}-${uid} ${type}-${name}-${phrase}`
  }
  else if (branch != null){
      kojoname = `${pc}-${uid} ${type}-${name}-${branch}`
  }else{
      kojoname = `${pc}-${uid} ${type}-${name}`
  }

  if (Story.has(kojoname+" "+V.lang)==true) kojoname += " "+V.lang;
  else if (V.lang == "EN" && Story.has(kojoname+" CN")) kojoname += " CN";
  else if (V.lang == "CN" && Story.has(kojoname+" EN")) kojoname += " EN";

  if(Story.has(kojoname)==true){       
      return kojoname
  }
  else{
      return false
  }

}

window.kojo = kojo

function Revent() {

    $('#eventsituation').addClass('delay'); setTimeout(() => { $('#eventsituation').removeClass('delay') }, 1000);
    $('#eventselectarea').addClass('delay'); setTimeout(() => { $('#eventselectarea').removeClass('delay') }, 1000);
    new Wikifier(null,"<<replace '#eventsituation'>><<CallEvent>><</replace>>")
    new Wikifier(null,"<<replace '#eventselectarea'>><<CallEventSelect>><</replace>>")
    new Wikifier(null,"<<replace '#eventeffect'>><<CallEventEffect>><</replace>>")

}
window.Revent = Revent
DefineMacroS("Revent", Revent);

function getitem(catgr, item, num=1) {
    if(D.itemlist[catgr][item].name.length > 0){
        if (V.items[catgr][item]){
            V.items[catgr][item].num += num
        }else{
            V.items[catgr][item] = {
                name: D.itemlist[catgr][item].name,
                type: D.itemlist[catgr][item].type,
                category: D.itemlist[catgr][item].category,                
                thumb: D.itemlist[catgr][item].thumb,
                num: num,
            }
        }
    }else{
        if (V.items.other.通用物品){
            V.items.other.通用物品 += num
        }else{
            V.items.other.通用物品 = {
                name : "通用物品",
                type : "其他",
                category:"other",
                thumb : null,
                num: num,
            }
        }
    }
    V.anounce.flag = true
    V.anounce.text = "获得了《"+item+"》x "+num
    if(V.lang == "EN"){
        V.anounce.text = "got《"+D.itemlist[catgr][item].en_name+"》 x "+num
    }
    return V.items
}

window.getitem = getitem
DefineMacroS("getitem", getitem);

function useitem(catgr,item) {
    D.itemlist[catgr][item].effect()
    V.items[catgr][item].num -= 1
    return V.items
}

window.useitem = useitem

/*
列表先读取object的keys，然后以keys的array顺序来打印显示
使用=>
    print V.items[catgt][_keys[_i]].name
    useitem(catgr,_keys[_i])
*/