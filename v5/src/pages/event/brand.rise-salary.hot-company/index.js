/*
 * 链接： https://m.liepin.com/brand/rise-salary/hot-company/
 * 2019-09-10 需求方：甘雨
 */
import share, { share4App } from '@liepin/share';
import domain from '@liepin/native-domain-fe';
import { RenderToPage } from '../../../lib/utils/utils';
import RiseSalaryBottom from '../../../components/business/event/brand.rise-salary.bottom/RiseSalaryBottom';
import { foreign, hardCore, welfare, ninety } from './modules/data';
import shareImg from '../brand.rise-salary.high-salary/images/share.jpg';
import './index.less';

const { isTd } = Apps;
const topKey = 'brand_rise-salary_hot-company';
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

const redirectToJob = (function () {
  if (isTd) {
    return function (jobId, index) {
      share4App({
        type: [9],
        jobKind: '2', // 职位类型
        jobId, // 职位ID
        asFrom: 'special_activity_201909_hardcore', // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  return function (jobId) {
    window.location.href = `/job/19${jobId}.shtml?d_sfrom=special_activity_201909_hardcore`;
  };
}());

/* 填充数据结束 */
function recordPostion($ele) {
  sessionStorage.setItem(topKey, $ele.offset().top);
}
function resetPosition() {
  const top = sessionStorage.getItem(topKey);
  if (top) {
    sessionStorage.removeItem(topKey);
    $(window).scrollTop(top);
  }
}

RenderToPage({ component: RiseSalaryBottom });
// 职位、公司主页跳转
$('body')
  .on('click', '[data-selector="company-card"]', function () {
    const $this = $(this);
    const id = $this.attr('data-id');
    recordPostion($this);
    redirectToCompany(id);
  })
  .on('click', '[data-selector="job-card"]', function () {
    const $this = $(this);
    const id = $this.attr('data-id');
    recordPostion($this);
    redirectToJob(id, $this.index());
  });
$('[data-selector="union-items"] a').on('click', function () {
  recordPostion($(this));
});

$('[data-selector="ninety-wrap"]').html(ninety.map((item) => `<li><div class="company-part flexbox" data-selector="company-card" data-id="${item.id}"><div class="flex-1 company-info"><h5 class="ellipsis-1">${item.title}</h5><p class="ellipsis-1">${item.dq} | ${item.industry}</p></div><img src="${item.logo}" alt="${item.title}"/></div><p class="company-desc">${item.desc}</p><div class="label-wrap clearfix">${item.tags.map((tag) => `<label>${tag}</label>`).join('')}</div><div class="job-list">${item.jobs.map((job) => `<div class="flexbox job-card-item" data-selector="job-card" data-id="${job.id}"><div class="flex-1 job-info"><p class="job-title ellipsis-1">${job.title}</p><p class="job-condition ellipsis-1">${job.dq} | ${job.workage}</p></div><div class="job-salary">${job.salary}</div></div>`).join('')}</div></li>`).join(''));

$('[data-selector="welfare-wrap"]').html(welfare.map((item) => `<li><dl data-selector="company-card" data-id="${item.id}"><dt><img src="${item.logo}" alt="${item.title}" /></dt><dd><h5 class="ellipsis-1">${item.title}</h5><div class="welfare-wrap clearfix">${item.tags.map((tag) => `<label><p class="ellipsis-1">${tag}</p></label>`).join('')}</div><a href="javascript:;">查看更多职位</a></dd></dl></li>`).join(''));

$('[data-selector="hard-core-company-wrap"]').html(hardCore.map((item) => `<li><dl data-selector="company-card" data-id="${item.id}"><dt><img src="${item.logo}" alt="${item.title}" /></dt><dd><h5 class="ellipsis-1">${item.title}</h5><p class="ellipsis-1">${item.desc}</p><a href="javascript:;">查看更多职位</a></dd></dl></li>`).join(''));

$('[data-selector="foreign-company-wrap"]').html(foreign.map((item) => `<li><dl data-selector="company-card" data-id="${item.id}"><dt><img src="${item.logo}" alt="${item.title}" /></dt><dd><h5 class="ellipsis-1">${item.title}</h5><p class="ellipsis-1">${item.desc}</p><a href="javascript:;">查看更多职位</a></dd></dl></li>`).join(''));

resetPosition();

// 分享设置
const shareData = {
  shareTitle: '互联网人秋季的涨薪机会！',
  url: `${domain('m')}/brand/rise-salary/hot-company/?imscid=R000058365`,
  img: `https:${shareImg}`,
  desc: '来猎聘硬核涨薪季，薪资你说的算！',
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
