/**
 * 落地页
 * https://m.liepin.com/landingpage/search_position.shtml
 */
import '@liepin/zepto-dialog';
import domain from '@liepin/native-domain-fe';
import './index.css';
import { tipsData, testArray } from './modules/data';
import searchJob from '../modules/search.job';

const clientHeight = parseInt(document.documentElement.clientHeight, 10);
const bodyfont = 32 * clientHeight / 960;
document.documentElement.style.fontSize = `${bodyfont}px`;
// 判断用户是否登录，已登录跳首页
if (LT.User.isLogin) {
  window.location.href = domain('m');
}
const wHeight = $(window).height();
const internetShortImg = require('./images/internet_short.png');
const financeShortImg = require('./images/finance_short.png');
const buildingShortImg = require('./images/building_short.png');
const consumerShortImg = require('./images/consumer_short.png');
const carShortImg = require('./images/car_short.png');
const medicalShortImg = require('./images/medical_short.png');
const internetImg = require('./images/internet.png');
const financeImg = require('./images/finance.png');
const buildingImg = require('./images/building.png');
const consumerImg = require('./images/consumer.png');
const carImg = require('./images/car.png');
const medicalImg = require('./images/medical.png');

const images = ['internet', 'finance', 'building', 'consumer', 'car', 'medical'];
const imageSrcs = {
  internetShortImg,
  financeShortImg,
  buildingShortImg,
  consumerShortImg,
  carShortImg,
  medicalShortImg,
  internetImg,
  financeImg,
  buildingImg,
  consumerImg,
  carImg,
  medicalImg,
};
function imgChangeSrc(name, src) {
  $(`img[src='//s.lietou-static.com/fe-mobile-h5/v5/static/images/pages/event/search/${name}.png']`)
    .attr('src', src);
}
if (wHeight < 570) {
  $('.content-box').css({
    height: '260px',
    'padding-bottom': '0',
  });
  images.forEach(name => imgChangeSrc(name, imageSrcs[`${name}ShortImg`]));
} else if (wHeight > 570 && wHeight < 700) {
  $('.content-box').css({
    height: '240px',
    ' padding-bottom': '0',
    'margin-bottom': '50px',
  });
  images.forEach(name => imgChangeSrc(name, imageSrcs[`${name}ShortImg`]));
} else if (wHeight > 700) {
  $('.content-box').css({
    height: '240px',
    'margin-bottom': '50px',
  });
  images.forEach(name => imgChangeSrc(`${name}_short`, imageSrcs[`${name}Img`]));
}
// tab切换数据填充
const $root = $('body');
const $tab = $('[data-selector="tab"] a', $root);
const $tabContent = $('[data-selector="tab-content"]', $root);
const $keyword = $('[data-selector="keyword"]');
let index = 0;
let go = null;

// 模拟输入动画
const cursorImg = require('./images/cursor.gif');

const searchAnimate = {
  animateHtml: $(`<div id="search-animate"><span/><img src="${cursorImg}" /></div>`),
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
  show(elm, textArray, lock, tabIndex) {
    if (!elm || !textArray || !textArray.length || elm.is(':focus') || elm.val().length > 0 || !$('[data-selector="company-content"]').is(':visible')) {
      return false;
    }
    this.destroy();
    this.elm = elm;
    this.textArray = textArray;
    this.lock = lock;
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

searchAnimate.show($keyword, testArray[0]);
$keyword.on('focus', () => {
  searchAnimate.destroy();
});

const searchTipsHtml = $('<div data-selector="search-tips" class="search-tips"></div>');
searchTipsHtml.on('click', 'p', function () {
  $keyword.val($(this).html());
  $('[data-selector="btn-search"]', $root).trigger('tap');
});
$('[data-selector="btn-search"]', $root).addClass('pulse');

let lock = true;
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
$('[data-selector="tab-content"]').on('tap', () => {
  window.location = '/register/?sfrom=landingpage';
});
/*
 *搜索部分
 */
searchJob($('[data-selector="btn-search"]', $root));
// 返回按钮
$('[data-selector="back-box"]', $root).on('click', function () {
  $(this).hide();
  $('[data-selector="login-mask-box"]').hide();
  $('[data-selector="search-list"]', $root).hide();
  $('[data-selector="company-content"]', $root).show();
});

