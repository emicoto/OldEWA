/* 衣柜处理 */
function getRandomCloset() {
  const randomArray = (arr) => {
    const arrs = []
    for (let index = 0; index < 10; index++) {
      arrs.push(parseInt(Math.random() * arr.length ))
      
    }
    const legth = parseInt(Math.random() * arrs.length )
    console.log(legth ,arrs,arrs[legth],arr[arrs[legth]]);
    
    return arr[arrs[legth]]
  }
  const cloth = {}
  const __t =Object.entries(V.closet).filter(([name,value])=>!(name === "slot"))
  // console.log(__t );
  __t.forEach(([name,value])=>{
    if (Array.isArray(value) && value.length) {
      console.log(value);
      const _a = value.filter(v=>v)
      cloth[name] = randomArray(_a)
    }
  })
  return cloth
}

window.getRandomCloset = getRandomCloset

function updateCloset(){
	let list = A.category
	let update = function(obj){
	let id = obj.id
	let layer = obj.layer
		//图片初次实装时, 直接初始化衣服
		if(obj.hasImg===false && A[layer][id].hasImg === true){
			obj = clone(A[layer][id])
		}

		//图片更新差分时只更新差分信息
		if((obj.hasDif.breast===false && A[layer][id].breast === true) || (obj.hasDif.pregnant===false && A[layer][id].pregnant === true) ){
			obj.hasDif = clone(A[layer][id].hasDif)
		}

		return obj
	}

	for (let i=0; i<list.length; i++){
		let n = list[i]
		if(V.closet[n].length > 0){
			 
			 for(let k=0; k<V.closet[n].length; k++){
				 V.closet[n][k] = update(V.closet[n][k])
			 }

		}
		if(V.Equip[n]){
			V.Equip[n] = update(V.Equip[n])
		}
	}

	return V.closet

}
window.updateCloset = updateCloset
F.updateCloset = updateCloset


window.closetAct = function(args,arg) {
    if (ui.closetmode == "穿"){
        dressOn(args,arg)
    }
    if (ui.closetmode == "扔"){
        discardDress(args,arg)
    }
}

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
    
    FixValue()
   
    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
    stAvatar()
}
window.strip = strip
F.strip = strip

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

    checkEquipSlot(Equip[args],"closet")

    if(Equip[args].functional){
        let id = Equip[args].id
        A[args][id].effect()
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

window.showClosetItems = function(index,id){
	let items = V.closet[index][id]
	let mirror = A[index][items.id]
	let img

	if(mirror.hasImg === true) img = `image/avatar/${index}/${mirror.index}/thumb.png`
	else img = `image/avatar/thumb.png`

	let code = items.color
	let cname = items.colorname
	let des = Lang(mirror.text,mirror.text_en)
    let iname = Lang(mirror.name,mirror.name_en)

    let text =`<div id="W_showitems">`
    + `<<hovertip "${des}">>`
    + `<div class="W_thumb"><div class="itemthumb">`
        + `<a onClick="closetAct('${index}',${id}); FixValue();"><img src="${img}"></a>`
    + `</div></div>`
        + `<</hovertip>>`    
    + `<div class="W_color" style="background-color:${code}">${cname}</div>`

    + (items.acc ? `<div class="W_pattern">${items.acc}</div>` : ``)

    + ` <div class="W_itemname">${iname}</div>`
    + `<div class="itemdurab"> 耐久：${items.durable}/${mirror.maxdurable}</div>`
    + `<div class="itemdegree">`
    + `<span style="color:blue">${(items.cold > 0? "+" : "")} ${items.cold}C</span>`
    +  `  |  `
    + `<span style="color:red">${(items.hot > 0? "+" : "")} ${items.hot}C</span>`
    + `</div>`
    + `<div class="itembuff">`
    + (items.defence > 0 ? `<span style="color:brown">Def+</span>` : ``)
    + (items.beauty > 0? `<span style="color:deeppink">Allure+</span>` : ``)
    + `</div></div>`

    return text
}
