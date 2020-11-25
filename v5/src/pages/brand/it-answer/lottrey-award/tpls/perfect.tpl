require('@liepin/zepto-valid');
const { priceLink, jobLink } = require('../../modules/common.js');
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
    $ROOT .question-wrap .login-wrap .form-item-wrap input, $ROOT .question-wrap .login-wrap .form-item-wrap span {
      height: 100%;
      line-height: 32px;
      margin: 0 10px !important;
      padding: 0;
      font-size: inherit;
    }
    $ROOT .question-wrap .login-wrap .form-item-wrap span {
      color: #ccc;
    }
    $ROOT .question-wrap .login-wrap .form-item-wrap span.muted {
      color: #000;
    }
    i {
      width: 10px;
      height: 10px;
      background-color: red;
    }
    $ROOT .question-wrap .login-wrap .form-item-wrap .get-code-btn {
      padding: 0 10px;
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
        <span>申领人信息</span>
        <i class="right-decoration"></i>
      </div>
      <div class="login-wrap">
        <form>
          <div class="flexbox form-item-wrap">
            <input data-selector="name" name="name" class="flex-1 needsclick" autocomplete="off" type="text" placeholder="姓名" validate-title="姓名" validate-rules="['required']" validate-type="change" data-valid="true"/>
          </div>
          <div class="flexbox form-item-wrap">
            <input data-selector="phone" placeholder="电话" class="flex-1 needsclick" autocomplete="off" type="tel" validate-title="手机号" validate-rules="[['required'],['mobile']]" validate-type="change" data-valid="true"/>
          </div>
          <div class="flexbox form-item-wrap" data-selector="job">
            <input type="text" class="needsclick" data-selector="address" placeholder="地址" autocomplete="off" validate-title="地址" validate-rules="['required']" />
          </div>
          <a href="javascript:;" class="luck-draw-btn" data-selector="submit-btn">提交</a>
        </form>
      </div>
    </div>
  </div>
  <script>
    const $root = $(ROOT);
    const $form = $('form', $root);
    const $name = $('[data-selector="name"]', $form);
    const $phone = $('[data-selector="phone"]', $form);
    const $address = $('[data-selector="address"]', $form);
    const $submit = $('[data-selector="submit-btn"]', $form);
    let submitFlag = false;
    $('input', $form).on('blur', function () {
      window.scrollTo({
        left: 0,
        top: 0,
      })
    });
    function ajaxFn() {
      $.ajax({
        url: '/brand/it-answer/lottrey-post-info.json',
        data: {
          name: $name.val(),
          tel: $phone.val(),
          address: $address.val(),
        },
        success({ flag, msg }) {
          if (flag === 1) {
            $root.html(include('success'));
          } else {
            $.dialog.toast(msg);
          }
          submitFlag = false;
        },
        error() {
          submitFlag = false;
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
        if (submitFlag) {
          return;
        }
        submitFlag = true;
        ajaxFn();
      },
    });
  </script>
</template>
<template name="success">
  <style type="text/css">
   .question-wrap .result-info {
      padding: 36px 20px 80px;
    }
   .question-wrap .result-info p {
      font-size: 17px;
      color: #000;
      line-height: 25px;
      text-align: center;
    }
   .question-wrap .result-info .result-title {
      font-weight: bold;
    }
    .question-wrap .result-info .look-other-btn {
      margin: 30px 0 15px;
    }
  </style>
  <div id="$SUBROOT">
    <div class="question-wrap">
      <div class="question-title">
        <i class="left-decoration"></i>
        <span>提交成功</span>
        <i class="right-decoration"></i>
      </div>
      <div class="result-info">
        <p class="result-title">提交成功</p>
        <p>奖品将在七个工作日内</p>
        <p>安排发放</p>
        <a href="javascript:;" class="luck-draw-btn look-other-btn" data-selector="look-other-prise">偷看其他奖品</a>
        <a href="javascript:;" class="luck-draw-btn" data-selector="change-salary-job">换份高薪工作</a>
      </div>
    </div>
  </div>
    <script type="text/javascript">
      const $SUBROOT = $(SUBROOT);
      $('[data-selector="look-other-prise"]', $SUBROOT).on('click', () => window.location.replace(priceLink));
      $('[data-selector="change-salary-job"]', $SUBROOT).on('click', () => window.location.replace(jobLink));
    </script>
</template>