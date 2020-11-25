/*
 * 链接：https://m.liepin.com/brand/fifth-generation-summer
 * 2019-8-12 牟海涛、品牌活动
 */
import share, { share4App } from '@liepin/share';
import { HOT, TOP, BIG } from './module/data';
import shareImg from './images/share.jpg';
import './index.less';

const { isTd } = Apps;
const topKey = 'brand_fifth-generation-summer_top';
const tabKey = 'brand_fifth-generation-summer_tab';

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
        asFrom: '', // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  return function (jobId) {
    window.location.href = `/job/19${jobId}.shtml`;
  };
}());

/* 填充数据开始 */
// top
$('[data-selector="top-wrap"]').html(TOP.map((item) => (`<li>
<dl data-selector="company-card" data-id="${item.id}">
  <dt>
    <img src="${item.logo}" alt="">
  </dt>
  <dd>
    <h5 class="ellipsis-1">${item.title}</h5>
    <div class="label-wrap">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
    <a href="javascript:;">查看在招职位</a>
  </dd>
</dl>
</li>`)).join(''));
// big
$('[data-selector="big-wrap"]').html(BIG.map((item) => (`<li>
<dl data-selector="company-card" data-id="${item.id}">
  <dt>
    <img src="${item.logo}" alt="">
  </dt>
  <dd>
    <h5 class="ellipsis-1">${item.title}</h5>
    <p class="ellipsis-3 desc">${item.desc}</p>
    <a href="javascript:;">查看在招职位</a>
  </dd>
</dl>
</li>`)).join(''));
// hot
let tabHtml = '';
let listHtml = '';
HOT.forEach((function (item, index) {
  tabHtml += `<li class="flex-1${index === 0 ? ' active' : ''}"><a href="javascript:;">${item.tab}</a></li>`;
  listHtml += `<ul ${index === 0 ? 'class="active"' : ''}>
    ${item.jobs.map((job) => (`
      <li class="flexbox" data-selector="job-card" data-id="${job.jobId}">
        <img src="${job.logo}" alt="">
        <div class="flex-1 job-info-wrap">
          <p class="company-name ellipsis-1">${job.company}</p>
          <p class="job-name ellipsis-1">${job.job}</p>
          <p class="job-info ellipsis-1">${job.dq} | ${job.edu}</p>
        </div>
        <div class="job-salary">${job.salary}</div>
      </li>
    `)).join('')}</ul>`;
}));

let $tab = $('[data-selector="tab-wrap"]');

$tab.html(tabHtml);
$('[data-selector="list-wrap"]').html(listHtml);
tabHtml = '';
listHtml = '';
const $tabLi = $tab.find('li');
const $list = $('[data-selector="list-wrap"] ul');
function handleTabClick() {
  const $this = $(this);
  if ($this.hasClass('active')) {
    return false;
  }
  const index = $tabLi.indexOf(this);
  $this.addClass('active').siblings().removeClass('active');
  $list.eq(index).addClass('active').siblings().removeClass('active');
}
function recordPostion($ele, tab) {
  sessionStorage.setItem(topKey, $ele.offset().top);
  tab && sessionStorage.setItem(tabKey, tab);
}
function resetPosition() {
  const top = sessionStorage.getItem(topKey);
  if (top) {
    $(window).scrollTop(top);
    sessionStorage.removeItem(topKey);
  }

  const tab = sessionStorage.getItem(tabKey);
  if (tab) {
    handleTabClick.call($tabLi.get(tab));
    sessionStorage.removeItem(tabKey);
  }
}
resetPosition();
$tab.on('click', 'li', handleTabClick);
$tab = null;

// 职位、公司主页跳转
$('body')
  .on('click', '[data-selector="job-card"]', function () {
    const $this = $(this);
    const id = $this.attr('data-id');
    const $parent = $this.parent().parent();
    const tab = $parent.attr('data-selector') === 'list-wrap' ? $tabLi.index($tabLi.filter('.active')) : 0;
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
  shareTitle: '5G，引爆这个夏天',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '中国的5G，世界的5G',
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

