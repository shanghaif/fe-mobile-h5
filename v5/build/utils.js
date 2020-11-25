/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const glob = require('glob'); // glob模块允许你使用*等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件.

const resolve = (...args) => path.resolve(__dirname, '../', ...args);
const getFilesByGlob = filePattern => [...glob.sync(resolve(filePattern))];

module.exports = {
  resolve,
  getFilesByGlob,
};
