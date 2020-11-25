/**
 * 注册
 * /register/
 */
import selectUi from '@liepin/selectui';
import '@liepin/zepto-valid';
import countdown from '@liepin/countdown';
import domain from '@liepin/native-domain-fe';
import { sendByTel, loginByTel } from '@liepin/native-login-api-fe';
import nextBtnHighLight from '../../components/ui/next.btn.highlight';
import mobileValid from '../../components/business/data/country.code';

import './index.less';

// 表单验证
const $form = $('form');
const $userInput = $('[data-selector="username"]', $form);
const $validcodeInput = $('[data-selector="validcode"]', $form);
const $getCodeBtn = $('[data-selector="get-checkcode"]', $form);
const $close = $('[data-selector="username-close"]', $form);
const $areaCodeBox = $('[data-selector="area-code-box"]', $form);
const $areaCode = $('[data-selector="area-code"]', $form);
const $sumitBtn = $('[data-selector="submit-btn"]', $form);
let counting = null;
const iconNewCloseClass = '.icon-new-close';

$(() => {
  // 获取form的值
  function getFormVal() {
    return [$userInput.val(), $validcodeInput.val()];
  }
  nextBtnHighLight(getFormVal(), $sumitBtn);
  // 国家手机区号选择
  const leftBracket = '（';
  const rightBracket = '）';
  const areaDict = [
    ['0086', `中国${leftBracket}+86${rightBracket}`],
    ['00852', `中国香港${leftBracket}+852${rightBracket}`],
    ['00853', `中国澳门${leftBracket}+853${rightBracket}`],
    ['00886', `中国台湾${leftBracket}+886${rightBracket}`],
    ['001', `美国&加拿大${leftBracket}+1${rightBracket}`],
    ['0065', `新加坡${leftBracket}+65${rightBracket}`],
    ['0061', `澳大利亚${leftBracket}+61${rightBracket}`],
    ['0044', `英国${leftBracket}+44${rightBracket}`],
    ['0060', `马来西亚${leftBracket}+60${rightBracket}`],
    ['0082', `韩国${leftBracket}+82${rightBracket}`],
    ['0033', `法国${leftBracket}+33${rightBracket}`],
    ['0064', `新西兰${leftBracket}+64${rightBracket}`],
    ['0049', `德国${leftBracket}+49${rightBracket}`],
    ['0081', `日本${leftBracket}+81${rightBracket}`],
    ['0034', `西班牙${leftBracket}+34${rightBracket}`],
    ['0039', `意大利${leftBracket}+39${rightBracket}`],
  ];
  // 地区选择
  $areaCodeBox.on('click', () => {
    selectUi.open({
      options: areaDict,
      selected: $areaCode.val() || '0086',
      en: false,
      success(result) {
        const areaCode = result.text.split(leftBracket)[1].split(rightBracket)[0];
        $('.select-result', $areaCodeBox).html(areaCode);
        $areaCode.val(result.value);
      },
    });
  });

  // 每个输入框聚焦和失焦
  $('input', $form)
    .on('input', function () {
      const $this = $(this);
      // 检验登录按钮是否高亮
      nextBtnHighLight(getFormVal(), $sumitBtn);
      if ($this.val().trim().length) {
        $this.siblings(iconNewCloseClass).show();
        if ($this.attr('name') === 'tel') { // 获取验证码按钮高亮
          counting && counting.end();
          $getCodeBtn.addClass('active').removeClass('disabled');
        }
      } else {
        $this.siblings(iconNewCloseClass).hide();
        if ($this.attr('name') === 'tel') { // 获取验证码按钮取消高亮
          counting && counting.end();
          $getCodeBtn.removeClass('active').addClass('disabled');
        }
      }
    })
    .on('focus', function () {
      const $this = $(this);
      nextBtnHighLight(getFormVal(), $sumitBtn);
      if ($this.val().trim().length) {
        $this.siblings(iconNewCloseClass).show();
      } else {
        $this.siblings(iconNewCloseClass).hide();
      }
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
      setTimeout(() => {
        $this.siblings(iconNewCloseClass).hide();
      }, 200);
    });

  // 清空当前行输入内容
  $close.on('click', function () {
    $(this).siblings('input').val('').focus();
  });

  // 获取手机验证码
  $getCodeBtn.on('click', function () {
    const $this = $(this);
    if ($this.hasClass('disabled')) {
      return;
    }
    let codeValue = !$areaCodeBox.is(':hidden') ? $areaCode.val().trim() : '';
    codeValue === '0086' && (codeValue = '');
    const tel = `${codeValue}${$userInput.val().trim()}`;
    const validObj = $form.valid('validate', $userInput)[0];
    if (!$userInput.attr('data-valid') || $userInput.attr('data-valid') === 'false') {
      $.dialog.toast(validObj.customErrorMsg);
      return;
    }
    sendByTel({ tel, _source: window.$CONFIG && window.$CONFIG.source && 'northamerica' })
      .then(() => {
        $this.addClass('disabled');
        counting = countdown({
          targetElm: $this.get(0),
          msg: '$秒后重新获取',
          auto: true,
        }, () => {
          $this.removeClass('disabled').html('获取验证码');
        });
      })
      .catch(({ msg }) => msg && $.dialog.toast(msg));
  });
  /* 今日头条统计码开始 */
  let isJrtt = false;
  const statUrl = decodeURIComponent($('#hidurl').val()).split('?');
  if (statUrl[0] === `${domain('event')}/t/1484032452103/stat.shtml` && statUrl[1].indexOf('jrtt') >= 0) {
    isJrtt = true;
    (function (root) {
      root._tt_config = true;
      const ta = document.createElement('script');
      ta.type = 'text/javascript';
      ta.async = true;
      ta.src = `${document.location.protocol}//s3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js`;
      ta.onerror = function () {
        const request = new XMLHttpRequest();
        const url = `//ad.toutiao.com/link_monitor/cdn_failed?web_url=${window.encodeURIComponent(window.location.href)}&js_url=${ta.src}&convert_id=63079283688`;
        request.open('GET', url, true);
        request.send(null);
      };
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ta, s);
    }(window));
  }
  /* 今日头条统计码结束 */
  function gotoUrl(type) {
    const url = window.encodeURIComponent($('#hidurl').val());
    const nonStop = LT.String.getQuery('nonstop'); //  回跳地址，不需要走三步走的参数
    /* 0注册 1登录 */
    let toLink = type === '0' ? `${domain('m-c')}/resume-guidance/` : domain('m');
    /* 今日头条统计码开始 */
    /* eslint no-underscore-dangle: [0] */
    if (isJrtt && window._taq) {
      window._taq.push({ convert_id: '63079283688', event_type: 'button' });
    }
    /* 今日头条统计码结束 */
    if ($('#mscid').val() === 'n_a_m001') {
      toLink = `${domain('m-c')}/resume-guidance?mscid=n_a_m001&url=${url}`;
    } else if (url === '') {
      // no thing
    } else if (url.indexOf('/edm/registerdispatcher') >= 0 || LT.String.getQuery('step') === '0') {
      toLink = decodeURIComponent(url);
    } else if (LT.String.getQuery('step')) {
      toLink = `${domain('m-c')}/resume-guidance?url=${url}&step=${LT.String.getQuery('step')}`;
    } else if (url && nonStop) {
      toLink = window.decodeURIComponent(url);
    } else {
      toLink = `${domain('m-c')}/resume-guidance?url=${url}`;
    }
    window.location.replace(toLink);
  }

  /*
   * 2019-07-24 fe:guojiyuan  产品:童猛
   * 注册成功后回调，360合作等一些需要统计注册成功
   */
  function successCallback(type) {
    /* 0注册 1登录 */
    $.ajax({
      url: '/login/callback.json',
      data: {
        mscid: LT.String.getQuery('mscid') || '',
        ext: LT.String.getQuery('ext') || '',
        isRegister: type === '0',
      },
    });
  }

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
    dynrule: {
      CheckPhone() {
        if ($areaCodeBox.is(':hidden')) {
          return ['mobile'];
        }
        // 中国校验规则
        return mobileValid($areaCode.val());
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
      clearTimeout(submitTimer);
      // 代表请求结束的函数
      function changeFlag() {
        submitTimer = setTimeout(() => {
          submitFlag = false;
        }, 3e3);
      }
      // 设置请求body
      const requestData = $form.serializeArray().reduce((o, { name, value }) => {
        o[name] = value;
        return o;
      }, {});
      let codeValue = $areaCodeBox.is(':hidden') ? '' : $areaCode.val().trim();
      codeValue === '0086' && (codeValue = '');
      const tel = `${codeValue}${$userInput.val().trim()}`;
      requestData.tel = tel;
      requestData._bi_source = 4;
      requestData._bi_role = 0;
      // 发送登录请求
      loginByTel(requestData)
        .then(({ type }) => {
          successCallback(type);
          gotoUrl(type);
          changeFlag();
        })
        .catch(({ msg }) => {
          msg && $.dialog.toast(msg);
          changeFlag();
        });
    },
  });
});
