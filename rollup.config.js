import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
      format: "es",
      file: "bin/inject.js",
      name: "getselector"
  },
  plugins: [resolve()]
};