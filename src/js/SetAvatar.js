function SetFace(args,key) {

    if(A.facelist.includes(args)==true){
        V.PFace = A.emote[args]
        V.Equip.emote = args
    }else{
        V.PFace = A.emote.正常
        V.Equip.emote = args
    }

   if (!key){
       new Wikifier(null,"<<SetAvatar>>")
   }
   return V.PFace
}
window.SetFace = SetFace
DefineMacroS("setface",SetFace)

function inAvatar() {

    /* 设置表情 */
    if (V.charamaking == true) SetFace(V.Equip.emote,1)

    /*相框 OR 特效 */
    V.avatar.frame = setAvatar("frame",V.PFace.frame)

    /*浴精喷精喷奶冒汗气息一类 */

    V.avatar.addon.body = setAvatar("addon.body",V.PFlag.bukkake.body)
    V.avatar.addon.face = setAvatar("addon.face",V.PFlag.bukkake.face)
    V.avatar.addon.hair = setAvatar("addon.hair",V.PFlag.bukkake.hair)

    V.avatar.addon.face = setAvatar("addon.face",(V.PC.sexrec.饮精.c > 100))
    V.avatar.addon.bottom = setAvatar("addon.bottom", (V.PC.sexrec.肛内射+PC.sexrec.内射.c > 200 && V.PFlag.bottom <= 1))
    V.avatar.addon.penis = setAvatar("addon.penis",(V.PC.sexrec.射精.c > 10 && V.PFlag.bottom <= 1))

    const group = ["neck","hat","face","hand","bottom","inner_bt","shoes","legs","back"]

    for(let i=0;i<group.length;i++){
        let n = group[i]

        if ( V.Equip[n] && V.Equip[n].imagenable == true){
            if(V.Equip[n].fixcolor == ture){
                V.avatar[n] = setAvatar(n,{ fixcolor: false, color: V.Equip[n].color, src: `${V.Equip[n].index}/${V.Equip[n].color}`, acc: null})
            }else{
                V.avatar[n] = setAvatar(n,{ fixcolor: false, color: V.Equip[n].color, src:`${V.Equip[n].index}/basic`, acc: null})
            }
            if(V.Equip[n].acc){
                V.avatar[n].acc = setAvatar(`$[n].acc`,`${V.Equip[n].index}/${V.Equip[n].acc}`)
            }

        }else if( V.Equip[n] && V.Equip[n].imagenable == false){
            if(n=="bottom"){
                V.avatar.bottom = setAvatar("bottom",{ fixcolor: false, color: "#445687", src: "shortpant/basic", acc: null, })
            }
            else if(n=="inner_bt"){
                V.avatar.inner_bt = setAvatar("inner_bt",{ fixcolor: false, color: "white", src: "boxer/basic", acc: null, })
            }
            else{
                V.avatar[n] = setAvatar(n,{ fixcolor: true, color: "", src: null, acc: null, })
            }

        }else {
            V.avatar[n] = setAvatar(n,null)
        }
    }

    const groupb = ["outter","top","inner_up"]

    for(let i=0;i<groupb.length;i++){
        let n = groupb[i]

        if(V.Equip[n] && V.Equip[n].imagenable == true){
            if(V.Equip[n].fixcolor == true){
                V.avatar[n] = setAvatar(n,{fixcolor:true, color: $Equip[n].color, src: `${V.Equip[n].index}/${V.Equip[n].color}`, acc: null, tuckin:false})
            }else{
                V.avatar[n] = setAvatar(n,{fixcolor:false, color: $Equip[n].color, src: `${V.Equip[n].index}/basic` , acc: null, tuckin:false})
            }
            V.avatar[n].tuckin = setAvatar(`${n}.tuckin`,(V.Equip[n].tuckinable == true && V.Euip[n].tuckin == true))
            
            if(V.Equip[n].acc){
                V.avatar[n].acc = setAvatar(`${n}.acc`,`${V.Equip[n].index}/${V.Equip[n].acc}`)
            }
        }
    }


}

function breastDif(obj){
    var size = function () {
        let size = V.PC.breast
        if (between(size,0,1)) return 1;
        else if (between(size,2,3)) return 2;
        else if (size>=4) return 3;
    }
    
    if( typeof(obj) == "object" ){
        if(obj.hasDif.breast) return `_${size()}`;else return "";
    }else return "";
}
window.breastDif = breastDif