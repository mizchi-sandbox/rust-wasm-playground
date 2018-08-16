const HTMLPlugin = require("html-webpack-plugin");

const ENV = process.env.NODE_ENV || "development";

module.exports = {
  mode: ENV,
  entry: __dirname + "/app",
  plugins: [new HTMLPlugin()]
};
