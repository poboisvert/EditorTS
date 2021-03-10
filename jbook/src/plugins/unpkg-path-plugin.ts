import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

// NPM install locaforage and set a const
const fileCache = localForage.createInstance({
  name: "filecache",
});

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
      // ON RESOLVE
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // console log
        console.log("onResolve", args);
        // Load module
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            path: new URL(
              args.path,
              "https://unpkg.com/" + args.resolveDir + "/"
            ).href,
          };
        }

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
      // ON LOAD Function
      //
      //
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
            import React, { useState } from 'react-select';
            console.log(React, useState);
          `,
          };
        }
        // localforage - cache validation
        // Mouse over "cacheResult" is unknown
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
        // GET AXIOS
        const { data, request } = await axios.get(args.path); // Use as a key

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // Display the imported module
        // console.log(data);
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
