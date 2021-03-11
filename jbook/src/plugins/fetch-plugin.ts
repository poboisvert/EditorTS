import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

// NPM install locaforage and set a const
const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        // Exact match index.js
        // From index.tsx - we load the information below

        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        console.log("onLoad", args);

        // localforage - cache validation
        // Mouse over "cacheResult" is unknown
        // Can be commented START
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
        // Can be commented END
        // GET AXIOS
        const { data, request } = await axios.get(args.path); // Use as a key

        //
        // Cleaning
        const escaped = data
          .replace(/\n/g, "") // New lines removed
          .replace(/"/g, '\\"') // Double quotes cleaned
          .replace(/'/g, "\\'"); // Single quote
        //
        const contents = `
            const style = document.createElement('style');
            style.innerText = '${data}';
            document.head.appendChild(style);
          `;

        //
        // CSS import patch END
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // Display the imported module
        // console.log(data);
        await fileCache.setItem(args.path, result);

        return result;
      });
      // Fetch file
      // ON LOAD Function
      //
      //
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        // localforage - cache validation
        // Mouse over "cacheResult" is unknown
        // Can be commented START
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
        // Can be commented END
        // GET AXIOS
        const { data, request } = await axios.get(args.path); // Use as a key

        //

        // Cleaning
        //
        // CSS import patch END
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
