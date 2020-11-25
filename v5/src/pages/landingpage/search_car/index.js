/**
 * 落地页
 * https://m.liepin.com/landingpage/search_car.shtml
 */
import '@liepin/zepto-dialog';
import domain from '@liepin/native-domain-fe';

import './index.css';
import { jsonData, ganxingqu } from './modules/data';
import searchJob from '../modules/search.job';

const $root = $('body');
const clientHeight = parseInt(document.documentElement.clientHeight, 10);
const bodyfont = 32 * clientHeight / 960;
document.documentElement.style.fontSize = `${bodyfont}px`;

// 判断用户是否登录，已登录跳首页
if (LT.User.isLogin) {
  window.location.href = domain('m');
}
// tab切换数据填充

let html = '';
jsonData.forEach((val) => {
  html += '<div class="tab-content" data-selector="tab-content">';
  html += '<div class="flexbox items">';
  val.data.forEach((dataVal, ind) => {
    html += `
      <a href="javascript:;" class="flex-1" title="${dataVal[0]}" data-jobId="${dataVal[4]}">
        <img src="${dataVal[1]}" class="company-logo">
        <div class="company-info">
          <p class="job-name">${dataVal[2]}</p>
          <p class="job-salary">${dataVal[3]}</p>
        </div>
      </a>
    `;
    if (ind % 2 === 1 && ind !== 9) {
      html += '</div>';
      html += '<div class="flexbox items">';
    } else if (ind === 9) {
      html += '</div>';
      html += '</div>';
    }
  });
});
html += '</div>';
$('[data-selector="content-box"]', $root).html(html);
const $tab = $('[data-selector="tab"] a', $root);
const $tabContent = $('[data-selector="tab-content"]', $root);
const $contentBox = $('[data-selector="content-box"]', $root);
let index = 0;
let go = null;
let lock = true;
const wHeight = $(window).height();
if (wHeight < 510) {
  $tabContent.css({
    height: '170px',
    overflow: 'hidden',
  });
  $contentBox.css({ height: '140px' });
} else if (wHeight > 620) {
  $contentBox.css({ height: '280px' });
}
// 轮播

function roll() {
  $tab.removeClass('active');
  $tab.eq(index).addClass('active');
  $tabContent.css({
    opacity: 0,
    'z-index': 1,
  });
  $tabContent.eq(index).css({
    opacity: 1,
    'z-index': 2,
  });
}
function playRoll() {
  // var callee = arguments.callee;
  if (lock) {
    go = setTimeout(() => {
      index++;
      index > 4 && (index = 0);
      roll();
      playRoll();
    }, 3000);
  }
}
playRoll();
$tab.on('tap', function () {
  index = $(this).index();
  roll();
  if (lock) {
    clearTimeout(go);
    lock = false;
  }
});

// 点击logo弹窗
$('[data-selector="tab-content"]').on('tap', '.items a', function () {
  clearTimeout(go);
  const jobId = $(this).attr('data-jobId');
  $.ajax({
    url: '/landingpage/getjobinfo.json',
    type: 'post',
    dataType: 'json',
    data: { jobId },
    cache: false,
    success(data) {
      if (data.flag === 1) {
        if (data.data) {
          let boonHtml = '';
          if (data.data.tags && data.data.tags.length) {
            if (data.data.tags.length === 0) {
              data.data.tags.forEach((val) => {
                boonHtml += `<span class = "boon">${val}</span>`;
              });
            } else {
              boonHtml += '<span class = "boon">五险一金</span><span class = "boon">带薪年假</span>';
            }
          } else {
            boonHtml += '<span class = "boon">五险一金</span><span class = "boon">带薪年假</span>';
          }
          $.dialog({
            className: 'show',
            content: `
              <div class="info-mask">
                <div class="job-info clearfix">
                  <a href="/register/?sfrom=landingpage" class="clearfix">
                    <span class="job">${data.data.ejob_title}</span><span class="salary">${data.data.ejob_salary}</span>
                  </a>
                  <p>${data.data.ejob_edulevel_name} | ${data.data.ejob_workyears_name} | ${data.data.age_name}</p>
                </div>
                <div class="company-info">
                  <a href="/register/?sfrom=landingpage" class="company-link clearfix">
                    <img src="${data.data.ecomp_logo}" class="logo">
                    <span class="company-name">${data.data.ecomp_name}</span>
                  </a>
                  <p class="boon-box">${boonHtml}</p>
                </div>
                <div class="link-box"><a href="/register/?sfrom=landingpage" class="btn-login">注册查看更多信息</a></div>
              </div>
            `,
            showWay: 'bottom',
            title: false,
            closeIcon: true,
            maskTapClose: true,
            bottom: '0',
            top: 'auto',
            width: '100%',
            borderRadius: false,
            animatSpeed: 300,
          });
        }
      }
    },
  });
});

// 搜索职位
searchJob($('[data-selector="btn-search"]', $root), ganxingqu);
// 返回按钮
$('[data-selector="back-box"]', $root).on('click', function () {
  $(this).hide();
  $('[data-selector="login-mask-box"]').hide();
  $('[data-selector="search-list"]', $root).hide();
  $('[data-selector="company-content"]', $root).show();
});
