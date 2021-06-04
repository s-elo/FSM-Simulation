const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const publicJsPath = "./public/js/";

module.exports = {
  mode: "development",

  entry: {
    // jquery: [`${publicJsPath}modules/jquery.min.js`],

    // clipboard: [`${publicJsPath}modules/clipboard.js`],

    design: [
      // need to be in order
      `${publicJsPath}globalParams.js`,
      `${publicJsPath}test.js`,
      `${publicJsPath}extends/colorControl.js`,
    ],

    instruction: [`${publicJsPath}otherPreset/index.js`],
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "public/js/[name]-bundle.js",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views/design.html"),
      // the path after bundling in build dir
      filename: "views/design.html",
      chunks: ["design"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views/instruction.html"),
      filename: "views/instruction.html",
      chunks: ["instruction"],
    }),
  ],

  devServer: {
    port: 8089,

    // the path after bundling
    index: "views/design.html",

    openPage: "views/design.html",
  },
};
