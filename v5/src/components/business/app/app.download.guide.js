/**
 * ABTest 引导下载
 */
import localCookie from '@liepin/native-localcookie-fe';
import domain from '@liepin/native-domain-fe';
import './app.download.guide.css';
import downloadImg from './images/index-download-img.png';
import closeImg from './images/index-download-close.png';
import isFromAlipay from './alipay';

const $win = $(window);
const $root = $('body');
const downloadCenterHtml = `
    <div class="download-center-box" style="width:${$win.width()}px">
      <img class="index-banner" src="${downloadImg}">
      <img data-nick="index_banner_close" class="index-banner-close" src="${closeImg}">
    </div>`;

export default function downloadGuide({ rCode }) {
  if (isFromAlipay()) {
    return false;
  }
  const downloadShowNum = localCookie.get('fe_m_download_show_count');
  if (!localCookie.get('fe_m_download_tips')) {
    if ($CONFIG.app_ab === 2 || $CONFIG.app_ab === '2') {
      if (downloadShowNum) {
        const times = parseInt(localCookie.get('fe_m_download_show_count'), 10);
        localCookie.set('fe_m_download_show_count', times + 1, 1);
      } else {
        localCookie.set('fe_m_download_show_count', 1, 1);
      }
      if (downloadShowNum === '1') {
        $.dialog.common(downloadCenterHtml);
        localCookie.set('fe_m_download_tips', 1, 1);
      }
    }
  }
  $('.index-banner-close', $root).on('click', () => {
    localCookie.set('fe_m_index_banner', 'yes', 1);
    $.dialog.focus.close();
  });
  // 点击banner打开下载链接
  $('.index-banner', $root).on('click', () => {
    localCookie.set('fe_m_index_banner', 'yes');
    $.dialog.focus.close();
    window.location.href = `${domain('m-c')}/tdown?imscid=${rCode}`;
  });
}
