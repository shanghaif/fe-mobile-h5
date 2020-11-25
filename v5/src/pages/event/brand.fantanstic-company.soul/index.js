import share, { share4App } from '@liepin/share';
import shareImg from './images/share.jpg';
import './index.less';

const jobList = [{
  title: '数据开发工程师',
  id: '21600623',
  dq: '上海',
  salary: '29-45万',
  edu: '2年以上',
}, {
  title: '安卓架构师',
  id: '21600797',
  dq: '上海',
  salary: '32-56万',
  edu: '5年以上',
}, {
  title: '网络短视频拍摄',
  id: '22314731',
  dq: '上海',
  salary: '7-13万',
  edu: '经验不限',
}, {
  title: '后端开发工程师',
  id: '21600393',
  dq: '上海',
  salary: '32-56万',
  edu: '3年以上',
}, {
  title: '音视频开发工程师',
  id: '21600635',
  dq: '上海',
  salary: '24-48万',
  edu: '1年以上',
}, {
  title: 'ios leader',
  id: '21600723',
  dq: '上海',
  salary: '40-64万',
  edu: '5年以上',
}];

const { isTd } = Apps;
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
        asFrom: 'special_activity_2019_ai', // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  return function (jobId) {
    window.location.href = `/job/19${jobId}.shtml`;
  };
}());

let { width, height } = document.querySelector('.video-inner').getBoundingClientRect();
window.polyvObject('#plv_2f0990bf800e7e6869f6b2eb78ec0663_2').videoPlayer({
  width,
  height,
  vid: '2f0990bf800e7e6869f6b2eb78ec0663_2',
});

width = null;
height = null;

$('[data-selector="job-wrap"]').html(jobList.map(function (item) {
  return `
    <li data-id="${item.id}" data-selector="job-card">
      <div class="flexbox top-part">
        <span class="job-name ellipsis-1">${item.title}</span>
        <span class="job-salary">${item.salary}</span>
      </div>
      <div class="flexbox bot-part">
        <span class="job-dq ellipsis-1">${item.dq} | ${item.edu}</span>
        <span class="job-icon"></span>
      </div>
    </li>
  `;
}).join(''));
$('[data-selector="job-card"]').on('click', function () {
  redirectToJob(this.getAttribute('data-id'));
});
$('[data-selector="more-btn"]').on('click', function () {
  redirectToCompany(this.getAttribute('data-id'));
});
// 分享设置
const shareData = {
  shareTitle: '猎奇超能所之揭秘Soul',
  url: window.location.href,
  img: `https:${shareImg}`,
  desc: '跟随灵魂找到你',
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

