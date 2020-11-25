const domain = require('@liepin/native-domain-fe').default;

<template name="main">
  <style type="text/css">
    $ROOT {

    }

    input[type="text"], input[type="number"] {
      height: 50px;
      line-height: 50px;
      border: 1px solid #ddd;
      font-size: 16px;
      border-radius: 0;
      padding: 0 15px;
      width: 100%;
      box-sizing: border-box;
    }

    .btn-primary {
      background: #f64;
      color: #fff;
      border: 0 none;
      border-radius: 0;
      height: 45px;
      line-height: 45px;
    }

    .btn-light {
      border: 1px solid #f64;
      background: #fff;
      color: #f64;
      border-radius: 0;
    }

    .huser-info {
      margin-bottom: 20px;
    }

    .huser-info .huser-img {
      float: left;
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }

    .huser-info .huser-main {
      padding-left: 55px;
    }

    .huser-info .huser-main .huser-name {
      font-size: 16px;
      line-height: 16px;
      margin-bottom: 10px;
    }

    .huser-info .huser-main .huser-name span {
      font-size: 12px;
      color: #666;
      margin-left: 5px;
    }

    .huser-info .huser-main .huser-content {
      background: #f8f8f8;
      border-radius: 8px;
      border-top-left-radius: 0;
      padding: 10px;
    }

    .cuser-form {
    }

    .cuser-form .form-list {
    }

    .cuser-form .form-list li {
      margin-bottom: 15px;
    }

    .cuser-form .form-list li .get-checkcode {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 120px;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
    }

    .cuser-form .form-list li .valicode {
      padding-right: 130px;
    }

    .cuser-form .form-list li .btn-reg {
      margin-top: 5px;
    }
  </style>
  <div id="$ROOT">
    <div class="huser-info">
      <img src="<?=@userhPhoto?>" alt="" class="huser-img"/>
      <div class="huser-main">
        <h2 class="huser-name"><?=@userhName?><span>猎头顾问</span></h2>
        <div class="huser-content">感谢您对该职位的关注，让我了解您的一些基础信息吧～</div>
      </div>
    </div>
    <div class="cuser-form">
      <form action="<?=domain('passport')?>/mc/regOrLoginAndBindWX.json" method="post" data-selector="cuser-form">
        <input type="hidden" name="openId" value="<?=@open_id?>"/>
        <ul class="form-list">
          <li>
            <input data-selector="username" name="userLogin" autocomplete="off" type="text" placeholder="请输入您的手机号码"
                   validate-title="手机号" validate-rules="[['required'],['mobile']]" validate-type="change">
          </li>
          <li class="relative">
            <input data-selector="valicode" class="valicode" type="text" name="verifycode" placeholder="请输入验证码"
                   validate-title="验证码" validate-rules="['required']">
            <button type="button" data-selector="get-checkcode" class="btn btn-xlarge btn-light get-checkcode">获取验证码
            </button>
          </li>
          <li>
            <button type="submit" class="btn btn-xlarge btn-primary btn-reg">登录/注册</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
  <script type="text/javascript">
    const { sendByTel } = require('@liepin/native-login-api-fe');

    require('@liepin/zepto-valid');

    const $ROOT = $(ROOT); // eslint-disable-line
    const $form = $('form', $ROOT);
    const $user = $('[data-selector="username"]', $form);
    const $checkcode = $('[data-selector="get-checkcode"]', $form);
    // 倒计时
    let currentTime = 60;
    let currentTimeTimer = null;

    function setTime(btn) {
      clearTimeout(currentTimeTimer);
      if (currentTime === 0) {
        btn.removeClass('gray');
        btn.text('再次获取');
        currentTime = 60;
        return;
      }
      btn.addClass('gray');
      btn.text(`${currentTime}秒`);
      currentTime--;

      currentTimeTimer = setTimeout(() => setTime(btn), 1e3);
    }

    $checkcode.on('click', function () {
      const tel = $user.val().trim();
      const $this = $(this);

      const validObj = $form.valid('validate', $user)[0];
      if (!$user.attr('data-valid') || $user.attr('data-valid') === 'false') {
        $.dialog.toast(validObj.customErrorMsg);
        return;
      }
      if ($this.hasClass('gray')) {
        return;
      }
      const source = window.$CONFIG && window.$CONFIG.source ? 'northamerica' : '';
      sendByTel({ tel, _scource: source })
        .then(() => setTime($this))
        .catch(({ msg }) => msg && $.dialog.message(msg, 3, true));
    });
    // from提交
    let submitFlag = false;
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
        $.ajax({
          url: $form.attr('action'),
          type: $form.attr('method'),
          data: $form.serializeArray(),
          cache: false,
          dataType: 'jsonp',
          success(data) {
            if (data.flag === 1) {
              $ROOT.html(include('success'));
            } else {
              $.dialog.toast(data.msg);
            }
            submitFlag = false;
          },
          error() {
            submitFlag = false;
          },
        });
        return false;
      },
    });
  </script>
</template>
<template name="success">
  <style type="text/css">
    $SUBROOT {

    }
    .success-title {
      font-size: 18px;
      margin-bottom: 20px;
      text-align: center;
    }

    .success-tips {
      font-size: 14px;
      margin-bottom: 30px;
      text-align: center;
    }

    .success-link {
      margin-bottom: 40px;
      text-align: center;
      line-height: 50px;
    }

    .success-link .user-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .success-link .link-img {
      margin: 0 30px;
      width: 32px;
    }
  </style>
  <div id="$SUBROOT">
    <h2 class="success-title">登录成功</h2>
    <p class="success-tips">您的微信账号和猎聘账号已绑定</p>
    <div class="success-link">
      <img class="user-img" src="<?=@headimgurl?>"/>
      <img class="link-img" src="https://image0.lietou-static.com/img/5a5dc0df8e50e5cddb3cd5cf04a.png"/>
      <img class="user-img" src="https://image0.lietou-static.com/img/5a5dc1d08e50e5cddb3cd66404a.png"/>
    </div>
    <a href="javascript:;" data-selector="confirm" class="btn btn-xlarge btn-primary">确定</a>
  </div>
  <script type="text/javascript">
    const $SUBROOT = $(SUBROOT); // eslint-disable-line
    $('[data-selector="confirm"]', $SUBROOT).on('click', () => window.location.reload());
  </script>
</template>
