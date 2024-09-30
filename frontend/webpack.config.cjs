const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.jsx",
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: "svg-inline-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          globOptions: { ignore: ["**/index.html"] },
          noErrorOnMissing: true,
        },
        {
          from: "src/assets",
          to: "assets",
          noErrorOnMissing: true,
        },
        { from: "manifest.json", to: "." },
        {
          from: "public/*.{jpg,jpeg}",
          to: "[name][ext]",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "production",
};
