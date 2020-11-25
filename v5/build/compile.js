/* eslint-disable import/no-extraneous-dependencies */
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');

const logger = (text, color = 'green') => console.log(chalk[color](text));

function compile() {
  logger('开始编译...', 'blue');
  const start = Date.now();
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        logger('编译失败!!!', 'red');
        reject(err);
      } else if (stats.hasErrors()) {
        logger('编译失败!!!', 'red');
        reject(stats.toJson().errors);
      } else {
        process.stdout.write(`${stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        })}\n\n`);
        logger('编译成功.');
        resolve();
      }
      logger(`总耗时:${Date.now() - start}`);
    });
  });
}

compile();
