const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    path.resolve(__dirname, "src", "main.js"),
    path.resolve(__dirname, "src", "main.scss")
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "dist.js"
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [
                  "src/main.scss"
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "node_modules/codemirror/lib", to: path.resolve(__dirname, "dist/vendor/codemirror/lib") },
        { from: "node_modules/codemirror/mode", to: path.resolve(__dirname, "dist/vendor/codemirror/mode") },
        { from: "node_modules/codemirror/addon", to: path.resolve(__dirname, "dist/vendor/codemirror/addon") },
        { from: "node_modules/codemirror/keymap/vim.js", to: path.resolve(__dirname, "dist/vendor/codemirror/keymap") },
        { from: "node_modules/@standardnotes/component-relay/dist/dist.js", to: path.resolve(__dirname, "dist/lib/component-relay.js") },
        { from: "node_modules/sn-stylekit/dist/web-components.js", to: path.resolve(__dirname, "dist/lib/web-components.js") },
        { from: "node_modules/sn-stylekit/dist/stylekit.css", to: path.resolve(__dirname, "dist/stylekit.css") },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "dist.css"
    }),
    new RemovePlugin({
      /**
       * Before compilation, remove existing `./vendor` folder.
       * It will be re-created later by the CopyPlugin.
       */
      before: {
        include: [
          './dist/vendor'
        ]
      }
    }),
    new HtmlWebpackPlugin({
      title: "Code Editor",
      template: "editor.index.ejs"
    })
  ],
};
