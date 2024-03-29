﻿/**
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

      if(!V[props]) V[props] = {};

      Object.keys(value).forEach((v)=>{
        V[props][v] = value[v]
      })
      
    }
    if (!ISOBJ) {
      V[props] = value
    }
  }
}

window.setV = setV