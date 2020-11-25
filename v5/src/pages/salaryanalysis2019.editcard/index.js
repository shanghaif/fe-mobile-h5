/*
 * https://m.liepin.com/salaryanalysis2019/editcard/
 * 2019-12-09 需求方：杨诺
 */
import '@liepin/zepto-dialog';
import '@liepin/zepto-valid';
import domain from '@liepin/native-domain-fe';
import datepicker from '@liepin/zepto-datepicker';
import emailArr from '../../lib/dict/email';

import './index.css';

const $form = $('[data-selector="form"]');
const $user = $('[data-selector="user-email"]', $form);
const $countdown = $('[data-selector="countdown"]', $form).addClass('suggest-main');
const emailInput = $('[data-selector="user-email"]', $form);

// 选择性别
$('.gender', $form).on('click', function () {
  const $this = $(this);
  $('em.active', $this).removeClass('active').siblings('em').addClass('active');
  const sexValue = $('em.active', $this).html() === '男' ? '男' : '女';
  const $radio = $(`input[value="${sexValue}"]`, $this);
  $radio.prop('checked', true).siblings('[name="sex"]').removeAttr('checked');
  return false;
});
// 初始默认值
$(function () {
  const birthYear = $('[name="birthYear"]', $form).val();
  const workYear = $('[name="workYear"]', $form).val();
  if (birthYear && workYear) {
    $('[data-selector="birth-year"] .select-result').html(birthYear).removeClass('placeholder');
    $('[data-selector="start-work"] .select-result').html(workYear).removeClass('placeholder');
  }
});
// 选择出生年份
$('[data-selector="birth-year"]', $form).on('click', function () {
  const $this = $(this);
  const curY = new Date().getFullYear();
  const birthResult = $('.select-result', $this).html();
  const birthY = birthResult.trim() === '' || birthResult.trim() === '请选择' ? '1990' : birthResult;
  datepicker.open({
    dateFormat: 'YYYY',
    defaultValue: birthY,
    tonow: false,
    success(result) {
      $('[name="birthYear"]', $this).val(result.year).trigger('blur');
      $('.select-result', $this).html(result.year).removeClass('placeholder');
      let workYear = parseInt(result.year, 10) + 22;
      workYear = workYear > curY ? curY : workYear;
      const $startWork = $('[data-selector="start-work"]', $form);
      const workResult = $('.select-result', $startWork).html().trim();
      if (workYear && (workResult === '' || workResult === '请选择')) {
        $('[name="workYear"]', $startWork).val(workYear);
        $('.select-result', $startWork).html(workYear).removeClass('placeholder');
      }
    },
  });
});
// 选择开始工作年份
$('[data-selector="start-work"]').bind('click', function () {
  const $this = $(this);
  const workResult = $('.select-result', $this).html();
  const workY = workResult.trim() === '' ? '2012' : workResult;
  datepicker.open({
    dateFormat: 'YYYY',
    defaultValue: workY,
    tonow: false,
    success(result) {
      $('[name="workYear"]', $this).val(result.year);
      $('.select-result', $this).html(result.year).removeClass('placeholder');
    },
  });
});
// 输入手机或邮箱
$user.on('input focus', function () {
  const val = $(this).val();
  if (/@/.test(val)) {
    const emailBefore = val.split('@')[0];
    const emailAfter = val.split('@').slice(1, 2);
    let html = '';
    $.each(emailArr, function (i, v) {
      if (v.indexOf(emailAfter) >= 0) {
        html += `<li data-name="${emailBefore}@${v}"><span>+</span>${emailBefore}@${v}</li>`;
      } else {
        $countdown.hide();
      }
    });
    !!html && $countdown.show().html(html);
  } else {
    $countdown.hide();
  }
}).on('blur', function () {
  $countdown.hide();
});
// 点击联想词
$countdown.on('click', 'li', function () {
  const $this = $(this);
  const thisText = $this.data('name');
  $user.val(thisText);
  setTimeout(function () {
    $countdown.hide();
  }, 320);
});
// 选择城市
const currentCity = $('[data-selector="current-city"]', $form).find('.select-result');
if (!(currentCity.text() === '请选择')) {
  currentCity.removeClass('placeholder');
}
import(/* webpackChunkName: "city-async" */'@liepin/react-city-h5/src/City4Native').then(function ({ default: City4Native }) {
  const $dq = document.querySelector('[name="dq"]');
  const $curCity = document.querySelector('[data-selector="current-city"]');
  const city = new City4Native({
    max: 1,
    value: $dq.value ? [$dq.value] : [],
    onChange(vals = [], result = []) {
      $dq.value = vals[0] || '';
      currentCity.html(result[0] && result[0].name || '');
      city.hide();
    },
  });
  $curCity.addEventListener('click', function () {
    city.show();
  }, false);
});
// 初始默认值
$(function () {
  const endDateVal = $('[name="eduExpForm.endDate"]', $form).val();
  const endDateText = endDateVal === '9999-99' ? '至今' : endDateVal;
  $('.edu-start-date', $form).html($('[name="eduExpForm.startDate"]', $form).val());
  $('.edu-end-date', $form).html(endDateText);
});
// 表单验证
let statusFlag = false;
$form.valid({
  scan(data) {
    if (!data.valid) {
      $.dialog.toast(data.firstError.customErrorMsg);
    }
  },
  success() {
    if (statusFlag) {
      return true;
    }
    const $email = $('[name="email"]', $form);
    if ($email.length) {
      $.ajax({
        url: `${domain('passport')}/account/individual/v1/checklogin.json`,
        data: { login: $email.val() },
        dataType: 'jsonp',
        success(data) {
          if (data.data.status) {
            $.dialog.toast('电子邮箱已存在');
          } else {
            // 验证通过
            statusFlag = true;
            $form.submit();
          }
        },
      });
    } else {
      statusFlag = true;
      $form.submit();
    }
    return false;
  },
});
if (emailInput.val()) {
  emailInput.addClass('disabled').attr('readonly', 'readonly');
} else {
  emailInput.addClass('disabled').removeAttr('readonly');
}
