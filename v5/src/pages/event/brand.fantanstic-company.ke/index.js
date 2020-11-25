/*
 * 链接： https://m.liepin.com/brand/fantanstic-company/ke
 * 2019-08-30 需求方：牟海涛
 */
import share, { share4App } from '@liepin/share';
import shareImg from './images/share.jpg';
import './index.less';

const list = [{ title: '图数据库高级工程师', id: '22690717', salary: '30-60万', edu: '5年以上', dq: '北京' }, { title: '智能硬件产品经理', id: '22485147', salary: '32-64万 ', edu: '5年以上', dq: '北京' }, { title: '资深前端工程师', id: '19036871', salary: '45-90万', edu: '5年以上', dq: '北京' }, { title: '资深Java工程师', id: '20827685', salary: '48-84万 ', edu: '5年以上', dq: '北京' }, { title: '安全架构师', id: '22124169', salary: '48-80万', edu: '5年以上', dq: '北京' }, { title: '对话策略算法工程师', id: '22478509', salary: '48-96万', edu: '5年以上', dq: '北京' }];

const { isTd } = Apps;
const topKey = 'brand_demo';
const redirectToJob = (function () {
  if (isTd) {
    return function (jobId, index) {
      share4App({
        type: [9],
        jobKind: '2', // 职位类型
        jobId, // 职位ID
        asFrom: '', // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  return function (jobId) {
    window.location.href = `/job/19${jobId}.shtml`;
  };
}());

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
function recordPostion() {
  sessionStorage.setItem(topKey, $(window).scrollTop());
}
function resetPosition() {
  const top = sessionStorage.getItem(topKey);
  top && $(window).scrollTop(top);
}
resetPosition();
(function () {
  let { width } = document.documentElement.getBoundingClientRect();
  let w = Math.floor(width * 0.88);
  let h = Math.floor(width * 0.494269);
  $('#video').css({
    width: `${w}px`,
    height: `${h}px`,
  });
  window.polyvObject('#video').videoPlayer({
    width: w,
    height: h,
    vid: '2f0990bf807e1e129cd8da8214454ca8_2',
  });
  width = null;
  w = null;
  h = null;
}());
// 职位、公司主页跳转
$('[data-selector="job-section"]')
  .on('click', '[data-selector="job-card"]', function () {
    const id = $(this).attr('data-id');
    recordPostion();
    redirectToJob(id);
  })
  .html(list.map((job) => `<li data-selector="job-card" data-id="${job.id}"><div class="li-top flexbox"><p class="flex-1">${job.title}</p><p class="job-salary">${job.salary}</p></div><div class="li-bot flexbox"><p class="flex-1 job-info"><span>${job.dq}</span><span class="split-symbol"></span><span>${job.edu}</span></p><p class="job-icon"></p></div></li>`).join(''));

$('body').on('click', '[data-selector="company-card"]', function () {
  const id = $(this).attr('data-id');
  recordPostion();
  redirectToCompany(id);
});
// 分享设置
const shareData = {
  shareTitle: '猎奇超能所之揭秘贝壳找房',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '贝壳一手内幕大曝光',
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

