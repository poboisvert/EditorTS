import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

/* const fileCache = localForage.createInstance({
  name: "filecache",
});

(async () => {
  await fileCache.setItem("color", "black");

  const color = await fileCache.getItem("color");
  console.log(color);
})(); */

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      //
      //
      // ON RESOLVE
      //
      //
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });
      //
      // Relative path ./ or ../
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        // Find ../ or ./
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com/" + args.resolveDir + "/")
            .href,
        };
      });
      //
      // Root package
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // Console Log
        // console.log("onResolve", args);
        // Load module
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        /*         if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            path: new URL(
              args.path,
              "https://unpkg.com/" + args.resolveDir + "/"
            ).href,
          };
        } */

        // Final import package
        return {
          namespace: "a",
          // If a package has a SRC folder and inside a helpers. This will solve the import issue
          path: `https://unpkg.com/${args.path}`,
        };

        /*         else if (args.path === "tiny-test-pkg") {
          return {
            path: "https://unpkg.com/tiny-test-pkg@1.0.0/index.js",
            namespace: "a",
          };
        } */
      });
      //
      //
    },
  };
};
