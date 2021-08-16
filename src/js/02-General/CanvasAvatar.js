// Code/CanvasAvatar.ts
var CanvasAvatar;
(function(CanvasAvatar2) {
  const AvatarPath = "image/avatar/";
  const TemplatePath = "image/templet/";
  const __resolve = (paths, ...word) => path.resolve(paths, ...word);
  const test = document.getElementById("avatar");
  console.log("test", tinycolor);
  CanvasAvatar2.canvas = Renderer.createCanvas(180, 260, 1);
  CanvasAvatar2.opt = {
    src: __resolve(AvatarPath, "15_hairfront/natural/white_1.png"),
    desaturate: true,
    brightness: -0.3,
    blendMode: "overlay",
    blend: "#636363",
    z: 1
  };
  Renderer.composeLayers(CanvasAvatar2.canvas, [CanvasAvatar2.opt], 1);
  console.log(CanvasAvatar2.canvas);
  $(document).on(":passageend", function(ev) {
    var test2 = document.getElementById("testavatar");
    test2 ? test2.appendChild(CanvasAvatar2.canvas.canvas) : null;
  });
})(CanvasAvatar || (CanvasAvatar = {}));
window.CanvasAvatar = CanvasAvatar;
