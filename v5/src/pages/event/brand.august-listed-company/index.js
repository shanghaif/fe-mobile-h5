/*
 * 链接：https://m.liepin.com/brand/august-listed-company
 * 2019-8-19 白云飞、品牌活动
 */
import share, { share4App } from '@liepin/share';
import { TOP, LATEST } from './module/data';
import shareImg from './images/share.jpg';
import './index.less';

const { isTd } = Apps;
const topKey = 'brand_august-listed-company';

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
        asFrom: 'special_activity_201908_ipo', // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  return function (jobId) {
    window.location.href = `/job/19${jobId}.shtml`;
  };
}());

function recordPostion($ele) {
  sessionStorage.setItem(topKey, $ele.offset().top);
}
function resetPosition() {
  const top = sessionStorage.getItem(topKey);
  if (top) {
    $(window).scrollTop(top);
    sessionStorage.removeItem(topKey);
  }
}

/* 填充数据开始 */
// top
$('[data-selector="top-wrap"]').html(TOP.map((item) => (`
<li>
  <dl>
    <dt class="flexbox" data-selector="company-card" data-info="%7B%22compId%22%3A%22${item.id}%22%7D" data-id="${item.id}">
      <div class="img-wrap">
        <img src="${item.logo}" alt="">
      </div>
      <div class="flex-1 comp-info-wrap">
        <p class="comp-name">${item.title}</p>
        <p class="comp-desc"><i></i>${item.desc}</p>
        <div class="flexbox label-wrap">${item.tags.map((tag) => `<label>${tag}</label>`).join('')}</div>
      </div>
    </dt>
    <dd>
      ${item.jobs.map((job) => (`
        <div class="flexbox job-item" data-selector="job-card" data-info="%7B%22jobId%22%3A%22${job.id}%22%7D" data-id="${job.id}">
          <div class="flex-1 job-info-wrap">
            <p class="job-title ellipsis-1">${job.title}</p>
            <p class="flexbox job-info"><i></i><span>${job.dq}</span><span class="split-symbol"></span><span>${job.edu}</span></p>
          </div>
          <div class="job-salary">${job.salary}</div>
        </div>
      `)).join('')}
    </dd>
  </dl>
</li>`)).join(''));
// latest
$('[data-selector="latest-wrap"]').html(LATEST.map((item) => (`
<li data-selector="company-card" data-info="%7B%22compId%22%3A%22${item.id}%22%7D" data-id="${item.id}">
  <dl>
    <dt>
      <img src="${item.logo}" alt="">
    </dt>
    <dd>
      <h4 class="ellipsis-1">${item.title}</h4>
      <p class="ellipsis-2 desc">${item.desc}</p>
      <a href="javascript:;">查看在招职位</a>
    </dd>
  </dl>
</li>
`)).join(''));
resetPosition();

// 职位、公司主页跳转
$('body')
  .on('click', '[data-selector="job-card"]', function () {
    const $this = $(this);
    const id = $this.attr('data-id');
    recordPostion($this);
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
  shareTitle: '8月融资上市公司招聘专场',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '预见未来，抓住机遇',
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

