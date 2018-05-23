
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;
var glob = require("glob")
var paths = [];

var getDirectories = function (src, callback) {
  glob(src + '/**/*.html', callback);
};
getDirectories('dist', function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    for (var i in res) {
      let item = res[i];
      paths.push(item.replace('dist',''))
    }
    console.log(paths)
  }
});



module.exports = (env) => {
  return {
    entry: {
      "home": path.resolve(__dirname, 'src/home.js'),
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].[hash].js',
      libraryTarget: 'umd'
    },
    devServer: {
      port: 9000,
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets:'es2015',
            }
          },
        },

        {
          test:/\.(scss|css)$/,
          use: ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:['css-loader','sass-loader'],
            publicPath:'../'
          })
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
              limit: 10000,
              fallback: 'url-loader',
              name: 'images/[name].[ext]',
              publicPath:'../',

            }
          }
        },
      ]
    },
    plugins: [

      //favicon//
     //  new FaviconsWebpackPlugin({
     //
     //   logo: './src/fav.png',
     //   prefix: 'icons/',
     //   emitStats: false,
     //   statsFilename: 'iconstats.json',
     //   persistentCache: true,
     //   inject: true,
     //   background: '#fff',
     //   title: 'Webpack App',
     //   publicPath: '../',
     //   icons: {
     //     android: true,
     //     appleIcon: true,
     //     appleStartup: true,
     //     coast: false,
     //     firefox: true,
     //     opengraph: false,
     //     twitter: false,
     //     yandex: false,
     //     windows: false
     //   },
     // }),

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
}
