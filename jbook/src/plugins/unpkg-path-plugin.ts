import * as esbuild from "esbuild-wasm";
import axios from "axios";

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

        // Final import
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

      // ON LOAD
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        // ON LOAD - DOWNLOAD, IMPORT and load a plugin
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import React, {useState} from "react";
              console.log(React,useState)
            `,
          };
        }
        // GET AXIOS
        const { data, request } = await axios.get(args.path);
        // Display the imported module
        // console.log(data);
        return {
          loader: "jsx",
          contents: data,
          // If a package has a SRC folder and inside a helpers. This will solve the import issue
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};
