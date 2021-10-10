const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

const port = process.env.PORT || 3000;

module.exports = {
  mode,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" }
          },
          "css-loader", "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  target,
  devServer: {
    hot: true,
    host: 'localhost',
    port,
    open: true,
  }
}