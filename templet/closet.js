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
