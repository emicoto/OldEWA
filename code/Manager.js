const Csv = require("./Data/**/*.csv");
const Json = require("./Data/**/*.json");
const Yaml = require("./Data/**/*.yml");
class Manager {
  files = new Map();
  constructor(files) {
    const File = (file) => {
      const obj = {};
      file.filenames.map((v, i) => {
        const filename = v.split("/").slice(2).join("/");

        obj[filename] = file.default[i].default;
      });
      return obj;
    };
    Object.keys(files).map((v) => this.files.set(v, File(files[v])));
  }
  getFile(key, filename) {
    return this.files.get(key)[filename];
  }
}
Game.Manager = new Manager({
  csv: Csv,
  json: Json,
  yaml: Yaml,
});
