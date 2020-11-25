/**
 * https://m.liepin.com/salaryanalysis/
 * 2019-08-27 改版 需求方： 童猛
 */
import Biz from './modules/biz';
import './index.less';

function packHtml($ele, data) {
  const { datas, max } = data;
  const MAX = parseInt(max, 10) / 10;
  const list = datas.map((item) => ({
    title: item.title,
    salary: parseInt(item.salary, 10) / 10,
  })).sort((a, b) => (a.salary - b.salary));

  $ele.html(list.map((item) => (`<li class="flexbox"><p class="item-title ellipsis-1">${item.title}</p><div class="flex-1 scroller"><span style="width: ${Math.round(item.salary / MAX * 100)}%;"></span></div><h3>${item.salary}万</h3></li>`)).join(''));
}

const { salaryReportResult } = window.$CONFIG || {};
if (salaryReportResult) {
  (function () {
    const { percent } = salaryReportResult;
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
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.font = '22px Helvetica Neue, Helvetica, STHeiTi, sans-serif';
    ctx.fillText(`平均薪资${(parseInt(percent.datas.find((item) => (item.percent === 0.5)).salary, 10) / 10)}万`, 74, height);
    ctx.lineWidth = 4;
    ctx.fillStyle = '#4d4d4d';
    let startx = 156;
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
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.fillStyle = '#ffc37c';
    ctx.arc(x1, y1, split, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = '#f64';
    ctx.arc(x2, y2, split, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    const gradient = ctx.createLinearGradient(x1, 0, x2, 0);
    gradient.addColorStop(0, '#ffc37c');
    gradient.addColorStop(1, '#f64');
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    const p1 = [x1, y1];
    const c1 = [x1 + (x2 - x1) * 0.6, y1];
    const c2 = [x1 + (x2 - x1) * 0.4, y2];
    const p2 = [x2, y2];
    let word = null;
    const me = 2 * Math.round((percent.me.percent - 0) * 100);
    Biz.getBezierPoints(200, p1, c1, c2, p2).forEach((d, i) => {
      const p = d.map(e => parseInt(e, 10));
      ctx.lineTo(p[0], p[1]);
      i === me && (word = p);
    });
    ctx.moveTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    const { height: ih, width: iw } = $i.getBoundingClientRect();
    $i.style.top = `${(word[1] - ih) / 2}px`;
    $i.style.left = `${word[0] / 2 - iw - 16}px`;
    $i.style.visibility = 'visible';
  }());

  packHtml($('.industry-wrap'), salaryReportResult.industry);
  packHtml($('.dq-wrap'), salaryReportResult.dq);
  packHtml($('.edu-wrap'), salaryReportResult.eduLevel);
  packHtml($('.work-wrap'), salaryReportResult.workYear);
}
