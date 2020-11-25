/**
 * https://m.liepin.com/company/gs10004114/
 */
import '@liepin/zepto-map';
import '@liepin/zepto-dialog';
import '@liepin/zepto-pagerBar';
import '@liepin/zepto-back-top';
import comments from '@liepin/zepto-write-comments';
import navSet from '@liepin/zepto-nav';
import appMask from '@liepin/zepto-app-mask';
import { range } from '../../lib/lambda/lambda';
import './index.css';
// todo 拉新浮层和底部热链貌似都没有
import recruitLayer from '../../components/ui/recruit/recruit.layer'; // 拉新浮层
import hotLinkInit from '../../components/ui/hotlink/tab.hotlink';
import initMap from '../../components/ui/baidu.map';
import initRecommendJobChange from '../../components/business/job/recommend.job.change';
import initRecommendCompany from './modules/recommend.company';
import { getThrottle, get } from '../../lib/ajax';
import isFromAlipay from '../../components/business/app/alipay';

navSet();

const $root = $('body');
const $win = $(window);
const $fixedTab = $('[data-selector="fixed-tab"]', $root);
const mainTop = $('.info-box', $root).offset().top;
// 招聘职位seo特殊处理
$('[data-selector="company-tab"]', $root).append($('[data-selector="special-info"]', $root));
$win.on('load scroll', function () {
  if ($win.scrollTop() > mainTop) {
    $fixedTab.addClass('show');
  } else if ($win.scrollTop() === 0) {
    $fixedTab.removeClass('show');
  }
});
// app引导下浮层
if (!LT.Cookie.get('app-mask')) {
  // 京东金融
  if (
    isFromAlipay()
    || (
      LT.Cookie.get('__tlog')
      && LT.Cookie.get('__tlog').split('|').pop() === 'jd_rz_02'
      || LT.String.getQuery('mscid') === 's_o_m10'
    )
  ) {
    // donothing
  } else {
    appMask();
  }
}
$('[data-selector="icon-close"]').on('tap', function () {
  $('.swiper-module').remove();
  LT.Cookie.set('app-mask', 'yes', 1, '/', window.location.hostname);
});
// 关注
const numElm = $('.follow-count i', $root);
$('[data-selector="add-favorite"]').on('tap', function () {
  const $this = $(this);
  if (!LT.User.isLogin) {
    window.location.href = `/login/?url=${window.location.href}`;
    return;
  }
  if ($this.hasClass('active')) {
    $this.removeClass('active').html('关注');
    numElm.html(numElm.html() - 1);
  } else {
    $this.addClass('active').html('已关注');
    numElm.html((numElm.html() | 0) + 1);
  }
});
// tab切换
const companyInfoDetail = $('.company-info-detail', $root);
const hotJobsMain = $('.hot-jobs-main', $root);
const tabs = $('.company-tab a', $root);

tabs.on('click', function () {
  tabs.removeClass('active');
  $(this).addClass('active');
  const ind = $(this).index();
  if (ind === 0) {
    companyInfoDetail.show();
    hotJobsMain.hide();
  } else {
    companyInfoDetail.hide();
    hotJobsMain.show();
  }
});
// 分页
$('[data-selector="pager-count"]', $root).pagerBar();
// 初始化地图
initMap();
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
const businessInfoHeight = $businessInfo.height();
if (businessInfoHeight > 64) {
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

// 链接seo特殊处理
$('[data-selector="return-url"]', $root).on('click', function () {
  return false;
});
// 卡片式点击特殊处理
$('[data-selector="card-link"]', $root).on('tap', function () {
  const $this = $(this);
  const linkHref = $this.find('.job-title').attr('href');
  const dataPromid = $this.find('.job-title').attr('data-promid');
  $this.find('.job-title').trigger('click');
  const seq = linkHref.indexOf('?') > 0 ? '&' : '?';
  window.location.href = `${linkHref}${seq}${dataPromid}`;
});

// 企业评论
let curPage = 1;
const compId = window.$CONFIG.compId || 3627;
const commentList = $('[data-selector="comment-list"]', $root);
commentList.on('click', '[data-selector="more-btn"]', function () {
  const $parent = $(this).parent();
  $parent.html($parent.attr('data-content'));
});
const getMoreCompany = get(`${LT.Env.mRoot}/compcomment/list.json`);
$('[data-selector="comment-more"]', $root).on('click', function () {
  const $this = $(this);
  getMoreCompany({
    data: { type: 1, curPage, compId },
    success(data) {
      if (data.flag === 1) {
        curPage++;
        const result = data.data;
        if (!result.hasNextPage) {
          $this.parent().remove();
        }
        let html = '';
        const showStar = (count) => range(5).reduce((star, item) => `${star}<i class="text-icon icon-collected ${item < count && 'active' || ''}"/>`, '');
        result.list.forEach(function (val) {
          html += `
            <li>
              <div class="list-tool clearfix">
                  <p class="list-name">${val.userName}</p>
                  <p class="list-score">${val.sorce.toFixed(1)}${showStar(val.sorce)}</p>
                </div>
                <div class="comment-info">${val.title}</div>
                <div class="comment-content" data-content="${val.content}">
                  ${val.showContent}
                  ${LT.User.isLogin && val.hasMoreContent ? '<a data-selector="more-btn" href="javascript:;">更多</a>' : ''}
                </div>
                ${!LT.User.isLogin && val.hasMoreContent ? (`<div class="reg-main"><span><a href="/register/?return_url=${window.location.href}">注册</a>丨<a href="/login/?url=${window.location.href}">登录</a></span>后查看完整内容</div>`) : ''}
            </li>
          `;
        });
        commentList.append(html);
      }
    },
  });
});

// 写评论
const getCanAdd = get(`${LT.Env.mRoot}compcomment/canadd.json`);
$('[data-selector="comment-btn"]', $root).on('click', function () {
  if (!LT.User.isLogin) {
    window.location.href = LT.User.is_lp_user
      ? `/login/?url=${window.location.href}`
      : `/register/?return_url=${window.location.href}`;
    return false;
  }
  const $this = $(this);
  if ($this.attr('disabled-click')) {
    $.dialog.toast('您的评论次数超过上限，请勿重复提交');
    return false;
  }
  getCanAdd({
    data: { type: 1, compId },
    success({ flag, data }) {
      if (flag === 1) {
        if (data.canAdd) {
          comments.open({
            data: {
              compId,
              compName: window.$CONFIG.compName,
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

// 初始化推荐企业
initRecommendCompany();
// 推荐职位换一换
initRecommendJobChange();

// 在招职位搜索
const $selectResult = $('[data-selector="select-result"]', $root);
const $selectList = $('[data-selector="select-list"]', $root);
const $selectLi = $selectList.find('li');
const $keyInput = $('[data-selector="key-input"]', $root);
const $searchBtn = $('[data-selector="search-btn"]', $root);
const $jobNum = $('[data-selector="job-num"]', $root);
const $jobTips = $('.job-tips', $root);
const $btnMore = $('[data-selector="btn-more"]', $root);
const $pagerBar = $('[data-selector="pager-box"]', $root);
const $arrow = $selectResult.find('i');
$selectResult.on('click', function () {
  $selectList.toggle();
  $arrow.toggleClass('active');
});
$selectLi.on('click', function () {
  const selectVal = $(this).text();
  $selectResult.find('b').text(selectVal);
  $selectList.hide();
});

function getHtml(data) {
  let html = '';
  if (!data.list.length) {
    $btnMore.hide();
    $jobTips.hide();
    return `<li class="no-result-list">
        <p>暂无推荐职位</p>
        <a href="/zhaopin/">查看更多职位>></a>
      </li>
    `;
  }
  $btnMore.show();
  $jobTips.show();
  $jobNum.text(data.totalCount);

  if (data.totalCount === 0) {
    $jobTips.hide();
    html += '<li class="tips">暂无符合条件职位，已为您推荐相关职位</li>';
  }
  data.list.forEach(function (val) {
    html += `<li data-selector="card-link">
               <h3><a href="${val.url}" class="job-title">${val.title}</a></h3>
               <p>
                 <label>${val.city}|${val.workYear}</label>
                 <span>${val.salary}<i class="text-icon icon-go-ahead"/></span>
               </p>
            </li>`;
  });
  if (data.totalCount === 0) {
    $btnMore.hide();
    html += `<li class="link-more"><a href="/zhaopin/?keyword=${data.keyword}&dqs=${data.cityCode}">查看更多在招职位>></a></li>`;
  }
  return html;
}
function toAjax() {
  let dq = $selectResult.find('b').text();
  const keyWords = $keyInput.val();
  if (dq === '工作地') {
    dq = '';
  }
  $.ajax({
    url: '/grabjob/sojob.json',
    type: 'post',
    dataType: 'json',
    data: {
      dq,
      keywords: keyWords,
      compId,
    },
    cache: false,
    success(data) {
      if (data.flag === 1) {
        $pagerBar.remove();
        $('.job-box').html(getHtml(data.data));
      }
    },
  });
}
$searchBtn.on('click', function () {
  toAjax();
  $('.suggest').hide();
});
// 联想
const sugestJob = getThrottle(`${LT.Env.mRoot}job/suggest.json`, 200);
$keyInput.on('input', function () {
  const keyword = $(this).val();
  sugestJob({
    data: { keyword },
    success({ flag, data }) {
      if (flag === 1) {
        let list = '<ul>';
        $.each(data, function (index, value) {
          list += `<li><span>${value}</span></li>`;
        });
        list += '</ul>';
        $('.suggest').html(list).show();
      }
    },
  });
});
$win.on('touchmove', function () {
  $('.suggest').hide();
});
// 回车搜索
$keyInput.on('keydown', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    $searchBtn.trigger('click');
  }
});
$root.on('click', '.suggest li', function () {
  $keyInput.val($(this).text());
  $searchBtn.trigger('click');
});
// 点击加载更多
curPage = 1;
const getMore = get(`${LT.Env.mRoot}grabjob/sojob.json`);
$btnMore.on('click', function () {
  let dq = $selectResult.find('b').text();
  const keywords = $keyInput.val();
  if (dq === '工作地') {
    dq = '';
  }
  getMore({
    data: {
      dq,
      keywords,
      compId,
      curPage,
    },
    success({ flag, data }) {
      if (flag === 1) {
        curPage++;
        if (curPage === data.totalPage) {
          $btnMore.remove();
        }
        let html = '';
        data.list.forEach(function (val) {
          html += `<li data-selector="card-link">
                     <h3><a href="'}${val.url}" class="job-title">${val.title}</a></h3>
                     <p>
                       <label>${val.city}|${val.workYear}</label>
                       <span>${val.salary}<i class="text-icon icon-go-ahead"/></span>
                     </p>
                   </li>`;
        });
        $('.job-box').append(html);
        $('[data-selector="pager-box"]').remove();
      }
    },
  });
});
// 拉新浮层
recruitLayer();
// 内链模块tab切换
hotLinkInit();
