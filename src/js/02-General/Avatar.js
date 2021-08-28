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
Renderer.GeneratedPatterns = {};
Renderer.PatternProvider = function(spec) {
  if (typeof spec === "string")
    return Renderer.Patterns[spec];
  if (spec.type in Renderer.GeneratedPatterns) {
    let image = Renderer.GeneratedPatterns[spec.type](spec);
    return Renderer.globalC2D.createPattern(image, "repeat");
  }
  console.warn("Unknown pattern spec " + JSON.stringify(spec));
  return null;
};
console.log(Story);
var Avatar;
(function(Avatar2) {
  const AVATARPATH = "image/avatar";
  const __resolve = (mainpath, ...paths) => path.resolve(mainpath, ...paths);
  const cache = {};
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
  Renderer.CanvasModels["Avatar"] = {
    name: "Avatar",
    width: 180,
    height: 260,
    frames: 8,
    generatedOptions() {
      return [];
    },
    defaultOptions() {
      return {
        frame: null,
        addon: { body: false, bottom: false, face: false, hair: false, mouth: false, penis: false },
        neck: null,
        hand: null,
        face: null,
        hat: null,
        outter: null,
        top: null,
        bottom: null,
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
        penis: null,
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
  Renderer.CanvasModels["Portrait"] = {
    name: "Avatar",
    width: 120,
    height: 120,
    frames: 8,
    generatedOptions() {
      return [];
    },
    defaultOptions() {
      console.log("defaultOptions", V.avatar);
      return {
        frame: null,
        addon: { body: false, bottom: false, face: false, hair: false, mouth: false, penis: false },
        neck: null,
        hand: null,
        face: null,
        hat: null,
        outter: null,
        top: null,
        bottom: null,
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
        penis: null,
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
  Renderer.CanvasModels["Emoji"] = {
    name: "Avatar",
    width: 120,
    height: 120,
    frames: 8,
    generatedOptions() {
      return [];
    },
    defaultOptions() {
      console.log("defaultOptions", V.avatar);
      return {
        frame: null,
        addon: { body: false, bottom: false, face: false, hair: false, mouth: false, penis: false },
        neck: null,
        hand: null,
        face: null,
        hat: null,
        outter: null,
        top: null,
        bottom: null,
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
        penis: null,
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
  function setLayer(id, name, options2) {
    Renderer.CanvasModels[id].layers[name] = options2;
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
        return options2.acc ? __resolve(AVATARPATH, `${options2.acc}.png`) : options2.dummy;
      }
    });
  }
  function Portraitlayer(ID, dx = -25) {
    let layerID = 0;
    setLayer(ID, "kemoback_wing", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      }
    });
    setLayer(ID, "back", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.body;
      },
      srcfn(options2) {
        return options2.body ? __resolve(AVATARPATH, `body/${options2.body}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "hand", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
    setLayer(ID, "top", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.top;
      },
      srcfn(options2) {
        if (isObject(options2.top)) {
          return options2.top ? __resolve(AVATARPATH, `top/${options2.top.src}.png`) : options2.dummy;
        }
        return options2.top ? __resolve(AVATARPATH, `top/${options2.top}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.top)) {
          if (!options2.top.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.top)) {
          if (!options2.top.fixcolor) {
            return options2.top.color;
          }
        }
      }
    });
    setLayer(ID, "top_acc", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        if (isObject(options2.top)) {
          return !!options2.top.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.top)) {
          return options2.top.acc ? __resolve(AVATARPATH, `top/${options2.top.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      }
    });
    setLayer(ID, "outter", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
    setLayer(ID, "mouth", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.emoadd.tear;
      },
      srcfn(options2) {
        return options2.emoadd.tear ? __resolve(AVATARPATH, `emoadd/tear.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_shy", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.emoadd.shy;
      },
      srcfn(options2) {
        return options2.emoadd.shy ? __resolve(AVATARPATH, `emoadd/shy.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_red", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.emoadd.red;
      },
      srcfn(options2) {
        return options2.emoadd.red ? __resolve(AVATARPATH, `emoadd/red.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_hurt", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.emoadd.hurt;
      },
      srcfn(options2) {
        return options2.emoadd.hurt ? __resolve(AVATARPATH, `emoadd/hurt.png`) : options2.dummy;
      }
    });
    setLayer(ID, "face", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
    setLayer(ID, "hairfront", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
    setLayer(ID, "eyebrow", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
          if (!options2.eyebrow.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.eyebrow)) {
          if (!options2.eyebrow.fixcolor) {
            return options2.eyebrow.color;
          }
        }
      }
    });
    setLayer(ID, "kemofront_mimi", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.kemofront.mimi;
      },
      srcfn(options2) {
        if (isObject(options2.kemofront.mimi)) {
          return options2.kemofront.mimi ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.mimi.src}.png`) : options2.dummy;
        }
        return options2.kemofront.mimi ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.mimi}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.kemofront.mimi)) {
          if (!options2.kemofront.mimi.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.kemofront.mimi)) {
          if (!options2.kemofront.mimi.fixcolor) {
            return options2.kemofront.mimi.color;
          }
        }
      }
    });
    setLayer(ID, "kemofront_horn", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
      width: 180,
      height: 260,
      z: layerID++,
      dx,
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
    setLayer(ID, "addon_face", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.addon.face;
      },
      srcfn(options2) {
        return options2.addon.face ? __resolve(AVATARPATH, `addon/face.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_hair", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.addon.hair;
      },
      srcfn(options2) {
        return options2.addon.hair ? __resolve(AVATARPATH, `addon/hair.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_mouth", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.addon.mouth;
      },
      srcfn(options2) {
        return options2.addon.mouth ? __resolve(AVATARPATH, `addon/mouth.png`) : options2.dummy;
      }
    });
    setLayer(ID, "frame", {
      width: 180,
      height: 260,
      z: layerID++,
      dx,
      showfn(options2) {
        return !!options2.frame;
      },
      srcfn(options2) {
        if (isObject(options2.frame)) {
          return options2.frame ? __resolve(AVATARPATH, `frame/${options2.frame.src}.png`) : options2.dummy;
        }
        return options2.frame ? __resolve(AVATARPATH, `frame/${options2.frame}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.frame)) {
          if (!options2.frame.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.frame)) {
          if (!options2.frame.fixcolor) {
            return options2.frame.color;
          }
        }
      }
    });
  }
  function Avatarlayer(ID) {
    let layerID = 0;
    setLayer(ID, "background", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.background;
      },
      srcfn(options2) {
        return options2.background ? __resolve(AVATARPATH, `background/${options2.background}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "kemoback_wing", {
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
      }
    });
    setLayer(ID, "back", {
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.body;
      },
      srcfn(options2) {
        return options2.body ? __resolve(AVATARPATH, `body/${options2.body}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "penis", {
      width: 180,
      height: 260,
      z: layerID++,
      show: true,
      srcfn(options2) {
        return options2.penis ? __resolve(AVATARPATH, `body/${options2.penis}.png`) : options2.dummy;
      }
    });
    setLayer(ID, "legs", {
      width: 180,
      height: 260,
      z: layerID++,
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
    setLayer(ID, "shoes", {
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        if (isObject(options2.inner_bt)) {
          return !!options2.inner_bt.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.inner_bt)) {
          return options2.inner_bt.acc ? __resolve(AVATARPATH, `inner_bt/${options2.inner_bt.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      }
    });
    setLayer(ID, "bottom", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.bottom;
      },
      srcfn(options2) {
        if (isObject(options2.bottom)) {
          return options2.bottom ? __resolve(AVATARPATH, `bottom/${options2.bottom.src}.png`) : options2.dummy;
        }
        return options2.bottom ? __resolve(AVATARPATH, `bottom/${options2.bottom}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.bottom)) {
          if (!options2.bottom.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.bottom)) {
          if (!options2.bottom.fixcolor) {
            return options2.bottom.color;
          }
        }
      }
    });
    setLayer(ID, "bottom_acc", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        if (isObject(options2.bottom)) {
          return !!options2.bottom.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.bottom)) {
          return options2.bottom.acc ? __resolve(AVATARPATH, `bottom/${options2.bottom.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      }
    });
    setLayer(ID, "hand", {
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        if (isObject(options2.inner_up)) {
          return !!options2.inner_up.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.inner_up)) {
          return options2.inner_up.acc ? __resolve(AVATARPATH, `inner_up/${options2.inner_up.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      }
    });
    setLayer(ID, "top", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.top;
      },
      srcfn(options2) {
        if (isObject(options2.top)) {
          return options2.top ? __resolve(AVATARPATH, `top/${options2.top.src}.png`) : options2.dummy;
        }
        return options2.top ? __resolve(AVATARPATH, `top/${options2.top}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.top)) {
          if (!options2.top.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.top)) {
          if (!options2.top.fixcolor) {
            return options2.top.color;
          }
        }
      }
    });
    setLayer(ID, "top_acc", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        if (isObject(options2.top)) {
          return !!options2.top.acc;
        }
        return false;
      },
      srcfn(options2) {
        if (isObject(options2.top)) {
          return options2.top.acc ? __resolve(AVATARPATH, `top/${options2.top.acc}.png`) : options2.dummy;
        }
        return options2.dummy;
      }
    });
    setLayer(ID, "outter", {
      width: 180,
      height: 260,
      z: layerID++,
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
    setLayer(ID, "mouth", {
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.emoadd.tear;
      },
      srcfn(options2) {
        return options2.emoadd.tear ? __resolve(AVATARPATH, `emoadd/tear.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_shy", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.emoadd.shy;
      },
      srcfn(options2) {
        return options2.emoadd.shy ? __resolve(AVATARPATH, `emoadd/shy.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_red", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.emoadd.red;
      },
      srcfn(options2) {
        return options2.emoadd.red ? __resolve(AVATARPATH, `emoadd/red.png`) : options2.dummy;
      }
    });
    setLayer(ID, "emoadd_hurt", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.emoadd.hurt;
      },
      srcfn(options2) {
        return options2.emoadd.hurt ? __resolve(AVATARPATH, `emoadd/hurt.png`) : options2.dummy;
      }
    });
    setLayer(ID, "face", {
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
    setLayer(ID, "hairfront", {
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
          if (!options2.eyebrow.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.eyebrow)) {
          if (!options2.eyebrow.fixcolor) {
            return options2.eyebrow.color;
          }
        }
      }
    });
    setLayer(ID, "kemofront_mimi", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.kemofront.mimi;
      },
      srcfn(options2) {
        if (isObject(options2.kemofront.mimi)) {
          return options2.kemofront.mimi ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.mimi.src}.png`) : options2.dummy;
        }
        return options2.kemofront.mimi ? __resolve(AVATARPATH, `kemofront/${options2.kemofront.mimi}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.kemofront.mimi)) {
          if (!options2.kemofront.mimi.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.kemofront.mimi)) {
          if (!options2.kemofront.mimi.fixcolor) {
            return options2.kemofront.mimi.color;
          }
        }
      }
    });
    setLayer(ID, "kemofront_horn", {
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
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
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.addon.body;
      },
      srcfn(options2) {
        return options2.addon.tear ? __resolve(AVATARPATH, `addon/body.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_bottom", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.addon.bottom;
      },
      srcfn(options2) {
        return options2.addon.bottom ? __resolve(AVATARPATH, `addon/bottom.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_face", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.addon.face;
      },
      srcfn(options2) {
        return options2.addon.face ? __resolve(AVATARPATH, `addon/face.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_hair", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.addon.hair;
      },
      srcfn(options2) {
        return options2.addon.hair ? __resolve(AVATARPATH, `addon/hair.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_mouth", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.addon.mouth;
      },
      srcfn(options2) {
        return options2.addon.mouth ? __resolve(AVATARPATH, `addon/mouth.png`) : options2.dummy;
      }
    });
    setLayer(ID, "addon_penis", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.addon.penis;
      },
      srcfn(options2) {
        return options2.addon.penis ? __resolve(AVATARPATH, `addon/penis.png`) : options2.dummy;
      }
    });
    setLayer(ID, "frame", {
      width: 180,
      height: 260,
      z: layerID++,
      showfn(options2) {
        return !!options2.frame;
      },
      srcfn(options2) {
        if (isObject(options2.frame)) {
          return options2.frame ? __resolve(AVATARPATH, `frame/${options2.frame.src}.png`) : options2.dummy;
        }
        return options2.frame ? __resolve(AVATARPATH, `frame/${options2.frame}.png`) : options2.dummy;
      },
      blendModefn(options2) {
        if (isObject(options2.frame)) {
          if (!options2.frame.fixcolor) {
            return BLENDMODE.MULTIPLY;
          }
        }
      },
      blendfn(options2) {
        if (isObject(options2.frame)) {
          if (!options2.frame.fixcolor) {
            return options2.frame.color;
          }
        }
      }
    });
  }
  Avatarlayer("Avatar");
  new Portraitlayer("Portrait");
  new Portraitlayer("Emoji");
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
        "straight"
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
  function setShop(colors) {
    const group = ["outter", "top", "inner_up"];
    const opt = Avatar2.shopoptions;
    const showcase = V.showcase;
    const isbeast = group.includes(showcase.layer) && showcase.dfpng.breast;
    const fixcolor = showcase.fixcolor;
    const color = colors ? colors : showcase.color;
    let src = fixcolor ? __resolve(showcase.layer, showcase.index, `${color}${isbeast ? "_1" : ""}`) : __resolve(showcase.layer, showcase.index, `basic${isbeast ? "_1" : ""}`);
    opt["acc"] = showcase.acc ? __resolve(showcase.layer, showcase.index, showcase.acc) : null;
    opt["dress"] = {
      fixcolor,
      color,
      src
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
          change[last][value[0]] = value[1];
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
