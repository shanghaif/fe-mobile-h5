/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css到一个单独的指定css文件中。
// 加载css-loader
function getCSSLoader() {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'less-loader',
  ];
}

module.exports = getCSSLoader;
