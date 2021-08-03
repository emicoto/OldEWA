setup.chara = require("./chara.json");
setup.tesy = require("./test.yaml");
window.csv = require("./test.csv");
// setup.中文 = chara;
setup.hello = function (name) {
  return "Hello " + name + ", how are you?";
};
console.log(setup);
console.log(window);
console.log(window.csv);
setTimeout(() => console.log(window), 5000);
