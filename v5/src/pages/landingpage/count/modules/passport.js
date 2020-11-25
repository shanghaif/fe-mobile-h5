import { sendByTel, loginByTel, formatParams } from '@liepin/native-login-api-fe';

const $root = $('body');
/*
 * 登陆注册
 * 清空表单
 */
$('input[type=text]').val('');
// 表单验证
const $form = $('form');
const $user = $('[data-selector="username"]', $form);
const $checkcode = $('[data-selector="get-checkcode"]', $form);
// 倒计时
let currentTime = 60;
function setTime(btn) {
  if (currentTime === 0) {
    btn.removeClass('gray');
    btn.text('再次获取验证码');
    currentTime = 60;
    return;
  }
  btn.addClass('gray');
  btn.text(`${currentTime}秒`);
  currentTime--;

  setTimeout(() => {
    setTime(btn);
  }, 1e3);
}
$checkcode.on('click', () => {
  const tel = $user.val().trim();
  if (tel === '') {
    $.dialog.toast('请输入手机号');
    return false;
  }
  sendByTel({ tel })
    .then(() => setTime($checkcode))
    .catch(({ msg }) => msg && $.dialog.message(msg, 3, true));
});
let submitFlag = false;
let submitTimer = null;
// 今日头条
const jrttParam = LT.String.getQuery('jrtt');
const jrttCodeArray = {
  1: '68239742830',
  2: '91949032954',
};
if (window.location.href.indexOf('jrtt') > 0) {
  (function (root, key) {
    root[key] = true;
    const ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
    ta.src = `${document.location.protocol}//s3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js`;
    ta.onerror = function () {
      const request = new XMLHttpRequest();
      const webUrl = window.encodeURIComponent(window.location.href);
      const jsUrl = ta.src;
      const url = `//ad.toutiao.com/link_monitor/cdn_failed?web_url=${webUrl}&js_url=${jsUrl}&convert_id=${jrttCodeArray[jrttParam]}`;
      request.open('GET', url, true);
      request.send(null);
    };
    const s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ta, s);
  }(window, '_tt_config'));
}
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
    loginByTel(formatParams($form, { _bi_source: 4, _bi_role: 0 }))
      .then(({ type }) => {
        if (jrttParam && type === '0') {
          _taq && _taq.push({ convert_id: jrttCodeArray[jrttParam], event_type: 'form' }); // eslint-disable-line
        } else {
          window._bdSiteLogger && window._bdSiteLogger.submitCallback({ // eslint-disable-line
            type: 'book', // 必须包含 type，且 type 必须为 tel、sms、msg、book、download 中的一种
          }); // 提交 form 成功后调用
        }
        window.location.href = '/home';
        submitTimer = setTimeout(() => {
          submitFlag = false;
        }, 3e3);
      })
      .catch(({ msg }) => {
        msg && $.dialog.toast(msg);
        submitTimer = setTimeout(() => {
          submitFlag = false;
        }, 3e3);
      });
    return false;
  },
});
$('[data-selector="attention"]', $root).on('click', () => {
  $.dialog.toast('请登录或注册');
  $root.scrollTop(0);
});
$('[data-selector="btn-register"]', $root).on('click', () => {
  $root.scrollTop(0);
});
