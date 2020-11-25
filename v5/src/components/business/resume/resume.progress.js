import drawPercent from '../../../lib/progress/annular';

const start = Math.PI / 2;
const cicle = 2 * Math.PI;
const common = {
  start,
  x: 200,
  y: 200,
  lineWidth: 60, // 圆环边的宽度
  radius: 120, // 圆环半径
  lineCap: 'rect',
  anticlockwise: false,
};
function annular(percent) {
  return [{
    fillStyle: '#ffe4c8', // 填充色
    percent: 100,
  }, {
    fillStyle: '#ffbd8f', // 填充色
    percent: 65,
  }, {
    animate: true,
    fillStyle: '#ff9046', // 填充色
    percent,
  }].map(item => Object.assign(item, common, { end: start + cicle * item.percent / 100 }));
}

export default (selector, complete) => drawPercent(selector, annular(complete));
