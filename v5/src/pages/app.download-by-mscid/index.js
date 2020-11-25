// 链接：https://m.liepin.com/app/d/ 需求方： 尹大维
/* eslint-disable */
import './index.less';

function getQuery(key, url) {
  url = url || window.location.href + '';
  if (url.indexOf('#') !== -1) url = url.substring(0, url.indexOf('#'));
  let rts = [],
    rt;
  let queryReg = new RegExp('(^|\\?|&)' + key + '=([^&]*)(?=&|#|$)', 'g');
  while ((rt = queryReg.exec(url)) !== null) {
    rts.push(decodeURIComponent(rt[2]));
  }
  if (rts.length === 0) return null;
  if (rts.length === 1) return rts[0];
  return rts;
}
const ua = navigator.userAgent;
const isWeixin = ua.match(/MicroMessenger/ig);
const isIos = ua.match(/iPhone|iPad|ipod/ig);
const urlStr = getQuery('open_target') || '';
const yybUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.lietou.mishu';
const iosDownloadUrl = 'https://itunes.apple.com/cn/app/id540996859?mt=8';
const AndroidDownloadUrl = window.$CONFIG.downloadUrl;
// 跳转职位详情页H5
function appGetH5Url(urlStr) {
  let jobStartIndex = urlStr.indexOf('url');
  let type = urlStr.substring(0, urlStr.indexOf('?'));
  let url = jobStartIndex > -1 ? decodeURIComponent(urlStr.substring(jobStartIndex + 4)) : '';
  return { url: url, type: type };
}

// 未跳转处理函数, 猎聘下载链接
function appOvertimeLpHandler() {
  let temp = appGetH5Url(urlStr);
  let type = temp.type;
  let url = temp.url;
  if (url && type === '6') {
    window.location.replace(url);
  } else if (url && type === '9') {
    window.location.replace(url);
  } else {
    if (isIos) {
      window.location.href = iosDownloadUrl;
    } else {
      window.location.href = AndroidDownloadUrl;
    }
  }
}

// 未跳转处理函数, 应用宝下载链接
function appOvertimeYybHandler() {
  let temp = appGetH5Url(urlStr);
  let type = temp.type;
  let url = temp.url;
  if (url && type === '6') {
    window.location.replace(url);
  } else if (url && type === '9') {
    window.location.replace(url);
  } else {
    window.location.replace(yybUrl);
  }
}

$('[data-selector="download-app"]').on('click', () => {
  if (isWeixin) { // 微信
    appOvertimeYybHandler();
  } else { // 浏览器
    setTimeout(appOvertimeLpHandler, 1000);
  }
})