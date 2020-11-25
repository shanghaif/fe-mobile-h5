/**
 * 城市选择页
 * https://m.liepin.com/city/
 */
import '@liepin/zepto-back-top';
import navSet from '@liepin/zepto-nav';
import initSideBarModule from './modules/initSideBar'; // 侧边导航栏
import './index.css';

navSet();

$(() => {
  initSideBarModule();
  // 切换城市记录cookie
  $('[data-citysite]').on('click', function () {
    LT.Cookie.set('m_city_site', $(this).attr('data-citysite'), 15, '/', window.location.hostname);
  });
});
