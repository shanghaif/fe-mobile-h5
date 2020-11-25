/**
 * 落地页
 * https://m.liepin.com/landingpage/search.shtml
 */
import '@liepin/zepto-dialog';
import domain from '@liepin/native-domain-fe';
import './index.css';
import { jsonData, ganxingqu, tipsData } from './modules/data';
import initSlide from './modules/init.slide';
import searchJob from '../modules/search.job';
import { get } from '../../../lib/ajax';

const $root = $('body');
const clientHeight = parseInt(document.documentElement.clientHeight, 10);
const bodyfont = 32 * clientHeight / 960;
document.documentElement.style.fontSize = `${bodyfont}px`;
// 初始化轮播
initSlide(jsonData);
// 判断用户是否登录，已登录跳首页
if (LT.User.isLogin) {
  window.location.href = domain('m');
}

const $tab = $('[data-selector="tab"] a', $root);
const $tabContent = $('[data-selector="tab-content"]', $root);
const $contentBox = $('[data-selector="content-box"]', $root);
const $keyword = $('[data-selector="keyword"]', $root);
let index = 0;
let timer = null;
let lock = true;
// iPhone4 里少显示两行
const wHeight = $(window).height();
if (wHeight < 510) {
  $tabContent.css({
    height: '130px',
    overflow: 'hidden',
  });
  $contentBox.css({ height: '90px' });
} else if (wHeight > 620) {
  $contentBox.css({ height: '205px' });
}
const cursorGif = require('./images/cursor.gif');
// 模拟输入动画
const searchAnimate = {
  animateHtml: $(`<div id="search-animate"><span/><img src="${cursorGif}" /></div>`),
  animateTimer: null,
  loopTimer: null,
  placeholder: '',
  textArray: [],
  elm: '',
  lock: false,
  loopArrayInd: 0,
  destroy() {
    this.loopArrayInd = 0;
    clearTimeout(this.animateTimer);
    clearTimeout(this.loopTimer);
    this.elm && this.elm.attr('placeholder', this.placeholder);
    this.animateHtml.remove();
  },
  show(elm, textArray, showLock, tabIndex) {
    if (!elm || !textArray || !textArray.length || elm.is(':focus') || elm.val().length > 0 || !$('[data-selector="company-content"]').is(':visible')) {
      return false;
    }
    this.destroy();
    this.elm = elm;
    this.textArray = textArray;
    this.lock = showLock;
    if (tabIndex !== undefined) {
      this.loopArrayInd = tabIndex;
    }
    const $elm = $(elm);
    const parent = $elm.parent();
    const { left, top } = $elm.position();
    this.placeholder = $elm.attr('placeholder');
    $elm.removeAttr('placeholder');
    this.animateHtml.css({
      left,
      top,
      position: 'absolute',
      'line-height': '22px',
      color: '#999',
    }).appendTo(parent);
    let loopArray = [];
    if (typeof (this.textArray) === 'string') {
      loopArray.push(this.textArray);
    } else {
      loopArray = this.textArray;
    }
    this.loopArray = loopArray;
    this.loopFn();
  },
  loopFn() {
    const loopArrayLen = this.loopArray.length;
    this.doAnimate(this.loopArray[this.loopArrayInd]);
    this.loopArrayInd++;
    if (this.loopArrayInd >= loopArrayLen) {
      this.loopArrayInd = 0;
    }
  },
  doAnimate(text) {
    const that = this;
    that.animateHtml.find('span').html('');
    clearTimeout(that.animateTimer);
    const wordArray = text.split('');
    wordArray.unshift('');
    const len = wordArray.length;
    let ind = 0;
    (function go() {
      that.animateHtml.find('span').append(wordArray[ind]);
      if (ind >= len) {
        if (that.lock) {
          that.loopTimer = setTimeout(() => {
            that.loopFn();
          }, 1000);
        }
        return false;
      }
      ind++;
      that.animateTimer = setTimeout(go, 400);
    }());
  },
};
const testArray = [
  ['JAVA工程师', '产品经理', 'IOS工程师'],
  ['投资经理', '审计经理', '客户经理'],
  ['结构工程师', '建筑设计师', '项目经理'],
  ['品牌总监', '市场经理', '活动策划'],
  ['电气工程师', '售前顾问', '自动化工程师'],
  ['机械工程师', '研发经理', '结构设计'],
];
searchAnimate.show($keyword, testArray[0]);
$keyword.on('focus', () => searchAnimate.destroy());

const searchTipsHtml = $('<div data-selector="search-tips" class="search-tips"></div>');
searchTipsHtml.on('click', 'p', function () {
  $keyword.val($(this).html());
  $('[data-selector="btn-search"]', $root).trigger('tap');
});
$('[data-selector="btn-search"]', $root).addClass('pulse');
function fillFn() {
  if (!$('[data-selector="company-content"]').is(':visible')) {
    return false;
  }
  let htmlData = null;
  if (lock) {
    htmlData = tipsData.defaultData;
  } else {
    htmlData = tipsData.industryData[index];
  }
  let tipsItemHtml = '';
  htmlData.forEach((val, ind) => {
    if (ind % 3 === 0) {
      tipsItemHtml += '<div class="tips-item flexbox">';
    }
    tipsItemHtml += `<p class="flex-1 ${val.isHot ? 'hot' : ''}">${val.value}</p>`;
    if (ind % 3 === 2) {
      tipsItemHtml += '</div>';
    }
  });
  searchTipsHtml.html(tipsItemHtml).show();
}
$keyword.after(searchTipsHtml).on('focus input', function () {
  $(this).val() ? searchTipsHtml.hide() : fillFn();
}).on('blur', () => setTimeout(() => searchTipsHtml.hide(), 500));

// 点击页面其他部分出发输入框失去焦点
$('.view').on('click', () => $keyword.blur());
$keyword.on('click', (ev) => ev.stopPropagation());
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
  let tabIndex = $tab.eq(index).data('tab-index') ? $tab.eq(index).data('tab-index') : 0;
  if (!lock) {
    tabIndex = 0;
  }
  searchAnimate.show($keyword, testArray[index], !lock, tabIndex);
  tabIndex++;
  if (tabIndex > 2 || !lock) {
    tabIndex = 0;
  }
  $tab.eq(index).data('tab-index', tabIndex);
}
let time = 3000;
function playRoll() {
  if (index === 0) {
    time = 4000;
  } else if (index === 1) {
    time = 3500;
  } else {
    time = 3000;
  }
  // var callee = arguments.callee;
  if (lock) {
    timer = setTimeout(() => {
      index++;
      index > 5 && (index = 0);
      roll();
      playRoll();
    }, time);
  }
}

$tab.eq(0).data('tab-index', 1);
playRoll();
$tab.on('tap', function () {
  index = $(this).index();
  if (lock) {
    clearTimeout(timer);
    lock = false;
  }
  roll();
});

// 点击logo弹窗
const getCompInfo = get(`${LT.Env.mRoot}landingpage/getcompinfo.json`);
$tabContent.on('tap', '.items a', function () {
  clearTimeout(timer);
  lock = false;
  const companyId = $(this).attr('data-companyid');
  getCompInfo({
    data: { companyId },
    success(data) {
      if (data.flag === 1) {
        let jobItemHtml = '';
        if (data.data.joblist && data.data.joblist.length) {
          data.data.joblist.forEach((val) => {
            jobItemHtml += `
              <p class="clearfix">
                <a href="/register/?sfrom=landingpage" class="job-name">${val.ejob_title}</a>
                <span class="job-salary">${val.ejob_salary}</span>
              </p>
            `;
          });
        }
        let boonhtml = '';
        if (data.data.ecompTags && data.data.ecompTags.length) {
          if (data.data.ecompTags.length === 0) {
            boonhtml += '<span class = "boon">五险一金</span><span class = "boon">带薪年假</span>';
          } else {
            data.data.ecompTags.forEach((val) => {
              boonhtml += `<span class = "boon">${val}</span>`;
            });
          }
        } else {
          boonhtml += '<span class = "boon">五险一金</span><span class = "boon">带薪年假</span>';
        }
        $.dialog({
          className: 'show',
          content: `
            <div class="info-mask">
              <a href="/register/?sfrom=landingpage">
                <img src= "${data.data.ecomp_logo}" class="company-logo "/>
              </a>
              <h3 title="${data.data.company_name}">${data.data.company_name}</h3>
              <p class="boon-box clearfix">${boonhtml}</p>
              <div class="job-box">${jobItemHtml}</div>
              <div class ="link-box">
                <a href="/register/?sfrom=landingpage" class="btn-login">注册查看更多信息</a>
              </div>
            </div>
          `,
          title: false,
          closeIcon: true,
          maskTapClose: true,
          bottom: '0',
          top: 'auto',
          width: '100%',
          borderRadius: false,
          showWay: 'bottom',
        });
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

