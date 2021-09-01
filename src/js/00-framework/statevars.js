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

	C: {
		value: {}
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
});
