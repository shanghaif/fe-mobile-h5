// import $ from '@liepin/zepto';
import '@liepin/zepto-dialog';
import domain from '@liepin/native-domain-fe';
import '@liepin/font-c-h5/index.css';
import invitationLogin from './js/invitationLogin/index';
import './index.less';
// eslint-disable-next-line import/first
import '@liepin/react-violet-h5/lib/index.css';
import isFromAlipay from '../components/business/app/alipay';
import './js/global/source/index';


$(() => {
  new FastClick(document.body); // eslint-disable-line
  if (isFromAlipay()) {
    $('footer a').filter(`[href="${domain('app-tongdao')}/p/download/liepinmishu-latest-mobile-auto?from=mindex"]`).parent().hide();
  }
});
window.LT = require('@liepin/zepto-ltcore').default;
window.Apps = require('./js/apps').default;

/**
 * 勿删, 提供给测试使用, 自动化测试中流程容易被弹层阻断,
 * 因此提供全局函数, 关闭所有弹层
 * 仅供自动化测试使用
 */
window.closeDialogForAutoTest = () => {
  try {
    while ($.Dialog.getFocus()) {
      $.Dialog.getFocus().close();
    }
    return true;
  } catch (e) {
    return false;
  }
};

const $root = $('body');
// 规避UC浏览器下浮层问题
if ((navigator.userAgent.indexOf('UCBrowser') > -1) && (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1)) {
  $root.css({
    height: $(window).height(),
    'overflow-y': 'scroll',
  });
}

// 行业链接seo特殊处理
$('[data-selector="return-url"]', $root).on('click', () => false);

// 20191008-游秀芝-邀请类免登陆
invitationLogin();

/**
 * gio数据过滤代码
 * @param str
 * @return {*}
 */
window.gioTextFactory = function (str) {
  if (str && !/^(https?:\/\/.+|\/{1,2}\w+.?)/ig.test(str)) {
    const newStr = str.substring(0, 8);
    const newlen = newStr.length;
    if (newlen >= 3 && /.+(%40|@).+/g.test(newStr)) {
      return '疑似邮箱';
    }
    if (newlen >= 6 && /[0-9]{6,}/g.test(newStr)) {
      return '疑似电话号码';
    }
    return newStr;
  }
  return str;
};
