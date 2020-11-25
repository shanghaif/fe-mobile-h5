/* eslint-disable import/no-extraneous-dependencies */
const os = require('os'); // node 提供的系统操作模块
const glob = require('glob');
const HappyPack = require('happypack');
const webpack = require('webpack');
const FontPluginsPlus = require('font-plugins-plus');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config');
const fileLoader = require('./fileLoader');
const cssLoader = require('./cssLoader');
const { resolve } = require('./utils');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const isProd = process.env.NODE_ENV === 'production';
const assetDir = isProd ? config.prdPath : config.devPath;

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: {
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', '@babel/polyfill', 'core-js'],
  },
  output: {
    path: assetDir,
    filename: 'js/common/[name].js',
    publicPath: config.publicPath,
    library: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
        use: [fileLoader],
      }, {
        test: /\.(less|css)$/,
        use: cssLoader(),
      }, {
        test: /\.jsx?$/,
        exclude: /unpack_files/,
        use: ['happypack/loader?id=babel'],
      },
    ],
  },
  resolve: {
    modules: [
      resolve('node_modules'),
      resolve('src'),
    ],
    /* 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名 */
    extensions: ['.js', '.json', '.tpl', '.jsx'],
    /* 勿删  模块别名定义，方便后续直接引用别名，无须多写长长的地址 */
    alias: {},
    // enforceExtension: false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // copy include html
    new CopyWebpackPlugin([
      {
        from: resolve('src/includes'),
        to: resolve(`asset${isProd ? '' : '-dev'}/v5/html/includes`),
        ignore: ['.*'],
      },
      {
        from: resolve('src/static'),
        to: resolve(`asset${isProd ? '' : '-dev'}/v5/static`),
        ignore: ['.*'],
      },
      {
        from: resolve('src/cdntest.png'),
        to: resolve(`asset${isProd ? '' : '-dev'}/v5/cdntest.png`),
      },
    ]),
    // 生成字体文件
    new FontPluginsPlus({
      // 字体图标库的名称
      name: 'iconfont',
      to: resolve('src/fonts'), // 出口
      from: [
        resolve('src/fonts/src'),
        ...glob.sync(resolve('node_modules/@liepin/**/fonts-src')), // 组件字体入口
      ],
      // 编译后字体配置输出到指定css文件
      cssPath: resolve('src/common/font.less'),
    }),
    new CleanWebpackPlugin([assetDir], {
      root: resolve(''),
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new webpack.DllPlugin({
      context: assetDir,
      path: resolve(assetDir, '[name]-manifest.json'),
      name: '[name]',
    }),
  ],
};
