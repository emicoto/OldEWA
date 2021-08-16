function Random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

window.between = function(x, min, max){
	return x >= min && x <= max;
}

window.deck = function(){
	var names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	var suits = ['Hearts','Diamonds','Spades','Clubs'];
	var cards = [];

	for( var s = 0; s < suits.length; s++ ) {
		for( var n = 0; n < names.length; n++ ) {
			cards.push( {value:n+2, name:names[n], suits:suits[s]} );
		}
	}

	return cards;
}

window.shuffle = function(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

const select=(...args)=>(con)=>args.includes(con)

class SelectCase {
	cases = [];
	default = "";
	add(num1, num2, string) {
	  this.cases.push({ num1, num2, string });
	}
	has(num) {
	  for (const element of this.cases) {
		let { num1, num2, string } = element;
		if (num1 <= num && num <= num2) {
		  return string;
		}
	  }
	  return this.default;
	}
  }

window.inrange = function(num,min,max){
	if (num >= min && num <= max){return true}
	else{return false}
}

window.groupmatch = function(value,table){
	if (table.includes(value)){return true}
	else{return false}
}

window.draw = function(array){
	var  a = array.length
	return array[random(0,a)]
}