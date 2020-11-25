/**
 * https://m.liepin.com/brand/rise-salary/gift-package/
 */
import share, { share4App } from '@liepin/share';
import domain from '@liepin/native-domain-fe';
import userUtil from '../../../lib/utils/user';
import { RenderToPage } from '../../../lib/utils/utils';
import RiseSalaryBottom from '../../../components/business/event/brand.rise-salary.bottom/RiseSalaryBottom';
import guideTpl from './tpls/open_browser_guide.tpl';

import shareImg from './images/share.png';
import './index.less';

const mVasDomain = domain('m-vas');
const shareData = {
  img: `https:${shareImg}`,
  shareTitle: '送你一份价值487元的涨薪礼包，点击免费领取',
  url: `${domain('m')}/brand/rise-salary/gift-package/?inviteUserId=${$CONFIG.inviteUserId}&imscid=R000058365`,
  desc: '猎聘帮你免费求职加速，升职加薪就在眼前～',
  mediaType: 0,
};
const $clickOperation = $('[data-selector="click-operation"]');
RenderToPage({ component: RiseSalaryBottom });
$clickOperation.on('click', function () {
  if (!userUtil.isLogin) {
    window.location.href = `/register/?return_url=${window.location.href}`;
  } else {
    const val = $(this).data('different');
    switch (val) {
      case 'free-receive':
        window.location.href = `${mVasDomain}/view-diagnosis/?imscid=R000058416`;
        break;
      case 'share-friends':
        if (Apps.isTd) {
          // 调起微信好友 朋友圈弹窗
          share4App({
            type: [15],
          });
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
        }
        break;
      case 'resume-adviser':
        window.location.href = `${mVasDomain}/view-intro?imscid=R000058417`;
        break;
      case 'interview-coach':
        window.location.href = `${mVasDomain}/view-coachintro/?utm_source=msjlzw&imscid=R000058418`;
        break;
      case 'career-consult':
        window.location.href = `${mVasDomain}/view-careerintro/?utm_source%EF%BC%9Dsxzx&imscid=R000058420`;
        break;
      case 'jobCard-service':
        window.location.href = `${domain('m-vap')}/view-intro/?utm_source=jkzw&imscid=R000058419`;
        break;
      default:
        break;
    }
  }
});
if (Apps.isTd) {
  share4App({
    type: [16],
    title: shareData.shareTitle,
    shareTitle: shareData.shareTitle,
    imgUrl: shareData.img,
    desc: shareData.desc,
    shareUrl: shareData.url,
    thumburl: shareData.img,
    mediaType: shareData.mediaType,
  });
} else if (Apps.isWx) {
  share({
    title: shareData.shareTitle,
    link: shareData.url,
    msgImg: shareData.img,
    desc: shareData.desc,
  });
}
