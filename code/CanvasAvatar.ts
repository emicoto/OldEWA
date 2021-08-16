

namespace CanvasAvatar{
   const AvatarPath:string = "image/avatar/"
   const TemplatePath:string = "image/templet/"
   const __resolve = (paths,...word:string[]):string => path.resolve(paths,...word)
   const test = document.getElementById("avatar")
   console.log("test",tinycolor);
   export const canvas = Renderer.createCanvas(180, 260, 1);
// debugger
//dist\image\avatar\15_hairfront\natural\white_1.png
 export const opt = {
  src: __resolve(AvatarPath,"15_hairfront/natural/white_1.png"),
  desaturate: true,
  brightness: -0.3,
  blendMode: 'overlay',
  blend: '#636363',
  z: 1
}
Renderer.composeLayers(canvas, [opt],1);
console.log(canvas);

export let variable



$(document).on(':passageend', function (ev) {
  var test =document.getElementById("testavatar")
  test ? test. appendChild(canvas.canvas) : null
 
});

   
}
window.CanvasAvatar = CanvasAvatar
