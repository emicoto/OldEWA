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
            +`<div id="uid">uid:${T.data.saveId}</div>`
            +`<div id="playedtime">${playedtime}</div>`
            +`<div id="savedtime">${savedtime}</div>`

            +( type=="normal" ? (`<div id="savelock">`
                + (conf.saves[slot].locked ? `<<link [img[image/icon/locked.png]]>><<run SaveUnlock(${slot})>><</link>>` : `<<link [img[image/icon/unlock.png]]>><<run SaveUnlock(${slot})>><</link>>`)
            +`</div>`) : '')

            +`<div id="buttons">`
                + ( type=="normal" ? `<input type="button" id="savebutton" value="SAVE" onclick="">` : "")
                +`<input type="button" id="loadbutton" value="LOAD" onclick="">`
                +`<input type="button" id="delbutton" value="DEL" onclick="">`
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
                +'<span id="sv-date"></span><br>'
                +'<span id="sv-time"></span><br>'
                +'<span id="sv-year"></span>'
            +'</div>'

            +'<div id="savename">'
                +'<span id="sv-name">NO-DATA</span><br>'
                +'<span id="sc-title"></span><br>'
            +'</div>'

            +'<div id="sv-location"></div>'
            +'<div id="uid">uid:000000</div>'
            +'<div id="playedtime"></div>'
            +'<div id="savedtime">-:-:-</div>'

            +( type=="normal" ? (`<div id="savelock">`
                + (conf.saves[slot].locked ? `<<link [img[image/icon/locked.png]]>><<run SaveUnlock(${slot})>><</link>>` : `<<link [img[image/icon/unlock.png]]>><<run SaveUnlock(${slot})>><</link>>`)
            +`</div>`) : '')

            +'<div id="buttons">'
                + ( type=="normal" ? `<input type="button" id="savebutton" value="SAVE" onclick="">` : "")
                +`<input type="button" id="loadbutton" value="LOAD" onclick="">`
                +`<input type="button" id="delbutton" value="DEL" onclick="">`
             +'</div>'
            +'</div></div>')
        return htmltext
    }
}
F.showSavedCard = showSavedCard

window.SaveUnlock = function(slot) {
    conf.saves[slot].locked = !conf.saves[slot].locked

}





