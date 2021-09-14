window.GameConfig = {
	max_acc_slot: 3,
	max_enemy: 5,
	max_closet_slot: 40,
	allowsave: false,
}

V.conf = {
	persons:3, timelimit:true, hardmode:1, 
	render: "canvas", checkSave: true, checkLoad: false, checkDel: true,
}

V.conf.saves = []
for(let i=0; i < 4; i++){
	V.conf.saves[i] = {locked:false}
}

/* 按钮演出类的切换开关 */
V.UI = {
	movebutton:false, menubutton:false, activepage:null, closetmode:"穿", nextbutton:false, currentOverlay:null, mode:"location",
}