const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.styl$/,
          loader: "stylus-loader", // compiles Styl to CSS
        },
      ],
    },
  },
});
