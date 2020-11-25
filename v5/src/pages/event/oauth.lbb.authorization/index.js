/* eslint-disable no-underscore-dangle */
/**
 * 乐班班直播注册
 * 需求方：冯鹏，秀芝
 * https://m.liepin.com/oauth/lbb/authorization/
 */
import selectUi from '@liepin/selectui';
import '@liepin/zepto-valid';
import countdown from '@liepin/countdown';
import { sendByTel, loginByTel } from '@liepin/native-login-api-fe';
import nextBtnHighLight from '../../../components/ui/next.btn.highlight';
import mobileValid from '../../../components/business/data/country.code';

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
const $name = $('[data-selector="name"]', $form);
const iconNewCloseClass = '.icon-new-close';
let counting = null;
$(function () {
  // 获取form的值
  function getFormVal() {
    return [$name.val(), $userInput.val(), $validcodeInput.val()];
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
      const val = $this.val().trim();
      // 检验登录按钮是否高亮
      nextBtnHighLight(getFormVal(), $sumitBtn);
      if (val.length > 0) {
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
      const val = $this.val().trim();
      nextBtnHighLight(getFormVal(), $sumitBtn);
      if (val.length > 0) {
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
    const validTel = $form.valid('validate', $userInput)[0];
    const validName = $form.valid('validate', $name)[0];
    if (!$name.attr('data-valid') || $name.attr('data-valid') === 'false') {
      $.dialog.toast(validName.customErrorMsg);
      return;
    }
    if (!$userInput.attr('data-valid') || $userInput.attr('data-valid') === 'false') {
      $.dialog.toast(validTel.customErrorMsg);
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
    dyncheck: {
      CheckName() {
        const value = $name.val();
        const result = {
          customErrorMsg: '',
          valid: true,
        };
        const length = LT.String.realLength(value);
        if (length > 12 || !(/^[\u4e00-\u9fa5a-z]+$/i).test(value)) {
          result.customErrorMsg = '请填写正确的姓名';
          result.valid = false;
        }
        return result;
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
        .then(function () {
          // do res
          $('[data-selector="extInfo"]').val($('[data-selector="name"]').val());
          $('[data-selector="access-form"]').get(0).submit();
          changeFlag();
        })
        .catch(({ msg }) => {
          msg && $.dialog.toast(msg);
          changeFlag();
        });
    },
  });
});
