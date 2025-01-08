const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const { FaviconsBundlerPlugin } = require("html-bundler-webpack-plugin/plugins");
const CopyPlugin = require("copy-webpack-plugin");

function abs(path_string) {
  return path.resolve(__dirname, path_string);
}

function copyToDist(file_path) {
  return { from: abs("src/" + file_path), to: abs("dist/") }
}

module.exports = {
  mode: "production",

  output: {
    path: abs("dist"),
    crossOriginLoading: "anonymous",
  },

  resolve: {
    extensions: [".js"],
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        index: abs("src/index.html"),
      },

      js: {
        filename: "[contenthash:8].js",
      },

      css: {
        filename: "[contenthash:8].css",
      },

      preload: [
        {
          test: /\.(ttf|woff2?)$/,
          as: "font",
          rel: "prefetch",
          attributes: { crossorigin: true },
        },
      ],

      minify: true,
      minifyOptions: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },

      integrity: "auto",
    }),

    new FaviconsBundlerPlugin({
      enabled: true,
      faviconOptions: {
        path: "/",
        icons: {
          favicons: true,
          android: false,
          appleIcon: false,
          appleStartup: false,
          windows: false,
          yandex: false,
        },
      },
    }),

    // new CopyPlugin({
      // patterns: [
        // File path relative to src/
        // copyToDist("foo.txt"),
      // ],
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "[hash:8][ext]",
        },
      },
    ],
  },
};