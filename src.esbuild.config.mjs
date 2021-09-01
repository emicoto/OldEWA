import ymlPlugin from "esbuild-plugin-yaml";
import dsv from "esbuild-plugin-dsv";
import ImportGlob from "esbuild-plugin-import-glob";
//---------------------

import { globPlugin } from "esbuild-plugin-glob";
const ImportGlobPlugin = ImportGlob.default;
const yamlPlugin = ymlPlugin.yamlPlugin;
const dsvPlugin = dsv.dsvPlugin;
//---------------------
// const options =;
// esbuildServe(, {
//   port: 8009,
//   root: "./dist",
//   live: true,
// });
import esbuild from "esbuild"
esbuild.build({
  // entryPoints: ["Code/**/*.ts"],
  entryPoints: ["Code/**/*.ts",],
  charset: "utf8",
  bundle: true,
  entryNames: "[dir]/[name]",
  outdir: "./src/js/03-GameSystem/00-AvatarSystem/",
  outbase: "Code",

  // outfile: "test.js",
  // tsconfig: "./Code/tsconfig.json",
  target: [
    'es2020',
    'chrome58',
    'firefox57',
    'safari11',
    'edge16',
  ],
  plugins: [
    globPlugin(),
    ImportGlobPlugin(),

    yamlPlugin(),
    dsvPlugin({
      transform(data, extension) {
        console.log(data);
        return data;
      },
    }),

    // esbuildPluginTsc(),

    // dtsPlugin(),
    // babel(),
  ],
  format: "esm",
  watch:true
})
