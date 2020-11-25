/**
 * 企业黄页
 * https://m.liepin.com/company/gs${companyID?}/
 * 如
 * https://m.liepin.com/company/gs6718/
 */
import '@liepin/zepto-dialog';
import '@liepin/zepto-back-top';
import '@liepin/zepto-pagerBar';
import writeComments from '@liepin/zepto-write-comments';
import '@liepin/zepto-map';
import navSet from '@liepin/zepto-nav';
import appMask from '@liepin/zepto-app-mask';

import './index.css';
// 底部热门tab
import hotLinkInit from '../../components/ui/hotlink/tab.hotlink';
import recruitLayer from '../../components/ui/recruit/recruit.layer'; // 拉新浮层
import initFixedTab from '../../components/ui/header/fixedHeader';
import { range } from '../../lib/lambda/lambda';
import downloadGuide from '../../components/business/app/app.download.guide';

const $root = $('body');
const $tabMain = $('[data-selector="tab-main"]', $root);
const $companyTop = $('.company-info', $root);
const $navBarHeight = $('[data-selector="crumbs-link"]', $root).height();
const $headerHeight = $('.nav h1', $root).height();
const offsetTop = $companyTop.height() + $headerHeight + $navBarHeight;
navSet();
window.$CONFIG = window.$CONFIG || {};

// 初始化悬浮头
initFixedTab($('.detail-box', $root).offset().top);

// 切量app引导下载
downloadGuide({
  showCode: 'S000013562',
  rCode: 'R000013521',
});

// 浮层
$(window).on('scroll', () => {
  const scrollTop = $(window).scrollTop();
  if (scrollTop > offsetTop) {
    $tabMain.addClass('fixed');
  } else {
    $tabMain.removeClass('fixed');
  }
});
const { salaryData } = $CONFIG;
// 联系方式
if (!LT.User.isLogin) {
  let $mask = `<div class="mask"><div class="mask-register"><a href="/login/?url=${window.location.href}"><span>登录</span><em> | </em><span>注册</span>&nbsp;后查看更多&gt;&gt;</a></div></div>`;
  $('[data-selector="contact-content"]').html($mask);
  $('[data-selector="business-info"]').append($mask);
  $mask = null;
}
// 薪资待遇
if (salaryData && salaryData.length > 0) {
  window.Highcharts && new Highcharts.Chart('chart-info', {
    chart: { type: 'bar' },
    colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
    title: {
      style: {
        fontSize: '14px',
        fontFamily: 'Microsoft Yahei',
      },
      align: 'center',
      text: '按薪资统计',
    },
    xAxis: { type: 'category' },
    yAxis: {
      title: { text: null },
      labels: {
        fomatter() {
          return `${this.value}k`;
        },
      },
    },
    legend: { enabled: false },
    plotOptions: {
      series: {
        borderWidth: 0,
      },
    },
    tooltip: {
      // headerFormat: '<span style="font-size:11px">{point.name}：</span><br>',
      pointFormat: '<b>{point.y}</b><br/>',
    },
    credits: { enabled: false },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: salaryData,
    }],
  });
}

// app引导下浮层
if (!LT.Cookie.get('app-mask')) {
  appMask();
}
$('[data-selector="icon-close"]').on('tap', () => {
  $('.swiper-module').remove();
  LT.Cookie.set('app-mask', 'yes', 1, '/', window.location.hostname);
});
// 关注
const numElm = $('.follow-count i', $root);
const attentionTipsTpl = require('./tpls/attentionTips.tpl');

$('[data-selector="add-favorite"]').on('tap', function () {
  if (!LT.User.isLogin) {
    window.location.href = `/login/?url=${window.location.href}`;
    return;
  }
  if ($(this).hasClass('active')) {
    $(this).removeClass('active').html('关注');
    numElm.html(numElm.html() - 0 - 1);
  } else {
    $(this).addClass('active').html('已关注');
    numElm.html(numElm.html() - 0 + 1);
    $.dialog.common(attentionTipsTpl.render());
  }
});

// 分页
$('[data-selector="pager-count"]', $root).pagerBar();
// 点击地图
const gdMap = $('[data-selector="gdmap"]', $root);
if (gdMap && gdMap.length) {
  const compDq = $.trim(gdMap.attr('data-city'));
  const compAddress = $.trim(gdMap.attr('data-address'));
  if (compAddress && compAddress !== '') {
    gdMap.gdmap({
      address: compAddress,
      city: compDq,
      width: '100%',
      height: '20em',
    });
  }
}
// 点击地址，展现和关闭地图
const $lookMap = $('[data-selector="address"]', $root);
$lookMap.on('tap', () => {
  gdMap.toggleClass('map-hidden');
});
// 点击箭头展开收起
const $profile = $('.company-profile', $root);
$('[data-selector="more-desc-info"]', $root).on('click', function () {
  const isFold = $profile.hasClass('ellipsis-4');
  const $this = $(this);
  if (isFold) {
    $profile.removeClass('ellipsis-4');
    $('.text-icon', $this).attr('class', 'text-icon icon-up');
  } else {
    $profile.addClass('ellipsis-4');
    $('.text-icon', $this).attr('class', 'text-icon icon-down');
  }
});
// 工商信息
const $businessInfo = $('.business-info ul', $root);
if ($businessInfo.height() > 64) {
  $businessInfo.addClass('short-info');
}
$('[data-selector="more-business-info"]', $root).on('click', function () {
  const $this = $(this);
  if (!LT.User.isLogin) {
    const url = window.location.href;
    window.location.href = `/register/?imscid=R000011110&return_url=${encodeURIComponent(url)}`;
  } else {
    const isMore = $businessInfo.hasClass('short-info');
    if (isMore) {
      $businessInfo.removeClass('short-info');
      $('.text-icon', $this).attr('class', 'text-icon icon-up');
    } else {
      $businessInfo.addClass('short-info');
      $('.text-icon', $this).attr('class', 'text-icon icon-down');
    }
  }
});

// 卡片式点击特殊处理
$('[data-selector="card-link"]', $root).on('tap', function () {
  const $jobTitle = $(this).find('.job-title');
  const linkHref = $jobTitle.attr('href');
  const dataPromid = $jobTitle.attr('data-promid');
  $jobTitle.trigger('click');
  window.location.href = `${linkHref}${linkHref.indexOf('?') > 0 ? '&' : '?'}${dataPromid}`;
});
// 企业评论
let curPage = 1;
const compId = window.$CONFIG.compId || 3627;
const commentList = $('[data-selector="comment-list"]', $root);
commentList.on('click', '[data-selector="more-btn"]', function () {
  $(this).parent().html($(this).parent().attr('data-content'));
});
$('[data-selector="comment-more"]', $root).on('click', function () {
  const $this = $(this);
  $.ajax({
    url: '/compcomment/list.json',
    type: 'POST',
    dataType: 'json',
    data: {
      type: 1,
      curPage,
      compId,
    },
    success(data) {
      if (data.flag === 1) {
        curPage++;
        const result = data.data;
        if (!result.hasNextPage) {
          $this.parent().remove();
        }
        let html = '';
        const showStar = (count) => range(5).reduce((star, item) => `${star}<i class="text-icon icon-collected ${item < count && 'active' || ''}"/>`, '');
        result.list.forEach((val) => {
          html += `<li>
                     <div class="list-tool clearfix">
                       <p class="list-name">'}${val.userName}</p>
                       <p class="list-score">${val.sorce.toFixed(1)}${showStar(val.sorce)}</p>
                     </div>
                     <div class="comment-info">${val.title}</div>
                     <div class="comment-content" data-content="${val.content}">
                       ${val.showContent}${LT.User.isLogin && val.hasMoreContent ? '<a data-selector="more-btn" href="javascript:;">更多</a>' : ''}
                     </div>
                     ${!LT.User.isLogin && val.hasMoreContent ? (`<div class="reg-main"><span><a href="/register/?return_url=${window.location.href}">注册</a>丨<a href="/login/?url=${window.location.href}">登录</a></span>后查看完整内容</div>`) : ''}
                   </li>`;
        });
        commentList.append(html);
      }
    },
  });
});
// 写评论
$('[data-selector="comment-btn"]', $root).on('click', function () {
  if (!LT.User.isLogin) {
    if (LT.User.is_lp_user) {
      window.location.href = `/login/?url=${window.location.href}`;
    } else {
      window.location.href = `/register/?return_url=${window.location.href}`;
    }
    return false;
  }
  const $this = $(this);
  if ($this.attr('disabled-click')) {
    $.dialog.toast('您的评论次数超过上限，请勿重复提交');
    return false;
  }
  $.ajax({
    url: '/compcomment/canadd.json',
    data: {
      type: 1,
      compId,
    },
    type: 'POST',
    dataType: 'json',
    success(data) {
      if (data.flag === 1) {
        if (data.data.canAdd) {
          writeComments.open({
            data: {
              compId,
              compName: $CONFIG.compName,
              type: 1,
            },
            success() {
              $.dialog.message('提交成功，等待审核… ', 3);
            },
          });
        } else {
          $this.attr('disabled-click', true);
          $.dialog.toast('您的评论次数超过上限，请勿重复提交');
        }
      }
    },
  });
});
// 推荐企业
(function () {
  const recommendList = $('[data-selector="recommend-company-list"]', $root);
  const recommendListA = recommendList.find('.company-card ');
  const recommendListLen = Math.ceil(recommendListA.length / 4);
  let elmIndex = 0;
  let changeIndex = 0;
  const changeBtn = $('[data-selector="btn-change-company"]', $root);
  if (recommendListA.length <= 4) {
    changeBtn.hide();
    return false;
  }
  function doMove() {
    recommendListA.hide();
    recommendList.find(`[data-elmIndex="${changeIndex}"]`).show();
  }
  recommendListA.each(function (ind) {
    $(this).attr('data-elmIndex', elmIndex);
    ind % 4 === 3 && elmIndex++;
  });
  changeBtn.on('click', () => {
    changeIndex++;
    if (changeIndex >= recommendListLen) {
      changeIndex = 0;
    }
    doMove();
  });
  doMove();
}());
(function () {
  // 推荐职位换一换
  const recommendList = $('[data-selector="recommend-list"]');
  const recommendListA = recommendList.find('.item');
  const recommendListLen = Math.ceil(recommendListA.length / 5);
  let elmIndex = 0;
  let changeIndex = 0;
  const changeBtn = $('.change-btn');
  function doMove() {
    recommendListA.hide();
    recommendList.find(`[data-elmIndex="${changeIndex}"]`).show();
  }
  if (recommendListA.length <= 5) {
    changeBtn.hide();
    return false;
  }
  recommendListA.each(function (ind) {
    $(this).attr('data-elmIndex', elmIndex);
    ind % 5 === 4 && elmIndex++;
  });
  changeBtn.on('tap', () => {
    changeIndex++;
    if (changeIndex >= recommendListLen) {
      changeIndex = 0;
    }
    doMove();
  });
  doMove();
}());

// 拉新浮层
recruitLayer();

// 内链模块tab切换
hotLinkInit();
