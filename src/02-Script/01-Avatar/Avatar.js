// Code/Avatar.ts
window["BLENDMODE"] = {
  "SOURCE_OVER": "source-over",
  "SOURCE_IN": "source-in",
  "SOURCE_OUT": "source-out",
  "SOURCE_ATOP": "source-atop",
  "DESTINATION_OVER": "destination-over",
  "DESTINATION_IN": "destination-in",
  "DESTINATION_OUT": "destination-out",
  "DESTINATION_ATOP": "destination-atop",
  "LIGHTER": "lighter",
  "COPY": "copy",
  "XOR": "xor",
  "MULTIPLY": "multiply",
  "SCREEN": "screen",
  "OVERLAY": "overlay",
  "DARKEN": "darken",
  "LIGHTEN": "lighten",
  "COLOR_DODGE": "color-dodge",
  "COLOR_BURN": "color-burn",
  "HARD_LIGHT": "hard-light",
  "SOFT_LIGHT": "soft-light",
  "DIFFERENCE": "difference",
  "EXCLUSION": "exclusion",
  "HUE": "hue",
  "SATURATION": "saturation",
  "COLOR": "color",
  "LUMINOSITY": "luminosity"
};
function isObject(props) {
  return Object.prototype.toString.call(props) === "[object Object]";
}
var Avatar;
(function(Avatar2) {
  const AVATARPATH = "./image/avatar";
  const __resolve = (mainpath, ...paths) => path.resolve(mainpath, ...paths);
  const cache = {};
  const layers = [
    "background",
    "kemoback_wing",
    "kemoback_tail",
    "kemoback_tail_msk",
    "back",
    "hairback",
    "body",
    "body_msk",
    "plus",
    "nipple",
    "dick",
    "penis",
    "legs",
    "legs_acc",
    "shoes",
    "inner_bt",
    "inner_bt_acc",
    "over_bt",
    "over_bt_acc",
    "hand",
    "inner_up",
    "inner_up_acc",
    "over_up",
    "over_up_acc",
    "outter",
    "outter_acc",
    "mouth",
    "eyes",
    "emoadd_tear",
    "emoadd_shy",
    "emoadd_red",
    "emoadd_hurt",
    "face",
    "neck",
    "neck_acc",
    ,
    "kemofront_mimi",
    "kemofront_mimi_msk",
    "kemofront_horn",
    "hairfront",
    "hairfront_msk",
    "eyebrow",
    "hat",
    "addon_body",
    "addon_bottom",
    "addon_penis",
    "addon_mouth",
    "addon_face",
    "addon_hair",
    "frame"
  ];
  const zindex = {};
  layers.map((v, i) => zindex[v] = i);
  function CanvasModels(name, width, height) {
    Renderer.CanvasModels[name] = {
      name,
      width,
      height,
      frames: 8,
      generatedOptions() {
        return [];
      },
      defaultOptions() {
        console.log(zindex);
        return {
          zindex,
          frame: null,
          addon: { body: false, over_bt: false, face: false, hair: false, mouth: false, penis: false },
          neck: null,
          hand: null,
          face: null,
          hat: null,
          outter: null,
          over_up: null,
          over_bt: null,
          inner_up: null,
          inner_bt: null,
          shoes: null,
          legs: null,
          emoadd: { tear: false, shy: false, red: false, hurt: false },
          eyebrow: null,
          hairfront: null,
          kemofront: { mimi: null, horn: null },
          eyes: null,
          mouth: null,
          tatoos: null,
          dick: null,
          penis: null,
          nipple: null,
          plus: null,
          body: null,
          hairback: null,
          kemoback: { wing: null, tail: null },
          back: null,
          background: null,
          animation: "",
          dummy: __resolve(AVATARPATH, "dummy.png"),
          eyesframe: 1,
          filters: {}
        };
      },
      preprocess(options2) {
      },
      layers: {}
    };
  }
  new CanvasModels("Avatar", 180, 260);
  new CanvasModels("Portrait", 160, 160);
  new CanvasModels("Emoji", 160, 160);
  Renderer.CanvasModels["Shop"] = {
    name: "Avatar",
    width: 166,
    height: 240,
    frames: 8,
    generatedOptions() {
      return [];
    },
    defaultOptions() {
      return {
        dress: null,
        acc: null,
        dummy: __resolve(AVATARPATH, "dummy.png"),
        filters: {}
      };
    },
    preprocess(options2) {
    },
    layers: {}
  };
  function setLayer(id, name, options2) {
    const opt = options2;
    const tuckin = {
      over_up_acc: "hand",
      over_up: "over_bt_acc",
      hand: "over_bt",
      over_bt_acc: "over_up_acc",
      over_bt: "over_up"
    };
    const shop = ["manekin", "dress", "acc"];
    if (!Object.keys(tuckin).includes(name)) {
      if (!shop.includes(name)) {
        opt["z"] = zindex[name];
      }
    }
    Renderer.CanvasModels[id].layers[name] = opt;
  }
  Avatar2.setLayer = setLayer;
  function Shoplayer(ID) {
    let layerID = 0;
    setLayer(ID, "manekin", {
      width: 166,
      height: 240,
      z: layerID++,
      show: true,
      srcfn() {
        return __resolve(AVATARPATH, `manekin.png`);
      }
    });
    setLayer(ID, "dress", {
      width: 166,
      height: 240,
      z: layerID++,
      show: true,
      srcfn(options2) {
        if (isObject(options2.dress)) {
          return options2.dress ? __resolve(AVATARPATH, `${options2.dress.src}.png`) : options2.dummy;
        }
        return options2.dress ? __resolve(AVATARPATH, `${options2.dress.src}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.dress)) {
          if (!options2.dress.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.dress)) {
          if (!options2.dress.fixcolor) {
            return options2.dress.color;
          }
        }
      }
    });
    setLayer(ID, "acc", {
      width: 166,
      height: 240,
      z: layerID++,
      show: true,
      srcfn(options2) {
        if (isObject(options2.dress) && !options2.dress.fixacc) {
          return options2.dress ? __resolve(AVATARPATH, `${options2.dress.src}.png`) : options2.dummy;
        }
        return options2.acc ? __resolve(AVATARPATH, `${options2.acc}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.dress)) {
          if (!options2.dress.fixacc) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.dress)) {
          if (!options2.dress.fixacc) {
            return options2.dress.subcolor;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.dress)) {
          if (!options2.dress.fixacc) {
            return __resolve(AVATARPATH, `${options2.acc}.png`);
          }
        }
      }
    });
  }
  function Avatarlayer(ID, option = null) {
    const defalutOpt = {
      width: 180,
      height: 260,
      dy: 0,
      dx: 0,
      show: true
    };
    const opt = option ? option : defalutOpt;
    const tuckin = {
      over_up_acc: "hand",
      over_up: "over_bt_acc",
      hand: "over_bt",
      over_bt_acc: "over_up_acc",
      over_bt: "over_up"
    };
    setLayer(ID, "background", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return opt.show ? !!options2.background : opt.show;
      },
      srcfn(options2) {
        return options2.background ? __resolve(AVATARPATH, `background/${options2.background.src}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.background)) {
          if (options2.background.outside) {
            return BLENDMODE.HARD_LIGHT;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.background)) {
          if (options2.background.outside) {
            return options2.background.color;
          }
        }
      }
    });
    setLayer(ID, "kemoback_wing", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.kemoback.wing;
      },
      srcfn(options2) {
        return options2.kemoback.wing ? __resolve(AVATARPATH, `kemoback/${options2.kemoback.wing.src}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (options2.kemoback.wing) {
          if (!options2.kemoback.wing.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (options2.kemoback.wing) {
          if (!options2.kemoback.wing.fixcolor) {
            return options2.kemoback.wing.color;
          }
        }
      }
    });
    setLayer(ID, "kemoback_tail", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.kemoback.tail;
      },
      srcfn(options2) {
        return options2.kemoback.tail ? __resolve(AVATARPATH, `kemoback/${options2.kemoback.tail.src}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "kemoback_tail_msk", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.kemoback.tail;
      },
      srcfn(options2) {
        return options2.kemoback.tail ? __resolve(AVATARPATH, `kemoback/${options2.kemoback.tail.src}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (options2.kemoback.tail) {
          if (!options2.kemoback.tail.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (options2.kemoback.tail) {
          if (!options2.kemoback.tail.fixcolor) {
            return options2.kemoback.tail.color;
          }
        }
      },
      masksrcfn(options2) {
        if (options2.kemoback.tail) {
          return __resolve(AVATARPATH, `kemoback/${options2.kemoback.tail.src}_msk.png`);
        }
      }
    });
    setLayer(ID, "back", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.back;
      },
      srcfn(options2) {
        return options2.back ? __resolve(AVATARPATH, `back/${options2.back.src}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (options2.back) {
          if (!options2.back.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (options2.back) {
          if (!options2.back.fixcolor) {
            return options2.back.color;
          }
        }
      }
    });
    setLayer(ID, "hairback", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.hairback;
      },
      srcfn(options2) {
        if (isObject(options2.hairback)) {
          return options2.hairback ? __resolve(AVATARPATH, `hairback/${options2.hairback.src}.png`) : options2.dummy;
        }
        return options2.hairback ? __resolve(AVATARPATH, `hairback/${options2.hairback}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.hairback)) {
          if (!options2.hairback.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.hairback)) {
          if (!options2.hairback.fixcolor) {
            return options2.hairback.color[0];
          }
        }
      }
    });
    setLayer(ID, "body", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.body;
      },
      srcfn(options2) {
        if (isObject(options2.body)) {
          return options2.body ? __resolve(AVATARPATH, `body/${options2.body.src}.png`) : options2.dummy;
        }
        return options2.body ? __resolve(AVATARPATH, `body/${options2.body}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "body_msk", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return isObject(options2.body) ? options2.body.src.includes("furry") : false;
      },
      srcfn(options2) {
        if (isObject(options2.body)) {
          return options2.body.src.includes("furry") ? __resolve(AVATARPATH, `body/${options2.body.src}.png`) : options2.dummy;
        }
      },
      blendModefn(options2) {
        if (isObject(options2.body)) {
          if (!options2.body.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.body)) {
          if (!options2.body.fixcolor) {
            return options2.body.color;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.body)) {
          if (options2.body.src.includes("furry")) {
            return __resolve(AVATARPATH, `body/furry/mask.png`);
          }
        }
      }
    });
    setLayer(ID, "plus", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.plus;
      },
      srcfn(options2) {
        return options2.plus ? __resolve(AVATARPATH, `${options2.plus}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "nipple", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.nipple;
      },
      srcfn(options2) {
        return options2.nipple ? __resolve(AVATARPATH, `${options2.nipple}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "dick", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      show: true,
      srcfn(options2) {
        return options2.dick ? __resolve(AVATARPATH, `body/${options2.dick}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "penis", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.penis;
      },
      srcfn(options2) {
        return options2.penis ? __resolve(AVATARPATH, `${options2.penis}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "legs", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.legs;
      },
      srcfn(options2) {
        if (isObject(options2.legs)) {
          return options2.legs ? __resolve(AVATARPATH, `legs/${options2.legs.src}.png`) : options2.dummy;
        }
        return options2.legs ? __resolve(AVATARPATH, `legs/${options2.legs}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.legs)) {
          if (!options2.legs.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.legs)) {
          if (!options2.legs.fixcolor) {
            return options2.legs.color;
          }
        }
      }
    });
    setLayer(ID, "legs_acc", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        if (isObject(options2.legs)) {
          return !!options2.legs.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.legs)) {
          if (!options2.legs.fixacc) {
            return options2.legs ? __resolve(AVATARPATH, `legs/${options2.legs.src}.png`) : options2.dummy;
          }
          return options2.legs.acc ? __resolve(AVATARPATH, `legs/${options2.legs.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.legs)) {
          if (!options2.legs.fixacc) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.legs)) {
          if (!options2.legs.fixacc) {
            return options2.legs.subcolor;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.legs)) {
          if (!options2.legs.fixacc) {
            return __resolve(AVATARPATH, `legs/${options2.legs.acc}.png`);
          }
        }
      }
    });
    setLayer(ID, "shoes", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.shoes;
      },
      srcfn(options2) {
        if (isObject(options2.shoes)) {
          return options2.shoes ? __resolve(AVATARPATH, `shoes/${options2.shoes.src}.png`) : options2.dummy;
        }
        return options2.shoes ? __resolve(AVATARPATH, `shoes/${options2.shoes}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.shoes)) {
          if (!options2.shoes.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.shoes)) {
          if (!options2.shoes.fixcolor) {
            return options2.shoes.color;
          }
        }
      }
    });
    setLayer(ID, "inner_bt", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.inner_bt;
      },
      srcfn(options2) {
        if (isObject(options2.inner_bt)) {
          return options2.inner_bt ? __resolve(AVATARPATH, `inner_bt/${options2.inner_bt.src}.png`) : options2.dummy;
        }
        return options2.inner_bt ? __resolve(AVATARPATH, `inner_bt/${options2.inner_bt}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.inner_bt)) {
          if (!options2.inner_bt.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.inner_bt)) {
          if (!options2.inner_bt.fixcolor) {
            return options2.inner_bt.color;
          }
        }
      }
    });
    setLayer(ID, "inner_bt_acc", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        if (isObject(options2.inner_bt)) {
          return !!options2.inner_bt.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.inner_bt)) {
          if (!options2.inner_bt.fixacc) {
            return options2.inner_bt ? __resolve(AVATARPATH, `inner_bt/${options2.inner_bt.src}.png`) : options2.dummy;
          }
          return options2.inner_bt.acc ? __resolve(AVATARPATH, `inner_bt/${options2.inner_bt.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.inner_bt)) {
          if (!options2.inner_bt.fixacc) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.inner_bt)) {
          if (!options2.inner_bt.fixacc) {
            return options2.inner_bt.subcolor;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.inner_bt)) {
          if (!options2.inner_bt.fixacc) {
            return __resolve(AVATARPATH, `inner_bt/${options2.inner_bt.acc}.png`);
          }
        }
      }
    });
    setLayer(ID, "over_bt", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      zfn(options2) {
        if (isObject(options2.over_up)) {
          return options2.over_up.tuckin ? zindex[tuckin["over_bt"]] : zindex["over_bt"];
        }
        return zindex["over_bt"];
      },
      showfn(options2) {
        return !!options2.over_bt;
      },
      srcfn(options2) {
        if (isObject(options2.over_bt)) {
          return options2.over_bt ? __resolve(AVATARPATH, `over_bt/${options2.over_bt.src}.png`) : options2.dummy;
        }
        return options2.over_bt ? __resolve(AVATARPATH, `over_bt/${options2.over_bt}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.over_bt)) {
          if (!options2.over_bt.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.over_bt)) {
          if (!options2.over_bt.fixcolor) {
            return options2.over_bt.color;
          }
        }
      }
    });
    setLayer(ID, "over_bt_acc", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      zfn(options2) {
        return options2.over_up.tuckin ? zindex[tuckin["over_bt_acc"]] : zindex["over_bt_acc"];
      },
      showfn(options2) {
        if (isObject(options2.over_bt)) {
          return !!options2.over_bt.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.over_bt)) {
          if (!options2.over_bt.fixacc) {
            return options2.over_bt ? __resolve(AVATARPATH, `over_bt/${options2.over_bt.src}.png`) : options2.dummy;
          }
          return options2.over_bt.acc ? __resolve(AVATARPATH, `over_bt/${options2.over_bt.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.over_bt)) {
          if (!options2.over_bt.fixacc) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.over_bt)) {
          if (!options2.over_bt.fixacc) {
            return options2.over_bt.subcolor;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.over_bt)) {
          if (!options2.over_bt.fixacc) {
            return __resolve(AVATARPATH, `over_bt/${options2.over_bt.acc}.png`);
          }
        }
      }
    });
    setLayer(ID, "hand", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      zfn(options2) {
        return options2.over_up.tuckin ? zindex[tuckin["hand"]] : zindex["hand"];
      },
      showfn(options2) {
        return !!options2.hand;
      },
      srcfn(options2) {
        if (isObject(options2.hand)) {
          return options2.hand ? __resolve(AVATARPATH, `hand/${options2.hand.src}.png`) : options2.dummy;
        }
        return options2.hand ? __resolve(AVATARPATH, `hand/${options2.hand}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.hand)) {
          if (!options2.hand.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.hand)) {
          if (!options2.hand.fixcolor) {
            return options2.hand.color;
          }
        }
      }
    });
    setLayer(ID, "inner_up", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.inner_up;
      },
      srcfn(options2) {
        if (isObject(options2.inner_up)) {
          return options2.inner_up ? __resolve(AVATARPATH, `inner_up/${options2.inner_up.src}.png`) : options2.dummy;
        }
        return options2.inner_up ? __resolve(AVATARPATH, `inner_up/${options2.inner_up}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.inner_up)) {
          if (!options2.inner_up.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.inner_up)) {
          if (!options2.inner_up.fixcolor) {
            return options2.inner_up.color;
          }
        }
      }
    });
    setLayer(ID, "inner_up_acc", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        if (isObject(options2.inner_up)) {
          return !!options2.inner_up.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.inner_up)) {
          if (!options2.inner_up.fixacc) {
            return options2.inner_up ? __resolve(AVATARPATH, `inner_up/${options2.inner_up.src}.png`) : options2.dummy;
          }
          return options2.inner_up.acc ? __resolve(AVATARPATH, `inner_up/${options2.inner_up.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.inner_up)) {
          if (!options2.inner_up.fixacc) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.inner_up)) {
          if (!options2.inner_up.fixacc) {
            return options2.inner_up.subcolor;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.inner_up)) {
          if (!options2.inner_up.fixacc) {
            return __resolve(AVATARPATH, `inner_up/${options2.inner_up.acc}.png`);
          }
        }
      }
    });
    setLayer(ID, "over_up", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      zfn(options2) {
        return options2.over_up.tuckin ? zindex[tuckin["over_up"]] : zindex["over_up"];
      },
      showfn(options2) {
        return !!options2.over_up;
      },
      srcfn(options2) {
        if (isObject(options2.over_up)) {
          return options2.over_up ? __resolve(AVATARPATH, `over_up/${options2.over_up.src}.png`) : options2.dummy;
        }
        return options2.over_up ? __resolve(AVATARPATH, `over_up/${options2.over_up}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.over_up)) {
          if (!options2.over_up.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.over_up)) {
          if (!options2.over_up.fixcolor) {
            return options2.over_up.color;
          }
        }
      }
    });
    setLayer(ID, "over_up_acc", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      zfn(options2) {
        return options2.over_up.tuckin ? zindex[tuckin["over_up_acc"]] : zindex["over_up_acc"];
      },
      showfn(options2) {
        if (isObject(options2.over_up)) {
          return !!options2.over_up.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.over_up)) {
          if (!options2.over_up.fixacc) {
            return options2.over_up ? __resolve(AVATARPATH, `over_up/${options2.over_up.src}.png`) : options2.dummy;
          }
          return options2.over_up.acc ? __resolve(AVATARPATH, `over_up/${options2.over_up.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.over_up)) {
          if (!options2.over_up.fixacc) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.over_up)) {
          if (!options2.over_up.fixacc) {
            return options2.over_up.subcolor;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.over_up)) {
          if (!options2.over_up.fixacc) {
            return __resolve(AVATARPATH, `over_up/${options2.over_up.acc}.png`);
          }
        }
      }
    });
    setLayer(ID, "outter", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.inner_up;
      },
      srcfn(options2) {
        if (isObject(options2.outter)) {
          return options2.outter ? __resolve(AVATARPATH, `outter/${options2.outter.src}.png`) : options2.dummy;
        }
        return options2.outter ? __resolve(AVATARPATH, `outter/${options2.outter}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.outter)) {
          if (!options2.outter.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.outter)) {
          if (!options2.outter.fixcolor) {
            return options2.outter.color;
          }
        }
      }
    });
    setLayer(ID, "outter_acc", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        if (isObject(options2.outter)) {
          return !!options2.outter.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.outter)) {
          if (!options2.outter.fixacc) {
            return options2.outter ? __resolve(AVATARPATH, `outter/${options2.outter.src}.png`) : options2.dummy;
          }
          return options2.outter.acc ? __resolve(AVATARPATH, `outter/${options2.outter.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.outter)) {
          if (!options2.outter.fixacc) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.outter)) {
          if (!options2.outter.fixacc) {
            return options2.outter.subcolor;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.outter)) {
          if (!options2.outter.fixacc) {
            return __resolve(AVATARPATH, `outter/${options2.outter.acc}.png`);
          }
        }
      }
    });
    setLayer(ID, "mouth", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.mouth;
      },
      srcfn(options2) {
        if (isObject(options2.mouth)) {
          return options2.mouth ? __resolve(AVATARPATH, `mouth/${options2.mouth.src}.png`) : options2.dummy;
        }
        return options2.mouth ? __resolve(AVATARPATH, `mouth/${options2.mouth}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.mouth)) {
          if (!options2.mouth.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.mouth)) {
          if (!options2.mouth.fixcolor) {
            return options2.mouth.color;
          }
        }
      }
    });
    setLayer(ID, "eyes", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.eyes;
      },
      srcfn(options2) {
        if (isObject(options2.eyes)) {
          return options2.eyes ? __resolve(AVATARPATH, `eyes/${options2.eyes.src}.png`) : options2.dummy;
        }
        return options2.eyes ? __resolve(AVATARPATH, `eyes/${options2.eyes}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.eyes)) {
          if (!options2.eyes.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.eyes)) {
          if (!options2.eyes.fixcolor) {
            return options2.eyes.color;
          }
        }
      },
      animationfn(options2) {
        return "eyes";
      }
    });
    setLayer(ID, "emoadd_tear", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.emoadd.tear;
      },
      srcfn(options2) {
        return options2.emoadd.tear ? __resolve(AVATARPATH, `emoadd/tear.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_shy", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.emoadd.shy;
      },
      srcfn(options2) {
        return options2.emoadd.shy ? __resolve(AVATARPATH, `emoadd/shy.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_red", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.emoadd.red;
      },
      srcfn(options2) {
        return options2.emoadd.red ? __resolve(AVATARPATH, `emoadd/red.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_hurt", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.emoadd.hurt;
      },
      srcfn(options2) {
        return options2.emoadd.hurt ? __resolve(AVATARPATH, `emoadd/hurt.png`) : options2.dummy;
      }
    });
    setLayer(ID, "face", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.face;
      },
      srcfn(options2) {
        if (isObject(options2.face)) {
          return options2.face ? __resolve(AVATARPATH, `face/${options2.face.src}.png`) : options2.dummy;
        }
        return options2.face ? __resolve(AVATARPATH, `face/${options2.face}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.face)) {
          if (!options2.face.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.face)) {
          if (!options2.face.fixcolor) {
            return options2.face.color;
          }
        }
      }
    });
    setLayer(ID, "neck", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.neck;
      },
      srcfn(options2) {
        if (isObject(options2.neck)) {
          return options2.neck ? __resolve(AVATARPATH, `neck/${options2.neck.src}.png`) : options2.dummy;
        }
        return options2.neck ? __resolve(AVATARPATH, `neck/${options2.neck}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.neck)) {
          if (!options2.neck.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.neck)) {
          if (!options2.neck.fixcolor) {
            return options2.neck.color;
          }
        }
      }
    });
    setLayer(ID, "neck_acc", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        if (isObject(options2.neck)) {
          return !!options2.neck.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.neck)) {
          if (!options2.neck.fixacc) {
            return options2.neck ? __resolve(AVATARPATH, `neck/${options2.neck.src}.png`) : options2.dummy;
          }
          return options2.neck.acc ? __resolve(AVATARPATH, `neck/${options2.neck.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.neck)) {
          if (!options2.neck.fixacc) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.neck)) {
          if (!options2.neck.fixacc) {
            return options2.neck.subcolor;
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.neck)) {
          if (!options2.neck.fixacc) {
            return __resolve(AVATARPATH, `neck/${options2.neck.acc}.png`);
          }
        }
      }
    });
    setLayer(ID, "hairfront", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.hairfront;
      },
      srcfn(options2) {
        if (isObject(options2.hairfront)) {
          return options2.hairfront ? __resolve(AVATARPATH, `hairfront/${options2.hairfront.src}.png`) : options2.dummy;
        }
        return options2.hairfront ? __resolve(AVATARPATH, `hairfront/${options2.hairfront}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.hairfront)) {
          if (!options2.hairfront.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.hairfront)) {
          if (!options2.hairfront.fixcolor) {
            return options2.hairfront.color[0];
          }
        }
      }
    });
    setLayer(ID, "hairfront_msk", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.hairfront;
      },
      srcfn(options2) {
        if (isObject(options2.hairfront)) {
          return options2.hairfront ? __resolve(AVATARPATH, `hairfront/${options2.hairfront.src}.png`) : options2.dummy;
        }
        return options2.hairfront ? __resolve(AVATARPATH, `hairfront/${options2.hairfront}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.hairfront)) {
          if (!options2.hairfront.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.hairfront)) {
          if (!options2.hairfront.fixcolor) {
            return options2.hairfront.color[1];
          }
        }
      },
      masksrcfn(options2) {
        if (isObject(options2.hairfront)) {
          if (options2.hairfront) {
            return __resolve(AVATARPATH, `hairfront/` + V.Equip.hairfront + `/hl_mask.png`);
          }
        }
        if (options2.hairfront) {
          __resolve(AVATARPATH, `hairfront/` + V.Equip.hairfront + `/hl_mask.png`);
        }
      }
    });
    setLayer(ID, "eyebrow", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.eyebrow;
      },
      srcfn(options2) {
        if (isObject(options2.eyebrow)) {
          return options2.eyebrow ? __resolve(AVATARPATH, `eyebrow/${options2.eyebrow.src}.png`) : options2.dummy;
        }
        return options2.eyebrow ? __resolve(AVATARPATH, `eyebrow/${options2.eyebrow}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.eyebrow)) {
          return BLENDMODE.MULTIPLY;
        }
      },
      blendfn(options2) {
        if (isObject(options2.eyebrow)) {
          return "#936653";
        }
      }
    });
    setLayer(ID, "kemofront_mimi", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.kemofront.mimi;
      },
      srcfn(options2) {
        if (isObject(options2.kemofront.mimi)) {
          return options2.kemofront.mimi ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.mimi.src}.png`) : options2.dummy;
        }
        return options2.kemofront.mimi ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.mimi}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "kemofront_mimi_msk", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.kemofront.mimi;
      },
      srcfn(options2) {
        return options2.kemofront.mimi ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.mimi.src}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (options2.kemofront.mimi) {
          if (!options2.kemofront.mimi.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (options2.kemofront.mimi) {
          if (!options2.kemofront.mimi.fixcolor) {
            return options2.kemofront.mimi.color;
          }
        }
      },
      masksrcfn(options2) {
        if (options2.kemofront.mimi) {
          return __resolve(AVATARPATH, `kemofront/${options2.kemofront.mimi.src}_msk.png`);
        }
      }
    });
    setLayer(ID, "kemofront_horn", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.kemofront.horn;
      },
      srcfn(options2) {
        if (isObject(options2.kemofront.horn)) {
          return options2.kemofront.horn ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.horn.src}.png`) : options2.dummy;
        }
        return options2.kemofront.horn ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.horn}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.kemofront.horn)) {
          if (!options2.kemofront.horn.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.kemofront.horn)) {
          if (!options2.kemofront.horn.fixcolor) {
            return options2.kemofront.horn.color;
          }
        }
      }
    });
    setLayer(ID, "hat", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.hat;
      },
      srcfn(options2) {
        if (isObject(options2.hat)) {
          return options2.hat ? __resolve(AVATARPATH, `hat/${options2.hat.src}.png`) : options2.dummy;
        }
        return options2.hat ? __resolve(AVATARPATH, `hat/${options2.hat}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.hat)) {
          if (!options2.hat.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.hat)) {
          if (!options2.hat.fixcolor) {
            return options2.hat.color;
          }
        }
      }
    });
    setLayer(ID, "addon_body", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.addon.body;
      },
      srcfn(options2) {
        return options2.addon.tear ? __resolve(AVATARPATH, `addon/body.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_bottom", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.addon.bottom;
      },
      srcfn(options2) {
        return options2.addon.bottom ? __resolve(AVATARPATH, `addon/bottom.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_face", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.addon.face;
      },
      srcfn(options2) {
        return options2.addon.face ? __resolve(AVATARPATH, `addon/face.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_hair", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.addon.hair;
      },
      srcfn(options2) {
        return options2.addon.hair ? __resolve(AVATARPATH, `addon/hair.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_mouth", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.addon.mouth;
      },
      srcfn(options2) {
        return options2.addon.mouth ? __resolve(AVATARPATH, `addon/mouth.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_penis", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.addon.penis;
      },
      srcfn(options2) {
        return options2.addon.penis ? __resolve(AVATARPATH, `addon/penis.png`) : options2.dummy;
      }
    });
    setLayer(ID, "frame", {
      width: opt.width ? opt.width : defalutOpt.width,
      height: opt.height ? opt.height : defalutOpt.height,
      dx: opt.dx ? opt.dx : defalutOpt.dx,
      dy: opt.dy ? opt.dy : defalutOpt.dy,
      showfn(options2) {
        return !!options2.frame;
      },
      srcfn(options2) {
        if (isObject(options2.frame)) {
          return options2.frame ? __resolve(AVATARPATH, `frame/${options2.frame.src}.png`) : options2.dummy;
        }
        return options2.frame ? __resolve(AVATARPATH, `frame/${options2.frame}.png`) : options2.dummy;
      }
    });
  }
  new Avatarlayer("Avatar");
  new Avatarlayer("Portrait", { show: false });
  new Avatarlayer("Emoji", { show: false });
  new Shoplayer("Shop");
  function animation(options2, props = {}) {
    if (!options2.seconds) {
      throw new Error("options对象必须有name frames seconds 属性" + JSON.stringify(options2));
    }
    if (!options2.frames) {
      throw new Error("options对象必须有name frames seconds 属性" + JSON.stringify(options2));
    }
    if (!options2.name) {
      throw new Error("options对象必须有name frames seconds 属性" + JSON.stringify(options2));
    }
    const s = 1e3 * options2.seconds;
    let n = 0;
    const obj = {};
    const propskey = Object.keys(props);
    const frames = options2.frames;
    if (typeof options2.frames === "number") {
      obj["frames"] = options2.frames;
      options2.duration ? obj["duration"] = options2.duration : obj["duration"] = s / options2.frames;
    }
    if (Array.isArray(options2.frames) && Array.isArray(options2.percentual)) {
      obj["keyframes"] = options2.percentual.map((v1, i1) => v1.map((v2, i2) => {
        let num;
        if (n === 0) {
          n = s / 100 * v2;
          num = n;
        } else {
          num = n;
          n = s / 100 * v2;
          num = n - num;
        }
        const o = {
          duration: num
        };
        Array.isArray(frames[i1]) ? o["frame"] = frames[i1][i2] : o["frame"] = frames[i2];
        propskey.forEach((v3) => {
          if (Array.isArray(props[v3])) {
            if (Array.isArray(props[v3][i1])) {
              o[v3] = props[v3][i1][i2];
            } else {
              o[v3] = props[v3][i2];
            }
          } else {
            o[v3] = props[v3];
          }
        });
        return o;
      })).flat();
    }
    console.log(obj);
    Renderer.Animations[options2.name] = obj;
  }
  Avatar2.animation = animation;
  animation({
    name: "eyes",
    seconds: 5,
    frames: [0, 1, 2, 3, 2, 1, 0],
    percentual: [[58, 60, 62, 64, 66, 68, 70], [84, 85, 86, 87, 88, 89, 90], [94, 95, 96, 97, 98, 99, 100]]
  });
  Avatar2.AVATARMODEL = Renderer.locateModel("Avatar", "avatar");
  Avatar2.PORTRAITMODEL = Renderer.locateModel("Portrait", "portrait");
  Avatar2.SHOPMODEL = Renderer.locateModel("Shop", "shop");
  Avatar2.options = Avatar2.AVATARMODEL.defaultOptions();
  Avatar2.shopoptions = Avatar2.SHOPMODEL.defaultOptions();
  var AVATARCANVAS = Avatar2.AVATARMODEL.createCanvas();
  Avatar2.AVATARMODEL.render(AVATARCANVAS, Avatar2.options);
  Avatar2.AVATARMODEL.animate(AVATARCANVAS, Avatar2.options);
  var PORTRAITCANVAS = Avatar2.PORTRAITMODEL.createCanvas();
  Avatar2.PORTRAITMODEL.render(PORTRAITCANVAS, Avatar2.options);
  Avatar2.PORTRAITMODEL.animate(PORTRAITCANVAS, Avatar2.options);
  var SHOPCANVAS = Avatar2.AVATARMODEL.createCanvas();
  Avatar2.SHOPMODEL.render(SHOPCANVAS, Avatar2.shopoptions);
  Avatar2.cacheEmoji = new Map();
  function RandomNPCEmoji(FACES, O) {
    const randomArray = (arr) => arr[parseInt(Math.random() * (arr.length - 1))];
    const OPTION = {
      fliter: {},
      emoadd: {}
    };
    const CM = {
      CMSkin: [
        "health",
        "white",
        "mugi",
        "dark",
        "black"
      ],
      CMHairColor: [
        "black",
        "darkbrown",
        "wine",
        "brown",
        "milktea",
        "blond",
        "softblond",
        "platinum",
        "silver",
        "white",
        "purple",
        "green",
        "blue",
        "aqua",
        "pink"
      ],
      CMHairstyle: [
        "natural",
        "straight",
        "curly"
      ],
      CMEyeColor: [
        "black",
        "brown",
        "emerald",
        "green",
        "lightgreen",
        "blue",
        "aqua",
        "purple",
        "lightpurple",
        "white",
        "amber",
        "red"
      ],
      CMEyetype: ["a", "b"]
    };
    const hair = randomArray(CM.CMHairColor);
    const randomplus1 = (v) => parseInt(Math.random() * v) + 1;
    OPTION["hairback"] = `straight/${hair}_${randomplus1(4)}`;
    OPTION["hairfront"] = `${randomArray(CM.CMHairstyle)}/${hair}_1`;
    OPTION["body"] = `${randomArray(CM.CMSkin)}/body_${randomplus1(3)}`;
    let emote = A.emote[FACES];
    const emoadd = ["tear", "shy", "red", "hurt"];
    const nomal = ["eyebrow", "mouth", "frame"];
    emoadd.forEach((va) => {
      OPTION["emoadd"][va] = emote[va];
    });
    nomal.forEach((va) => {
      OPTION[va] = emote[va];
    });
    OPTION["eyes"] = [randomArray(CM.CMEyeColor), emote["eyes"].includes("full") ? emote["eyes"] + randomArray(CM.CMEyetype) + "_idle" : emote["eyes"]].join("/");
    var EMOJIMODEL = Renderer.locateModel("Emoji");
    var EMOJICANVAS = EMOJIMODEL.createCanvas();
    EMOJIMODEL.render(EMOJICANVAS, OPTION);
    EMOJIMODEL.animate(EMOJICANVAS, OPTION);
    O["ID"] ? EMOJICANVAS.canvas.id = O["ID"] : null;
    O["CLASS"] ? EMOJICANVAS.canvas.className = O["CLASS"] : null;
    return EMOJICANVAS.canvas;
  }
  Avatar2.RandomNPCEmoji = RandomNPCEmoji;
  function avatarEmoji(FACES, O) {
    const OPTIONSTR = JSON.stringify(Avatar2.options);
    const OPTION = JSON.parse(OPTIONSTR);
    let emote = A.emote[FACES];
    const emoadd = ["tear", "shy", "red", "hurt"];
    const nomal = ["eyebrow", "mouth", "frame"];
    emoadd.forEach((va) => {
      OPTION["emoadd"][va] = emote[va];
    });
    nomal.forEach((va) => {
      OPTION[va] = emote[va];
    });
    OPTION["eyes"] = [V.PC.瞳色, emote["eyes"].includes("full") ? emote["eyes"] + T.type[V.PC.眼型] + "_idle" : emote["eyes"]].join("/");
    var EMOJIMODEL = Renderer.locateModel("Emoji");
    var EMOJICANVAS = EMOJIMODEL.createCanvas();
    EMOJIMODEL.render(EMOJICANVAS, OPTION);
    EMOJIMODEL.animate(EMOJICANVAS, OPTION);
    O["ID"] ? EMOJICANVAS.canvas.id = O["ID"] : null;
    O["CLASS"] ? EMOJICANVAS.canvas.className = O["CLASS"] : null;
    return EMOJICANVAS.canvas;
  }
  Avatar2.avatarEmoji = avatarEmoji;
  function getCanvas() {
    return AVATARCANVAS.canvas;
  }
  Avatar2.getCanvas = getCanvas;
  function getShop() {
    return SHOPCANVAS.canvas;
  }
  Avatar2.getShop = getShop;
  function getPortrait() {
    return PORTRAITCANVAS.canvas;
  }
  Avatar2.getPortrait = getPortrait;
  function setShop(colors, mode) {
    const group = ["outter", "over_up", "inner_up"];
    const _resolve = (...args) => args.join("/");
    const opt = Avatar2.shopoptions;
    const showcase = V.showcase;
    const isbeast = group.includes(showcase.layer) && showcase.hasDif.breast;
    const fixcolor = showcase.fixcolor;
    const color = !(mode === "base") ? showcase.color : colors ? colors : showcase.color;
    let src = fixcolor ? _resolve(showcase.layer, showcase.index, `${color}${isbeast ? "_1" : ""}`) : _resolve(showcase.layer, showcase.index, `basic${isbeast ? "_1" : ""}`);
    V.showcase.hasImg ? null : src = "dummy";
    let fixacc = showcase.fixacc;
    let subcolor = mode === "acc" ? colors : showcase.subcolor;
    opt["acc"] = showcase.acc ? _resolve(showcase.layer, showcase.index, showcase.acc) : null;
    opt["dress"] = {
      fixcolor,
      color,
      src,
      fixacc,
      subcolor
    };
    Avatar2.SHOPMODEL.redraw();
  }
  Avatar2.setShop = setShop;
  function setAvatar(key, option, updates) {
    if (!Avatar2.options) {
      return option;
    }
    const keyName = key.includes(".");
    const keys = key.split(".");
    let change;
    let last = key;
    if (keyName) {
      last = keys[keys.length - 1];
      change = Avatar2.options[keys[0]];
    } else {
      change = Avatar2.options;
    }
    if (!change[last])
      change[last] = option;
    let update = updates ? true : false;
    const isObject2 = Object.prototype.toString.call(option) === "[object Object]";
    const isArray = Array.isArray(Avatar2.options);
    if (isObject2) {
      const keyOption = option ? Object.entries(option) : [];
      keyOption.forEach((value, index) => {
        if (change[last][value[0]] !== value[1]) {
          typeof change[last] === "string" ? change[last] = option : change[last][value[0]] = value[1];
          update = true;
        }
      });
    }
    if (!isObject2 && !isArray) {
      if (change[last] !== option) {
        change[last] = option;
        update = true;
      }
    }
    if (!update) {
      if (V.harddebug)
        console.log("未更新:", key, option, last, change[last], change);
    }
    if (update) {
      if (V.harddebug)
        console.log("更新:", key, option, last, change[last], change);
      Avatar2.AVATARMODEL.redraw();
      Avatar2.PORTRAITMODEL.redraw();
    }
    return option;
  }
  Avatar2.setAvatar = setAvatar;
})(Avatar || (Avatar = {}));
window.Avatar = Avatar;
window.setAvatar = (key, options, updates) => Avatar.setAvatar(key, options, updates);
window["avatarEmoji"] = (FACE, option) => Avatar.avatarEmoji(FACE, option);
window["RandomNPCEmoji"] = (FACE, option) => Avatar.RandomNPCEmoji(FACE, option);
