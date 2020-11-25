/**
 * 企业黄页
 * https://m.liepin.com/companylist/
 */
import '@liepin/zepto-dialog';
import '@liepin/zepto-pagerBar';
import '@liepin/zepto-write-comments';
import navSet from '@liepin/zepto-nav';
import staticCity from '@liepin/static-city';
import staticIndustry from '@liepin/static-industry';

import './index.css';
import recruitLayer from '../../components/ui/recruit/recruit.layer'; // 拉新浮层
import recommendChange from '../../components/business/job/recommend.job.change'; // 拉新浮层
import noRealhotLinkInit from '../../components/ui/hotlink/tab.hotlink'; // 非真实的底部热链

navSet();
const $root = $('body');
const topBar = $('.topbar', $root);
const filterBox = $('.filter-box', topBar);
const cityLabel = $('[data-selector="city"]', filterBox);
const industryLabel = $('[data-selector="industry"]', filterBox);
const compkindLabel = $('[data-selector="compkind"]', filterBox);
const compscaleLabel = $('[data-selector="compscale"]', filterBox);
const $citySelect = $('#static-city');
const $industrySelect = $('#static-industry');
// 性质选择
compkindLabel.on('click', function (e) {
  const content = $(this).siblings('ul');
  if ($(this).hasClass('active')) {
    if (content.is(':visible')) {
      $(this).addClass('selected');
      content.hide();
    } else {
      $(this).removeClass('selected');
      content.show();
    }
  } else if (content.is(':visible')) {
    $(this).removeClass('active');
    content.hide();
  } else {
    $(this).addClass('active');
    content.show();
  }
  compscaleLabel.siblings('ul').hide();
  $citySelect.hide();
  $industrySelect.hide();
  if (cityLabel.hasClass('selected')) {
    cityLabel.removeClass('opened');
  } else {
    cityLabel.removeClass('active opened');
  }
  if (industryLabel.hasClass('selected')) {
    industryLabel.removeClass('opened');
  } else {
    industryLabel.removeClass('active opened');
  }
  if (!compscaleLabel.hasClass('selected')) {
    compscaleLabel.removeClass('active');
  }
  e.stopPropagation();
});
// 规模选择
compscaleLabel.on('click', function (e) {
  const content = $(this).siblings('ul');
  if ($(this).hasClass('selected')) {
    if (content.is(':visible')) {
      $(this).removeClass('selected');
      content.hide();
    } else {
      content.show();
    }
  } else if (content.is(':visible')) {
    $(this).removeClass('active');
    content.hide();
  } else {
    $(this).addClass('active');
    content.show();
  }
  compkindLabel.siblings('ul').hide();
  $industrySelect.hide();
  $citySelect.hide();
  if (cityLabel.hasClass('selected')) {
    cityLabel.removeClass('opened');
  } else {
    cityLabel.removeClass('active opened');
  }
  if (industryLabel.hasClass('selected')) {
    industryLabel.removeClass('opened');
  } else {
    industryLabel.removeClass('active opened');
  }
  if (!compkindLabel.hasClass('selected')) {
    compkindLabel.removeClass('active');
  }
  e.stopPropagation();
});

// 筛选条件是否为空 检测
function filterCheckEmpty() {
  const cityVal = $('[name="city"]').val();
  const industryVal = $('[name="industry"]').val();
  if (cityVal !== '000') {
    cityLabel.addClass('active selected');
  }
  if (industryVal !== '000') {
    industryLabel.addClass('active selected');
  }
}
filterCheckEmpty();
// 地区 - 筛选选择框
let staticIndustryItem = null;

staticCity('#static-city', $('[name="city"]').val(), () => {
  topBar.removeClass('fixed');
  cityLabel.removeClass('opened active selected');
  filterCheckEmpty();
});

cityLabel.on('click', function (e) {
  window.scrollTo(0, 0);
  if ($(this).hasClass('opened')) {
    if ($('[data-selector="cancel-static-city"]').length) {
      $('[data-selector="cancel-static-city"]').trigger('click');
    } else {
      $citySelect.hide();
    }
  } else {
    $(this).addClass('opened active').removeClass('selected');
    // MoreSelectOptions.hide();
    $industrySelect && $industrySelect.hide();
    if (industryLabel.hasClass('selected')) {
      industryLabel.removeClass('opened');
    } else {
      industryLabel.removeClass('active opened');
    }
    if (!compkindLabel.hasClass('selected')) {
      compkindLabel.removeClass('active');
    }
    if (!compscaleLabel.hasClass('selected')) {
      compscaleLabel.removeClass('active');
    }
    compkindLabel.siblings('ul').hide();
    compscaleLabel.siblings('ul').hide();
    setTimeout(() => $citySelect.show(), 20);
  }
  e.stopPropagation();
});
// 行业

// var staticIndustry = require("../../static/js/static_industry.js");
staticIndustryItem = staticIndustry('#static-industry', $('[name="industry"]').val(), () => {
  topBar.removeClass('fixed');
  industryLabel.removeClass('opened active selected');
});
industryLabel.on('click', function (e) {
  window.scrollTo(0, 0);
  if ($(this).hasClass('opened')) {
    if ($('[data-selector="cancel-static-industry"]').length) {
      $industrySelect.hide();
      $(this).addClass('active selected').removeClass('opened');
    } else {
      $(this).addClass('opened active').removeClass('selected');
      $industrySelect.hide();
    }
  } else {
    $(this).addClass('opened active').removeClass('selected');
    $citySelect && $citySelect.hide();
    if (cityLabel.hasClass('selected')) {
      cityLabel.removeClass('opened');
    } else {
      cityLabel.removeClass('active opened');
    }
    if (!compkindLabel.hasClass('selected')) {
      compkindLabel.removeClass('active');
    }
    if (!compscaleLabel.hasClass('selected')) {
      compscaleLabel.removeClass('active');
    }
    compscaleLabel.siblings('ul').hide();
    compkindLabel.siblings('ul').hide();
    setTimeout(() => {
      $industrySelect.show();
      staticIndustryItem && staticIndustryItem.refresh();
    }, 20);
  }
  e.stopPropagation();
});
$root.on('click', () => {
  compkindLabel.siblings('ul').hide();
  compscaleLabel.siblings('ul').hide();
});
$('[data-selector="more-img"]', $root).on('tap', function () {
  if ($(this).closest('.filter-item').hasClass('short')) {
    $(this).closest('.filter-item').removeClass('short');
    $(this).html('<i class="text-icon icon-up">');
  } else {
    $(this).closest('.filter-item').addClass('short');
    $(this).html('<i class="text-icon icon-down">');
  }
});
// 推荐企业
(function () {
  const recommendList = $('.recommend-company-list', $root);
  const recommendListA = recommendList.find('.company-card ');
  const recommendListLen = Math.ceil(recommendListA.length / 4);
  let elmIndex = 0;
  let changeIndex = 0;
  function doMove() {
    recommendListA.hide();
    recommendList.find(`[data-elmIndex="${changeIndex}"]`).show();
  }
  const changeBtn = $('[data-selector="btn-change-company"]', $root);
  if (recommendListA.length <= 4) {
    changeBtn.hide();
    return false;
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

// 推荐职位换一换
recommendChange();
// 拉新浮层
recruitLayer();
// 分页
$('[data-selector="pager-count"]', $root).pagerBar();

$(() => {
  noRealhotLinkInit();
});
