import '@liepin/zepto-valid';
import countdown from '@liepin/countdown';
import selectUi from '@liepin/selectui';
import { loginByTel, sendByTel, formatParams } from '@liepin/native-login-api-fe';

import './index.less';

const { location } = window;
const $form = $('[data-selector="form"]');
const $submit = $('[type="submit"]', $form);
const $user = $('[data-selector="username"]', $form);
const $areaCodeBox = $('[data-selector="area-code-box"]', $form);
const $areaCode = $('[data-selector="area-code"]', $form);
const $checkcode = $('[data-selector="get-checkcode"]', $form);
const $userLogin = $('[data-selector="user_login"]', $form);
let submitFlag = false;
const slideWith = (($('body').width() - 30) / 2.5).toFixed(0);
$('.swiper-slide').css({ width: `${slideWith}px` });

class Roll {
  /*
   * options: {}
   *   el: 元素选择器
   *   speed: 滚动速度
   *   delay: 延迟执行ms
   */
  constructor(options) {
    this.speed = options.speed || 2;
    this.box = $(options.el);
    this.slides = this.box.find('.swiper-slide');
    this.distance = 0;
    this.throttle = 16.7;
    this.origin = this.slides.eq(1)[0].getBoundingClientRect().left;
    this.key = this.slides.eq(6)[0].getBoundingClientRect().left;
    this.timer = null;
    if (options.delay) {
      setTimeout(() => {
        this.fun();
      }, options.delay);
    } else {
      this.fun();
    }
  }

  fun() {
    this.distance += this.speed;
    this.box.css({ transform: `translate3d(-${this.distance}px, 0px, 0px)` });
    if (this.distance >= this.key) {
      this.distance += this.origin - this.key - this.speed;
    }
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.fun();
    }, this.throttle);
  }
}
const roll1 = new Roll({
  el: '#swiper1',
  speed: 0.8,
});
const roll2 = new Roll({
  el: '#swiper2',
  speed: 0.6,
});
$(window).on('beforeunload', () => {
  roll1.timer && clearTimeout(roll1.timer);
  roll2.timer && clearTimeout(roll2.timer);
});

// 地区选择
$areaCodeBox.on('click', () => {
  selectUi.open({
    options: [['0086', '中国（+86)'], ['00852', '中国香港 (+852)'], ['00853', '中国澳门 (+853)'], ['00886', '中国台湾 (+886)'], ['001', '美国&加拿大 (+1)'], ['0065', '新加坡 (+65)'], ['0061', '澳大利亚 (+61)'], ['0044', '英国 (+44)'], ['0060', '马来西亚 (+60)'], ['0082', '韩国 (+82)'], ['0033', '法国 (+33)'], ['0064', '新西兰 (+64)'], ['0049', '德国 (+49)'], ['0081', '日本 (+81)'], ['0034', '西班牙 (+34)'], ['0039', '意大利 (+39)']],
    selected: $areaCode.val() || '0086',
    en: false,
    success(result) {
      $('.select-result', $areaCodeBox).html(result.text);
      $areaCode.val(result.value);
    },
  });
});
// 获取验证码
$checkcode.on('click', function () {
  let codeValue = $areaCode.val().trim();
  codeValue === '0086' && (codeValue = '');
  const tel = `${codeValue}${$user.val().trim()}`;
  const $this = $(this);
  const validObj = $form.valid('validate', $user)[0];
  if (!$user.attr('data-valid') || $user.attr('data-valid') === 'false') {
    $.dialog.toast(validObj.customErrorMsg);
    return;
  }
  if ($this.hasClass('disabled')) {
    return;
  }
  sendByTel({ tel })
    .then(() => {
      $this.addClass('disabled');
      countdown({
        targetElm: $this.get(0),
        msg: '$秒后重试',
        auto: true,
      }, () => {
        $this.removeClass('disabled').html('重新获取');
      });
    })
    .catch(({ msg }) => msg && $.dialog.message(msg, 3, true));
});
// 输入手机号，允许提交表单
$user.on('input propertychange', function () {
  if ($.trim(this.value)) {
    $submit.removeClass('disabled').removeAttr('disabled');
  } else {
    $submit.addClass('disabled').atr('disabled');
  }
});
$('[data-selector="link"]').on('click', () => {
  $user.focus();
});
$form.valid({
  dynrule: {
    CheckPhone() {
      if ($areaCodeBox.is(':hidden')) {
        return ['mobile'];
      }
      // 中国校验规则
      const val = $areaCode.val();
      switch (val) {
        case '0086':
          return ['mobileCN'];
        case '00852':
          return ['mobileHK'];
        case '00853':
          return ['mobileMO'];
        case '00886':
          return ['mobileTW'];
        case '001':
          return ['mobileUS'] || ['mobileCA'];
        case '0065':
          return ['mobileSG'];
        case '0044':
          return ['mobileUK'];
        case '0081':
          return ['mobileJP'];
        case '0049':
          return ['mobileDE'];
        case '0061':
          return ['mobileAU'];
        case '0060':
          return ['mobileMY'];
        case '0082':
          return ['mobileKR'];
        case '0091':
          return ['mobileIN'];
        case '0033':
          return ['mobileFR'];
        case '0064':
          return ['mobileNZ'];
        case '0034':
          return ['mobileES'];
        case '0039':
          return ['mobileIT'];
        case '00351':
          return ['mobilePT'];
        default:
          return ['number'];
      }
    },
  },
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
    let codeValue = !$areaCodeBox.is(':hidden') ? $areaCode.val().trim() : '';
    codeValue === '0086' && (codeValue = '');
    const val = `${codeValue}${$user.val().trim()}`;
    $userLogin.val(val);
    loginByTel(formatParams($form, { _bi_source: 4, _bi_role: 0 }))
      .then(() => {
        location.href = window.location.origin;
        submitFlag = false;
      })
      .catch(({ msg }) => {
        msg && $.dialog.toast(msg);
        submitFlag = false;
      });
    return false;
  },
});
