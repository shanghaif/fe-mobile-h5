const countdown = require('@liepin/countdown').default;
const domain = require('@liepin/native-domain-fe').default;
require('@liepin/zepto-valid');
const { sendByTel, loginByTel } = require('@liepin/native-login-api-fe');
const Indutry4ES = require('@liepin/react-industry-h5/src/components/industry-es').default;
const localdata = require('@liepin/zepto-localdata').default;

<template name="main">
  <style>
    $ROOT {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 9;
    }
    $ROOT .question-wrap {
      position: absolute;
      top: 50%;
      left: 50px;
      right: 50px;
      transform: translate(0, -50%);
    }
    @media screen and (max-width: 350px) {
      $ROOT .question-wrap {
        left: 20px;
        right: 20px;
      }
    }
    $ROOT .question-wrap .login-wrap {
      padding: 36px 20px 80px;
    }
    $ROOT .question-wrap .login-wrap h3 {
      line-height: 37px;
      font-weight: bold;
      font-size: 17px;
    }
    $ROOT .question-wrap .login-wrap .form-item-wrap {
      margin-bottom: 20px;
      height: 32px;
      border: 1px solid #000;
      font-size: 12px;
    }
    $ROOT .question-wrap .login-wrap .form-item-wrap input {
      height: 100%;
      margin: 0 10px !important;
      padding: 0;
      font-size: inherit;
    }
    $ROOT .question-wrap .login-wrap .form-item-wrap .get-code-btn {
      padding: 0 10px;
      line-height: 32px;
    }
    $ROOT .question-wrap .login-wrap .luck-draw-btn {
      margin-top: 40px;
      width: 100%;
      font-size: 16px;
    }
  </style>
  <div id="$ROOT">
    <div class="question-wrap">
      <div class="question-title">
        <i class="left-decoration"></i>
        <span>查看抽奖结果</span>
        <i class="right-decoration"></i>
      </div>
      <div class="login-wrap">
        <h3>登录即可查看抽奖结果</h3>
        <form>
          <div class="flexbox form-item-wrap">
            <input data-selector="tel" name="tel" class="flex-1 needsclick" autocomplete="off" type="tel" placeholder="请输入手机号" validate-title="手机号" validate-rules="[['required'],['mobile']]" validate-type="change" data-valid="true">
          </div>
          <div class="flexbox form-item-wrap">
            <input maxlength="6" data-selector="validcode" autocomplete="off" class="validcode flex-1 needsclick" type="tel" name="smsCode" placeholder="请输入验证码" validate-title="验证码" validate-rules="['required']" data-valid="true">
            <a href="javascript:;" class="flex-0 get-code-btn" data-selector="get-code">获取验证码</a>
          </div>
          <a href="javascript:;" class="luck-draw-btn" data-selector="submit-btn">登录</a>
        </form>
      </div>
      <div id="script" style='display: none;'></div>
    </div>
  </div>
  <script>
    const $root = $(ROOT);
    const $form = $('form', $root);
    const $submit = $('[data-selector="submit-btn"]', $form);
    const $tel = $('[data-selector="tel"]', $form);
    const $getCodeBtn = $('[data-selector="get-code"]', $form);
    $('input', $form).on('blur', function () {
      window.scrollTo({
        left: 0,
        top: 0,
      });
    });
    // 获取手机验证码
    $getCodeBtn.on('click', function () {
      if ($getCodeBtn.hasClass('muted')) {
        return;
      }
      const tel = $tel.val().trim();
      const validObj = $form.valid('validate', $tel)[0];
      if (!$tel.attr('data-valid') || $tel.attr('data-valid') === 'false') {
        $.dialog.toast(validObj.customErrorMsg);
        return;
      }
      $getCodeBtn.addClass('muted');
      sendByTel({ tel, _source: window.$CONFIG && window.$CONFIG.source && 'northamerica' })
        .then(function () {
          countdown({
            targetElm: $getCodeBtn.get(0),
            msg: '$秒后重新获取',
            auto: true,
          }, function () {
            $getCodeBtn.removeClass('muted').html('获取验证码');
          });
        })
        .catch(function ({ msg }) {
          $getCodeBtn.removeClass('muted');
          msg && $.dialog.toast(msg);
        });
    });
    // 表单提交
    let submitFlag = false;
    let submitTimer = null;

    $submit.on('click', function (e) {
      e.stopPropagation();
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
        // 代表请求结束的函数
        function changeFlag() {
          submitTimer = setTimeout(function () {
            submitFlag = false;
          }, 3e3);
        }
        // 设置请求body
        const requestData = $form.serializeArray().reduce((o, { name, value }) => {
          o[name] = value;
          return o;
        }, {});
        requestData.tel = $tel.val().trim();
        requestData._bi_source = 4;
        requestData._bi_role = 0;
        // 发送登录请求
        loginByTel(requestData)
          .then(({ type }) => {
            changeFlag();
            /* 0注册 1登录 */
            if (type === '1') {
              window.location.replace(`${domain('m')}/brand/it-answer/lottrey-award/`);
            } else {
              $root.html(include('write'));
            }
          })
          .catch(({ msg }) => {
            changeFlag();
            msg && $.dialog.toast(msg);
          });
      },
    });
  </script>
</template>
<template name="write">
  <style>
    .question-wrap .login-wrap .form-item-wrap span {
      color: #ccc;
    }
    .question-wrap .login-wrap .form-item-wrap input, .question-wrap .login-wrap .form-item-wrap span {
      height: 100%;
      line-height: 32px;
      margin: 0 10px !important;
      padding: 0;
      font-size: inherit;
    }
    .question-wrap .login-wrap .form-item-wrap span.muted, .question-wrap .login-wrap .comp-industry-item .results {
      color: #000;
    }
    .question-wrap .industry .flex-1 {
      position: relative;
    }
    .question-wrap .login-wrap .new-react-industry {
      width: 100%;
      position: absolute;
      left: 0;
      top: -3px;
      background-color: transparent !important;
    }
    .question-wrap .login-wrap .new-react-industry a {
      display: block;
      width: 100%;
    }
    .question-wrap i {
      margin-right: 10px;
      float: right;
    }
  </style>
  <div id="$SUBROOT">
    <div class="question-wrap">
      <div class="question-title">
        <i class="left-decoration"></i>
        <span>中奖了！！！</span>
        <i class="right-decoration"></i>
      </div>
      <div class="login-wrap">
        <h3>完善资料，马上领奖</h3>
        <form>
          <div class="flexbox form-item-wrap">
            <input data-selector="name" name="name" class="flex-1 needsclick" autocomplete="off" type="text" placeholder="姓名" validate-title="姓名" validate-rules="['required']" validate-type="change" data-valid="true">
          </div>
          <div class="flexbox form-item-wrap industry">
            <div class="flex-1">
              <i class="text-icon icon-go-ahead"></i>
              <input type="hidden" data-selector="industryInput" validate-title="行业" validate-rules="['required']" data-valid="true"/>
            </div>
          </div>
          <div class="flexbox form-item-wrap" data-selector="job">
            <input type="hidden" data-selector="jobInput" validate-title="职能" validate-rules="['required']" data-valid="true"/>
            <span class="flex-1">职能</span>
            <i class="text-icon icon-go-ahead"></i>
          </div>
          <a href="javascript:;" class="luck-draw-btn" data-selector="submit-btn">查看结果</a>
        </form>
      </div>
    </div>
  </div>
  <script>
    const $root = $(SUBROOT);
    const $form = $('form', $root);
    const $submit = $('[data-selector="submit-btn"]', $form);
    const $name = $('[data-selector="name"]', $form);
    const $industryInput = $('[data-selector="industryInput"]', $form);
    const $job = $('[data-selector="job"]', $form);
    const $jobInput = $('[data-selector="jobInput"]', $form);
    $('input', $form).on('blur', function () {
      window.scrollTo({
        left: 0,
        top: 0,
      })
    });
    // eslint-disable-next-line no-new
    new Indutry4ES({
      $inputContainer: $industryInput,
      style: {
        zIndex: 3000,
      },
      placeholder: '行业',
      all: true,
      max: 1,
      deep: 3,
    });
    // 职能
    const Job = localdata($job, {
      name: 'job',
      all: false,
      init() {
        if ($jobInput.val()) {
          const { selectedVal } = this;
          $job.find('span').html(selectedVal.sub.length ? selectedVal.sub[1] : selectedVal.main[1]).removeClass('placeholder');
        }
      },
      selected(value, text) {
        $job.find('span').html(text).addClass('muted');
        $jobInput.val(value);
        setTimeout(() => {
          Job.hide();
        }, 160);
      },
      defaultValue: $jobInput.val(),
    });
    $job.on('click', function () {
      Job.show();
    });
    function ajaxFn() {
      $.ajax({
        url: '/brand/it-answer/save-user-info.json',
        data: {
          userName: $name.val(),
          industryCode: $industryInput.val(),
          jobtitleCode: $jobInput.val(),
        },
        success() {
          window.location.replace(`${domain('m')}/brand/it-answer/lottrey-award/`);
        },
      });
    }
    // 表单提交
    $submit.on('click', function (e) {
      e.stopPropagation();
      $form.submit();
    });
    $form.valid({
      scan(data) {
        if (!data.valid) {
          $.dialog.toast(data.firstError.customErrorMsg);
        }
      },
      success() {
        ajaxFn();
      },
    });
  </script>
</template>