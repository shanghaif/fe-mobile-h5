const { extname } = require('path'); // path.extname() 方法会返回 path 的扩展名
const config = require('./config');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  loader: 'file-loader?cacheDirectory',
  options: {
    name(file) { // file = `resourcePath` - `/absolute/path/to/file.js`
      /**
       * 处理 @liepin包里的图片,字体等文件的路径
       */
      let subName = file.replace(config.contextPath, ''); // v5/src
      /* src 处理 */
      const ext = extname(file);
      subName = subName.replace(ext, '');
      let ret = subName.split(/\/node_modules\//);
      if (ret) {
        ret = ret.slice(-1);
        subName = ret[0].replace('@liepin', 'plugins');
      }
      if (/\.(png|jpg|jpeg|gif)$/.test(ext)) { // 图片处理
        subName = `images/${subName.replace(/images?\//, '')}`;
      }
      subName = subName.replace(/\/{2,}/g, '/');
      return isProd ? `${subName}.[hash:8].[ext]` : `${subName}.[ext]`;
    },
  },
};
