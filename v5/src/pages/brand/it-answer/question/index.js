import domain from '@liepin/native-domain-fe';
import { rasieShareCount, maxChance, getShareCount } from '../modules/common';

import { successTpl, failTpl } from './modules/tpls';

import '../style/common.less';
import './index.less';

const { $CONFIG, Apps: { isTd }, location } = window;
if (getShareCount() >= maxChance) {
  // 已使用全部机会，跳首页展示无机会
  location.replace(`${domain('m')}/brand/it-answer/home/`);
}
const numbers = ['一', '二', '三', '四', '五'];
const $body = $('body');
const $tplWap = $('[data-selector="tpl-wrap"]', $body);
const $process = $('[data-selector="current-process"]', $body);
const $submit = $('[data-selector="submit-btn"]', $body);
const $answers = $('[data-selector="answer-wrap"]', $body);
const $answerTitle = $('[data-selector="answer-title"]', $body);
const $questionIndex = $('[data-selector="question-index"]', $body);
const { questionFormList } = $CONFIG;
let curIndex = 0;
const maxIndex = 4;
let answer = '';
const keys = ['A', 'B', 'C'];

function renderHtml() {
  const current = questionFormList[curIndex];
  $process.html(curIndex + 1);
  $questionIndex.html(numbers[curIndex]);
  $answerTitle.html(current.title);
  $answers.html(current.options.map((item, index) => (`<div class="answer-item" data-selector="answer-item" data-ans="${index}">
    <div class="answer-nesting-item first-item"></div>
    <div class="answer-nesting-item second-item"></div>
    <div class="answer-nesting-item third-item"></div>
    <div class="answer-nesting-item final-item">
      <p class="flex-1 ellipsis-1">${keys[index]}. ${item}</p>
      <i class="simulation-radio"></i>
    </div>
  </div>`)).join(''));
}
function goNext() {
  answer = '';
  if (curIndex >= maxIndex) {
    // 最后一题跳抽奖页
    location.replace(`${domain('m')}/brand/it-answer/lottrey-entry/`);
  } else {
    curIndex += 1;
    renderHtml();
    $tplWap.html('');
  }
}
function goSkip() {
  $.ajax({
    url: '/brand/it-answer/skip.json',
  });
}
renderHtml();
// 答题
$submit.on('click', function () {
  if ($submit.hasClass('muted') || !answer) {
    return false;
  }
  $submit.addClass('muted').html('提交中...');
  const current = questionFormList[curIndex];
  $.ajax({
    url: '/brand/it-answer/answer.json',
    data: {
      id: current.id,
      answer: answer | 0,
    },
    type: 'POST',
    success({ flag, msg, data }) {
      $submit.removeClass('muted').html('确定');
      if (flag === 1) {
        const { answerCorrect } = data;
        if (answerCorrect) {
          // 回答正确
          $tplWap.html(successTpl({
            desc: current.interpretationMessage,
            last: curIndex >= maxIndex,
          }));
        } else if (getShareCount() >= maxChance) {
          rasieShareCount();
          // 已使用全部机会，跳首页展示无机会
          location.replace(`${domain('m')}/brand/it-answer/home/`);
        } else {
          rasieShareCount();
          $tplWap.html(failTpl({
            first: !isTd && getShareCount() === 1,
            lastQuestion: curIndex >= maxIndex,
          }));
        }
      } else {
        $.dialog.toast(msg);
      }
    },
    error() {
      $submit.removeClass('muted').html('确定');
      $.dialog.toast('请稍后重试');
    },
  });
});

$body
  .on('click', '[data-selector="next-link-app"]', function () {
    goSkip();
    goNext();
  })
  .on('click', '[data-selector="next-link-right"]', function () {
    goNext();
  })
  .on('click', '[data-selector="answer-item"]', function () {
    const className = 'active';
    const $this = $(this);
    if (!$this.hasClass(className)) {
      $this.addClass(className).siblings().removeClass(className);
      answer = $this.attr('data-ans');
    }
  });
