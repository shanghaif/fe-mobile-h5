/*
 * 配置默认不需要修改
 */
const path = require('path');

const roots = path.join(__dirname, '../'); /* 工作根目录 v5 */
const contextPath = path.join(roots, 'src'); /* 开发编译目录 v5/src */
const execRet = /(fe-(?:.+)-(?:pc|h5))\/?.*\/(v[\d]+)/.exec(__dirname);
const version = execRet[2]; /* v5或 v6... */
const projectPort = `${execRet[1]}/${execRet[2]}`; /* fe-article-pc/v5 */
const publicPath = `//s.lietou-static.com/${projectPort}/`; /* 公共路径 */
const devPath = path.join(roots, `asset-dev/${version}`); /* 开发编译结果目录 */
const prdPath = path.join(roots, `asset/${version}`); /* 生产编译结果目录 */
const devAsset = path.join(roots, 'asset-dev');
const prdAsset = path.join(roots, 'asset');
const zipFileName = 'asset.zip'; // 打包文件名
const sourcemapAsset = path.join(roots, 'asset/sourcemap'); // sourcemap资源目录
const sourcemapFileName = 'sourcemap.zip'; // sourceMap 文件名
const os = require('os');

module.exports = {
  roots,
  contextPath,
  devPath,
  prdPath,
  publicPath,
  projectPort,
  version,
  devAsset,
  prdAsset,
  zipFileName,
  zipFilePath: path.join(os.tmpdir() || './', zipFileName),
  sourcemapAsset,
  sourcemapFileName,
  sourcemapFilePath: path.join(os.tmpdir() || './', sourcemapFileName),
};
