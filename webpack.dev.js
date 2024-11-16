const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

function abs(path_string) {
  return path.resolve(__dirname, path_string);
}

module.exports = {
  mode: "development",

  resolve: {
    extensions: [".js"],
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: abs("src/index.html"),
      },

      hotUpdate: true,
    }),
  ],

  devServer: {
    watchFiles: {
      paths: ["src/**/*.*"],
      options: {
        usePolling: true,
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.(ico|png|jpe?g|webp|svg)$/,
        type: "asset/resource",
      },
    ],
  },
};