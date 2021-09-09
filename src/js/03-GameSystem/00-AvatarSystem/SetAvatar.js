function SetFace(args,key) {

    if(A.facelist.includes(args)==true){
        V.PFace = A.emote[args]
        Equip.emote = args
    }else{
        V.PFace = A.emote.正常
        Equip.emote = args
    }

   if (!key){
       stAvatar()
   }
   return V.PFace
}
window.SetFace = SetFace
DefineMacroS("setface",SetFace)

window.breastsize = function() {
  var size = PC.info.breast
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
    if(PC.state.怀孕 == true || PC.state.肠内受孕 == true) return "p";
    else return ""
}

window.PregDif = function(obj) {

    if(typeof(obj)=="object" && obj && obj.hasDif && obj.hasDif.pregnant==true){
        if(PC.state.怀孕 == true || PC.state.肠内受孕 == true) return "p";
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
    if ((PFlag.trueform == true ||  Flag.charamaking == true) && PC.info.race=="兽族") return "furry/"
    else if ((PFlag.trueform == true || Flag.charamaking == true) && PC.info.race=="灵族") return "gold/"
    else if (((PFlag.trueform == true || Flag.charamaking == true) && PC.info.race=="夜族")) return "yoru/"
    else return PC.info.skin+"/"
}

function isCaged(){
    if(Equip.inner_bt && Equip.inner_bt.index =="chastitycage") return "_d";
    else return ""
}

/* 设置AVATAR（重要） */
function stAvatar() {

    /*浴精喷精喷奶冒汗气息一类 */
    V.avatar.addon.body = setAvatar("addon.body",PFlag.bukkake.body)
    V.avatar.addon.face = setAvatar("addon.face",PFlag.bukkake.face)
    V.avatar.addon.hair = setAvatar("addon.hair",PFlag.bukkake.hair)
    V.avatar.addon.face = setAvatar("addon.face",(PC.rec.饮精.c > 100))
    V.avatar.addon.bottom = setAvatar("addon.bottom", (PC.rec.肛内射 + PC.rec.内射.c > 200 && PFlag.bottom <= 1))
    V.avatar.addon.penis = setAvatar("addon.penis",(PC.rec.射精.c > 10 && PFlag.bottom <= 1))

    /* 设置身上的服装 */
    const layers = ["outter","over_up","over_bt","inner_up","inner_bt","neck","hat","face","hand","legs","shoes","back"]

    for(let i=0;i<layers.length;i++){
        let n = layers[i]

        if(Equip[n] != null && Equip[n].hasImg==true){
            V.avatar[n] = setAvatar(n,{
                fixcolor: Equip[n].fixcolor, color: Equip[n].color,
                src: setAPath(Equip[n]), acc: ( Equip[n].acc !=null ? Equip[n].index + "/"+ Equip[n].acc : null),
                fixacc : Equip[n].fixacc, subcolor: Equip[n].subcolor,
            })
            
            if( n=="over_up" && Equip.over_up.tuckinable==true){
                V.avatar.over_up.tuckin = Equip.over_up.tuckin
                Avatar.options.over_up.tuckin = Equip.over_up.tuckin
                Avatar.setAvatar("over_up.tuckin",Equip.over_up.tuckin,true);
            }    
        }
        else if(Equip[n] != null && Equip[n].hasImg==false){
            if(n=="over_bt"){
                V.avatar[n] = setAvatar(n,{
                    fixcolor: false, color:"#445687", src:"shortpant/basic", acc:null
                })
            }
            else if(n=="inner_bt"){
                V.avatar[n] = setAvatar(n,{
                    fixcolor: false, color:"#FFFFFF", src:"boxer/basic", acc:null
                })
            }
            else if(n=="over_up" && Equip[n].slot != "onepiece"){
                V.avatar[n] = setAvatar(n,{
                    fixcolor: false, color:"#FFFFFF", src:`Tshirt/basic${breastDif(Equip[n])}${PregDif(Equip[n])}`, acc:null
                })
            }
            else if(n=="over_up"&& Equip[n].slot == "onepiece"){
                V.avatar[n] = setAvatar(n,{
                    fixcolor: true, color:"white", src:`bwopiece/white${breastDif(Equip[n])}${PregDif(Equip[n])}`, acc:null
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
    const hairfront = A.hairfront[Equip.hairfront]
    const hairback = A.hairback[Equip.hairback]
    const haircolor = A.haircolor[PC.info.haircolor]
    const fixhair = function(obj){
        if (typeof(obj)=="object" && obj){
            if(obj.fixcolor == true) return PC.info.haircolor;
            else return "basic";
            
        }else{
            return ""
        }
    }

    V.avatar.hairfront = setAvatar("hairfront",{
        fixcolor: hairfront.fixcolor, color: (hairfront.fixcolor==true? null : haircolor),
        src: Equip.hairfront + "/" + fixhair(hairfront) + hasLength(hairfront,PC.info.hairlenf),
    })

    V.avatar.hairback = setAvatar("hairback",{
        fixcolor: hairback.fixcolor, color: (hairback.fixcolor==true? null : haircolor),
        src: Equip.hairback + "/" + fixhair(hairback) + hasLength(hairback,PC.info.hairlen),
    })


    /*兽耳兽角兽尾部分, 每个部位都要分开来设置……还未完全实装。 */
    if((PFlag.trueform == true || Flag.charamaking == true || PFlag.showmimi == true) && PC.info.race == "兽族"){
 
        V.avatar.kemofront.mimi = setAvatar("kemofront.mimi",{
            fixcolor: false, color: haircolor[0],
            src: "cat",
        })

     }else{
        V.avatar.kemofront.mimi = setAvatar("kemofront.mimi",null)
    }

    if((PFlag.trueform == true || Flag.charamaking == true || PFlag.showtail == true) && PC.info.race == "兽族"){

        V.avatar.kemoback.tail = setAvatar("kemoback.tail",{
            fixcolor:false, color:haircolor[0],
            src:"cat", 
        })

     }else{
        V.avatar.kemoback.tail = setAvatar("kemoback.tail",null)
    }
        /* let kemotype = PC.info.kemotype
        
        if(PC.trait.兽耳 == true){
            V.avatar.kemofront.mimi = setAvatar("kemofront.mimi",{
                fixcolor: A.kemo[kemotype].mimi.fixcolor,
                color: (A.kemo[kemotype].mimi.fixcolor==true? null: haircolor[0]),
                src: `${kemotype}/${FixMimi(A.kemo[kemotype].mimi)}`,
                msk: `${kemotype}/${FixMimi(A.kemo[kemotype].mimi)}`,
            })
        }

        if(PC.trait.兽角==true){
            V.avatar.kemofront.horn = setAvatar("kemofront.horn",
                {src= `${kemotype}/horn`, acc= hornacc(kemotype)
            })
        }

        if(PC.trait.兽尾==true){
            V.avatar.kemoback.tail = setAvatar("kemoback.tail",{
                fixcolor: A.kemo[kemotype].tail.fixcolor,
                color: (A.kemo[kemotype].tail.fixcolor==true? null: haircolor[0]),
                src: `${kemotype}/${FixTail(A.kemo[kemotype].tail)}`,
                msk: `${kemotype}/${FixMimi(A.kemo[kemotype].mimi)}`,
            })
        }

        if(PC.race=="羽族"){
            V.avatar.kemoback.wing = setAvatar("kemoback.wing",{
                fixcolor: A.kemo[kemotype].wing.fixcolor,
                color: (A.kemo[kemotype].wing,fixcolor==true? null : haircolor),
                src= `${kemotype}/${FixWings(A.kemo[kemotype].wing)}`
            })
        }
        */


    /*乳头、小丁丁等特殊装备 */
    V.avatar.penis = setAvatar("penis",(Equip.penis ? Equip.penis.png : null),true)
    V.avatar.nipple = setAvatar("nipple",(Equip.nipple ? Equip.nipple.png+breastDif(Equip.nipple) : null),true)
    
    if (Equip.vagina || Equip.anal){
        let img

        if(Equip.vagina.png) img = Equip.vagina.png;
        else if(Equip.anal.png) img = Equip.anal.png;
        else img = null;

        V.avatar.plus = setAvatar("plus",img,true)
    }

    /* 小丁丁的显示 */
    if(Flag.charamaking == true){
        if(PC.info.tag != "少女")V.avatar.dick = setAvatar("dick", isFurry()+"penis"+isCaged(),true);
        else V.avatar.dick = setAvatar("dick", null,true);

    }else{
        if(PFlag.bottom <= 1 && PC.genital.阴茎 > 3){
            V.avatar.dick = setAvatar("dick", isFurry()+"penis"+isCaged(),true)
        }else{
            V.avatar.dick = setAvatar("dick", null,true)
        }     
    }

    
    if((PFlag.trueform == true || Flag.charamaking == true)&& PC.info.race == "兽族"){
        V.avatar.body = setAvatar("body",{
            src:"furry/body_"+breastsize()+isPregnant(), color: haircolor[0],
        },true)

    }else if ((PFlag.trueform == true || Flag.charamaking == true) && PC.info.race == "灵族"){
        V.avatar.body = setAvatar("body", "gold/body_"+breastsize()+isPregnant(),true)
    }else if ((PFlag.trueform == true || Flag.charamaking == true) && PC.info.race == "夜族"){
        V.avatar.body = setAvatar("body", "yoru/body_"+breastsize()+isPregnant(),true)
    }
    else{
        V.avatar.body = setAvatar("body", PC.info.skin+"/body_"+breastsize()+isPregnant(),true)
    }

    /* 设置表情 */
    if (Flag.charamaking == true) SetFace(Equip.emote,1)

    const eyegroup = ["full","blink2","lookup3"]
    const type = [null,"a","b","c"]

    /*相框 OR 特效 */
    V.avatar.frame = setAvatar("frame",V.PFace.frame, true)
    /* 表情部分 */
    V.avatar.eyebrow = setAvatar("eyebrow", V.PFace.eyebrow, true)
    V.avatar.eyes = setAvatar("eyes",
        PC.info.eyecolor+"/"+V.PFace.eyes
        + (eyegroup.includes(V.PFace.eyes) == true ? type[PC.info.eyes] :"")
        + (V.PFace.eyes.includes("full") == true && V.PFace.name == "正常" ? "_idle" : "")
        ,true
    )

    V.avatar.mouth = setAvatar("mouth", V.PFace.mouth, true)

    const ad = Object.keys(V.avatar.emoadd)
    for(let i=0;i<ad.length;i++){
        let n=ad[i]
        V.avatar.emoadd[n] = setAvatar(`emoadd.${n}`, V.PFace[n], true)
    }

    if(PC.base.快感[0] > PC.base.快感[1]/3 || PC.state.发情 == true || PC.base.酒精[0] > PC.base.酒精[1]/2 || PC.base.药物[0] > 20){
        V.avatar.emoadd.red = setAvatar("emoadd.red",true, true)
    }

    /* 淫纹 */
    if(PC.skin.腹部){
        let path = "./image/avatar/body/"+PC.skin.腹部.index+".png"
        if(ImgExist(path)){
            V.avatar.tatoos = setAvatar("tatoos",PC.skin.腹部.index)
        }
    }else{
        V.avatar.tatoos = setAvatar("tatoos",null)
    }

    if(V.coredebug)console.log("log",V.avatar);
    return ""
}

window.stAvatar = stAvatar
F.stAvatar = stAvatar
