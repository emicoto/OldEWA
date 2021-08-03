(() => {
  var __defProp = Object.defineProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // code/chara.json
  var require_chara = __commonJS({
    "code/chara.json"(exports, module) {
      module.exports = {
        name: "\u9E3D\u5B50"
      };
    }
  });

  // yaml:H:\_ElysionWorldAdventure\code\test.yaml
  var require_test = __commonJS({
    "yaml:H:\\_ElysionWorldAdventure\\code\\test.yaml"(exports, module) {
      module.exports = { time: 10 };
    }
  });

  // dsv:H:\_ElysionWorldAdventure\code\test.csv
  var test_exports = {};
  __export(test_exports, {
    default: () => test_default
  });
  var test_default;
  var init_test = __esm({
    "dsv:H:\\_ElysionWorldAdventure\\code\\test.csv"() {
      test_default = [
        {
          "\u7F16\u53F7": "1",
          "\u540D\u5B57": "\u8DEF\u97F5"
        },
        {
          "\u7F16\u53F7": "2",
          "\u540D\u5B57": "\u72D0\u72F8"
        }
      ];
    }
  });

  // code/main.js
  setup.chara = require_chara();
  setup.tesy = require_test();
  window.csv = (init_test(), test_exports);
  setup.hello = function(name) {
    return "Hello " + name + ", how are you?";
  };
  console.log(setup);
  console.log(window);
  console.log(window.csv);
  setTimeout(() => console.log(window), 5e3);
})();
