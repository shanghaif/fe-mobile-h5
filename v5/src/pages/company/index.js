/**
 * 企业主页
 * https://m.liepin.com/company/${企业ID}/
 * https://m.liepin.com/company/7696889/
 */
import React from 'react';
import ReactDOM from 'react-dom';
import lazyLoad from '@liepin/native-lazyload-fe';
import hotLinkInit from '../../components/ui/real-hotlink/hotlink';
import attentionModule from './modules/attention'; // 关注
import Header from '../../components/business/header/index';
import '../../components/ui/job-card/job-card.less';
import './style/banner.less';
import './style/content.less';
import './index.css';

const $win = $(window);

$(() => {
  // 招聘职位seo特殊处理
  attentionModule();
  ReactDOM.render(
    <Header/>,
    document.querySelector('.nav-container')
  );
  $('.nav-container').css('z-index', 9);
  function hasFold(elm) {
    return elm && elm.scrollHeight > elm.clientHeight;
  }

  let isInited = false;
  function initFold() {
    if (isInited) {
      return;
    }
    isInited = true;
    // 公司介绍-查看全部
    const $detail = $('.company-introduce-detail');
    const $lookAll = $('.company-introduce a[data-selector="more"]');
    if (hasFold($detail[0])) {
      $lookAll.on('click', () => {
        $detail.removeClass('ellipsis-5');
        $lookAll.remove();
      });
    } else {
      $lookAll.remove();
    }
    // 公司福利-查看全部
    const $welfare = $('.welfare-list');
    const $moreWelfare = $('.more-welfare');
    if (hasFold($welfare[0])) {
      $moreWelfare.on('click', () => {
        $welfare.css('max-height', 'none');
        $moreWelfare.remove();
      });
    } else {
      $moreWelfare.remove();
    }
    const $mapContainer = $('#map-container');
    // 点击地址，展现和关闭地图
    import(/* webpackChunkName: "thunk/zepto-map" */ '@liepin/zepto-map')
      .then(() => {
        // 百度地图
        if ($mapContainer && $mapContainer.length) {
          const compDq = $.trim($mapContainer.attr('data-city'));
          const compAddress = $.trim($mapContainer.attr('data-address'));
          if (compAddress && compAddress !== '') {
            $mapContainer.gdmap({
              address: compAddress,
              city: compDq,
              width: '100%',
              height: '10em',
            });
          }
        }
      });
  }

  // tab 初始化
  $('.tab-name').on('click', function () {
    const $this = $(this);
    if (!$this.hasClass('active')) {
      $this.addClass('active').siblings().removeClass('active');
      const link = $this.attr('data-link');
      $(`[data-selector="${link}"]`)
        .removeClass('hide')
        .siblings()
        .addClass('hide');
      setTimeout(initFold, 30);
    }
  });

  hotLinkInit();

  $win.on('load', function () {
    // 非首屏图片懒加载
    lazyLoad();
  });

  $('.go-to-search').on('click', () => {
    $('.m-top-nav-input').trigger('focus');
  });
});
