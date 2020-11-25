/**
 * 就业前景-->简历模板
 * https://m.liepin.com/zp${职位名全拼}/jianli/
 * 如: java网站项目
 * https://m.liepin.com/zpjavawangzhanxiangmu/jianli/
 */
import navSet from '@liepin/zepto-nav';
import './index.css';

navSet();
const root = $('body');
const $select = $('.select', root);
$select.on('click', function () {
  $(this)
    .toggleClass('actived')
    .siblings()
    .removeClass('actived');
});
