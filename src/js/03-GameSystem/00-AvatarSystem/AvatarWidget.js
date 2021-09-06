
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
    const tops =[isReveal("outter"),isReveal("top"),isReveal("inner_up"),]
    const bottoms=[isReveal("bottom"),isReveal("inner_bt")]
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
    const items = ["hat","outter","top","bottom","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

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
    const items = ["hat","outter","top","bottom","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

    var a = 0
    for(let i = 0; i < items.length; i++){
            a = a+isDef(items[i])
        }

    return 1+a
}

window.defBuff = defBuff
F.defBuff = defBuff

function warmth() {
    const isHot = w => Equip[w] ? Equip[w].hot : 0;
    const isCold = w => Equip[w] ? Equip[w].cold : 0;
    const items = ["hat","outter","top","bottom","inner_up","inner_bt","legs","shoes","neck","face","hand","back"]

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

/* 商店处理 */

window.setShowCaseUID = function(){
    if(V.showcase){
        V.showcase.uid = random(100000,999999)
    }
}


function setShowCase(table) {
    if (typeof(table) == "object") {
        V.showcase = clone(table)
        setShowCaseUID()

        new Wikifier(null,"<<replace '#show_container'>><<ShowCase>><</replace>>")
    }else{
        console.log(table,"error: is not object")
    }

}
window.setShowCase = setShowCase

function setPatterns(arg) {
    V.showcase.acc = arg
    setShowCaseUID()

    Avatar.setShop()
    /*new Wikifier(null,"<<replace '#showcase'>><<ShowManequin>><</replace>>")*/
}
window.setPatterns = setPatterns

function setColors(arg,name,change = false, mode="base") {
    if (mode == "base") {
        V.showcase.color = arg
        V.showcase.colorname = name
    }
    if (mode == "acc") {
        V.showcase.subcolor = arg
    }
    if (change) {
        Avatar.setShop(arg, mode)
        setShowCaseUID()
        return
    }
    
    setShowCaseUID()
    Avatar.setShop()
    /*new Wikifier(null,"<<replace '#showcase'>><<ShowManequin>><</replace>>")*/
}
window.setColors = setColors

function tryoncost() {
    const group = Object.keys(V.tryon)
    var n = 0

    for (let i=0; i < group.length; i++){
        if(V.tryon[group[i]] && V.tryon[group[i]].cost > 0) n += V.tryon[group[i]].cost;
    }
    return n
}
window.tryoncost = tryoncost

function BuyOutFit(args) {
    var layer = V.showcase.layer
    var text

    if (args=="select" && PC.money > V.showcase.cost) {
        PC.money = PC.money - V.showcase.cost
        let buystuff = clone(V.showcase)
        closet[layer].push(buystuff)

        /* 如果买了就直接清除掉 */
        if (V.tryon[layer] && V.tryon[layer].uid==Equip[layer].uid && V.tryon[layer].uid == V.showcase.uid){
        V.tryon[layer] = null;
        }

        text = "你花费了"+V.showcase.cost+"元购买了"+V.showcase.name+"。"
    }
    else if (args=="tryon" && PC.money > tryoncost() ){
        PC.money = PC.money - tryoncost()

        let group = Object.keys(V.tryon)

        for (let i=0; i < group.length; i++){
            if (V.tryon[group[i]] && V.TEquip[group[i]]){
                let leftstuff = clone(V.TEquip[group[i]])
                let layer = leftstuff.layer
                closet[layer].push(leftstuff)
            }
        }
        
        text = "你花费了"+tryoncost()+"元购买了身上试穿的衣服。"
        
        V.tryon = {neck: null, hand: null, face: null,hat: null, outter: null, top: null,bottom: null,inner_up: null, inner_bt: null,shoes: null, legs: null,}
        V.TEquip = clone(V.Equip)
        
    }
    else{
        if (args =="select") text = "虽然你想买"+V.showcase.name+"，但钱不够……";
        if (args == "tryon") text = "虽然你想买身上试穿的衣服，但钱不够……"
    }

    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
    
}
window.BuyOutFit = BuyOutFit

function tryoncheck() {
    const group = ["neck","hand","face","hat","outter","top","bottom","inner_up","inner_bt","shoes","legs"]
    var i,n
    for ( i=0; i<group.length; i++){
        if (V.tryon[group[i]]) return true;
        else n++
    }

    if(n==group.length) return false
}
window.tryoncheck = tryoncheck

/* 衣柜处理 */
function strip(arg) {
    if (Equip[arg]) {

        var text = "你脱下了"+Equip[arg].name;

        closet[arg].push(Equip[arg])
        Equip[arg] = null
    }else{
        var text = "你打算脱下"+A.categoryname[arg]+"，但是你身上并没有穿任何"+A.categoryname[arg]+"。";
    }

    const group = ["face","neck","hand","back"]
    let id = arg

    if(group.includes(arg)){
        new Wikifier(null,"<<replace '#accesory'>><<showcloset 'face'>><<showcloset 'neck'>><<showcloset 'hand'>><<showcloset 'back'>><</replace>>")
    }
    else{
     new Wikifier(null,"<<replace '#"+id+"'>><<showcloset '"+id+"'>><</replace>>")   
    }

    
    setreveal()

    
    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
    stAvatar()
}
window.strip = strip
F.strip = strip

window.closetAct = function(args,arg) {
    if (ui.closetmode == "穿"){
        dressOn(args,arg)
    }
    if (ui.closetmode == "扔"){
        discardDress(args,arg)
    }
}

function discardDress(args,arg){
    let text = "你把"+closet[args][arg].name+"扔掉了。";
    closet[args].deleteAt(arg)

    const group = ["face","neck","hand","back"]
    let id = args
    
    if(group.includes(arg)){
        new Wikifier(null,"<<replace '#accesory'>><<showcloset 'face'>><<showcloset 'neck'>><<showcloset 'hand'>><<showcloset 'back'>><</replace>>")
    }
    else{
     new Wikifier(null,"<<replace '#"+id+"'>><<showcloset '"+id+"'>><</replace>>")   
    }

    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
}
F.discardDress = discardDress

function dressOn(args, arg) {

    var text = "你穿上了"+closet[args][arg].name+"。";

    /* 身上没有衣服，直接穿上 */
    if ( Equip[args] == null){
     Equip[args] = closet[args][arg]
     closet[args].deleteAt(arg)

    }else if(Equip[args].index.length > 0){
        let obj = clone(V.Equip[args])
        Equip[args] = closet[args][arg]
        closet[args].deleteAt(arg)
        closet[args].push(obj)
    }

    if(args == "top"  && Equip.bottom && Equip.top.slot == "onepiece"){
        let obj = clone(Equip.bottom)
        closet.bottom.push(obj)
        Equip.bottom = null
        
    }else if (args == "bottom" && Equip.top && Equip.top.slot == "onepiece"){
        let obj = clone(Equip.top)
        closet.top.push(obj)
        Equip.top = null

    }else if (args == "inner_up" && Equip.inner_bt && Equip.inner_up.slot == "onepiece"){
        let obj = clone(Equip.inner_bt)
        closet.inner_bt.push(obj)
        Equip.inner_bt = null

    }else if (args == "inner_up" && Equip.inner_up.slot == "fullbody"){

        if(Equip.inner_bt){
            let obj = clone(Equip.inner_bt)
            closet.inner_bt.push(obj)
            Equip.inner_bt = null }

        if(Equip.top){
            let obj = clone(Equip.top)
            closet.top.push(obj)
            Equip.top = null
        }
        
        if(Equip.bottom){
            let obj = clone(Equip.bottom)
            closet.bottom.push(obj)
            Equip.bottom = null
        }
    }

    if(Equip[args].functional){
        Equip[args].effect()
    }

    const group = ["face","neck","hand","back"]
    let id = args
    
    if(group.includes(arg)){
        new Wikifier(null,"<<replace '#accesory'>><<showcloset 'face'>><<showcloset 'neck'>><<showcloset 'hand'>><<showcloset 'back'>><</replace>>")
    }
    else{
     new Wikifier(null,"<<replace '#"+id+"'>><<showcloset '"+id+"'>><</replace>>")   
    }

    setreveal()

    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
    stAvatar()
}

window.dressOn = dressOn
F.dressOn = dressOn

function gonaked(mode){

    if((Equip.top && mode=="debug") || mode!="debug"){
        V.TEquip = clone(V.Equip)
    }

    const group=["hat","outter","top","bottom","inner_up","inner_bt","legs","shoes","face","neck","hand","back"]

    if (mode=="closet"){
        for(let i=0; i< group.length; i++){
            strip(group[i])
        }

    }
    else if(mode=="H" || !mode){
        let layer = ["outter","top","bottom","inner_up","inner_bt","shoes","legs"]
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
            if (arr.uid === V.TEquip[index].uid)  dressOn(index, i);
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
    }else{
        //返回showcase.layer位置的衣柜空位
        let layer = V.showcase.layer
        return (closet.slot.level*closet.slot[layer]) - closet[layer].length
    }
}