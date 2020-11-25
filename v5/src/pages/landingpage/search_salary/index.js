/**
 * 落地页
 * https://m.liepin.com/landingpage/search_salary.shtml
 */
import '@liepin/zepto-dialog';
import domain from '@liepin/native-domain-fe';
import './index.css';
import { jsonData, ganxingqu, testArray, tipsData } from './modules/data';
import searchJob from '../modules/search.job';

const clientHeight = parseInt(document.documentElement.clientHeight, 10);
const bodyfont = 32 * clientHeight / 960;
document.documentElement.style.fontSize = `${bodyfont}px`;

// 判断用户是否登录，已登录跳首页
if (LT.User.isLogin) {
  window.location.href = domain('m');
}
const $root = $('body');
// tab切换数据填充

let contentHtml = '';
jsonData.forEach((val) => {
  contentHtml += '<div class="tab-content" data-selector="tab-content">';
  contentHtml += '<div class="flexbox items">';
  val.data.forEach((dataVal, ind) => {
    contentHtml += `
      <a href="javascript:;" class="flex-1" title="${dataVal[5]}" data-companyId="${dataVal[1]}">
        <img src="${dataVal[2]}" class="company-logo">
        <div class="company-info">
          <p class="job-name">${dataVal[3]}</p>
          <p class="job-salary">${dataVal[4]}</p>
        </div>
      </a>
    `;
    if (ind % 2 === 1 && ind !== 9) {
      contentHtml += '</div>';
      contentHtml += '<div class="flexbox items">';
    } else if (ind === 9) {
      contentHtml += '</div>';
      contentHtml += '</div>';
    }
  });
});
contentHtml += '</div>';
$('[data-selector="content-box"]', $root).html(contentHtml);

const $tab = $('[data-selector="tab"] a', $root);
const $tabContent = $('[data-selector="tab-content"]', $root);
const $contentBox = $('[data-selector="content-box"]', $root);
let index = 0;
let go = null;
let lock = true;
// iPhone4 里少显示两行
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
// 模拟输入动画
const cursorGif = require('./images/cursor.gif');

const searchAnimate = {
  animateHtml: $(`<div id="search-animate"><span></span><img src="${cursorGif}" /></div>`),
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
  show(elm, textArray, innerLock, tabIndex) {
    if (!elm || !textArray || !textArray.length || elm.is(':focus') || elm.val().length > 0 || !$('[data-selector="company-content"]').is(':visible')) {
      return false;
    }
    this.destroy();
    this.elm = elm;
    this.textArray = textArray;
    this.lock = innerLock;
    if (tabIndex) {
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
    (function startAnimate() {
      // var args = arguments;
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
      that.animateTimer = setTimeout(() => {
        startAnimate();
      }, 400);
    }());
  },
};

const $keyword = $('[data-selector="keyword"]');
searchAnimate.show($keyword, testArray[0]);
$keyword.on('focus', () => {
  searchAnimate.destroy();
});

const searchTipsHtml = $('<div data-selector="search-tips" class="search-tips"></div>');
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
  let html = '';
  htmlData.forEach((val, ind) => {
    if (ind % 3 === 0) {
      html += '<div class="tips-item flexbox">';
    }
    html += `<p class="flex-1 ${val.isHot ? 'hot' : ''}">${val.value}</p>`;
    if (ind % 3 === 2) {
      html += '</div>';
    }
  });
  searchTipsHtml.html(html).show();
}
searchTipsHtml.on('click', 'p', function () {
  $keyword.val($(this).html());
  $('[data-selector="btn-search"]', $root).trigger('tap');
});
$('[data-selector="btn-search"]', $root).addClass('pulse');
$keyword.after(searchTipsHtml).on('focus input', function () {
  if ($(this).val()) {
    searchTipsHtml.hide();
  } else {
    fillFn();
  }
}).on('blur', () => {
  setTimeout(() => {
    searchTipsHtml.hide();
  }, 500);
});

// 点击页面其他部分出发输入框失去焦点
$('.view').on('click', () => {
  $keyword.blur();
});
$keyword.on('click', (ev) => {
  ev.stopPropagation();
});
// 轮播
let time = 3000;
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
    go = setTimeout(() => {
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
    clearTimeout(go);
    lock = false;
  }
  roll();
});

// 点击logo弹窗
$('[data-selector="tab-content"]').on('tap', '.items a', () => {
  window.location = '/register/?sfrom=landingpage';
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
// 规避UC浏览器下浮层问题
if ((navigator.userAgent.indexOf('UCBrowser') > -1) && (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1)) {
  $root.css({
    height: $(window).height(),
    'overflow-y': 'scroll',
  });
}
