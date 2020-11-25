/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const chalk = require('chalk');

const config = require('../config');

const logger = (text, color = 'green') => console.log(chalk[color](text));

class MapWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const that = this;
    const mapJson = {};
    const regPath = /^(static)\//;
    if (compiler.hooks) {
      compiler.hooks.done.tapAsync('MapWebpackPlugin', (stats, callback) => {
        const { assets } = stats.toJson();
        assets.forEach((v) => {
          const exts = path.extname(v.name);
          if (v.chunkNames.length || regPath.test(v.name)) {
            const key = v.name.replace(exts, '')
              .replace(/\.[a-z0-9]+$/, '') + exts;
            mapJson[path.join(config.version, key)] = path.join(config.version, v.name);
          }
        });
        const { outputFileSystem } = compiler;
        const targetFile = outputFileSystem.join(compiler.outputPath, that.options.targetFile);
        outputFileSystem.writeFile(
          targetFile,
          JSON.stringify(mapJson, '', 2),
          () => logger('map.json 写入完成')
        );
        that.options.callback && that.options.callback(mapJson);
        callback();
      });
    }
  }
}

module.exports = MapWebpackPlugin;
