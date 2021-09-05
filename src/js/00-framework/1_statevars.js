
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
			return State.variables.TFlag
		}
	},
	PFlag: {
		get:function(){
			return State.variables.PFlag
		}
	},
	CFlag : {
		get:function(){
			return State.variables.CFlag
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
	source : {
		get:function(){
			return State.variables.source
		}
	},
});

EWA.V = {
	Flag : Flag,
	EFlag : EFlag,	TFlag : TFlag,
	PFlag : PFlag,	CFlag : CFlag,
	PC : PC,	npc : npc,
	COM : COM,	UI : ui,
	conf : conf,
	closet: closet, items: items,
	pet : pet, Equip : Equip, FEquip : FEquip,
	source : source,
}