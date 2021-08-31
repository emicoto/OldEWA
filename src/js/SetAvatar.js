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
   return V.Pface
}
window.SetFace = SetFace
DefineMacroS("setface",SetFace)

function inAvatar() {
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

    let group = ["neck","hat","face","hand","bottom","inner_bt","shoes","legs","back"]

    for(i=0;i<group.length;i++){
        let n = group[i]
        if(V.Equip[n].fixcolor == ture){
            V.avatar[n] = setAvatar(n,{ fixcolor: false, color: V.Equip[n].color, src: `${V.Equip[n].index}/${V.Equip[n].color}`, acc: null})
        }
        else{
            V.avatar[n] = setAvatar(n,{ fixcolor: false, color: V.Equip[n].color, src:`${V.Equip[n].index}/basic`, acc: null})
        }
        if(V.Equip[n].acc){
            V.avatar[n].acc = setAvatar(`$[n].acc`,`${V.Equip[n].index}/${V.Equip[n].acc}`)
        }
        else if(V.Equip[n] && V.Equip[n].imagenable == false){
            
        }
    }
}