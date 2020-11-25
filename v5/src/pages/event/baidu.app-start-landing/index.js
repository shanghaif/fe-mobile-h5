/**
 * 页面链接：https://m.liepin.com/event/baidu/app-start-landing/
 * 说明：渠道下载，李文乐
 * 创建时间：2019-10-30
 */
import './index.less';
import guideTpl from './tpls/open_browser_guide.tpl';

const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

const androidDownloadUrl = 'https://download.lietou-static.com/app/5db92590d38a3d7423bab53901u.apk';
const iosDownloadUrl = 'https://itunes.apple.com/cn/app/id540996859?mt=8';


$('[data-selector="download"]').on('click', function () {
  if (isIos) {
    window.location.href = iosDownloadUrl;
  } else if (Apps.isWx) {
    $.dialog({
      title: false,
      content: guideTpl.render(),
      top: '0',
      event: 'click',
      contentPadding: '0px',
      width: '100%',
      maskTapClose: true,
      maskCss: { background: 'rgba(0, 0, 0, 0.8)' },
      css: { background: 'transparent' },
    });
  } else {
    window.location.href = androidDownloadUrl;
  }
});
