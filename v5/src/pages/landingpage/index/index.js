/**
 * 落地页
 * https://m.liepin.com/landingpage/index3.shtml
 */
import './index.css';

let tabTimer = null;
let tabIndex = 1;
const tabItem = $('.main dl dd');
const tabContent = $('.content ul');

function tabChange(ele, content, index) {
  const $ele = $(ele);
  $ele.addClass('active').siblings().removeClass('active');
  content.eq(index || $ele.index()).fadeIn(600).siblings().hide();
}

function autoChange(ele, content) {
  tabChange(ele, content, tabIndex++);
  tabIndex > 3 && (tabIndex = 0);
}
tabItem.on('tap', function () {
  clearInterval(tabTimer);
  tabTimer = null;
  tabChange(this, tabContent);
  tabIndex = $(this).index() + 1;
  tabTimer = setInterval(() => {
    autoChange(tabItem.eq(tabIndex), tabContent);
  }, 3e3);
});
tabTimer = setInterval(() => {
  autoChange(tabItem.eq(tabIndex), tabContent);
}, 3e3);

