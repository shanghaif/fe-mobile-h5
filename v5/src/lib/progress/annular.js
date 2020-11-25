/**
 * 环形进度条
 * selector: canvas元素的选择器
 * options: { 环形参数
 *   x, 圆心 x 坐标
 *   y, 圆心 y 坐标
 *   radius, 半径
 *   start, 开始角度
 *   end,   结束角度
 *   fillStyle, 填充颜色
 *   anticlockwise, 顺时针还是逆时针 false: 顺时针 true: 逆时针 默认: false
 *   lineWidth, 圆环宽度
 *   lineCap,  线头样式   默认 'rect'
 *   animate 是否开启动画, 默认false
 *   frameCount 动画帧数, 默认100
 * }
 */
import { compose, converge, map } from '../lambda/lambda';
import { drawAnnularAnimate, drawAnnular } from '../canvas/annular';
import { canvasContext } from '../canvas/canvas';

const renderAnnular = (annular, annularAnimate) => item => (item.animate ? annularAnimate(item)(100) : annular(item)); // eslint-disable-line
const drawAnnularOnCanvas = compose(converge(renderAnnular, [drawAnnular, drawAnnularAnimate]), canvasContext); // eslint-disable-line

export default (selector, options) => map(drawAnnularOnCanvas(selector), options);
