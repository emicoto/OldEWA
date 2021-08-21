/**
 * Copies to targets keys from source that are not present there.
 * Shallow.
 * @param {object} target Object to extend
 * @param {object} source Default properties
 * @return {object} target
 */
 function assignDefaults(target, source) {
	for (let k in source) {
		if (!source.hasOwnProperty(k)) continue;
		if (!(k in target)) target[k] = source[k];
	}
	return target;
}

/**
 * JS version of SugarCube's <<for _index, _value range _array>>.
 * Can iterate over
 *
 * Copied from SugarCube sources.
 * @param range
 * @param {function(key,value):void} handler
 */
 function rangeIterate(range, handler) {
	let list;
	switch (typeof range) {
		case 'string':
			list = [];
			for (let i = 0; i < range.length; /* empty */) {
				const obj = Util.charAndPosAt(range, i);
				list.push([i, obj.char]);
				i = 1 + obj.end;
			}
			break;
		case 'object':
			if (Array.isArray(range)) {
				list = range.map((val, i) => [i, val]);
			}
			else if (range instanceof Set) {
				list = Array.from(range).map((val, i) => [i, val]);
			}
			else if (range instanceof Map) {
				list = Array.from(range);
			}
			else if (Util.toStringTag(range) === 'Object') {
				list = Object.keys(range).map(key => [key, range[key]]);
			}
			else {
				throw new Error(`unsupported range expression type: ${Util.toStringTag(range)}`);
			}
			break;
		default:
			throw new Error(`unsupported range expression type: ${typeof range}`);
	}
	for (let i = 0; i < list.length; i++) {
		let entry = list[i];
		handler(entry[0], entry[1]);
	}
}
window.rangeIterate = rangeIterate;

window.saveDataCompare = function(save1, save2){
	var result = {};
	var keys = Object.keys(save1)
	keys.forEach(key =>{
		let save1Json = JSON.stringify(save1[key])
		let save2Json = JSON.stringify(save2[key])
		if(save1Json !== save2Json){
			result[key] = [save1[key],save2[key]];
		}
	})
	return result;
}

// Make .divs-links clickable as if they're anchors
window.linkifyDivs = function (parentSelector = "") {
	$(document).ready(() => { $(parentSelector + " .div-link").click(function (e) { $(this).find('a').first().click(); }) });
	$(document).ready(() => { $(parentSelector + " .div-link a").click(function (e) { e.stopPropagation(); }) });
}