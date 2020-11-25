/* eslint-disable import/no-extraneous-dependencies */
const HappyPack = require('happypack');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./config');
const { resolve } = require('./utils');
// eslint-disable-next-line import/no-unresolved
const vendor = require('../asset-dev/v5/vendor-manifest');
const entry = require('./entryGenerate');

const viewsEntry = entry('views');
Object.keys(viewsEntry).forEach(k => {
  viewsEntry[k] = ['@babel/polyfill', viewsEntry[k]];
});
const cssLoader = require('./cssLoader');
const fileLoader = require('./fileLoader');

const happyThreadPool = HappyPack.ThreadPool({ size: 2 });

const exportConfig = {
  devtool: 'eval',
  mode: 'development',
  entry: {
    ...viewsEntry,
  },
  output: {
    path: config.devPath,
    filename: 'js/[name].js',
    publicPath: config.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
        use: [fileLoader],
      }, {
        test: /\.less|css$/,
        use: cssLoader(),
      }, {
        test: /\.tpl$/,
        exclude: [
          /unpack_files/,
        ],
        use: ['happypack/loader?id=babel', require.resolve('./loader/nodeTplLoader.js')],
      }, {
        test: /\.jsx?$/,
        exclude: [
          /unpack_files/,
        ],
        use: ['happypack/loader?id=babel'],
      },
      /*
       * {
       *   test: /\.tsx?$/,
       *   use: 'awesome-typescript-loader',
       *   options: { onlyCompileBundledFiles: true },
       * },
       */
    ],
  },
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    splitChunks: {
      minChunks: 100,
      cacheGroups: {
        commonReact: {
          chunks(chunk) {
            return /(^views)/.test(chunk.name);
          },
          test(module) {
            if (module.nameForCondition) {
              return !/(moment|@ant-design|@liepin\/react-datepicker-pc)/.test(module.nameForCondition());
            }
            return true;
          },
          name: 'common/common-react',
          minChunks: 7,
        },
      },
    },
  },
  resolve: {
    modules: [
      resolve('node_modules'),
      resolve('src'),
    ],
    /* 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名 */
    extensions: ['.js', '.tpl', '.jsx', '.json'],
    /* 勿删  模块别名定义，方便后续直接引用别名，无须多写长长的地址 */
    alias: {},
    // enforceExtension: false
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: config.devPath,
      manifest: vendor,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new BundleAnalyzerPlugin(),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
  ],
};

module.exports = exportConfig;
