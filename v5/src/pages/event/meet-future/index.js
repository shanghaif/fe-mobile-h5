/**
 * 页面：遇见未来-品牌活动页
 * 链接：https://m.liepin.com/brand/index/
 */
import share, { share4App } from '@liepin/share';
import './index.less';

const $root = $('.meet-future-container');

// 去职位详情页
$('[data-selector="go-job-page"]', $root).on('click', function () {
  const $this = $(this);
  const jobId = $this.data('id');
  // 跳转到原生职位详情页
  if (Apps.isTd) {
    const index = $this.index();
    const jobKind = '2';
    share4App({
      type: [9],
      jobKind, // 职位类型
      jobId, // 职位ID
      asFrom: 'special_activity_2019_ebusiness', // 跳转职位详情页来源
      selectIndex: index,
    });
  } else {
    window.location.href = `/job/19${jobId}.shtml?d_sfrom=special_activity_2019_ebusiness`;
  }
});

// 去企业主页
$('[data-selector="go-company-page"]', $root).on('click', function () {
  const $this = $(this);
  const companyId = $this.data('id');
  if (Apps.isTd) {
    share4App({
      type: [12],
      entityId: '',
      cid: companyId,
    });
  } else {
    window.location.href = `/company/${companyId}/`;
  }
});

const shareImg = require('./images/share.jpg');
// 分享设置
const shareData = {
  shareTitle: '6-7月融资上市公司招聘专场',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '抓住机遇，迎接更好的未来',
  mediaType: 0,
  thumburl: `https:${shareImg}`,
};

if (Apps.isTd) {
  share4App({
    type: [17, 16],
    showshare: true,
    title: shareData.title,
    shareTitle: shareData.shareTitle,
    imgUrl: shareData.img,
    shareUrl: shareData.url,
    desc: shareData.desc,
    mediaType: shareData.mediaType,
    thumburl: shareData.img,
  });
} else if (Apps.isWx) {
  share({
    title: shareData.shareTitle,
    link: shareData.url,
    msgImg: shareData.img,
    desc: shareData.desc,
  });
}
