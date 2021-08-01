const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/public/index.html", 
  filename: "./index.html",
  favicon: './client/public/favicon.ico',//favicon路径
  minify: { //压缩HTML文件
    removeComments: true, //移除HTML中的注释
    collapseWhitespace: false //删除空白符与换行符
  }
});
module.exports = {
  entry: "./client/src/index.js",
  output: { 
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [htmlPlugin],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: require('./babel.config')
        }
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        loader: "file-loader",
        options: { name: '[path][name].[ext]' }
      }
    ]
  }
};