const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "views/dist"),
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "views/src")
      }
    },
    entry: ["@babel/polyfill", path.join(__dirname, "views/src", "main.js")]
  }
};
