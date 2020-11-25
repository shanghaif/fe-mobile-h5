/**
 * 登录
 * https://m.liepin.com/login/?url=https://m.liepin.com/anqing/
 */
import '@liepin/zepto-valid';
import { loginByAccount } from '@liepin/native-login-api-fe';
import EMAIL_LIST from '../../lib/dict/email';
import nextBtnHighLight from '../../components/ui/next.btn.highlight';
import stringUtil from '../../lib/utils/string';
import { cRoot } from '../../lib/utils/domain';

import './index.less';

// 表单验证
const $form = $('form');
const $userInput = $('[data-selector="username"]', $form);
const $emailWrap = $('[data-selector="emails"]', $form);
const $passwordInput = $('[data-selector="password"]', $form);
const $clearInputBtn = $('[data-selector="username-close"]', $form);
const $visiblePasswordBtn = $('[data-selector="visible"]', $form);
const $sumitBtn = $('[data-selector="submit-btn"]', $form);

const iconNewCloseClass = '.icon-new-close';
const iconEyeOpen = 'icon-new-eye';
const iconEyeOpenClass = `.${iconEyeOpen}`;
const iconEyeClose = 'icon-new-eye-close';
const iconEyeCloseClass = `.${iconEyeClose}`;
let blurTimer;

// 获取form的值
function getFormVal() {
  return [$userInput.val(), $passwordInput.val()];
}
nextBtnHighLight(getFormVal(), $sumitBtn);

// 输入手机或邮箱
$userInput.on('input focus', function () {
  const val = $(this).val();
  // 邮箱联想
  if (/@/.test(val)) {
    const splits = val.split('@');
    const emailBefore = splits[0];
    const emailAfter = splits[1];
    let html = '';
    $.each(EMAIL_LIST, function () {
      if (this.indexOf(emailAfter) >= 0) {
        html += `<li>${emailBefore}@${this}</li>`;
      } else {
        $emailWrap.hide();
      }
    });
    html && $emailWrap.html(html).show();
  } else {
    $emailWrap.hide();
  }
}).on('click', (e) => {
  e.stopPropagation();
});

// 点击邮箱联想词
$emailWrap.on('click', 'li', function () {
  $userInput.val($(this).text());
});

// 全局点击时隐藏邮箱联想列表
$(document).on('click', () => {
  $emailWrap.hide();
});

// 删除当前行输入
$clearInputBtn.on('click', function () {
  $(this).siblings('input').val('').focus();
  $emailWrap.hide();
});

// 显示&隐藏密码
$visiblePasswordBtn.on('click', function () {
  const $this = $(this);
  if ($this.hasClass(iconEyeClose)) { // 显示密码
    $this.removeClass(iconEyeClose).addClass(iconEyeOpen);
    $passwordInput.attr('type', 'text');
  } else if ($this.hasClass(iconEyeOpen)) {
    $this.removeClass(iconEyeOpen).addClass(iconEyeClose);
    $passwordInput.attr('type', 'password');
  }
  if (blurTimer) {
    clearTimeout(blurTimer);
  }
  $passwordInput.trigger('focus');
});
/*
 * 2019-09-11 fe:guojiyuan  产品:游秀芝
 * 登录成功后回调，后端统计用
 */
function loginCallback() {
  $.ajax({
    url: '/login/callback.json',
    data: {
      mscid: stringUtil.getQuery('mscid') || '',
      ext: stringUtil.getQuery('ext') || '',
      isRegister: false,
    },
  });
}

// 每个输入框聚焦和失焦
$('input', $form)
  .on('input', function () {
    const $this = $(this);
    const val = $this.val().trim();
    // 检验登录按钮是否高亮
    nextBtnHighLight(getFormVal(), $sumitBtn);
    if (val.length > 0) {
      $this.siblings(iconNewCloseClass).show();
      $this.siblings(iconEyeOpenClass).show();
      $this.siblings(iconEyeCloseClass).show();
    } else {
      $this.siblings(iconNewCloseClass).hide();
      $this.siblings(iconEyeOpenClass).hide();
      $this.siblings(iconEyeCloseClass).hide();
    }
  })
  .on('focus', function () {
    const $this = $(this);
    const $inputWrap = $this.closest('.inputzone');
    if (!$inputWrap.hasClass('focus')) {
      $inputWrap.addClass('focus');
    }
  })
  .on('blur', function () {
    const $this = $(this);
    const $inputWrap = $this.closest('.inputzone');
    if ($inputWrap.hasClass('focus')) {
      $inputWrap.removeClass('focus');
    }
    blurTimer = setTimeout(() => {
      $this.siblings(iconNewCloseClass).hide();
      $this.siblings(iconEyeOpenClass).hide();
      $this.siblings(iconEyeCloseClass).hide();
    }, 200);
  });

// 表单提交
let submitFlag = false;
let submitTimer = null;
$sumitBtn.on('click', (e) => {
  e.stopPropagation();
  if (nextBtnHighLight(getFormVal(), $(this)) === false) {
    return;
  }
  $form.submit();
});
$form.valid({
  scan(data) {
    if (!data.valid) {
      $.dialog.toast(data.firstError.customErrorMsg);
    }
  },
  success() {
    if (submitFlag) {
      return;
    }
    submitFlag = true;
    clearTimeout(submitTimer);
    function changeFlag() {
      submitTimer = setTimeout(() => {
        submitFlag = false;
      }, 1000);
    }
    const passwordVal = $passwordInput.val();
    const params = $form
      .serializeArray()
      .reduce((a, b) => {
        a[b.name] = b.value;
        return a;
      }, {
        pwd: stringUtil.md5(passwordVal),
        _bi_source: 4,
        _bi_role: 0,
      });
    loginByAccount(params)
      .then(({ backurl = '' }) => {
        loginCallback();
        const queries = [];
        const step = stringUtil.getQuery('step');
        const nonStop = stringUtil.getQuery('nonstop'); // 不需要走三步走的参数
        backurl && queries.push(`url=${encodeURIComponent(backurl)}`);
        step && queries.push(`step=${step}`);
        const query = queries.length ? `?${queries.join('&')}` : '';
        if (nonStop) {
          window.location.replace(backurl);
        } else {
          window.location.replace(`${cRoot}/resume-guidance/${query}`);
        }
        changeFlag();
      })
      .catch(({ msg }) => {
        msg && $.dialog.toast(msg);
        changeFlag();
      });
  },
});
