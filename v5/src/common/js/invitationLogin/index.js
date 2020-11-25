import Mask from '@liepin/mask';
import countdown from '@liepin/countdown';
import LpPublicPassport from '@liepin/publicLogin';
import LT from '@liepin/zepto-ltcore';

import './index.less';

const lpLogin = new LpPublicPassport({
  tenantId: 'liepin',
  businessId: '1100100012',
});
const userSignature = LT.String.getQuery('a_als');
const fastLoginScenes = LT.String.getQuery('fastLoginScenes');
// 新增需求，根据key值fastLoginScenes判断，请求接口，根据接口返回跳转----by:20191128
function handleRequestByUrl() {
  $.ajax({
    url: 'https://m.liepin.com/fast-login-callback.json',
    data: {
      originUrl: window.location.href,
      scenes: fastLoginScenes,
    },
    success: ({ data, flag }) => {
      if (flag === 1) {
        window.location.href = data.callbackUrl;
      } else {
        window.location.reload(true);
      }
    },
  });
}
function loginByUserSignature() {
  // 根据签名获取到加星的手机号
  return new Promise((resolve, reject) => {
    lpLogin.sendRequest({
      requestType: 'getLoginByUserSignature',
      requestData: {
        userSignature, // 必填，用户签名
      },
      success(data) {
        resolve(data);
      },
      error(error) {
        reject(error);
      },
    });
  });
}
export default function () {
  loginByUserSignature().then(({ data, flag }) => {
    if (flag === 1 && data.tel && !LT.User.isLogin) {
      const $html = $(`
      <div class="invitation-login-container invitation-login-show">
      <h3 class="login-title">
        完成手机号验证，一键登录
        <span class="text-icon icon-close" data-selector="close"></span>
      </h3>
      <div class="login-content">
        <p class="phone">手机号：${data.tel}</p>
        <div class="verify-code">
          <input class="input-code" type="number" placeholder="请输入验证码">
          <button type="button" data-selector="get-code" class="btn light">获取验证码</button>
        </div>
        <p class="error-tips">验证码错误</p>
        <button type="button" class="btn invitation-login" data-selector="invitation-login">进入猎聘</button>
      </div>
    </div>
    `).appendTo('body');
      Mask({
        clickHide: true,
        className: 'invitation-mask',
        onclick: () => {
          $html.addClass('invitation-login-hide');
          setTimeout(() => {
            $html.remove();
          }, 3000);
        },
      });
      const $errorTips = $('.error-tips');
      $(document).on('click', '[data-selector="close"]', () => {
        $html.addClass('invitation-login-hide');
        $('.invitation-mask').hide();
        setTimeout(() => {
          $html.remove();
        }, 3000);
      });
      // 获取验证码
      $(document).on('click', '[data-selector="get-code"]', function () {
        const $this = $(this);
        if (!$this.hasClass('disable-btn')) {
          $this.addClass('disable-btn');
          $errorTips.css('visibility', 'hidden').html('验证码错误');
          countdown({
            targetElm: $this.get(0),
            msg: '$秒后重新获取',
            auto: true,
          }, () => {
            $this.text('获取验证码').removeClass('disable-btn');
          });
          lpLogin.sendCaptchaRequest({
            requestType: 'sendSmsCodeByUserSignature',
            requestData: {
              userSignature, // 必填
              businessId: '1100100011', // 必填，需要单独申请，请联系覃岭
            },
            success(res) {
              if (res.flag === 0) {
                $errorTips.css('visibility', 'visible').html(res.msg || '网络错误，请稍候再试！');
              }
            },
          });
        }
      });
      $('.input-code').on('input', (e) => {
        if (e.target.value) {
          $errorTips.css('visibility', 'hidden');
        }
      });
      // 登录
      $(document).on('click', '[data-selector="invitation-login"]', () => {
        const smsCode = $('.input-code').val();
        if (!smsCode) {
          $errorTips.css('visibility', 'visible').html('请输入验证码');
        } else {
          lpLogin.sendRequest({
            requestType: 'loginByUserSignature',
            requestData: {
              userSignature, // 必填
              smsCode, // 必填 用户输入的验证码
              businessId: '1100100011', // 必填
            },
            success(response) {
            // 格式参考 SuccessStruct
              if (response.flag === 1) {
                if (fastLoginScenes && fastLoginScenes !== 'null') {
                  handleRequestByUrl();
                } else {
                  window.location.reload();
                }
              } else if (response.flag === 0 && response.code === '202702022') {
                $errorTips.css('visibility', 'visible').html('账号异常，请刷新页面。');
              } else {
                $errorTips.css('visibility', 'visible').html(response.msg || '验证码错误');
              }
            },
            error(error) {
              throw new Error(error);
            },
          });
        }
      });
    }
  });
}
