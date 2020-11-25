/**
 * https://m.liepin.com/brand/rise-salary/hunter-and-boss/
 */
import share, { share4App } from '@liepin/share';
import domain from '@liepin/native-domain-fe';
import { hunterData, bossData } from './constant/data';
import { RenderToPage } from '../../../lib/utils/utils';
import RiseSalaryBottom from '../../../components/business/event/brand.rise-salary.bottom/RiseSalaryBottom';
import './index.less';
import shareImg from '../brand.rise-salary.high-salary/images/share.jpg';

const $bossBox = $('.boss-box');
const $hunterBox = $('.hunter-box');

// $('.salary-hunter-container').append(botTpl.render());
RenderToPage({ component: RiseSalaryBottom });

let bossHtml = '';
let hunterHtml = '';
bossData.forEach((item, index) => {
  bossHtml += `
                <div class="job-container ${index === 0 ? 'job-container-special' : ''}">
                  <dl class="job-box">
                    <dt class="boss-bg boss-${index}"></dt>
                    <dd>
                      <a class="flexbox company-welfare" href="/company/${item.id}/" data-selector="jump-companyPage" data-id="${item.id}">
                        <div class="welfare-content">
                          <p>${item.name}</p>
                          ${
  item.welfare.map((val) => (
    `<span>${val}</span>`
  )).join('')
}
                        </div>
                        <img class="welfare-logo" src="${item.logo}" alt=""/>
                      </a>
                    </dd>
                    <dd>
                      <ul class="job-list">
                      ${
  item.list.map((val, valIndex) => (
    `<li class="job-item">
                            <a href="${val.link}" class="flexbox job-content" data-selector="jump-companyDetail" data-id="${val.jobId}" data-index="${valIndex}">
                              <div class="job-name">
                                  <p>${val.job}</p>
                                  <p>
                                    <span>${val.position}</span>
                                    <span> | ${val.year}</span>
                                  </p>
                                </div>
                                <div class="job-salary">${val.salary}</div>
                            </a>
                            </li>`
  )).join('')
}
                      </ul>
                    </dd>
                  </dl>
                  <dl class="line"></dl>
                </div>
  `;
});

hunterData.forEach((item, index) => {
  hunterHtml += `
  <div class="job-container ${index === 0 ? 'job-container-special' : ''}">
        <dl class="hunter-info flexbox-v">
          <dt>
            <a href="/a/LT${item.id}/" data-selector="jump-hunterPage" data-id="${item.id}"><img src="${item.logo}" alt=""></a>
          </dt>
          <dd class="hunter-name">${item.name}</dd>
          <dd class="hunter-company">${item.job} | ${item.company}</dd>
          <dd class="hunter-service">应聘查看率： ${item.application} 服务人数： ${item.feedback}</dd>
        </dl>
        <dl class="hunter-recommend-list">
            <ul class="job-list">
            ${
  item.list.map((val, i) => (
    `<li class="job-item">
                  <a href="${val.link}" class="flexbox job-content" data-selector="jump-hunterDetail" data-id="${val.jobId}" data-index="${i}">
                    <div class="job-name">
                        <p>${val.job}</p>
                        <p>
                          <span>${val.position}</span>
                          <span> | ${val.year}</span>
                        </p>
                      </div>
                      <div class="job-salary">${val.salary}</div>
                  </a>
                  </li>`
  )).join('')
}
              </ul>
        </dl>
      </div>`;
});

$bossBox.html(bossHtml);
$hunterBox.html(hunterHtml);


// 分享设置
const shareData = {
  shareTitle: '互联网人秋季的涨薪机会！',
  url: `${domain('m')}/brand/rise-salary/hunter-and-boss/?imscid=R000058365`,
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
  $('.boss-container a, .hunter-container a').attr('href', 'javascript:;');
  $('[data-selector="jump-companyPage"]').on('click', function () {
    const cid = $(this).data('id');
    share4App({
      bridgeType: 'companyDetail',
      params: {
        cid,
        subJobKind: '0',
      },
    });
  });
  $('[data-selector="jump-hunterPage"]').on('click', function () {
    const userId = $(this).data('id');
    share4App({
      bridgeType: 'otherHomePage',
      params: {
        userId,
        userType: '2',
      },
    });
  });
  $('[data-selector="jump-companyDetail"]').on('click', function () {
    const jobId = $(this).data('id');
    const selectIndex = $(this).data('index');
    share4App({
      type: [9],
      jobKind: '2', // 职位类型
      jobId, // 职位ID
      asFrom: 'special_activity_201909_hardcore', // 跳转职位详情页来源
      selectIndex,
    });
  });
  $('[data-selector="jump-hunterDetail"]').on('click', function () {
    const jobId = $(this).data('id');
    const selectIndex = $(this).data('index');
    share4App({
      type: [9],
      jobKind: '1', // 职位类型
      jobId, // 职位ID
      asFrom: 'special_activity_201909_hardcore', // 跳转职位详情页来源
      selectIndex,
    });
  });
} else if (Apps.isWx) {
  share({
    title: shareData.shareTitle,
    link: shareData.url,
    msgImg: shareData.img,
    desc: shareData.desc,
  });
}
