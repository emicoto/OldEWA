const { yamlPlugin } = require("esbuild-plugin-yaml");
const { dsvPlugin } = require("esbuild-plugin-dsv");
let envPlugin = {
  name: "env",
  setup(build) {
    // Intercept import paths called "env" so esbuild doesn't attempt
    // to map them to a file system location. Tag them with the "env-ns"
    // namespace to reserve them for this plugin.
    build.onResolve({ filter: /^env$/ }, (args) => ({
      path: args.path,
      namespace: "env-ns",
    }));

    // Load paths tagged with the "env-ns" namespace and behave as if
    // they point to a JSON file containing the environment variables.
    build.onLoad({ filter: /.*/, namespace: "env-ns" }, () => ({
      contents: JSON.stringify(process.env),
      loader: "json",
    }));
  },
};

require("esbuild")
  .build({
    entryPoints: ["./code/main.js"],
    bundle: true,
  outdir:"./src/js/",
    watch: true,
    target: "chrome58,firefox57,safari11,edge16".split(","),
    plugins: [envPlugin, yamlPlugin(), dsvPlugin()],
    
  })
  .catch(() => process.exit(1));
