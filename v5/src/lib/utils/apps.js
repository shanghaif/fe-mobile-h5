import { Message } from '@liepin/react-violet-h5';

import cookieUtil from './cookie';
import { mVasRoot } from './domain';
import Ajax from './request';

const Apps = {};
const u = navigator.userAgent;
Apps.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
Apps.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
Apps.isTdAndroid = (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) && u.indexOf('android-tongdao-app') > -1;
Apps.isTdIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && u.indexOf('ios-tongdao-app') > -1;
Apps.isTd = Apps.isTdAndroid || Apps.isTdIos;
Apps.isWx = /MicroMessenger/ig.test(u);
Apps.isBaidu = /(Baidu|baiduboxapp)/.test(u);

Apps.isUcOrDingding = /(UCBrowser|DingTalk)/.test(u);
// 判断app版本号
Apps.appVc = cookieUtil.get('app_vc');
/**
 * 跳转职伴收银台去支付
 * prodKey 产品id（必填），服务端提供
 * redirectUrl 支付成功跳转链接（必填）
 * failUrl 支付失败跳转链接（必填）
 */
Apps.gotoPayPlatform = ({ prodKey, redirectUrl, failUrl }) => {
  if (!prodKey || !redirectUrl || !failUrl) {
    Message.toast('支付参数不完整！');
    return;
  }
  Ajax({
    url: `${mVasRoot}/pay/make-order.json`,
    type: 'jsonp',
    data: { prodKey },
    success({ data, flag, msg }) {
      if (flag === 1) {
        const { orderNo } = data;
        const encodeRedirectDone = encodeURIComponent(redirectUrl);
        const encodeRedirectFail = encodeURIComponent(failUrl);
        window.location.href = `${mVasRoot}/view-checkoutcounter?orderNo=${orderNo}&fromtype=credit&redirectDone=${encodeRedirectDone}&redirectFail=${encodeRedirectFail}`;
      } else {
        Message.toast(msg);
      }
    },
  });
};
export default Apps;
