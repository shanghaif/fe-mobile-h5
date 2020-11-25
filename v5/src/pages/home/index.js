/**
 * 全国首页
 * https://m.liepin.com/
 */
import React from 'react';
import ReactDOM from 'react-dom';
import '@liepin/zepto-back-top';
import userInfo from '@liepin/zepto-user-info';
import lazyLoad from '@liepin/native-lazyload-fe';
import localCookie from '@liepin/native-sweet-fe';
import SearchLayer from '@liepin/react-search-layer-h5';
import { cRoot } from '../../lib/utils/domain';
import '../../common/js/live'; // 直播iframe iOS兼容
import AppDownloadForTopRender from '../../components/business/app-download-for-top';
import cookieUtil from '../../lib/utils/cookie';
import userUtil from '../../lib/utils/user';
import initLive from './modules/initLive';
import './index.less';
import '../../components/ui/job-card/job-card.less';
import '../../components/ui/hot-job/hot-job.less';
import '../../components/ui/hotlink/index.less';
import isFromAlipay from '../../components/business/app/alipay';

window.$CONFIG = window.$CONFIG || {};
const downloadImg = require('./images/index-download-img.png');
const closeImg = require('./images/index-download-close.png');

const $root = $('.home-container');
const $fixSearchInput = $('[data-selector="fix-search-input"]', $root);
const $searchInputBtn = $('[data-selector="search-input-btn"]', $root);
const $searchFixNavWrap = $('.search-fix-nav-wrap', $root);
const $groupBtn = $('[data-selector="group-btn"]', $root);
const $userInfoEntry = $('[data-selector="users-btn"]', $root);
const $fixUserInfoEntry = $('[data-selector="fix-users-btn"]', $root);
const $fixLoginGuideWrap = $('[data-selector="fix-login-guide-wrap"]', $root);
// const $recommendJobTitle = $('.recommend-job h2', $root);
const $searchInputWrap = $('.search-input-wrap', $root);
const $groupWrap = $('.group-wrap', $root);
const $searchLayerContainer = document.createElement('div');
const $searchInput = $('[data-selector="search-input"]', $root);

$('body').append($searchLayerContainer);
function renderSearchLayer(visible) {
  ReactDOM.render(
    <SearchLayer
      visible={ visible }
      cityCode={ $CONFIG.dqCode || '000' }
      cityName={ $CONFIG.dqName || '全国' }
      onClose={ () => renderSearchLayer(false) }
    />,
    $searchLayerContainer
  );
}

$(() => {
  // 个人中心
  userInfo.init($userInfoEntry, {
    tipsVisible: true,
  });
  userInfo.init($fixUserInfoEntry);
  $searchInput.on('focus', () => renderSearchLayer(true));
  initLive();
  // 吸顶浮层搜索栏trigger search input
  $fixSearchInput.on('click', () => renderSearchLayer(true));
  // 搜索按钮trigger搜索浮层
  $searchInputBtn.on('click', () => renderSearchLayer(true));
  $('[data-selector="no-data-search"]').on('click', () => renderSearchLayer(true));

  // group
  $groupBtn.on('click', function () {
    const $this = $(this);
    // 应聘记录点击就取消小红点
    if ($this.hasClass('group-apply-log')) {
      $this.find('.group-unread').remove();
      window.location.href = $this.data('src');
    } else {
      window.location.href = $this.data('src');
    }
  });
  // 谁看过我
  $('[data-selector="group-who-see-btn"]', $root).on('click', function () {
    $.dialog({
      title: false,
      content: '请去 APP 查看详细访问信息',
      okVal: '打开猎聘App',
      cancelVal: '取消',
      ok() {
        window.location.href = `${cRoot}/tdown`;
      },
      cancel() {
        $.dialog.focus.close();
      },
      width: '300px',
      css: {
        'text-align': 'center',
      },
    });
  });
});

// 滚动event处理
$(window).on('load scroll', function () {
  const searchInputRect = $searchInputWrap[0].getBoundingClientRect();
  const groupWrapRect = $groupWrap[0].getBoundingClientRect();
  // 吸顶nav+search
  if (searchInputRect.top <= 0 && $searchFixNavWrap.is(':hidden')) {
    $searchFixNavWrap.show();
  } else if (searchInputRect.top > 0 && $searchFixNavWrap.is(':visible')) {
    $searchFixNavWrap.hide();
  }
  // 吸底登录引导
  if (!userUtil.isLogin) {
    if (groupWrapRect.top <= 0 && $fixLoginGuideWrap.is(':hidden')) {
      $fixLoginGuideWrap.fadeIn(300);
    } else if (groupWrapRect.top > 0 && $fixLoginGuideWrap.is(':visible')) {
      $fixLoginGuideWrap.fadeOut(300);
    }
  }
});

$(window).on('load', function () {
  // 非首屏图片懒加载
  lazyLoad();
  // 初始化返回顶部
  $('body').backTop();
  // 猎聘App引导下载，城市分站页不显示app推广
  function appAdsFn() {
    // 京东金融, 猜测是京东金融认证合作不展示引导下载, 支付宝渠道不展示任何下载引导
    if (
      isFromAlipay()
      || (
        cookieUtil.get('__tlog')
        && cookieUtil.get('__tlog').split('|').pop() === 'jd_rz_02'
      )
    ) {
      return false;
    }
    // APP推广banner是否显示
    if (!cookieUtil.get('index-app-banner')) {
      const html = `
        <div class="download-center-box" style="width:${$(window).width()}px">
          <img class="index-banner" src="${downloadImg}">
          <img data-nick="index_banner_close" class="index-banner-close" src="${closeImg}">
        </div>`;
      $('.app').remove();
      $.dialog.common(html);
    } else {
      AppDownloadForTopRender({
        showTlog: 's:S000000073',
      });
    }
    // 关闭APP推广banner
    $('.index-banner-close').on('click', () => {
      cookieUtil.set('index-app-banner', 'yes');
      // $topAds.show();
      $.dialog.focus.close();
    });
    // 点击banner打开下载链接
    $('.index-banner').on('click', () => {
      cookieUtil.set('index-app-banner', 'yes');
      $.dialog.focus.close();
      // $topAds.show();
      window.location.href = `${cRoot}/tdown`;
    });
  }
  // 定位IP弹窗
  if (window.$CONFIG && window.$CONFIG.cityName && window.$CONFIG.cityCode && !localCookie.get('city_switch_dialog_hide')) {
    $.dialog({
      width: '90%',
      zIndex: 2503,
      event: 'click',
      title: false,
      content: `<div class="text-center" style="font-size:16px;">当前定位城市是 ${window.$CONFIG.cityName} <br/>是否切换</div>`,
      button: [{
        name: '取消',
        callback() {
          $.dialog.focus.close();
          localCookie.set('city_switch_dialog_hide', 'hide', 1);
          cookieUtil.set('m_city_site', window.$CONFIG.nowCityCode, 15, '/', window.location.hostname);
          appAdsFn();
        },
        className: 'btn-normal',
      }, {
        name: '切换',
        callback() {
          localCookie.set('city_switch_dialog_hide', 'hide', 1);
          cookieUtil.set('m_city_site', window.$CONFIG.cityCode, 15, '/', window.location.hostname);
          window.location.href = `/${window.$CONFIG.cityCode}/`;
        },
        className: 'btn-normal',
      }],
    });
  } else {
    appAdsFn();
  }
  $('[data-selector="icon-close"]').on('click', () => {
    $('.swiper-module').remove();
    cookieUtil.set('app-mask', 'yes', 1, '/', window.location.hostname);
  });
  $('[data-selector="open-app"]').on('click', (e) => {
    e.stopPropagation();
  });
  $('.swiper-module:not(.icon-close)').on('click', () => {
    $('[data-selector="open-app"]').trigger('click');
  });
});
