const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [{
         test: /\.(s*)css$/,
         use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
      }]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: 'index.html',
         minify: { collapseWhitespace: false }
     }),

     new MiniCssExtractPlugin({
         filename: 'styles.css'
     }),
   ]
};