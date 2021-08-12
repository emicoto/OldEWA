const { spawn } = require("child_process");
const path = require("path");
const _resolve = (...w) => path.resolve(__dirname, `../`, ...w);
const { platform, arch } = require("os");
const SYSTEM = {
  platform: platform(),
  arch: arch(),
};

const tweego = () => {
  const system = {
    win32: "win",
    linux: "linux",
    darwin: "osx",
  };
  if (!system[SYSTEM.platform])
    throw new Error("请用 Windows系统, Linux系统 或 Mac系统");
  return _resolve(
    `devTools/tweego/tweego_${system[SYSTEM.platform]}${
      SYSTEM.arch.includes("64") ? "64" : "86"
    }${SYSTEM.platform === "win32" ? ".exe" : ""}`
  );
};
const COMMANDS = [tweego()];
const options = {
  html: `-d ${_resolve("dist/decompile.html")}`,
  script: `-o ${_resolve("public/script.twee")}`,
};
for (const key in options) {
  COMMANDS.push(options[key]);
}
const string = COMMANDS.join(" ");
const TWEEGO_PATH = _resolve("devTools/tweego/StoryFormats");
const result = spawn("cmd.exe", ["/c", string], {
  env: {
    TWEEGO_PATH: TWEEGO_PATH,
  },
});

result.stdout.on("data", (data) => {
  console.log(process.env, this.env);
  console.log(data.toString());
});

result.stderr.on("data", (data) => {
  console.log(process.env, this.env);
  console.error(data.toString());
});
