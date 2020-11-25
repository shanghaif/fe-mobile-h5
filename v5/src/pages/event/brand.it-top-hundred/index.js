/*
 * 链接： https://m.liepin.com/brand/it-top-hundred
 * 2019-08-26 需求方：甘雨
 */
import share, { share4App } from '@liepin/share';
import list from './module/data';
import shareImg from './images/share.jpg';
import './index.less';

const { isTd } = Apps;
const topKey = 'brand_it-top-hundred';
const redirectToCompany = (function () {
  if (isTd) {
    return function (cid) {
      share4App({
        type: [12],
        entityId: '',
        cid,
      });
    };
  }
  return function (id) {
    window.location.href = `/company/${id}/`;
  };
}());


/* 填充数据结束 */
function recordPostion($ele) {
  sessionStorage.setItem(topKey, $ele.offset().top);
}
function resetPosition() {
  const top = sessionStorage.getItem(topKey);
  top && $(window).scrollTop(top);
}
resetPosition();

// 职位、公司主页跳转
$('.company-list-wrap ul')
  .on('click', '[data-selector="company-card"]', function () {
    const $this = $(this);
    const id = $this.attr('data-id');
    recordPostion($this);
    redirectToCompany(id);
  })
  .html(list.map((comp) => (`<li data-selector="company-card" data-id="${comp.id}"><dl><dt><img src="${comp.logo}" alt=""></dt><dd><p class="ellipsis-1">${comp.title}</p><label>查看职位</label></dd></dl></li>`)).join(''));
// 分享设置
const shareData = {
  shareTitle: '互联网TOP100企业招聘专场',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '邀你一起去互联网行业，最有钱的公司去看看',
  mediaType: 0,
};

if (Apps.isTd) {
  share4App({
    type: [17, 16],
    showshare: true,
    title: shareData.shareTitle,
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

