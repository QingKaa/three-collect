const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    hot: false,
    liveReload: false,
  },
  configureWebpack:{
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    }
  }
});
