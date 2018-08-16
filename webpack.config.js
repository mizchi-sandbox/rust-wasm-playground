const HTMLPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: __dirname + "/app/index.js",
  plugins: [new HTMLPlugin()],
  module: {
    rules: [
      {
        test: /\.rs$/,
        use: [
          {
            loader: "wasm-loader"
          },
          {
            loader: "rust-native-wasm-loader",
            options: {
              release: true
            }
          }
        ]
      }
    ]
  }
};
