/**
 * 落地页
 * https://m.liepin.com/landingpage/count.shtml
 */
import '@liepin/zepto-valid';
import '@liepin/zepto-dialog';
import domain from '@liepin/native-domain-fe';

import './index.css';
import { isIOS } from '../../../lib/env';
import './modules/passport';
import './modules/slide';
// 没登陆的用户跳登录页
if (LT.User.isLogin) {
  window.location.href = domain('m');
}

const clientHeight = parseInt(document.documentElement.clientHeight, 10);
const bodyfont = 32 * clientHeight / 960;
document.documentElement.style.fontSize = `${bodyfont}px`;
// 广点通文案修改
if (LT.String.getQuery('mscid') === 'g_d_t001') {
  $('.register-title').text('注册猎聘，立获高薪');
}
// 按钮两个版本
const type = LT.String.getQuery('type');
if (type === 'salary') {
  $('.btn-submit').text('一键获取高薪').attr('data-selector', 'btn-salary');
} else {
  $('.btn-submit').attr('data-selector', 'btn-submit');
}

// 下载
$('[data-selector="btn-download"]')
  .attr('href', isIOS ? `${domain('m-c')}/tdown` : `${domain('app-tongdao')}/p/download/liepinmishu_www_latest.apk`);

if (window.location.href.indexOf('gdt') > 0) {
  $('.app-part').addClass('none');
}
