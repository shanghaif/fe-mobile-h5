/**
 * 企业搜索主页
 * https://m.liepin.com/company/
 */
import '@liepin/zepto-back-top';
import navSet from '@liepin/zepto-nav';
import userInfo from '@liepin/zepto-user-info';
import '@liepin/zepto-input-search';
import companyKind from '@liepin/dict-collect-h5/company-kind';

import './index.css';
import hotLinkInit from '../../components/ui/hotlink/tab.hotlink'; // 底部热门Tab
import recruitLayer from '../../components/ui/recruit/recruit.layer';

const $root = $('body');
const conditionTitle = $('.condition-title');
const $linkArea = $('.link-area', conditionTitle);
const linkIndustry = $('.link-industry', conditionTitle);
const linkNature = $('.link-nature', conditionTitle);
let cityComp;
let industryComp;
let natureComp;


// 头部右侧为搜索
navSet({
  rightText: '<i class="text-icon icon-search"/>',
  rightEvent() {
    window.location.href = '/company/so/';
  },
});
// 初始化回到顶部插件
$root.backTop();

// 点击筛选设置search 记录默认状态
function setSearch(keyword) {
  window.location.href = `/company/so/?dqs=${
    $linkArea.attr('data-value')
  }&industrys=${
    linkIndustry.attr('data-value')
  }&ecomp_kinds=${
    linkNature.attr('data-value')
  }${keyword ? `&keyword=${keyword}` : ''}`;
}
function ldData(selectEle, defaultValue = '000', unlimited, extendData = {}) {
  return {
    top: '94px',
    bottom: '0',
    width: '100%',
    maskCss: { top: '94px' },
    hideEnd() {
      selectEle.removeClass('opened');
    },
    selected(value, text) {
      const dataValue = selectEle.attr('data-value');
      let unlimitedText = text;
      if (text === '不限') {
        unlimitedText = unlimited;
      }
      selectEle.html(`${unlimitedText}<i/>`).attr('data-value', value);
      setTimeout(() => selectEle.trigger('tap'), 320);
      selectEle.html().indexOf('不限') === -1
        ? selectEle.addClass('text-warning')
        : selectEle.removeClass('text-warning');
      value !== dataValue && setSearch();
    },
    defaultValue,
    ...extendData,
  };
}

import(/* webpackChunkName: "city-async" */'@liepin/react-city-h5/src/City4Native').then(function ({ default: City4Native }) {
  cityComp = new City4Native({
    value: [],
    max: 1,
    onChange(vals = [], result = []) {
      const oldValue = $linkArea.attr('data-value');
      if (oldValue === vals[0]) {
        return;
      }
      $linkArea.attr('data-value', vals[0]);
      $linkArea.html(`${result[0] && result[0].name || ''}</i>`);
      setSearch();
      cityComp.hide();
    },
  });
  $linkArea.on('click', () => {
    cityComp.show();
    industryComp.hide();
    natureComp.hide();
  });
});

industryComp = localdata('.link-industry', ldData(linkIndustry, linkIndustry.attr('data-value'), '行业不限', { name: 'industry' }));
natureComp = localdata('.link-nature', { ...ldData(linkNature, linkNature.attr('data-value'), '性质不限'), extendData: companyKind });
// 搜索公司
$('[data-selector="search-input"]').searchInput({
  type: 'company',
  backButtonCallback() {
    cityComp.hide();
    industryComp.hide();
    natureComp.hide();
  },
  goButtonCallback({ value, searchType }) {
    searchType === 'job'
      ? (window.location.href = `/zhaopin/?keyword=${encodeURIComponent(value)}`)
      : setSearch(encodeURIComponent(value));
  },
});
// 下拉筛选

function foldUnfold(curContent, thisObj) {
  const contentArr = [industryComp, natureComp];
  window.scrollTo(0, 0);
  if (thisObj.hasClass('opened')) {
    curContent.hide();
  } else {
    contentArr.forEach((arrVal) => arrVal.hide());
    thisObj
      .addClass('opened')
      .parent()
      .siblings()
      .find('a')
      .removeClass('opened');
    setTimeout(() => curContent.show(), 20);
  }
}

linkIndustry.on('click', function () {
  foldUnfold(industryComp, $(this));
});
linkNature.on('click', function () {
  foldUnfold(natureComp, $(this));
});

userInfo.init('[data-selector="users-btn"]');
// 返回顶部
$root.backTop();

// 面包屑处理
$('[data-selector="crumbs-link"]').insertBefore('#inner-link').show();

// 全部行业展开收起
$('[data-selector="pull-content"]').on('tap', function () {
  const $this = $(this);
  if ($this.prev().hasClass('hide-content')) {
    setTimeout(() => {
      $this.prev().removeClass('hide-content');
      $this.children('span').text('收起').siblings('i').removeClass('icon-down')
        .addClass('icon-up');
    }, 320);
  } else {
    setTimeout(() => {
      $this.prev().addClass('hide-content');
      $this.children('span').text('展开').siblings('i').removeClass('icon-up')
        .addClass('icon-down');
    }, 320);
  }
});
// 拉新浮层
recruitLayer();
// 内链模块tab切换
hotLinkInit();
