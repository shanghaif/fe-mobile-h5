/**
 * https://m.liepin.com/registerresume/toedituserbaseinfo/
 */
import '@liepin/zepto-valid';
import navSet from '@liepin/zepto-nav';

import domain from '@liepin/native-domain-fe';
import emailArr from '../../lib/dict/email';
import DatePicker from '../../components/business/react-datepicker-4ES';
import './index.css';

window.$CONFIG = window.$CONFIG || {};
const $form = $('[data-selector="form"]');
const $user = $('[data-selector="user-email"]', $form);
const $countdown = $('[data-selector="countdown"]', $form).addClass('suggest-main');
const $inputResult = $('.select-result', $form);
const $workYear = $('[name="sysResumeForm.workYear"]', $form);
const $birth = $('[name="sysResumeForm.birthYear"]', $form);
const $birthResult = $('[data-selector="birth-year"] .select-result', $form);
const $workResult = $('[data-selector="start-work"] .select-result', $form);



let statusFlag = false;
// 导航左右图标
navSet({
  leftIcon: 'noicon',
  rightIcon: 'noicon',
});
$inputResult.each(function () {
  if (!$(this).text() === '请选择') {
    $(this).removeClass('placeholder');
  }
});
// 选择性别
$('.gender', $form).on('click', function () {
  const $this = $(this);
  $('em.active', $this).removeClass('active').siblings('em').addClass('active');
  const sexValue = $('em.active', $this).html() === '男' ? 1 : 2;
  const $radio = $(`input[value="${sexValue}"]`, $this);
  $radio.attr('checked', 'checked').siblings('[name="sysResumeForm.sex"]').removeAttr('checked');
  return false;
});
// 初始默认值
const birthday = $birth.val();
const workYear = $workYear.val();
function dateIsEmpty(date) {
  return !date || date.trim() === '' || date.trim() === '请选择';
}

if (birthday !== '' && workYear !== '') {
  $birthResult.text(`${birthday.substr(0, 4)}.${birthday.substr(4, 2)}.${birthday.substr(6, 2)}`).removeClass('placeholder');
  $('[data-selector="start-work"] .select-result').text(workYear).removeClass('placeholder');
}
const birthdayComp = new DatePicker({
  title: '出生日期',
  defaultValue: dateIsEmpty(birthday) ? '19910101' : birthday,
  format: 'yyyyMMdd',
  onChange(val) {
    if (val) {
      $birth.val(val);
      const result = val.replace(/^(\d{4})(\d{2})(\d{2})$/, (...arg) => `${arg[1]}.${arg[2]}.${arg[3]}`);
      $birthResult.text(result).removeClass('placeholder');
    } else {
      $birth.val('');
      $birthResult.text('请选择').addClass('placeholder');
    }
  },
});
// 选择出生年份
$('[data-selector="birth-year"]', $form).on('click', function () {
  birthdayComp.render({ visible: true });
});

const workYearComp = new DatePicker({
  title: '开始工作年份',
  defaultValue: dateIsEmpty(workYear) ? (dateIsEmpty(birthday) ? '2013' : parseInt(birthday.substring(0, 4), 10) + 22) : workYear,
  format: 'yyyy',
  onChange(val) {
    if (val) {
      $workYear.val(val);
      $workResult.text(val).removeClass('placeholder');
    } else {
      $workYear.val('');
      $workResult.text('请选择').addClass('placeholder');
    }
  },

});
// 选择开始工作年份
$('[data-selector="start-work"]').on('click', function () {
  workYearComp.render({ visible: true });
});
// 输入手机或邮箱
$user.on('input focus', function () {
  const val = $(this).val();
  if (/@/.test(val)) {
    const emailBefore = val.split('@')[0];
    const emailAfter = val.split('@').slice(1, 2);
    let html = '';
    $.each(emailArr, (i, v) => {
      if (v.indexOf(emailAfter) >= 0) {
        html += `<li data-name="${emailBefore}@${v}"><span>+</span>${emailBefore}@${v}</li>`;
      } else {
        $countdown.hide();
      }
    });
    html && $countdown.show().html(html);
  } else {
    $countdown.hide();
  }
}).on('blur', () => {
  $countdown.hide();
});
// 点击联想词
$countdown.on('tap', 'li', function () {
  const $this = $(this);
  const thisText = $this.data('name');
  $user.val(thisText);
  setTimeout(() => {
    $countdown.hide();
  }, 320);
});

// 选择城市
const defaultText = '<i class="default-text">请选择</i>';
const $selectCity = $('[data-selector="current-city"]');

if ($selectCity.size()) {
  const $cityResult = $('.select-result', $selectCity);
  const $cityCode = $('[name="sysResumeForm.city"]', $selectCity);
  const cityValue = $cityCode.val();
  cityValue === '' && $cityResult.html(defaultText);
  import(/* webpackChunkName: "city-async" */'@liepin/react-city-h5/src/City4Native').then(function ({ default: City4Native }) {
    const cityComp = new City4Native({
      max: 1,
      value: cityValue ? [cityValue] : [],
      onChange(vals = [], result = []) {
        const newVal = vals ? vals[0] : '';
        const oldValue = $cityCode.val();
        if (oldValue === newVal) {
          return;
        }
        if (newVal) {
          $cityCode.val(newVal);
          result[0] && $cityResult.html(result[0].name).removeClass('placeholder');
        } else {
          $cityCode.val(newVal);
          $cityResult.html(defaultText).addClass('placeholder');
        }
        cityComp.hide();
      },
    });
    $selectCity.on('click', () => cityComp.show());
  });
}

$('[data-selector="workexp-close"]').on('click', () => {
  window.location.href = domain('m');
});
$('[data-selector="eduexp-close"]').on('click', () => {
  window.location.href = domain('m');
});
// 表单验证
if (!$CONFIG.isShowEmail) {
  statusFlag = true;
}
$form.valid({
  scan(data) {
    if (!data.valid) {
      $.dialog.toast(data.firstError.customErrorMsg);
    }
    if ($('[name="workExpForm.startDate"]', $form).val() > $('[name="workExpForm.endDate"]', $form).val() || $('[name="eduExpForm.startDate"]', $form).val() > $('[name="eduExpForm.endDate"]', $form).val()) {
      $.dialog.toast('结束时间不能大于开始时间！');
      data.valid = false;
    }
  },
  dyncheck: {
    cnName() {
      const $this = $(this);
      const reg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+){0,3}$/;
      const val = $.trim($(this).val());

      let isvalid = true;
      let errorText = '';
      if (!reg.test(val)) {
        isvalid = false;
        errorText = '请填写正确格式的姓名';
      } else if (val.split('·').join('').length < 2) {
        isvalid = false;
        errorText = '姓名长度不能小于2个汉字';
      } else if (val.split('·').join('').length > 15) {
        isvalid = false;
        errorText = '姓名长度不能大于15个汉字';
      }
      return {
        element: $this,
        valid: isvalid,
        customErrorMsg: errorText,
      };
    },
  },
  success() {
    function checklogin() {
      $.ajax({
        url: `${domain('passport')}/account/individual/v1/checklogin.json`,
        data: { login: $('[name="sysResumeForm.email"]', $form).val() },
        dataType: 'jsonp',
        success(data) {
          if (data.data.status) {
            const url = `${domain('passport')}/forgetpwd/m/v1/index`;
            const goUrl = `${domain('passport')}/v1/logout?rdurl=${encodeURIComponent(url)}`;
            $.dialog({
              title: false,
              className: 'email-tips',
              top: '0',
              width: '100%',
              borderRadius: false,
              contentPadding: '10px',
              mask: false,
              showWay: 'top',
              animatSpeed: 1000,
              content: `<div class="tips clearfix"><span class="float-left">邮箱已被注册</span><a href="${goUrl}" class="float-right">立即找回&gt;</a></div>`,
            });
          } else {
            // 验证通过
            statusFlag = true;
            $form.submit();
          }
        },
      });
    }
    if (statusFlag) {
      return true;
    }
    checklogin();
    return false;
  },
});
$(document).on('click', () => {
  const timer = setTimeout(() => {
    $('.email-tips').remove();
    clearTimeout(timer);
  }, 1000);
});
$('.btn-submit').on('click', (event) => {
  event.stopPropagation();
});
// 下拉联想
const compName = $('[name="sysResumeForm.company"]', $form);
let xhrComp = null;
let compTimer = null;
compName.on('input', function () {
  $('[data-selector="suggest-company"]').remove();
  xhrComp && xhrComp.abort();
  const key = $(this).val().trim();
  clearTimeout(compTimer);
  if (key) {
    compTimer = setTimeout(() => {
      xhrComp = $.ajax({
        url: '/company/suggest.json',
        type: 'GET',
        data: `keyword=${key}`,
        dataType: 'json',
        success(data) {
          if (data.flag === 1) {
            let html = '';
            data.data.slice(0, 7).forEach((val) => {
              html += `<dd data-name="${val}"><span>+</span>${val}</dd>`;
            });
            if (html) {
              html = `<dl data-selector="suggest-company" class="suggest-main">${html}</dl>`;
              compName.parent().append(html);
            }
          }
        },
      });
    }, 200);
  }
}).on('blur', () => {
  setTimeout(() => {
    $('[data-selector="suggest-company"]').remove();
  }, 400);
});
compName.parent().on('click', 'dd', function () {
  compName.val($(this).data('name'));
});
// 职位
const jobName = $('[name="sysResumeForm.title"]', $form);
let xhrJob = null;
let jobTimer = null;
jobName.on('input', function () {
  $('[data-selector="suggest-job"]').remove();
  xhrJob && xhrJob.abort();
  const key = $(this).val().trim();
  clearTimeout(jobTimer);
  if (key) {
    jobTimer = setTimeout(() => {
      xhrJob = $.ajax({
        url: `${domain('m-c')}/resume/matchtitle.json`,
        type: 'GET',
        data: `key=${key}`,
        dataType: 'jsonp',
        success(data) {
          if (data.flag === 1) {
            let html = '';
            data.data.list.slice(0, 7).forEach((val) => {
              html += `<dd data-name="${val.titleName}"><span>+</span>${val.titleName}</dd>`;
            });
            if (html) {
              html = `<dl data-selector="suggest-job" class="suggest-main">${html}</dl>`;
              jobName.parent().append(html);
            }
          }
        },
      });
    }, 200);
  }
}).on('blur', () => {
  setTimeout(() => {
    $('[data-selector="suggest-job"]').remove();
  }, 400);
});
jobName.parent().on('click', 'dd', function () {
  jobName.val($(this).data('name'));
});
