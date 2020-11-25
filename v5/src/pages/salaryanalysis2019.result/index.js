import React from 'react';
import '@liepin/react-violet-h5/lib/index.css';
import domain from '@liepin/native-domain-fe';
import { share4App } from '@liepin/share';
import { Message } from '@liepin/react-violet-h5';

import Biz from './modules/biz';

import './index.less';

const $parent = $('.salary-report-container');
const { keyword = '' } = window.$CONFIG || {};
// 薪资
(function () {
  const { percent, percent: { datas } } = window.$CONFIG || {};
  if (datas) {
    const $wrap = document.querySelector('[data-selector="canvas-wrap"]');
    const $canvas = $wrap.querySelector('canvas');
    const $i = $wrap.querySelector('i');
    const {
      width,
      height,
    } = $canvas.getBoundingClientRect();
    $canvas.width = 2 * width;
    $canvas.height = 2 * height;
    const ctx = $canvas.getContext('2d');
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.font = '24px PingFang, "Microsoft YaHei", Heiti, SimSun, "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText('50%同行', 74, height - 20);
    ctx.lineWidth = 4;
    ctx.fillStyle = '#999';
    let startx = 30;
    const starty = height - 4;
    const target = 2 * width;
    const split = 6;
    const total = target - startx;
    const x1 = startx + total * 0.148;
    const y1 = 2 * height - split;
    const x2 = startx + total * (1 - 0.148);
    const y2 = split;
    const lineW = 12;
    while (startx < target) {
      ctx.beginPath();
      ctx.moveTo(startx, starty);
      startx += lineW;
      ctx.lineTo(startx, starty);
      startx += split;
      ctx.closePath();
      ctx.strokeStyle = 'rgba(112,112,112)';
      ctx.stroke();
    }
    const gradient = ctx.createLinearGradient(x1, 0, x2, 0);
    gradient.addColorStop(0, '#f64');
    gradient.addColorStop(1, '#f64');
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    const p1 = [x1, y1];
    const c1 = [x1 + (x2 - x1) * 0.6, y1];
    const c2 = [x1 + (x2 - x1) * 0.4, y2];
    const p2 = [x2, y2];
    let word = null;
    const me = 2 * Math.round(((percent.me.percent - 0) / 100) * 100);
    Biz.getBezierPoints(200, p1, c1, c2, p2).forEach((d, i) => {
      const p = d.map(e => parseInt(e, 10));
      ctx.lineTo(p[0], p[1]);
      i === me && (word = p);
    });
    ctx.moveTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    const { height: ih, width: iw } = $i.getBoundingClientRect();
    $i.style.top = `${(word[1] - ih) / 2 - 15}px`;
    $i.style.left = `${word[0] / 2 - iw + 30}px`;
    $i.style.visibility = 'visible';
  }
}());


// 高薪行业雪饼图
const industryChart = window.echarts.init(document.getElementById('echarts-industry-distribution'));
const industryOption = {
  tooltip: {
    show: false,
  },
  color: ['#ef6340', '#4dbfe3', '#f9c747', '#d24c57', '#5857c0'],
  stillShowZeroSum: false,
  animation: false,
  hoverAnimation: false,
  silent: true,
  series: [
    {
      name: '薪资',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '55%'],
      labelLine: {
        normal: {
          length: 20,
          length2: 50,
        },
      },
      label: {
        normal: {
          textStyle: {
            color: '#fff',
          },
          formatter: '{b}\n',
          lineHeight: 20,
          padding: [0, -50],
          rich: {},
        },
      },
      itemStyle: {
        normal: {
          borderColor: '#333646',
          borderWidth: 15,
          label: {
            show: true,
            position: 'outer',
          },
          textStyle: {
            fontSize: 12,
            color: '#fff',
          },
          formatter: '{d}%',
        },
      },
      data: window.$CONFIG.compNatureDistribute,
    },
    {
      name: '薪资',
      type: 'pie',
      radius: ['30%', '70%'],
      center: ['50%', '55%'],
      data: window.$CONFIG.compNatureDistribute,
      label: {
        normal: {
          show: true,
          position: 'inner',
          textStyle: {
            fontSize: 12,
            color: '#fff',
          },
          formatter: (d) => {
            const val = parseInt(d.percent, 10);
            return `${val}%`;
          },
        },
      },
      itemStyle: {
        borderColor: '#333646',
        borderWidth: 2,
      },
    },
  ],
};
industryChart.setOption(industryOption);


// 高薪职位要求技能标签
function animate(number, dom) {
  let speed = 0;
  const timer = setInterval(() => {
    speed += 1;
    dom.text(`${speed}%`);
    if (speed >= number) {
      speed = number;
      clearInterval(timer);
    }
  }, 20);
}
(function () {
  const skillPercent = window.$CONFIG.skillTagDistribute || [];
  $('.salary-skill-label ul').html(skillPercent.map((item, index) => (
    `<li class="flexbox">
    <span>${item.name}</span>
    <div class="skill-item">
      <div class="skill-${index}"><span/></div> 
    </div>
   </li>`
  )).join(''));
  for (let i = 0; i < skillPercent.length; i++) {
    const dom = $(`.skill-${i}`);
    const spanDom = $(`.skill-${i} span`);
    setTimeout(() => {
      dom.css({
        width: `${skillPercent[i].value}%`,
      });
    }, 0);
    animate(skillPercent[i].value, spanDom);
  }
}());

// 推荐机会
$.ajax({
  url: `${domain('m-c')}/activity/picked-job.json`,
  dataType: 'jsonp',
  success({ data, flag }) {
    if (flag === 1 && data.jobList && data.jobList.length) {
      const html = `
      <section class="match-salary-chance">
          <h3 class="salary-title">匹配的涨薪机会</h3>
          <ul class="match-job-container">
            ${
  data.jobList.splice(0, 5).map((item, i) => (
    ` <li
        data-selector="go-recommend-detail"
        data-link=${item.link}
        data-index=${i}
        data-jobid=${item.jobId}
        data-jobkind=${item.jobKind}
        data-title=${item.title}
    >
        <p class="flexbox">
          <span class="job-title ellipsis">${item.jobTitle}</span>
          <span class="special-color">${item.salaryShow}</span>
        </p>
        <p class="ellipsis">${item.compName}</p>
      </li>`
  )).join('')
}
          </ul>
      </section>
      `;
      $('.job-ranking').after(html);
    }
  },
});
$parent.on('click', '[data-selector="go-recommend-detail"]', function () {
  const $this = $(this);
  if (Apps.isTd) {
    share4App({
      type: [9],
      jobKind: $this.data('jobkind'), // 职位类型
      jobId: $this.data('jobid'), // 职位ID
      jobTitle: $this.data('title'),
      asFrom: '', // 跳转职位详情页来源
      selectIndex: $this.data('index'),
    });
  } else {
    const url = $this.data('link');
    window.location.href = url;
  }
});
// 招聘方推荐职位
$.ajax({
  url: `${domain('m-c')}/activity/active-recruiter-topic/job-list.json`,
  dataType: 'jsonp',
  success: (({ data, flag }) => {
    if (flag === 1 && data.jobs && data.jobs.length) {
      const recruitHtml = `
     <section class="recruit-recommend-container">
       <ul class="recruit-recommend-content">
        ${
    data.jobs.splice(0, 3).map((item, index) => (
      `<li>
                <dl class="flexbox">
                  <dt>
                    <img src=${item.recruiterPhoto} alt=""/>
                  </dt>
                  <dd class="flexbox">
                    <div>
                      <p class="hr-name">${item.recruiterName}<span>${item.recruiterTitle}</span></p>
                    </div>
                    <button ${Apps.isTd && Apps.appVc < 610 ? 'class="hide"' : ''} data-selector="go-chat"
                      data-applied=${item.applied} 
                      data-id=${item.recruiterUserId} 
                      data-jobid=${item.id}
                      data-jobkind=${item.jobKind}
                    >立即开聊</button>
                  </dd>
                </dl>
                <div class="job-info" data-selector="go-job-detail" data-url=${item.url}  data-jobid=${item.id}
                data-jobkind=${item.jobKind} data-title=${item.title} data-index=${index}>
                  <p class="job-title flexbox">
                    <span class="job-name ellipsis">${item.title}</span>
                    <span class="salary">${item.salaryShow}</span>
                  </p>
                  <p class="comp ellipsis">${item.compName}</p>
                  <p class="job-require">${item.dqName}  |  ${item.requireEdulevelName} |  ${item.requireWorkYearsShow}</p>
                </div>
              </li>`
    )).join('')
    }
       </ul>
     </section>
     `;
      $('.btn-conatiner').before(recruitHtml);
    }
  }),
});
$parent.on('click', '[data-selector="go-job-detail"]', function () {
  const $this = $(this);
  if (Apps.isTd) {
    share4App({
      type: [9],
      jobKind: $this.data('jobkind'), // 职位类型
      jobId: $this.data('jobid'), // 职位ID
      jobTitle: $this.data('title'),
      asFrom: '', // 跳转职位详情页来源
      selectIndex: $this.data('index'),
    });
  } else {
    const url = $this.data('url');
    window.location.href = url;
  }
});
$parent.on('click', '[data-selector="go-chat"]', function () {
  if (Apps.isTd) {
    const $this = $(this);
    const oppositeUserId = $this.data('id');
    const jobKind = $this.data('jobkind');
    const jobId = $this.data('jobid');
    const isApplied = $this.data('applied');
    share4App({
      scheme: 'lptd',
      host: 'lp',
      bridge: 'f',
      bridgeType: 'chatInPositionDetail',
      params: {
        chatParam: {
          oppositeUserId,
          imUserType: '2',
          referer: '',
        },
        isApplied,
        tLogParam: {
          job_kind: jobKind,
          job_id: jobId,
        },
      },
    });
  } else {
    Message.confirm({
      content: <p>下载猎聘APP，不错过与专业招聘方沟通机会</p>,
      okText: '下载APP',
      cancelText: '取消',
      onOk() {
        window.location.href = `${domain('m')}/tdown/`;
      },
    });
  }
});

// 查看更多
$('[data-selector="look-more-job"]').on('click', () => {
  if (Apps.isTd) {
    share4App({
      scheme: 'lptd',
      host: 'lp',
      bridge: 'p',
      bridgeType: 'search',
      source: 'h5',
      params: {
        keyword,
      },
    });
  } else {
    window.location.href = `${domain('m')}/zhaopin/?keyword=${keyword}`;
  }
});
