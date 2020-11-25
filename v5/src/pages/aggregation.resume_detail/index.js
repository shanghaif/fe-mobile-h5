/**
 * 就业前景-->简历详情
 * https://m.liepin.com/jianli/${简历ID}.shtml
 * https://m.liepin.com/jianli/986328.shtml
 */
import navSet from '@liepin/zepto-nav';
import './index.less';

navSet();
const $root = $('body');
const $moreBtn = $('[data-selector="more-resume"]', $root);
const $Experience = $('[data-selector="project-responsibilities"],[data-selector="work-responsibilities"]', $root);
if (LT.User.isLogin) {
  $moreBtn.addClass('more-btn-hidden');
  $Experience.removeClass('add-height');
} else {
  $Experience.addClass('add-height');
}
