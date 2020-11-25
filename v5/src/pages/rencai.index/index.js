import '@liepin/zepto-input-search';
import '@liepin/zepto-back-top';
import navSet from '@liepin/zepto-nav';
import appMask from '@liepin/zepto-app-mask';
import './index.css';
import isFromAlipay from '../../components/business/app/alipay';

navSet({
  fixed: true,
  rightText: '<i class="text-icon icon-search"/>',
  rightEvent() {
    window.location.href = '/zhaopin/';
  },
});

// app引导下浮层
if (!isFromAlipay() && !LT.Cookie.get('app-mask')) {
  appMask();
}
$('[data-selector="icon-close"]').on('tap', function () {
  $('.swiper-module').remove();
  LT.Cookie.set('app-mask', 'yes', 24, '/', window.location.hostname);
});
$('.swiper-module:not(.icon-close)').on('tap', function () {
  $('[data-selector="open-app"]').trigger('click');
});

// 初始化表单插件
$('[data-selector="search-input"]').searchInput({
  placeholder: '搜索职位',
});
$('body').backTop();
