
window.fixStuckAnimations = function() {
	let scrollX = window.scrollX;
	let scrollY = window.scrollY;
	let imgs = $('#story').add($('#ui-bar'));
	imgs.toggleClass('hidden');
	window.setTimeout(() => {
		imgs.toggleClass('hidden');
		window.scroll(scrollX, scrollY);
	}, 5);
}

/* 属性集算 */
function setreveal(){
    const isReveal=w=>Equip[w] ?Equip[w].reveal :0;
    const tops =[isReveal("outter"),isReveal("over_up"),isReveal("inner_up"),]
    const bottoms=[isReveal("over_bt"),isReveal("inner_bt")]
    tops.sort((a,b)=>b-a)
    bottoms.sort((a,b)=>b-a)
    /*console.log("上衣:",tops)
    console.log("下衣:",bottoms)*/
    PFlag.top = !tops[0]?0: tops[0]
    PFlag.bottom=!bottoms[0]?0: bottoms[0]
}
window.setreveal = setreveal
F.setreveal = setreveal

function allureBuff() {
    const isAllure = w => Equip[w] ? Equip[w].beauty : 0;
    const items = ["hat","outter","over_up","over_bt","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

    var a = 0
    for(let i = 0; i < items.length; i++){
            a = a+isAllure(items[i])
        }

    if(PC.trait.倾国倾城 == true) a += 3;

    return 1+a
}

window.allureBuff = allureBuff
F.allureBuff = allureBuff

function defBuff() {
    const isDef = w => Equip[w] ? Equip[w].defence : 0;
    const items = ["hat","outter","over_up","over_bt","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

    var a = 0
    for(let i = 0; i < items.length; i++){
            a = a+isDef(items[i])
        }

    return a
}

window.defBuff = defBuff
F.defBuff = defBuff

function warmth() {
    const isHot = w => Equip[w] ? Equip[w].hot : 0;
    const isCold = w => Equip[w] ? Equip[w].cold : 0;
    const items = ["hat","outter","over_up","over_bt","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

    var a = [0,0]
    for(let i = 0; i < items.length; i++){
        a[0] += isHot(items[i])
        a[1] += isCold(items[i])
    }
    PC.info.hot = V.fix.hot + a[0]
    PC.info.cold = V.fix.cold + a[1]
    return a
}

window.warmth = warmth
F.warmth = warmth

function gonaked(mode){

    if((Equip.over_up && mode=="debug") || !mode){
        V.TEquip = clone(V.Equip)
    }

    const group=["hat","outter","over_up","over_bt","inner_up","inner_bt","legs","shoes","face","neck","hand","back"]

    if (mode=="closet"){
        for(let i=0; i< group.length; i++){
            strip(group[i])
        }

    }
    else if(mode=="H" || !mode){
        let layer = ["outter","over_up","over_bt","inner_up","inner_bt","shoes","legs"]
        for(let i=0; i<layer.length;i++){
            Equip[group[i]] = null
        }
    }
    else if (mode=="debug"){
        for(let i=0; i<group.length; i++){
            Equip[group[i]] = null
        }
    }

    FixValue()
    stAvatar()

    if(V.coredebug==true)console.log(Equip,V.TEquip);
    return ""
}

F.gonaked = gonaked
DefineMacroS("gonaked",gonaked)

function redress(mode){

    if(mode=="closet"){

        Object.entries(closet).forEach(([index,value])=>{
        if (V.TEquip[index] && (value.length > 0)) Object.entries(value).forEach(([___, arr], i) => {
            if (arr != null && arr.uid === V.TEquip[index].uid)  dressOn(index, i);
        });
        })
    }

    V.Equip = clone(V.TEquip)
    FixValue()
    stAvatar()
    
    let index = Object.keys(V.TEquip)
    for(let i=0;i<index.length;i++){
        V.TEquip[i] = null
    }

}
F.redress = redress
DefineMacroS("redress",redress)

function getClosetSlot(args){
    if(args == "tryon"){
        //遍历试穿部位的衣柜空位
        let list = A.category
        for(let i=0;i<list.length;i++){
            let n = list[i]
            let left = (closet.slot.level*closet.slot[n]) - closet[n].length +1

            if(V.tryon[i]){
                //确认空位,只要有一个的空位不足,就返回
                if(left < 1)return left
            }
        }
        //没中途返回就返回值 1
        return 1

    }else{
        //返回showcase.layer位置的衣柜空位
        let layer = V.showcase.layer
        return (closet.slot.level*closet.slot[layer]) - closet[layer].length +1
    }
}

//不是从衣柜里时, 用在初始化和 强制换装剧情
/**
 * @param {String} category 
 * @param {Number} id 
 */
 function getDress(category, id, color, colorname, acc, subcolor,cursed){
    let uid = random(100,100000)
    let newitem = clone(A[category][id])
    newitem.uid = uid

    if(color) newitem.color = color;
    if(colorname) newitem.colorname = colorname;

    if(acc) newitem.acc = acc;
    if(subcolor && A[category][id].fixacc === false) newitem = subcolor;

    if(cursed) newitem.cursed = true;

    newitem = clearAItems(newitem)
    V.Equip[category] = clone(newitem)

    checkEquipSlot(V.Equip[category])

    FixValue()
    stAvatar()
}
F.getDress = getDress
window.getDress = getDress
DefineMacroS("getDress", getDress)

//初始化 或 剧情中获得时
function addCloset(index,id,color,colorname,acc,subcolor){
    let newitem = clone(A[index][id])
    let uid = random(100,100000)

    newitem.uid = uid

    if(color) newitem.color = color;
    if(colorname) newitem.colorname = colorname;

    if(acc) newitem.acc = acc;
    if(subcolor && A[category][id].fixacc === false) newitem.subcolor = subcolor;

    newitem = clearAItems(newitem)
    V.closet[index].push(newitem)

}
F.addCloset = addCloset
window.addCloset = addCloset

window.clearAItems = function(obj){
    //减少存档负担
    delete obj.text
    delete obj.text_en
    delete obj.tag
    delete obj.colors
    delete obj.patterns
    
    if(obj.effect) delete obj.effect

    return obj
}

//连衣裙之类的穿脱处理
window.checkEquipSlot = function(obj,mode){
    let layer = obj.layer

    if(layer=="over_up" && Equip.over_bt && obj.slot=="onepiece"){
        if(mode=="closet"){
            let item = clone(Equip.over_bt)
            closet.over_bt.push(item)
        }
        Equip.over_bt = null
    }
    if(layer=="over_bt" && Equip.over_up?.slot == "onepiece"){
        if(mode=="closet"){
            let item = clone(Equip.over_up)
            closet.over_up.push(item)
        }
        Equip.over_up = null
    }
    if(layer=="inner_up" && Equip.inner_bt && obj.slot == "onepiece"){
        if(mode=="closet"){
            let item = clone(Equip.inner_bt)
            closet.inner_bt.push(item)
        }
        Equip.inner_bt = null
    }
    if(layer=="inner_up" && Equip.inner_up.slot == "fullbody"){
        if(mode=="closet"){
            if(Equip.inner_bt){
                let item = clone(Equip.inner_bt)
                closet.inner_bt.push(item)
            }
            if(Equip.over_up){
                let item = clone(Equip.over_up)
                closet.over_up.push(item)
            }
            if(Equip.over_bt){
                let item = clone(Equip.over_bt)
                closet.over_bt.push(item)
            }
        }
        Equip.inner_bt = null
        Equip.over_up = null
        Equip.over_bt = null
    }

}