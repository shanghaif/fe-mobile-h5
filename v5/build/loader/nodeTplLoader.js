/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { getOptions, parseQuery, isUrlRequest, urlToRequest } = require('loader-utils');
const assign = require('object-assign');
const NodeTplPlus = require('nodetpl-plus').default;

function getLoaderConfig(context) {
  const query = context.resourceQuery ? parseQuery(context.resourceQuery) : {};
  const options = getOptions(context);
  const configKey = query.config || 'nodetplLoader';
  const config = options && options[configKey] ? options[configKey] : {};
  delete query.config;
  return assign(query, config);
}

module.exports = function (source) {
  this.cacheable && this.cacheable();
  const config = getLoaderConfig(this);
  const { root } = config;
  const data = {};
  /* eslint-disable no-underscore-dangle */
  const { resolve } = this._compiler.options;
  const { alias } = resolve;
  const contextPath = this.context;
  const replace = source.replace(/((?:<img[^>]*src\s*=|url\s*\()\s*['"]?)([^\n'"#?)]+)/g, (all, ext, url) => {
    if (!isUrlRequest(url, root)) { return all; }
    const random = `___NODETPLFILE___${Math.random()}${Math.random()}___`;
    const name = url.split('/').slice(0, 1);
    let newUrl = url;
    if (name && name.indexOf('.') !== 0) {
      if (alias[name]) {
        newUrl = url.replace(name, alias[name]);
        newUrl = path.relative(contextPath, newUrl);
      }
    }
    data[random] = newUrl;
    return ext + random;
  });
  let result = new NodeTplPlus({
    library: 'commonjs',
  }).compile(replace);
  result = result.replace(/___NODETPLFILE___[0-9.]+___/g, (match) => {
    if (!data[match]) { return match; }
    return `' + require(${JSON.stringify(urlToRequest(data[match], root))}) + '`;
  });
  return result;
};
