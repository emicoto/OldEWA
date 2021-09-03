function SetFace(args,key) {

    if(A.facelist.includes(args)==true){
        V.PFace = A.emote[args]
        V.Equip.emote = args
    }else{
        V.PFace = A.emote.正常
        V.Equip.emote = args
    }

   if (!key){
       stAvatar()
   }
   return V.PFace
}
window.SetFace = SetFace
DefineMacroS("setface",SetFace)

window.breastsize = function() {
  var size = V.PC.breast
  if (between(size,0,1)){
    return 1;
  }
  else if (between(size,2,3)){
    return 2;
  }
  else if (size>=4){
    return 3;
  }
}

window.breastDif = function(obj){
    if( typeof(obj) == "object" && obj && obj.hasDif && obj.hasDif.breast==true) return `_${breastsize()}`;
    else return "";
}

window.isPregnant = function() {
    if(V.PC.state.怀孕 == true || V.PC.state.肠内受孕 == true) return "p";
    else return ""
}

window.PregDif = function(obj) {

    if(typeof(obj)=="object" && obj && obj.hasDif && obj.hasDif.pregnant==true){
        if(V.PC.state.怀孕 == true || V.PC.state.肠内受孕 == true) return "p";
        else return ""
    }
    else return ""
}


window.isfixed = function(obj){
    if(typeof(obj)=="object" && obj && obj.fixcolor == true) return obj.index+"/"+obj.color;
        else return obj.index+"/basic"
}


window.hasLength = function(obj,num) {

    var lenth = function(num){
        if( between(num,0,99)) return 1;
        else if(between(num,100,499)) return 2;
        else if(between(num,500,799)) return 3;
        else if(num>= 800) return 4;
        else return 1;
    }

    if (typeof(obj) == "object" && obj){
        if (lenth(num) <= obj.max) {
            return "_" + lenth(num)
        }
        else {
            return "_" + obj.max
        }
    }else{
        return ""
    }
}


function setAPath(obj){

    if(typeof(obj)=="object" && obj) return isfixed(obj)+breastDif(obj)+PregDif(obj)
    else return ""

}
window.setAPath = setAPath

/* 背景设置 */
function imglocation(){
    var location = V.location
    
    if ( !D.placedata[location] || D.placedata[location].img == undefined  || D.placedata[location].img == null){
      return "dummy"

    }else{
      let img = D.placedata[location].img
      return img
    }
}
window.imglocation = imglocation



function isFurry(){
    const group = ["兽族","羽族"]
    if ((V.PFlag.kemoform == true ||  V.charamaking == true) && group.includes(V.PC.info.race)) return "furry/"
    else return V.PC.info.skin+"/"
}

function isCaged(){
    if(V.Equip.inner_bt && V.Equip.inner_bt.index =="chastitycage") return "_d";
    else return ""
}

/* 设置AVATAR（重要） */
function stAvatar() {

    /*浴精喷精喷奶冒汗气息一类 */
    V.avatar.addon.body = setAvatar("addon.body",V.PFlag.bukkake.body)
    V.avatar.addon.face = setAvatar("addon.face",V.PFlag.bukkake.face)
    V.avatar.addon.hair = setAvatar("addon.hair",V.PFlag.bukkake.hair)
    V.avatar.addon.face = setAvatar("addon.face",(V.PC.rec.饮精.c > 100))
    V.avatar.addon.bottom = setAvatar("addon.bottom", (V.PC.rec.肛内射 + V.PC.rec.内射.c > 200 && V.PFlag.bottom <= 1))
    V.avatar.addon.penis = setAvatar("addon.penis",(V.PC.rec.射精.c > 10 && V.PFlag.bottom <= 1))

    /* 设置身上的服装 */
    const layers = ["outter","top","bottom","inner_up","inner_bt","neck","hat","face","hand","legs","shoes","back"]

    for(let i=0;i<layers.length;i++){
        let n = layers[i]

        if(V.Equip[n] != null && V.Equip[n].hasImg==true){
            V.avatar[n] = setAvatar(n,{
                fixcolor: V.Equip[n].fixcolor, color: V.Equip[n].color,
                src: setAPath(V.Equip[n]), acc: ( V.Equip[n].acc !=null ? V.Equip[n].index + "/"+ V.Equip[n].acc : null),
                fixacc : V.Equip[n].fixacc, subcolor: V.Equip[n].subcolor,
            })
            
            if(V.Equip[n].tuckinable==true){
                V.avatar[n].tuckin = setAvatar(`${n}.tuckin`,V.Equip.tuckin)
            }    
        }
        else if(V.Equip[n] != null && V.Equip[n].hasImg==false){
            if(n=="bottom"){
                V.avatar[n] = setAvatar(n,{
                    fixcolor: false, color:"#445687", src:"shortpant/basic", acc:null
                })
            }
            else if(n=="inner_bt"){
                V.avatar[n] = setAvatar(n,{
                    fixcolor: false, color:"#FFFFFF", src:"boxer/basic", acc:null
                })
            }
            else if(n=="top" && V.Equip[n].slot != "onepiece"){
                V.avatar[n] = setAvatar(n,{
                    fixcolor: false, color:"#FFFFFF", src:`Tshirt/basic${breastDif(V.Equip[n])}${PregDif(V.Equip[n])}`, acc:null
                })
            }
            else if(n=="top"&& V.Equip[n].slot == "onepiece"){
                V.avatar[n] = setAvatar(n,{
                    fixcolor: true, color:"white", src:`bwopiece/white${breastDif(V.Equip[n])}${PregDif(V.Equip[n])}`, acc:null
                })
            }
            else{
                V.avatar[n] = setAvatar(n,null)
            }
        }
        else{
            V.avatar[n] = setAvatar(n,null)
        }
    }

    /*头发部分*/
    const hairfront = A.hairfront[V.Equip.hairfront]
    const hairback = A.hairback[V.Equip.hairback]
    const haircolor = A.haircolor[V.PC.info.haircolor]
    const fixhair = function(obj){
        if (typeof(obj)=="object" && obj){
            if(obj.fixcolor == true) return V.PC.info.haircolor;
            else return "basic";
            
        }else{
            return ""
        }
    }

    V.avatar.hairfront = setAvatar("hairfront",{
        fixcolor: hairfront.fixcolor, color: (hairfront.fixcolor==true? null : haircolor),
        src: V.Equip.hairfront + "/" + fixhair(hairfront) + hasLength(hairfront,V.PC.info.hairlenf),
    })

    V.avatar.hairback = setAvatar("hairback",{
        fixcolor: hairback.fixcolor, color: (hairback.fixcolor==true? null : haircolor),
        src: V.Equip.hairback + "/" + fixhair(hairback) + hasLength(hairback,V.PC.info.hairlen),
    })


    /*兽耳兽角兽尾部分, 还未实装。 */
    if((V.PFlag.kemoform == true || V.charamaking == true)){
        /* let kemotype = V.PC.info.kemotype
        
        if(V.PC.trait.兽耳 == true){
            V.avatar.kemofront.mimi = setAvatar("kemofront.mimi",{
                fixcolor: A.kemo[kemotype].mimi.fixcolor,
                color: (A.kemo[kemotype].mimi.fixcolor==true? null: haircolor[0]),
                src= `${kemotype}/${FixMimi(A.kemo[kemotype].mimi)}`,
            })
        }

        if(V.PC.trait.兽角==true){
            V.avatar.kemofront.horn = setAvatar("kemofront.horn",
                {src= `${kemotype}/horn`, acc= hornacc(kemotype)
            })
        }

        if(V.PC.trait.兽尾==true){
            V.avatar.kemoback.tail = setAvatar("kemoback.tail",{
                fixcolor: A.kemo[kemotype].tail.fixcolor,
                color: (A.kemo[kemotype].tail.fixcolor==true? null: haircolor[0]),
                src= `${kemotype}/${FixTail(A.kemo[kemotype].tail)}`,
            })
        }

        if(V.PC.race=="羽族"){
            V.avatar.kemoback.wing = setAvatar("kemoback.wing",{
                fixcolor: A.kemo[kemotype].wing.fixcolor,
                color: (A.kemo[kemotype].wing,fixcolor==true? null : haircolor),
                src= `${kemotype}/${FixWings(A.kemo[kemotype].wing)}`
            })
        }
        */
    }

    /*乳头、小丁丁等特殊装备 */
    V.avatar.penis = setAvatar("penis",(V.Equip.penis ? V.Equip.penis.png : null),true)
    V.avatar.nipple = setAvatar("nipple",(V.Equip.nipple ? V.Equip.nipple.png+breastDif(V.Equip.nipple) : null),true)
    
    if (V.Equip.vagina || V.Equip.anal){
        let img

        if(V.Equip.vagina.png) img = V.Equip.vagina.png;
        else if(V.Equip.anal.png) img = V.Equip.anal.png;
        else img = null;

        V.avatar.plus = setAvatar("plus",img,true)
    }

    /* 小丁丁的显示 */
    if(V.charamaking == true){
        if(V.PC.info.tag != "少女")V.avatar.dick = setAvatar("dick", isFurry()+"penis"+isCaged(),true);
        else V.avatar.dick = setAvatar("dick", null,true);

    }else{
        if(V.PFlag.bottom <= 1 && V.PC.genital.阴茎 > 3){
            V.avatar.dick = setAvatar("dick", isFurry()+"penis"+isCaged(),true)
        }else{
            V.avatar.dick = setAvatar("dick", null,true)
        }     
    }

    
    const kemorace = ["羽族","兽族"]
    if((V.PFlag.kemoform == true ||  V.charamaking == true)&& kemorace.includes(V.PC.info.race)){
        V.avatar.body = setAvatar("body",{
            src:"furry/body_"+breastsize()+isPregnant(), color: haircolor[0],
        },true)

    }else{
        V.avatar.body = setAvatar("body", V.PC.info.skin+"/body_"+breastsize()+isPregnant(),true)
    }

    /* 设置表情 */
    if (V.charamaking == true) SetFace(V.Equip.emote,1)

    const eyegroup = ["full","blink2","lookup3"]
    const type = [null,"a","b","c"]

    /*相框 OR 特效 */
    V.avatar.frame = setAvatar("frame",V.PFace.frame, true)
    /* 表情部分 */
    V.avatar.eyebrow = setAvatar("eyebrow", V.PFace.eyebrow, true)
    V.avatar.eyes = setAvatar("eyes",
        V.PC.info.eyecolor+"/"+V.PFace.eyes
        + (eyegroup.includes(V.PFace.eyes) == true ? type[V.PC.eyes] :"")
        + (V.PFace.eyes.includes("full") == true && V.PFace.name == "正常" ? "_idle" : "")
        ,true
    )

    V.avatar.mouth = setAvatar("mouth", V.PFace.mouth, true)

    const ad = Object.keys(V.avatar.emoadd)
    for(let i=0;i<ad.length;i++){
        let n=ad[i]
        V.avatar.emoadd[n] = setAvatar(`emoadd.${n}`, V.PFace[n], true)
    }

    if(V.PC.base.快感[0] > V.PC.base.快感[1]/3 || V.PC.state.发情 == true || V.PC.base.酒精[0] > V.PC.base.酒精[1]/2 || V.PC.base.药物[0] > 20){
        V.avatar.emoadd.red = setAvatar("emoadd.red",true, true)
    }

    /* 淫纹 */
    if(V.Pskin.腹部){
        let path = "./image/avatar/body/"+V.Pskin.腹部.index+".png"
        if(ImgExist(path)){
            V.avatar.tatoos = setAvatar("tatoos",V.Pskin.腹部.index)
        }
    }else{
        V.avatar.tatoos = setAvatar("tatoos",null)
    }

    V.avatar.background = setAvatar("background",imglocation(),true)

    if(V.avatar.top && V.avatar.top.tuckin){
        let layer = clone(Avatar.AVATARMODEL.layers)

        Avatar.AVATARMODEL.layers.top_acc.z = layer.hand.z
        Avatar.AVATARMODEL.layers.top.z = layer.bottom_acc.z
        Avatar.AVATARMODEL.layers.hand.z = layer.bottom.z
        Avatar.AVATARMODEL.layers.bottom_acc.z = layer.top_acc.z
        Avatar.AVATARMODEL.layers.bottom.z = layer.top.z 
    }

    if(V.harddebug)console.log("log",V.avatar);
    return ""
}

window.stAvatar = stAvatar
F.stAvatar = stAvatar