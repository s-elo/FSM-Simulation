const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const publicJsPath = "./public/js/";

module.exports = {
  mode: "development",

  entry: {
    // jquery: [`${publicJsPath}modules/jquery.min.js`],

    // clipboard: [`${publicJsPath}modules/clipboard.js`],

    bootstrap: [`${publicJsPath}bootstrap.css.js`],

    design: [
      // need to be in order with the rely relation
      `${publicJsPath}globalParams.js`,
      `${publicJsPath}index.js`,
      `${publicJsPath}extends/colorControl.js`,
    ],

    instruction: [`${publicJsPath}otherPreset/index.js`],
  },

  output: {
    // bundled dir
    path: path.resolve(__dirname, "build"),
    // the path after bundling in build dir
    filename: "public/js/[name]-bundle.js",
  },

  module: {
    rules: [
      // pack css
      {
        test: /\.css$/,

        use: [
          {
            loader: "style-loader",
            options: {
              // insert after the head tag
              // insert: function (element) {
              //   var parent = document.querySelector("head");
              //   var lastInsertedElement =
              //     window._lastElementInsertedByStyleLoader;
              //   if (!lastInsertedElement) {
              //     parent.insertBefore(element, parent.firstChild);
              //   } else if (lastInsertedElement.nextSibling) {
              //     parent.insertBefore(element, lastInsertedElement.nextSibling);
              //   } else {
              //     parent.appendChild(element);
              //   }
              // },
            },
          },
          {
            loader: "css-loader",
          },
        ],
      },
      // other resources configs
      {
        exclude: /\.html|js|css|less/,

        loader: "file-loader",

        options: {
          name: "[hash:10].[ext]",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views/design.html"),
      // the path after bundling in build dir
      filename: "views/design.html",
      // inject: "head",
      // scriptLoading: "defer",
      chunks: ["bootstrap", "design"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views/Instruction.html"),
      filename: "views/Instruction.html",
      // inject: "head",
      // scriptLoading: "defer",
      chunks: ["bootstrap", "instruction"],
    }),
  ],

  devServer: {
    port: 8089,

    // the path after bundling
    index: "views/design.html",

    openPage: "views/design.html",
  },
};
