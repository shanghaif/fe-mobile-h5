/*
 * 链接 https://m.liepin.com/company/so/
 */
// import localdata, { localdataCity } from '@liepin/zepto-localdata';
import companyKind from '@liepin/dict-collect-h5/company-kind';
import { curry } from '../../../lib/lambda/lambda';

let setSearch;
const comps = [];
const $searchInput = $('[data-selector="search-input"]');
function compHide() {
  comps.forEach(comp => comp.hide());
}

// 搜索公司
$searchInput.searchInput({
  type: 'company',
  placeholder: '请输入公司名称',
  backButtonCallback: compHide,
  goButtonCallback({ value, searchType }) {
    const companyHref = `/company/so/?${setSearch()}`;
    window.location.href = (searchType === 'job') ? `/zhaopin/?keyword=${encodeURIComponent(value)}` : companyHref;
  },
});

function ldData(data, $selectEle) {
  return {
    ...data,
    top: '94px',
    bottom: '0',
    width: '100%',
    maskCss: { top: '94px' },
    hideEnd() {
      $selectEle.removeClass('opened');
    },
    selected(value) {
      if (value === $selectEle.attr('data-value')) {
        return;
      }
      $selectEle.attr('data-value', value || '000');
      window.location.search = setSearch();
    },
    defaultValue: $selectEle.attr('data-value') || '000',
  };
}
function foldUnfold(curContent, thisObj) {
  window.scrollTo(0, 0);
  if (thisObj.hasClass('opened')) {
    curContent.hide();
  } else {
    compHide();
    thisObj.addClass('opened')
      .parent().siblings()
      .find('a')
      .removeClass('opened');
    setTimeout(() => curContent.show(), 20);
  }
}

function init(search, { component, selector, callback, data = {} }) {
  const $ele = $(selector);
  const defaultVal = $ele.attr('data-value');
  const localData = component(selector, ldData(data, $ele));
  $ele.on('click', () => foldUnfold(localData, $ele));
  if (defaultVal && defaultVal !== '000') {
    const curText = callback(localData.selectedVal);
    $ele.addClass('text-warning').html(`<span>${curText}</span><i/>`);
  }
  comps.push(localData);
  return search($ele);
}

let cityComp;

const localDataArr = [
  {
    component: localdata,
    selector: '.link-industry',
    callback: (data) => (data.sub[1]),
    data: {
      name: 'industry',
    },
  },
  {
    component: localdata,
    selector: '.link-nature',
    callback: (data) => (data[1]),
    data: {
      extendData: companyKind,
    },
  },
];

function generateSearch($linkArea, $linkIndustry, $linkNature) {
  return () => `dqs=${
    $linkArea.attr('data-value')
  }&industrys=${
    $linkIndustry.attr('data-value')
  }&ecomp_kinds=${
    $linkNature.attr('data-value')
  }&keyword=${
    encodeURIComponent($searchInput.val())
  }`;
}

const $linkArea = $('.link-area');
setSearch = curry(generateSearch)($linkArea);
import(/* webpackChunkName: "city-async" */'@liepin/react-city-h5/src/City4Native').then(function ({ default: City4Native }) {
  const defaultValue = $linkArea.attr('data-value') || '';
  cityComp = new City4Native({
    value: defaultValue ? [defaultValue] : [],
    max: 1,
    onChange(vals = [], result = []) {
      const oldValue = $linkArea.attr('data-value');
      if (oldValue === vals[0]) {
        return;
      }
      $linkArea.attr('data-value', vals[0]);
      $linkArea.addClass('text-warning').html(`<span>${result[0] && result[0].name || ''}</span><i/>`);
      cityComp.hide();
      window.location.search = setSearch();
    },
  });

  if (defaultValue) {
    const item = cityComp.getCityById(defaultValue);
    if (item) {
      $linkArea.addClass('text-warning').html(`<span>${item[0]}</span><i/>`);
    }
  }

  $linkArea.on('click', () => {
    compHide();
    cityComp.show();
  });
});

// 点击筛选设置search 记录默认状态
setSearch = localDataArr.reduce(init, setSearch);

