const { getFilesByGlob } = require('./utils');
const config = require('./config');

function formatName(name) { // ../src/pages/so.job/index.js
  return name.replace(config.contextPath, '') // ../src
    .replace(/\/index\.(t|j)sx?$/, '') // index.js
    .replace(/\.(t|j)sx?$/, '') // -> /pages/so.job
    .replace(/^\/+/, ''); // -> pages/so.job
}

// 遍历入口文件
module.exports = function (dirname) { // dirname = pages, ../src/pages/so.job/js
  const files = getFilesByGlob(`./src/${dirname}?(.?(*))/**/index.@(t|j)s?(x)`);
  const entries = {};

  /* 入口 */
  files.forEach(v => {
    entries[formatName(v)] = v;
  });
  return entries;
};

module.exports.singleEntry = function (path) {
  const files = getFilesByGlob(path);
  const entries = {};

  /* 入口 */
  files.forEach(v => {
    entries[formatName(v)] = v;
  });
  return entries;
};

