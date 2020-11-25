import { curry } from '../lambda/lambda';
import transition from '../transition/transition';

/**
 * 使用canvas画一个圆环
 * ctx canvas 的 context
 * options: {
 *   x, 圆心 x 坐标
 *   y, 圆心 y 坐标
 *   radius, 半径
 *   start, 开始角度
 *   end,   结束角度
 *   fillStyle, 填充颜色
 *   anticlockwise, 顺时针还是逆时针 false: 顺时针 true: 逆时针 默认: false
 *   lineWidth, 圆环宽度
 *   lineCap,  线头样式   默认 'rect'
 * }
 */
export const drawAnnular = curry(function (
  ctx,
  { x, y, radius, start, end, fillStyle, anticlockwise = false, lineWidth, lineCap }
) {
  ctx.beginPath();
  ctx.arc(
    x,
    y,
    radius,
    start,
    end,
    false
  );
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = fillStyle;
  ctx.lineCap = lineCap;
  ctx.stroke();
  ctx.closePath();
  return ctx.arc(x, y, radius, start, end, fillStyle, anticlockwise);
});

/**
 * 使用canvas画一个圆环并添加动画效果
 * ctx canvas 的 context
 * options: {
 *   x, 圆心 x 坐标
 *   y, 圆心 y 坐标
 *   radius, 半径
 *   start, 开始角度
 *   end,   结束角度
 *   fillStyle, 填充颜色
 *   anticlockwise, 顺时针还是逆时针 false: 顺时针 true: 逆时针 默认: false
 *   lineWidth, 圆环宽度
 *   lineCap,  线头样式   默认 'rect'
 *   times: 动画帧数
 * }
 */
export const drawAnnularAnimate = curry(function (ctx, options) {
  const { start, end } = options;
  const angle = end - start;
  const drawer = endAngle => drawAnnular(ctx, { ...options, end: endAngle });
  return (times) => transition(times, current => drawer(start + angle * current / times))();
});
