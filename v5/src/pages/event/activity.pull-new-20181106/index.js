import './index.less';
import requestAnimationFrame from '../../../lib/transition/animationFrame';

const slideWith = (($('body').width() - 30) / 2.5).toFixed(0); // css
$('.swiper-slide').css({ width: `${slideWith}px` });

class Roll {
  /*
   * options: {}
   *   el: 元素选择器
   *   speed: 滚动速度
   *   delay: 延迟执行ms
   */
  constructor(options) {
    this.speed = options.speed || 1;
    this.box = $(options.el);
    this.slides = this.box.find('.swiper-slide');
    this.distance = 0;
    this.origin = this.slides.eq(1)[0].getBoundingClientRect().left;
    this.key = this.slides.eq(6)[0].getBoundingClientRect().left;
    this.timer = null;
    if (options.delay) {
      setTimeout(this.fun.bind(this), options.delay);
    } else {
      this.fun();
    }
  }

  fun() {
    this.distance += this.speed;
    this.box.css({ transform: `translate3d(-${this.distance}px, 0px, 0px)` });
    if (this.distance >= this.key) {
      this.distance += this.origin - this.key - this.speed;
    }
    requestAnimationFrame(this.fun.bind(this));
  }
}
const roll1 = new Roll({
  el: '#swiper1',
  speed: 0.8,
});
const roll2 = new Roll({
  el: '#swiper2',
  speed: 0.6,
});
$(window).on('beforeunload', () => {
  roll1.timer && clearTimeout(roll1.timer);
  roll2.timer && clearTimeout(roll2.timer);
});

