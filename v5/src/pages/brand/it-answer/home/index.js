import domain from '@liepin/native-domain-fe';
import { jobLink, maxChance, getShareCount, priceLink } from '../modules/common';

import '../style/common.less';
import './index.less';

const { location } = window;
const $body = $('body');

if (getShareCount() > maxChance) {
  $('[data-selector="dyn-cnt"]').html('<div class="finish-desc"></div><a href="javascript:;" class="luck-draw-btn" data-selector="price-link">偷看其他奖品</a><a href="javascript:;" class="luck-draw-btn" data-selector="console-link">领份安慰奖</a>');
} else {
  $('[data-selector="dyn-cnt"]').html('<div class="start-desc" data-selector="start-desc"></div><div class="rule-desc" data-selector="rule-desc"></div><a href="javascript:;" class="luck-draw-btn" data-selector="start-link">开始测试</a>');
  $('[data-selector="dyn-title"]').html('<a href="javascript:;" data-selector="rule-link">活动规则</a>');
}
$body
  .on('click', '[data-selector="rule-link"]', function () {
    // 页面内容替换为规则
    $('[data-selector="start-desc"]', $body).hide();
    $('[data-selector="rule-desc"]', $body).show();
  })
  .on('click', '[data-selector="start-link"]', function () {
    // 开始答题
    location.replace(`${domain('m')}/brand/it-answer/question/`);
  })
  .on('click', '[data-selector="price-link"]', function () {
    location.replace(priceLink);
  })
  .on('click', '[data-selector="job-link"]', function () {
    location.replace(jobLink);
  })
  .on('click', '[data-selector="console-link"]', function () {
    location.replace(`${domain('m-vas')}/view-diagnosis/`);
  });
