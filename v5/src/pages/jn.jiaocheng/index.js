/**
 * url: m.liepin.com/jn{技能词}/jiaocheng/
 */
import navSet from '@liepin/zepto-nav';

import './index.less';

navSet();
$('[ data-selector="link-tab"] li').on('click', function () {
  const $this = $(this);
  const index = $this.index();
  $this.addClass('active').siblings().removeClass('active');
  $('.foot-container .link-content').eq(index).addClass('content-active').siblings()
    .removeClass('content-active');
});

$('[data-selector="skill-tab"] a').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active');
});
