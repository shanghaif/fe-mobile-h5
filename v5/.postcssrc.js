module.exports = {
  ident: 'postcss',
  plugins: [
    require('precss')(), // precss囊括了许多插件来支持类似 Sass 的特性，比如 CSS 变量，套嵌，mixins 等。
    require('postcss-cssnext')(), // cssnext 插件允许开发人员在当前的项目中使用 CSS 将来版本中可能会加入的新特性
    require('postcss-filter-gradient')(),
    require('postcss-pseudoelements')(),
    require('postcss-opacity')(),
    require('postcss-inlineblock')(),
  ],
  map: true
};


