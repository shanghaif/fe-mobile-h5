/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const entries = require('./entryGenerate');

const htmls = [];
Object.keys(entries)
  .forEach((k) => {
    const html = glob.sync(entries[k].replace(/\.js$/, '.html'));
    if (html.length) {
      htmls.push(new HtmlWebpackPlugin({
        filename: `html/${k}.html`,
        chunks: [k],
        template: entries[k].replace(/\.js$/, '.html'),
        inject: false,
      }));
    }
  });
module.exports = htmls;
