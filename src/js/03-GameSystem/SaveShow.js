function showSavedCard(type,slot,obj){

    if(obj !== null){
        let Saves = clone(obj)
        T.data = ( !Saves.metadata ? null : Saves.metadata)

        let gametime = {
            date : `${T.data?.gamedate?.month}月${T.data?.gamedate?.day}日`,
            time : (T.data?.gamedate?.hour < 10 ? '0':'')+T.data?.gamedate?.hour +':'+(T.data?.gamedate?.min < 10? '0':'')+T.data?.gamedate?.min,
            year : T.data?.gamedate?.year + '年',
        }
        let playedtime = T.data?.playedtime?.day+'D '+ (T.data?.playedtime?.hour < 10? '0':'') + T.data?.playedtime?.hour + ':' +(T.data?.playedtime?.min < 10? '0':'') + T.data?.playedtime?.min + ':' + (T.data?.playedtime?.sec < 10? '0':'') + T.data?.playedtime?.sec

        let savedtime = new Date(Saves.date).toLocaleString()

        let tslot
        if(type=='normal')tslot = slot+4;
        else tslot = slot;

        if(V.lang == "EN"){
            /* T.data.pctitle = setup.L.EN.title[T.data.pctitle] */
            /* T.data.location = D.placelist[T.data.location].name_en */
        }

        let htmltext = (
         '<div id="savecard" class="glassinset"><div id="cardcontent">'
            +'<div id="gametime">'
                +`<span id="sv-date">${gametime.date}</span><br>`
                +`<span id="sv-time">${gametime.time}</span><br>`
                +`<span id="sv-year">${gametime.year}</span>`
            +`</div>`

            +`<div id="savename">`
                +`<span id="sv-name">${T.data.saveName}</span><br>`
                +`<span id="sc-title">${T.data.pctitle}</span><br>`
            +`</div>`

            +`<div id="sv-location">${T.data.location}</div>`
            +`<div id="uid" @class="(T.data.saveId == V.saveId ? 'goldtext' : 'graytext')">UID:${T.data.saveId}</div>`
            +`<div id="playedtime">${playedtime}</div>`
            +`<div id="savedtime">${savedtime}</div>`

            +( type=="normal" ? (`<div id="savelock">`
                + (conf.saves[slot].locked ? `<<link [img[image/icon/locked.png]]>><<run SaveUnlock(${slot})>><</link>>` : `<<link [img[image/icon/unlock.png]]>><<run SaveUnlock(${slot})>><</link>>`)
            +`</div>`) : '')

            +`<div id="buttons">`
                + ( type=="normal" ? (saveOK(slot) ? `<input type="button" id="savebutton" value="SAVE" onclick="SaveGame(${tslot},${T.data.saveId},null,true)">`: `<input type="button" id="savebutton" value="SAVE" disabled>`) : "")
                +`<input type="button" id="loadbutton" value="LOAD" onclick="LoadGame('${type}',${tslot})">`
                +(conf.saves[slot].locked == true ?`<input type="button" id="delbutton" value="DEL" disabled>` : `<input type="button" id="delbutton" value="DEL" onclick="deleteSave('${type}',${tslot})">` )
            +`</div>`
            +`</div></div>`
        )
        return htmltext
    }
    else{
        let tslot
        if(type=='normal')tslot = slot+4;
        else tslot = slot;

        let htmltext = (
            '<div id="savecard" class="glassinset"><div id="cardcontent">'
            +'<div id="gametime">'
                +'<span id="sv-date">'+(type=="auto"? "A":"N")+(slot+1<10? '0':"")+(slot+1)+'</span><br>'
                +'<span id="sv-time"></span><br>'
                +'<span id="sv-year"></span>'
            +'</div>'

            +'<div id="savename">'
                +'<span id="sv-name" style="color: rgb(125 106 37 / 48%);">NO-DATA</span><br>'
                +'<span id="sc-title"></span><br>'
            +'</div>'

            +'<div id="sv-location"></div>'
            +'<div id="uid" class="graytext">UID: - - - - -</div>'
            +'<div id="playedtime"></div>'
            +'<div id="savedtime">- - : - - : - -</div>'

            +( type=="normal" ? (`<div id="savelock">`
                + (conf.saves[slot].locked ? `<<link [img[image/icon/locked.png]]>><<run SaveUnlock(${slot})>><</link>>` : `<<link [img[image/icon/unlock.png]]>><<run SaveUnlock(${slot})>><</link>>`)
            +`</div>`) : '')

            +'<div id="buttons">'
                + ( type=="normal" ? (saveOK(slot) ? `<input type="button" id="savebutton" value="SAVE" onclick="SaveGame(${tslot},null)">`: `<input type="button" id="savebutton" value="SAVE" disabled>`) : "")
                +`<input type="button" id="loadbutton" value="LOAD" disabled>`
                +`<input type="button" id="delbutton" value="DEL" disabled>`
             +'</div>'
            +'</div></div>')
        return htmltext
    }
}
F.showSavedCard = showSavedCard


window.SaveAlert = function(type, slot){
    slot = parseInt(slot)

    let a = getSaveDetails() 
    let fslot = (slot-4)
    let sdata = a.slots[fslot].metadata
    let pslot = "N"+(fslot < 10? "0":"")+(fslot+1)

    let text = (
    `<span style='color:#EA0827;'><b>`
    +(type=="UID"? `即将覆盖的${pslot}号存档与现在游玩的角色UID并不相同。`: `即将覆盖${pslot}号存档。`)+"</b></span><br>"
    +"确定要覆盖？<br><br>"
    +(type=="UID"? `现在的角色UID：${V.saveId}<br>${pslot}存档角色UID：${sdata.saveId}<br>` : "")
    +`${pslot}存档角色：${sdata.saveName}<br>`
    +"游戏内时间："+`${sdata.gamedate.year}年${sdata.gamedate.month}月${sdata.gamedate.day}日 ${sdata.gamedate.hour}时${sdata.gamedate.min}分<br>`
    +"所在地点："+sdata.location+"<br><br><br>"
    +`<input id='alert-ok' type='button' value='确定' onClick='SaveGame(${slot});SugarCube.Dialog.close()'>`
    +`<input id='alert-cancel' type='button' value='取消' onClick='SugarCube.Dialog.close()'>`
    )

    Dialog.append(text)
    Dialog.open()
}

window.LoadAlert = function(type, slot){
    let a = getSaveDetails() 
    var sdata = {}
    var fslot
    var pslot


    if(type=="auto"){
        fslot = slot
        pslot = "A"+(fslot < 10? "0":"")+(fslot+1)
        sdata = a.autosave[slot].metadata
    }else{
        fslot = (slot-4)
        pslot = "N"+(fslot < 10? "0":"")+(fslot+1)
        sdata = a.slots[fslot].metadata
    }

    let text = (
    `<span style='color:#EA0827;'><b>是否要读取${pslot}号存档？</b></span><br><br>`
    +`${pslot}存档角色：${sdata.saveName}<br>`
    +"游戏内时间："+`${sdata.gamedate.year}年${sdata.gamedate.month}月${sdata.gamedate.day}日 ${sdata.gamedate.hour}时${sdata.gamedate.min}分<br>`
    +"所在地点："+sdata.location+"<br><br><br>"
    +`<input id='alert-ok' type='button' value='确定' onClick='LoadGame("${type}",${slot},true);SugarCube.Dialog.close()'>`
    +`<input id='alert-cancel' type='button' value='取消' onClick='SugarCube.Dialog.close()'>`
    )

    let text_en = (
    `<span style='color:#EA0827;'><b>Are you sure to load ${pslot} savedata？</b></span><br><br>`
        +`${pslot} chara：${sdata.saveName}<br>`
        +"InGame time:"+`${sdata.gamedate.month}/${sdata.gamedate.day}/${sdata.gamedate.year}, at ${sdata.gamedate.hour}:${sdata.gamedate.min}<br>`
        +"location"+sdata.location+"<br><br><br>"
        +`<input id='alert-ok' type='button' value='OK' onClick='deleteSave("${type}",${slot},true);SugarCube.Dialog.close()'>`
        +`<input id='alert-cancel' type='button' value='Cancel' onClick='SugarCube.Dialog.close()'>`
    )

    Dialog.append(Lang(text,text_en))
    Dialog.open()

}

window.DelAlert = function(type, slot){
    let a = getSaveDetails() 
    var sdata = {}
    var fslot
    var pslot


    if(type=="auto"){
        fslot = slot
        pslot = "A"+(fslot < 10? "0":"")+(fslot+1)
        sdata = a.autosave[slot].metadata
    }else{
        fslot = (slot-4)
        pslot = "N"+(fslot < 10? "0":"")+(fslot+1)
        sdata = a.slots[fslot].metadata
    }

    let text = (
    `<span style='color:#EA0827;'><b>是否要删除${pslot}号存档？</b></span><br><br>`
        +`${pslot}存档角色：${sdata.saveName}<br>`
        +"游戏内时间："+`${sdata.gamedate.year}年${sdata.gamedate.month}月${sdata.gamedate.day}日 ${sdata.gamedate.hour}时${sdata.gamedate.min}分<br>`
        +"所在地点："+sdata.location+"<br><br><br>"
        +`<input id='alert-ok' type='button' value='确定' onClick='deleteSave("${type}",${slot},true);SugarCube.Dialog.close()'>`
        +`<input id='alert-cancel' type='button' value='取消' onClick='SugarCube.Dialog.close()'>`
    )

    let text_en = (
    `<span style='color:#EA0827;'><b>Are you sure to delete ${pslot} savedata？</b></span><br><br>`
        +`${pslot} chara：${sdata.saveName}<br>`
        +"InGame time:"+`${sdata.gamedate.month}/${sdata.gamedate.day}/${sdata.gamedate.year}, at ${sdata.gamedate.hour}:${sdata.gamedate.min}<br>`
        +"location"+sdata.location+"<br><br><br>"
        +`<input id='alert-ok' type='button' value='OK' onClick='deleteSave("${type}",${slot},true);SugarCube.Dialog.close()'>`
        +`<input id='alert-cancel' type='button' value='Cancel' onClick='SugarCube.Dialog.close()'>`
    )

    Dialog.append(Lang(text,text_en))
    Dialog.open()
}