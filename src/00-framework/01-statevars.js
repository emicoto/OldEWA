
Object.defineProperties(window, {
	V: {
		get: function() {
			return State.variables;
		}
	},

	T: {
		get: function() {
			return State.temporary;
		}
	},

	S: {
		get: function(){
			return setup
		}
	},
	
	A: {
		get: function() {
			return Avatars
		}
	},

	D: {
		get: function() {
			return GameData
		}
	},

	cf: {
		get: function() {
			return GameConfig
		}
	},
	F: {
		get: function (){
			return Afunction
		}
	},
	Flag : {
		get:function(){
			return State.variables.Flag
		}
	},
	TFlag : {
		get:function(){
			return State.variables.TFlag
		}
	},
	EFlag : {
		get:function(){
			return State.variables.EFlag
		}
	},
	CFlag : {
		get:function(){
			return State.variables.CFlag
		}
	},
	PFlag: {
		get:function(){
			return State.variables.PFlag
		}
	},
	BFlag : {
		get:function(){
			return State.variables.BFlag
		}
	},	
	PC : {
		get:function(){
			return State.variables.PC
		}
	},
	npc : {
		get:function(){
			return State.variables.NPC
		}
	},
	COM : {
		get:function(){
			return State.variables.command
		}
	},
	ui : {
		get:function(){
			return State.variables.UI
		}
	},
	conf : {
		get:function(){
			return State.variables.conf
		}
	},
	closet :{
		get:function(){
			return State.variables.closet
		}
	},
	items : {
		get:function(){
			return State.variables.items
		}
	},
	pet : {
		get:function(){
			return State.variables.pet
		}
	},
	Equip :{
		get:function(){
			return State.variables.Equip
		}
	},
	FEquip:{
		get:function(){
			return State.variables.FEquip
		}
	},
	TEquip :{
		get:function(){
			return State.variables.TEquip
		}
	},
	Source : {
		get:function(){
			return State.variables.Source
		}
	},
	TCSV :{
		get:function(){
			return State.variables.TCSV
		}
	},
	Base : {
		get:function(){
			return State.variables.Base
		}
	}
});

window.setMirrorVariables = function(){
		
	EWA.V = {
		Flag : Flag,
		EFlag : EFlag,	TFlag : TFlag, BFlag:BFlag,
		PFlag : PFlag,	CFlag : CFlag,
		PC : PC,	npc : npc,
		COM : COM,	UI : ui,
		conf : conf,
		closet: closet, items: items,
		pet : pet, Equip : Equip, FEquip : FEquip, TEquip:TEquip,
		Base : Base, Source : Source, TCSV : TCSV,
	}

	CFlag.pc = V.PFlag
	Base.pc = V.PC.base
	Source.pc = V.PC.source
	TCSV.pc = V.PC.tcsv
}
/* 备注：不能直接 TEquip = Equip这样，会出错！ */

//把 PC，NPC的 FLAG,BASE,SOURCE,TCSV数据整合在对应的目录之下
//只能在StoryInit 之后运行，不然会映射失败。
F.setVariablesChain = function(){

}

