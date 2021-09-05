
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
