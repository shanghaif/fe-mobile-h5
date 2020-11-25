/*
 * 链接： https://m.liepin.com/brand/rise-salary/high-salary/
 * 2019-09-10 需求方：甘雨
 */
import share, { share4App } from '@liepin/share';
import domain from '@liepin/native-domain-fe';
import { RenderToPage } from '../../../lib/utils/utils';
import RiseSalaryBottom from '../../../components/business/event/brand.rise-salary.bottom/RiseSalaryBottom';
import { tuyere, firstSelect } from './modules/data';
import shareImg from './images/share.jpg';
import './index.less';

const { isTd } = Apps;
const topKey = 'brand_rise-salary_high-salary';
const tabKey = 'brand_rise-salary_high-salary.tab';

const $jobWrap = $('[data-selector="job-wrap"]');
let curIndex = 0;
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
function handleChangeTab() {
  $.ajax({
    url: '/brand/rise-salary/high-salary-industry.json',
    type: 'POST',
    data: {
      index: curIndex + 1,
    },
    success({ data, flag, msg }) {
      if (flag === 1) {
        $jobWrap.html(data.map((item) => `<li class="job-card-item"><dl><dt class="flexbox" data-selector="company-card" data-id="${item.compId}"><div class="flex-1"><p class="company-name ellipsis-1">${item.compName}</p><p class="company-location ellipsis-1">${item.compDqName}</p></div><img src="https://image0.lietou-static.com/huge_/${item.compLogo}" alt="" /></dt><dd><ul>${item.jobInfoList.map((job) => `<li class="flexbox" data-selector="job-card" data-id="${job.jobId}"><span class="job-title ellipsis-1">${job.jobTitle}</span><span class="job-salary flex-1 ellipsis-1">${job.jobSalaryShow}</span></li>`).join('')}</ul></dd></dl></li>`).join(''));
      } else {
        $.dialog.toast(msg);
      }
    },
  });
}
/* 填充数据结束 */
function recordPostion($ele) {
  sessionStorage.setItem(topKey, $ele.offset().top);
  curIndex && sessionStorage.setItem(tabKey, curIndex);
}
function resetPosition() {
  const top = sessionStorage.getItem(topKey);
  if (top) {
    $(window).scrollTop(top);
    sessionStorage.removeItem(topKey);
  }
  const CurIndex = sessionStorage.getItem(tabKey) | 0;
  if (CurIndex) {
    curIndex = CurIndex;
    $('[data-selector="tab-wrap"] li')
      .eq(CurIndex)
      .addClass('active')
      .siblings()
      .removeClass('active');
    sessionStorage.removeItem(tabKey);
  }
}
(function () {
  resetPosition();
  handleChangeTab();
  let { width } = document.querySelector('[data-selector="video-wrap"]').getBoundingClientRect();
  let w = Math.floor(width * 0.743284);
  let h = Math.floor(w * 0.56);
  $('#video').css({
    width: w,
    height: h,
  });
  window.polyvObject('#video').videoPlayer({
    width: w,
    height: h,
    vid: '2f0990bf80dec3054bbc76634f0eae8a_2',
  });
  /*
   * width = $('.beike-shortcut').width();
   * $('.beike-shortcut').html(`
   *   <div class="swiper-container" style="width: ${Ma
   * th.round(width * 0.706376)}px; height: ${Math.round(width * 0.474832)}px;">
   *     <div class="swiper-wrapper">
   *       <img src="${img}" class="swiper-slide"/>
   *       <img src="${img}" class="swiper-slide"/>
   *     </div>
   *   </div>
   * `);
   */
  // eslint-disable-next-line no-new,no-undef
  /*
   * new Swiper('.swiper-container', {
   *   autoplay: 2000,
   *   loop: true,
   * });
   */
  width = null;
  w = null;
  h = null;
}());

$('[data-selector="tuyere-wrap"]').html(tuyere.map((item) => (`<li data-selector="company-card" data-id="${item.id}"><dl><dt><img src="${item.logo}" alt="${item.title}"></dt><dd><p class="ellipsis-1">${item.title}</p><a href="javascript:;">查看更多职位</a></dd></dl></li>`)).join(''));

$('[data-selector="first-select"]').html(firstSelect.map((item) => `<li class="flexbox job-card-wrap" data-selector="job-card" data-id="${item.id}"><span class="job-title flex-1 ellipsis-1">${item.title}</span><span class="job-salary">${item.salary}</span><span class="job-icon"></span></li>`).join(''));

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
const $tabWrap = $('[data-selector="tab-wrap"]');
const $tab = $tabWrap.parent();
const TabTop = $tabWrap.offset().top;
const $win = $(window);
let timer = null;
$tabWrap.on('click', 'li', function () {
  const $this = $(this);
  if (!$this.hasClass('active')) {
    curIndex = $this.index();
    $this.addClass('active').siblings().removeClass('active');
    handleChangeTab();
  }
});
function handleScroll() {
  if ($win.scrollTop() >= TabTop) {
    $tab.addClass('fixed-tab-wrap');
    $jobWrap.addClass('fixed-job-wrap');
  } else {
    $jobWrap.removeClass('fixed-job-wrap');
    $tab.removeClass('fixed-tab-wrap');
  }
}
$win.on('scroll', function () {
  timer && clearTimeout(timer);
  timer = setTimeout(handleScroll, 16);
});
// 分享设置
const shareData = {
  shareTitle: '互联网人秋季的涨薪机会！',
  url: `${domain('m')}/brand/rise-salary/high-salary/?imscid=R000058365`,
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
