/* eslint-disable import/no-extraneous-dependencies */
const os = require('os'); // node 提供的系统操作模块
const merge = require('webpack-merge');
const HappyPack = require('happypack');
// const webpack = require('webpack');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./config');
const { resolve } = require('./utils');

const entry = require('./entryGenerate');
const { singleEntry } = require('./entryGenerate'); // 配置单独入口

const pagesEntry = entry('pages');
Object.keys(pagesEntry).forEach(k => {
  pagesEntry[k] = ['./src/common/index.js', pagesEntry[k]];
});

const cssLoader = require('./cssLoader');
const fileLoader = require('./fileLoader');
const MapWebpackPlugin = require('./loader/map-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const exportConfig = merge({
  mode: 'production',
  entry: {
    ...pagesEntry,
    ...singleEntry('./src/common/localdata.js'),
  },
  output: {
    path: config.prdPath,
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
    publicPath: config.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
        use: [fileLoader],
      }, {
        test: /\.tpl$/,
        exclude: [
          /unpack_files/,
        ],
        use: ['happypack/loader?id=babel', require.resolve('./loader/nodeTplLoader.js')],
      }, {
        test: /\.less|css$/,
        use: cssLoader(),
      }, {
        test: /\.jsx?$/,
        exclude: [
          /unpack_files/,
        ],
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
      },
    ],
  },
  externals: [{
    echarts: 'echarts',
    '@liepin/zepto': 'Zepto',
    '@liepin/newswiper': 'Swiper',
    react: 'React',
    'react-dom': 'ReactDOM',
  }],
  optimization: {
    moduleIds: 'hashed', // 替代数字的 module id，实现持久化
    chunkIds: 'named', // 替代数字的 chunk id，实现持久化
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    splitChunks: {
      minChunks: 100,
      cacheGroups: {
        default: false,
        common: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name: 'common/common',
          minChunks: 10,
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
    extensions: ['.js', '.tpl', '.jsx', '.json', '.ts', '.tsx'],
    /* 勿删  模块别名定义，方便后续直接引用别名，无须多写长长的地址 */
    alias: {},
    // enforceExtension: false
  },
  plugins: [
    new MapWebpackPlugin({ targetFile: '../map.json' }),
    // copy include html
    new CopyWebpackPlugin([
      {
        from: resolve('src/includes'),
        to: resolve('asset/v5/html/includes'),
        ignore: ['.*'],
      },
      {
        from: resolve('src/static'),
        to: resolve('asset/v5/static/[path][name].[hash:8].[ext]'),
        ignore: ['.*'],
      },
      {
        from: resolve('src/cdntest.png'),
        to: resolve('asset/v5/cdntest.png'),
      },
    ]),
    new CleanWebpackPlugin(['asset'], {
      root: resolve(''),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /(\.less|\.css)$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        autoprefixer: { remove: false },
        safe: true,
      },
      canPrint: true,
    }),
    new BundleAnalyzerPlugin(),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
  ],
});

module.exports = exportConfig;
