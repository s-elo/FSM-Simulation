const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const publicJsPath = "./public/js/";

const commonCssLoader = [
  MiniCssExtractPlugin.loader,

  "css-loader",

  // css compatibility
  {
    loader: "postcss-loader",

    options: {
      postcssOptions: {
        plugins: [
          [
            "postcss-preset-env",
            {
              ident: "postcss",
            },
          ],
        ],
      },
    },
  },
];

process.env.NODE_ENV = "production";

module.exports = {
  mode: "production",

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
        use: [...commonCssLoader],
      },
      // other resources configs
      // {
      //   exclude: /\.html|js|css|less/,

      //   loader: "file-loader",

      //   options: {
      //     esModule: false,
      //     name: "assets/img/[hash:10].[ext]",
      //   },
      // },

      // url config
      {
        // test: /\.jpg|png|gif|jpeg$/,
        exclude: /\.html|js|css|less/,

        // when use only one loader
        // need to download url-loader and file-loader
        loader: "url-loader",

        options: {
          /**
           * limit: X*1024 means
           * when the img is bigger than 8kb
           * it will be encoded as base64 string
           */
          // limit: 8 * 1024,

          /**
           * Problem1:
           * now we can only handle the img in this way
           * and cannot handle the img in HTML file
           * such that: <img src="xxx">
           * Thus we need to add one more loader below
           *
           * Probem2:
           * url-loader follows the es6 module standard
           * while html-loader use the commonJS
           * this leads to the error: [object Module]
           *
           * Thus we need to add some configs at this loader
           * to cancel the es6 module standard at this loader
           */

          esModule: false,

          // rename the bundled imgs
          /**
           * [hash:x] only get the first x chars of the hash
           * [ext] the original extended name of the img
           */
          name: "public/img/[name].[ext]",
        },
      },
      // html img config
      {
        test: /\.html$/,

        // Donot forget to download
        // it is used to handle the img in html files
        // follow the commonJS standard
        // loader: 'html-withimg-loader'
        loader: "html-withimg-loader",
      },

      // js compatibility
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",

            options: {
              presets: [
                [
                  "@babel/preset-env",

                  {
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    corejs: "3",
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
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

      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views/Instruction.html"),
      filename: "views/Instruction.html",
      // inject: "head",
      // scriptLoading: "defer",
      chunks: ["bootstrap", "instruction"],

      minify: false,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views/Introduction.html"),
      filename: "views/Introduction.html",
      // inject: "head",
      // scriptLoading: "defer",
      chunks: ["bootstrap", "instruction"],

      minify: false,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views/login.html"),
      filename: "views/login.html",
      // inject: "head",
      // scriptLoading: "defer",
      chunks: ["bootstrap"],

      minify: false,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "views/register.html"),
      filename: "views/register.html",
      // inject: "head",
      // scriptLoading: "defer",
      chunks: ["bootstrap"],

      minify: false,
    }),

    new MiniCssExtractPlugin({
      filename: "public/css/[name].css",

      // ineffective...
      // insert: "#total-title",
    }),

    new OptimizeCssAssetsWebpackPlugin(),
  ],

  devServer: {
    port: 8089,

    // the path after bundling
    index: "views/design.html",

    openPage: "views/design.html",
  },
};
