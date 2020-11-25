/**
 * 需要在微信客户端打开
 * https://m.liepin.com/share/hjob/?hjobId=3187877
 */
import userUtil from '../../lib/utils/user';
import './index.css';

const shareShadow = require('./tpls/share.tpl');
const registerTpl = require('./tpls/register.tpl');
const userCardTpl = require('./tpls/user_card.tpl');


window.$CONFIG = window.$CONFIG || {};

const $root = $('body');
// 投递成功弹框，需要自适应
(function () {
  $('html').css({ 'font-size': 50 * parseInt(document.documentElement.clientWidth, 10) / 1080 });
}());

$(() => {
  // H拉C
  window.weixinAuthInfo = window.weixinAuthInfo || {};
  // 分享
  $('[data-selector="share"]', $root).on('click', () => {
    $.ajax({
      url: '/share/shared.json',
      type: 'POST',
      data: {
        hjobId: $CONFIG.job_id,
        parentOpenId: $CONFIG.parentOpenId,
        open_id: $CONFIG.open_id,
      },
      dataType: 'json',
      success(res) {
        if (res.flag === 1) {
          // do nothing
        }
      },
    });
    $.dialog({
      title: false,
      borderRadius: false,
      contentPadding: 0,
      css: {
        background: 'transparent',
        top: 0,
        width: '100%',
        left: 0,
      },
      content: shareShadow.render(),
    });
  });
  // 点击我感兴趣
  let attchLock = false;
  $('[data-selector="attch"]', $root).on('click', () => {
    if (!userUtil.isLogin) {
      $.dialog({
        title: false,
        width: '90%',
        borderRadius: false,
        top: '18%',
        maskTapClose: true,
        closeIcon: true,
        css: { 'border-radius': '2px' },
        content: registerTpl.render({
          userhName: $CONFIG.userhName,
          userhPhoto: $CONFIG.userhPhoto,
          open_id: window.weixinAuthInfo.open_id,
          headimgurl: window.weixinAuthInfo.headimgurl,
        }),
      });
    } else {
      if (attchLock) {
        return false;
      }
      attchLock = true;
      $.ajax({
        url: '/share/name-card.json',
        type: 'POST',
        cache: false,
        dataType: 'json',
        success(data) {
          attchLock = false;
          const editUrl = `/share/edit-name-card/?nickname=${window.weixinAuthInfo.nickname}&headimgurl=${encodeURIComponent(window.weixinAuthInfo.headimgurl)}&parentOpenId=${$CONFIG.parentOpenId}&open_id=${window.weixinAuthInfo.open_id}&hjobId=${$CONFIG.job_id}`;
          if (data.flag === 1) {
            if (!data.data.requiredCompleted) {
              window.location.href = editUrl;
              return;
            }
            $.dialog({
              top: 'auto',
              bottom: '0',
              showWay: 'bottom',
              width: '100%',
              maskTapClose: true,
              css: {
                background: '#fff',
                'border-radius': 0,
              },
              closeIcon: true,
              title: false,
              show: true,
              content: userCardTpl.render(Object.assign({}, data.data, { editUrl })), // eslint-disable-line
            });
          } else {
            $.dialog.toast(data.msg);
          }
        },
      });
    }
  });
  // 投递简历
  $('.toolbar [data-selector="apply"],.btn-interest,.btn-apply-job').on('click', function () {
    const $this = $(this);
    // 动态加载应聘模块
    import(/* webpackChunkName: "thunk/components/business/apply/applystart" */ '../../components/business/apply/applystart')
      .then((module) => {
        const applyJob = module.default;
        const formData = $('[data-selector="resume-infor"]').serializeArray();
        const applyData = formData.reduce((re, item) => {
          re[item.name] = item.value;
          return re;
        }, {});
        $this.hasClass('btn-disabled') || applyJob({
          applyData,
          onSuccess: () => {
            $('.toolbar [data-selector="apply"],.btn-apply-job')
              .removeClass('btn-primary')
              .addClass('btn-disabled')
              .attr('disabled', true)
              .html('已应聘');
            $('.btn-interest').removeClass('btn-interest').addClass('btn-disabled').html('简历已发送');
          },
        });
      });
  });
});
