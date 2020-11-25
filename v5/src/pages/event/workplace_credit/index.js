/**
 * 职场信用测试结果页
 * https://m.liepin.com/credit/result/
 */
import navSet from '@liepin/zepto-nav';
import './index.css';

// 这段代码完全可以放在JSP里后端做
const { level } = window.$CONFIG || {};
const $root = $('body');
const $levelMap = $('[data-selector="level-map"]', $root).removeClass('init');
$levelMap.find('.slider').addClass(`s${level}`);
$levelMap.find(`.p${level}`).addClass('active');
// ===========================

new Swiper('.swiper-container', { // eslint-disable-line
  slidesPerView: 3,
  loop: true,
  autoplay: 3000,
  autoplayDisableOnInteraction: false,
});
// 绑定打开panel的tap处理事件
navSet();
