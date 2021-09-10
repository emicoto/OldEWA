
/**
 * 设置V属性
 * @param {string} props 
 * @param {any} condition 
 * @param {any} value 
 */
function setV(props,condition,value){
  const ISOBJ = Object.prototype.toString.call(value) === "[object Object]"
  console.log(Object.is(V[props], condition))
  if (Object.is(V[props], condition)) {
    if (ISOBJ) {
      Object.keys(value).forEach((v)=>{
        V[v] = value[v]
      })
    }
    if (!ISOBJ) {
      V[props] = value
    }
  }
}
Object.entries(V.closet).forEach(([index,value])=>{
  if (V.TEquip[index] && (value.length > 0)) Object.entries(value).forEach(([___, arr], i) => {
    if (arr.uid === V.TEquip[index].uid)  dressOn(index, i);
  });
})


Macro.add('time', {
	handler: function () {
		var time = V.day.time;
		var min, hour, zone;

		if (time < 0) time = 0;

		if (time >= 24*60 ) time = 23*59+59;

		hour = Math.floor(time/60);
		min = time%60;

		zone = gettimezone(hour)

		V.day.min = min
		V.day.hour = hour
		V.day.zone = zone
	}
});