import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/create.js",
  output: {
    file: "create.cjs",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  plugins: [resolve(), commonjs(), json()],
};
