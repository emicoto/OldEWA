

namespace Avatar {
  export let canvas
  export const AvatarPath: string = "image/avatar/"
  const TemplatePath: string = "image/templet/"
  export let avatar
  const __resolve = (paths, ...word: string[]): string => path.resolve(paths, ...word)
  export class Canvas {
    canvas;
    avatar;
    opt: any = {};
    array: any[];
    constructor(option, avatar) {
      this.avatar = avatar
      const options = option.length ? option : { width: 180, height: 260, fill: "black", id: "avatars" }
      this.canvas = Renderer.createCanvas(options.width, options.height, options.fill ? options.fill : 1);
      this.canvas.canvas.id = options.id
      this.composeLayers()
    }
    addon(value, index) {
      const v = this.avatar[value]
      const key = Object.keys(v)
      // console.log(key);
      this.opt[value] = {}
      const array = key.map(vl => {


        return this.opt[value][vl] = {
          name: `${value}_${vl}`,
          src: v[vl] ? __resolve(AvatarPath, `${index}_${value}`, `${vl}.png`) : __resolve(AvatarPath, "dummy.png"),
          z: 21 - index
        }



      })

      return array
    }
    ChangrAddonSrc(value, index) {
      const v = this.avatar[value]
      const key = Object.keys(v)
      // console.log(key);
      const array = key.map(vl => {


        return this.opt[value][vl].src = v[vl] ? __resolve(AvatarPath, `${index}_${value}`, `${vl}.png`) : __resolve(AvatarPath, "dummy.png")



      })

      return array
    }
    get options() {
      const fun = (v, i) => {
        if (v === "addon" || v === "emoadd") {
          return this.addon(v, i)
        }
        return {
          name: v,
          src: this.avatar[v] ? __resolve(AvatarPath, `${v}`, `${this.avatar[v]}.png`) : __resolve(AvatarPath, "dummy.png"),
          z: 21 - i
        }
      };


      this.array = __layer.map((v, i) => {
        if (v === "addon" || v === "emoadd") {
          return fun(v, i)
        }
        this.opt[v] = fun(v, i)

        return this.opt[v]
      }



      ).flat()
      // console.log(array);


      return this.array
    }
    get CANVAS() {
      return this.canvas.canvas
    }

    composeLayers() {
      const debug = false
      const listern ={
        error: (error, context) => console.log("error", error, context),

        composeLayers: (layers) => console.log("composeLayers", layers),
        loaded: (layer, src) => console.log("loaded", layer, src),
        loadError: (layer, src) => console.log("loadError", layer, src),
        loadingDone: (time, count) => console.log("loadingDone", time, count),

        beforeRender: (layers) => console.log("beforeRender", layers),
        layerCacheMiss: (layer) => console.log("layerCacheMiss", layer),
        layerCacheHit: (layer) => console.log("layerCacheHit", layer),
        processingStep: (layer, processing, canvas, dt) => console.log("processingStep", layer, processing, canvas, dt),
        composition: (layer, result) => console.log("composition", layer, result),
        renderingDone: (time) => console.log("renderingDone", time),

        keyframe: (animation, keyframeIndex, keyframe) => console.log("keyframe", animation, keyframeIndex, keyframe),
        keyframeRender: (spec, cacheHit, cacheRenderTime) => console.log("keyframeRender", spec, cacheHit, cacheRenderTime),
        animationStop: () => console.log("animationStop"),

      }
      Renderer.composeLayers(this.canvas, this.options, 1, debug?listern:{});
    }

    composeLayersAgain() {

      __layer.map((v, i) => {
        if (v === "addon" || v === "emoadd") {
          return this.ChangrAddonSrc(v, i)
        }
        return this.opt[v].src = this.avatar[v] ? __resolve(AvatarPath, `${v}`, `${this.avatar[v]}.png`) : __resolve(AvatarPath, "dummy.png")
      })

      Renderer.composeLayersAgain()
    }
    setOption(key:string,option){
      const options = Object.keys(option)
      let keys:(string|string[]) = key
      if(!options.length) return
     
      key.includes("_") && (keys = key.split("_") )
     options.forEach(v=>{
       if (Array.isArray(keys)) {
           this.opt[keys[0]][keys[1]][v] = option[v]
         return
       }
        this.opt[key][v] = option[v]
     })
    }
    deleteOption(key:string,option:(string|string[])){
      let keys:(string|string[]) = key
      if(!option.length) return
      
      key.includes("_") && (keys = key.split("_") )
    if (Array.isArray(option)) {
       option.forEach(v=>{
       if (Array.isArray(keys)) {
         delete  this.opt[keys[0]][keys[1]][v] 
         return
       }
       delete this.opt[key][v] 
     })
    }else{
         delete this.opt[key][option] 
    }
    }

  }
  export const __layer = [
    "frame",
    "addon",
    "hat",
    "kemofront",
    "eyebrow",
    "hairfront",
    "neck",
    "face",
    "emoadd",
    "eyes",
    "mouth",
    "outter",
    "top",
    "inner_up",
    "hand",
    "bottom",
    "inner_bt",
    "shoes",
    "legging",
    "tattoos",
    "body",
    "hairback",
    "back",
    "kemoback",
    "background",
  ]
  const blendmode = [
    "source-over",
    "source-in",
    "source-out",
    "source-atop",
    "destination-over",
    "destination-in",
    "destination-out",
    "destination-atop",
    "lighter",
    "copy",
    "xor",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
  ]
  export const BLENDMODE = {
    "SOURCE_OVER": 0,
    "SOURCE_IN": 1,
    "SOURCE_OUT": 2,
    "SOURCE_ATOP": 3,
    "DESTINATION_OVER": 4,
    "DESTINATION_IN": 5,
    "DESTINATION_OUT": 6,
    "DESTINATION_ATOP": 7,
    "LIGHTER": 8,
    "COPY": 9,
    "XOR": 10,
    "MULTIPLY": 11,
    "SCREEN": 12,
    "OVERLAY": 13,
    "DARKEN": 14,
    "LIGHTEN": 15,
    "COLOR_DODGE": 16,
    "COLOR_BURN": 17,
    "HARD_LIGHT": 18,
    "SOFT_LIGHT": 19,
    "DIFFERENCE": 20,
    "EXCLUSION": 21,
    "HUE": 22,
    "SATURATION": 23,
    "COLOR": 24,
    "LUMINOSITY": 25
  }

  //  console.log("test",tinycolor);

  $(document).one(":storyready", () => {
    canvas = new Canvas({ width: 180, height: 260, fill: "black", id: "avatars" }, V.avatar)

    const html = document.getElementById("avatar")
    if (html) html.appendChild(canvas.CANVAS)

  })






  // export const opt = {
  //   name: "hairfront",
  //   src: __resolve(AvatarPath, "15_hairfront", "natural", "white_1.png"),
  //   desaturate: true,
  //   brightness: -0.3,
  //   blendMode: 'overlay',
  //   blend: '#636363',
  //   z: 5
  // }
  // export const opt2 = {
  //   name: "hairback",
  //   src: __resolve(AvatarPath, "19_hairback", "straight", "white_1.png"),
  //   desaturate: true,
  //   brightness: -0.3,
  //   blendMode: 'overlay',
  //   blend: '#636363',
  //   z: 1
  // }





}
window.Avatar = Avatar
