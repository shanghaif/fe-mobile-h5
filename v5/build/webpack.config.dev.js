/* eslint-disable import/no-extraneous-dependencies */
const os = require('os'); // node 提供的系统操作模块
const merge = require('webpack-merge');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件和文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取为独立的文件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const VConsolePlugin = require('vconsole-webpack-plugin');
const config = require('./config');
const { resolve } = require('./utils');

const entry = require('./entryGenerate'); // 主入口
const { singleEntry } = require('./entryGenerate'); // 配置单独入口

const pagesEntry = entry('pages');
Object.keys(pagesEntry).forEach(k => {
  pagesEntry[k] = ['./src/common/index.js', pagesEntry[k]];
});

const cssLoader = require('./cssLoader');
const fileLoader = require('./fileLoader');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const exportConfig = merge({
  devtool: 'eval-source-map', // 此选项控制是否生成，以及如何生成 source map
  mode: 'development',
  entry: {
    ...pagesEntry,
    ...singleEntry('./src/common/localdata.js'),
  },
  output: {
    path: config.devPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
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
        test: /\.(less|css)$/,
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
  externals: [{ // 防止将某些 import 的包打包到 bundle 中
    echarts: 'echarts',
    '@liepin/zepto': 'Zepto',
    '@liepin/newswiper': 'Swiper',
    react: 'React',
    'react-dom': 'ReactDOM',
  }],
  stats: { // 让你更精确地控制 bundle 信息该怎么显示
    logging: 'warn', // 告知 stats 是否添加日志输出。
    chunks: false, // 告知 stats 是否添加关于 chunk 的信息
    assets: false, // 告知 stats 是否展示资源信息
    modules: false, // 告知 stats 是否添加关于构建模块的信息。
    children: false, // 告知 stats 是否添加关于子模块的信息。
    entrypoints: false, // 告知 stats 是否展示入口文件与对应的文件 bundles。
  },
  optimization: {
    moduleIds: 'hashed', // 替代数字的 module id，实现持久化; 告知 webpack 当选择模块 id 时需要使用哪种算法,'named'
    chunkIds: 'named', // 替代数字的 chunk id，实现持久化
    removeAvailableModules: true, // 如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块
    removeEmptyChunks: true, // 如果 chunk 为空，告知 webpack 检测或移除这些 chunk
    mergeDuplicateChunks: true, // 告知 webpack 合并含有相同模块的 chunk
    splitChunks: {
      minChunks: 100, // 表示被引用次数，默认为1；
      cacheGroups: { // 缓存组。（这才是配置的关键）
        default: false,
        common: { // 常用的配置都是 common + page 的形式。而 page 在 entry 入口的时候就已经配置好了，此处配置common
          chunks: 'initial', // 表示从哪些chunks里面抽取代码
          test: /[\\/]node_modules[\\/]/, // 表示要过滤 modules，
          name: 'common/common',
          minChunks: 10, // 把所有 node_modules 的模块被不同的 chunk 引入超过 10 次的抽取为 common
        },
      },
    },
  },
  resolve: {
    modules: [ // 告诉webpack解析模块时应该搜索的目录。
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
    // copy include html
    new CopyWebpackPlugin([
      {
        from: resolve('src/includes'),
        to: resolve('asset-dev/v5/html/includes'),
        ignore: ['.*'],
      },
      {
        from: resolve('src/static'),
        to: resolve('asset-dev/v5/static'),
        ignore: ['.*'],
      },
      {
        from: resolve('src/cdntest.png'),
        to: resolve('asset-dev/v5/cdntest.png'),
      },
    ]),
    new CleanWebpackPlugin(['asset-dev'], {
      root: resolve(''),
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
    // vconsole 调试工具
    new VConsolePlugin({
      filter: [], // 需要过滤的入口文件
      enable: false, // 需要使用调试功能改成 true
    }),
  ],
});

module.exports = exportConfig;
