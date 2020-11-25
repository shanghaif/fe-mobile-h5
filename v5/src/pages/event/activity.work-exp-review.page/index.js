/*
 * https://m.liepin.com/activity/work-exp-review/page/
 * 2019-12-18
 */
import sweet from '@liepin/native-sweet-fe';
import share, {
  share4App,
} from '@liepin/share';

import shareImg from './images/share.jpg';
import fetchData from './modules/fetchData';
import insertHtml from './modules/insertHtml';
import loadImgs from './modules/loadImgs';
import navigateToJob from './modules/navigateToJob';

import './index.less';

const {
  location,
} = window;
let $slide = [];
if (Apps.isTd) {
  // 关闭分享
  share4App({
    type: [17],
    showshare: false,
  });
} else if (Apps.isWx) {
  share({
    title: '还记得这几年，你的职场都发生了什么吗？',
    link: location.href.replace(location.search, ''),
    msgImg: `https:${shareImg}`,
    desc: '2020，遇见更好的机会，和更好的自己。',
  });
}
const speed = 250;
let mySwiper;
const swiperKey = 'career_achievement_activeSwiper_key';
let activeSwiperIndex = (sweet.get(swiperKey) || LT.String.getQuery('step')) | 0;
sweet.remove(swiperKey);

const $tip = $('[data-selector="tip"]');
const $bgm = $('[data-selector="btn-bgm"]');
const sound = document.getElementById('bgm');

function startFrames(index) {
  const $this = $slide.eq(index);
  if ($this) {
    setTimeout(function () {
      $this.find('[data-trigger="true"]').addClass('active');
    }, speed);
  }
}

function stopFrames(index) {
  const $this = $slide.eq(index);
  if ($this) {
    setTimeout(function () {
      $this.find('[data-trigger="true"]').removeClass('active');
    }, speed);
  }
}

function handleBgmClick() {
  if (sound.paused) {
    sound.play();
    $bgm.addClass('active');
  } else {
    sound.pause();
    $bgm.removeClass('active');
  }
}

$(window)
  .on('load', function () {
    fetchData()
      .then(insertHtml)
      .then(loadImgs)
      .then(function () {
        $slide = $('[data-selector="swiper"] .swiper-slide');
        // eslint-disable-next-line no-undef
        mySwiper = new Swiper('[data-selector="swiper"]', {
          effect: 'fade',
          direction: 'vertical',
          allowSlideNext: !!activeSwiperIndex,
          speed,
          preventClicks: false,
          allowSlidePrev: activeSwiperIndex !== 0,
          initialSlide: activeSwiperIndex,
          on: {
            init() {
              const that = this;
              setTimeout(function () {
                $('[data-selector="process-bar"]')
                  .removeClass('active')
                  .css({
                    width: '100%',
                  });
                startFrames(activeSwiperIndex);
                if (activeSwiperIndex) {
                  $bgm.css('display', 'block');
                  if (!that.isEnd) {
                    $tip.removeClass('hide');
                  }
                  Apps.isWx && handleBgmClick();
                }
                $('[data-selector="loading"]').remove();
              }, 496);
              $('[data-selector="stop-swiper"]')
                .on('touchstart', function (e) {
                  e.stopPropagation();
                })
                .on('touchmove', function (e) {
                  e.stopPropagation();
                });
            },
            slideChange() {
              const {
                activeIndex,
                slides: {
                  length,
                },
              } = this;
              this.allowSlidePrev = activeIndex !== 1;
              if (activeIndex === (length - 1)) {
                $tip.addClass('hide');
              } else {
                $tip.removeClass('hide');
              }
              activeSwiperIndex = activeIndex;
              stopFrames(activeIndex - 1);
              stopFrames(activeIndex + 1);
              startFrames(activeIndex);
            },
          },
        });
      });
  })
  .on('unload', function () {
    sound.pause();
  });

$('body')
  .on('click', '[data-selector="job-card"]', function () {
    sweet.set(swiperKey, activeSwiperIndex);
    const $this = $(this);
    navigateToJob($this.attr('data-id'), $this.index());
  })
  .on('click', '[data-selector="btn-start"]', function () {
    if ($CONFIG.userId) {
      mySwiper.allowSlideNext = true;
      $bgm.css('display', 'block');
      mySwiper.slideNext();
      handleBgmClick();
    } else {
      const {
        href,
        search,
      } = location;
      const url = `${href.replace(search, '')}?step=1`;
      location.replace(`https://m.liepin.com/register/?return_url=${encodeURIComponent(url)}`);
    }
  })
  .on('click', '[data-selector="btn-raise"]', function () {
    if (Apps.isTd) {
      share4App({
        nativeLink: 'lptd://lp/p/tabHome?s=h5&params={"current":1}',
      });
      setTimeout(function () {
        share4App({
          nativeLink: 'lptd://lp/p/backNative?s=h5',
        });
      }, 16);
    } else {
      location.replace('https://m.liepin.com/');
    }
  })
  .on('click', '[data-selector="gift-btn"]', function () {
    sweet.set(swiperKey, activeSwiperIndex);
  });
$bgm.on('click', handleBgmClick);

// 解决ios无法循环播放问题
sound.addEventListener('ended', function () {
  sound.load();
  sound.play();
}, false);
// 页面隐藏关闭音乐
(function () {
  let vibibleState = '';
  let visibleChange = '';

  if (typeof document.visibilityState !== 'undefined') {
    visibleChange = 'visibilitychange';
    vibibleState = 'visibilityState';
  } else if (typeof document.webkitVisibilityState !== 'undefined') {
    visibleChange = 'webkitvisibilitychange';
    vibibleState = 'webkitVisibilityState';
  }

  if (visibleChange) {
    document.addEventListener(visibleChange, function () {
      const status = document[vibibleState];
      if (status === 'hidden') {
        sound.pause();
        $bgm.removeClass('active');
      }
    });
  }
}());
