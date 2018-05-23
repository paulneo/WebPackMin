const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports={
  entry: {
    "home": path.resolve(__dirname, 'src/home.js'),

  },

  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
  },
  devtool: 'eval-source-map',
  module:{
    rules:[
      {
        test:/\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader','sass-loader'],
          publicPath:'../'
        })
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:'es2015',
          }
        },
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 1000000,
            fallback: 'url-loader',
            name: 'images/[name].[ext]',
            publicPath:'./',
          }
        }
      },

    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats:"errors-only",
    open:true,
    // host: "0.0.0.0"
  },
  plugins: [

    new HtmlWebpackPlugin({
      title: 'Apple',
      hash:true,
      filename:'index.html',
      template: './src/index.pug',
    }),
    new HtmlWebpackPlugin({
      title: 'Mac',
      hash:true,
      filename:'mac.html',
      template: './src/mac.pug',
    }),
    new HtmlWebpackPlugin({
      title: 'iPad',
      hash:true,
      filename:'ipad.html',
      template: './src/ipad.pug',
    }),
    new HtmlWebpackPlugin({
      title: 'iPhone',
      hash:true,
      filename:'iphone.html',
      template: './src/iphone.pug',
    }),
    new HtmlWebpackPlugin({
      title: 'Watch',
      hash:true,
      filename:'watch.html',
      template: './src/watch.pug',
    }),

    new ExtractTextPlugin("style/style.css"),

  ]
}
