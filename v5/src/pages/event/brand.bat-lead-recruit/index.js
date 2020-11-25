import share, { share4App } from '@liepin/share';
import { singleList, baiduList, tencentList, aliList, centerList } from './module/data';
import animateSwiper from './module/animate-swiper';
import shareImg from './images/share.jpg';
import './index.less';

const { isTd } = Apps;
const topKey = 'brand_bat-lead-recruit_top';
const tabKey = 'brand_bat-lead-recruit_tab';

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
        asFrom: 'special_activity_2019_bat_lt', // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  return function (jobId) {
    window.location.href = `/job/19${jobId}.shtml`;
  };
}());

/* 填充数据开始 */
// c位
$('[data-selector="center-company-wrap"]').html(centerList.map((item, index) => (`<li class="center-company-card center-company-card${index}"><div class="flexbox info-wrap" data-selector="company-card" data-id="${item.id}"><img src="https://image0.lietou-static.com/huge_/${item.logo}" alt=""/><div class="flex-1"><p class="company-name">${item.company}</p><div class="label-wrap">${item.welfare.map((label) => (`<label>${label}</label>`)).join('')}</div></div></div><p class="desc ellipsis-2" data-selector="company-card" data-id="${item.id}">${item.overview}</p><div class="center-job-list">${item.job.map((job) => (`<div class="center-job-card" data-selector="job-card" data-id="${job.id}"><p class="flexbox"><span class="flex-1">${job.title}</span><span class="salary">${job.salary}</span></p><p>${job.dq} | ${job.edu}</p></div>`)).join('')}</div></li>`)).join(''));
// 阿里领投
$('[data-selector="ali-wrap"]').html(aliList.map((item) => (`<li data-selector="company-card" data-id="${item.id}"><dl><dt><img src="https://image0.lietou-static.com/huge_/${item.logo}" alt=""></dt><dd><p class="ellipsis-1 company-name">${item.company}</p><p class="ellipsis-1 general-desc">${item.field}</p><p class="ellipsis-1 general-desc">${item.desc}</p><a href="javascript:;">点击查看详情</a></dd></dl></li>`)).join(''));
// 腾讯领投
$('[data-selector="tencent-wrap"]').html(tencentList.map((item) => (`<li data-selector="company-card" data-id="${item.id}"><dl><dt><img src="https://image0.lietou-static.com/huge_/${item.logo}" alt=""></dt><dd><p class="ellipsis-1 company-name">${item.company}</p><p class="ellipsis-1 general-desc">${item.field}</p><p class="ellipsis-1 general-desc">${item.desc}</p><a href="javascript:;">点击查看详情</a></dd></dl></li>`)).join(''));
// 百度领投
$('[data-selector="baidu-wrap"]').html(baiduList.map((item) => (`<li data-selector="company-card" data-id="${item.id}"><dl><dt><img src="https://image0.lietou-static.com/huge_/${item.logo}" alt=""></dt><dd><p class="ellipsis-1 company-name">${item.company}</p><p class="ellipsis-1 general-desc">${item.field}</p><p class="ellipsis-1 general-desc">${item.desc}</p><a href="javascript:;">点击查看详情</a></dd></dl></li>`)).join(''));
// 单点突破
let tabHtml = '';
let listHtml = '';
singleList.forEach((function (item, index) {
  tabHtml += `<li ${index === 0 ? 'class="active"' : ''}><a href="javascript:;">${item.tab}</a></li>`;
  listHtml += `<ul ${index === 0 ? 'class="active"' : ''}>${item.job.map((job) => (`<li class="flexbox" data-selector="job-card" data-id="${job.id}"><img src="https://image0.lietou-static.com/huge_/${job.logo}" alt=""><div class="job-info-wrap"><p class="flexbox company-name"><span class="flex-1 ellipsis-1">${job.title}</span><span class="salary-desc">${job.salary}</span></p><p class="ellipsis-1">${job.company}</p><p class="ellipsis-1">${job.dq} | ${job.edu}</p></div></li>`)).join('')}</ul>`;
}));
$('[data-selector="single-wrap"]').append('<ul class="tab-wrap" data-selector="tab">$tab</ul><div class="job-wrap" data-selector="job-slide">$list</div>'.replace('$tab', tabHtml).replace('$list', listHtml));

/* 填充数据结束 */
// 单点突破
let $tab = $('[data-selector="tab"]');
const $icon = $('.decorate-left-top');
const $tabLi = $tab.find('li');
const $jobUl = $('[data-selector="job-slide"] ul');
tabHtml = null;
listHtml = null;
function handleTabClick() {
  const $this = $(this);
  if ($this.hasClass('active')) {
    return false;
  }
  const index = $tabLi.indexOf(this);
  $icon[index ? 'hide' : 'show']();
  $tabLi.removeClass('active');
  $this.addClass('active');
  $jobUl.eq(index).addClass('active').siblings().removeClass('active');
}
function recordPostion($ele, tab) {
  sessionStorage.setItem(topKey, $ele.offset().top);
  tab && sessionStorage.setItem(tabKey, tab);
}
function resetPosition() {
  const top = sessionStorage.getItem(topKey);
  top && $(window).scrollTop(top);
  const tab = sessionStorage.getItem(tabKey);
  tab && handleTabClick.call($tabLi.get(tab));
}
animateSwiper();
resetPosition();
$tab.on('click', 'li', handleTabClick);

$tab = null;

// 职位、公司主页跳转
$('.main-wrap')
  .on('click', '[data-selector="job-card"]', function () {
    const $this = $(this);
    const id = $this.attr('data-id');
    const $parent = $this.parent().parent();
    const tab = $parent.attr('data-selector') === 'job-slide' ? $tabLi.index($tabLi.filter('.active')) : 0;
    recordPostion($this, tab);
    redirectToJob(id);
  })
  .on('click', '[data-selector="company-card"]', function () {
    const $this = $(this);
    const id = $this.attr('data-id');
    recordPostion($this);
    redirectToCompany(id);
  });
// 分享设置
const shareData = {
  shareTitle: '中国BAT领投公司招聘专场',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '紧跟行业趋势，把握新机遇',
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

