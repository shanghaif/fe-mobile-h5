export default function () {
  const $wrap = $('[data-selector="center-company-wrap"]');
  let $pagination = $('[data-selector="pagination-wrap"]');
  const $li = $wrap.find('li');
  const { length } = $li;
  const witdh = Math.ceil($wrap.width() / 3);
  let startX = null;
  let startY = null;
  let distance = null;
  let activeIndex = 0;
  let timer = null;
  let pagination = '';
  const seconds = 2000;
  let i = 0;
  for (; i < length; i++) {
    pagination += `<i class="${i === activeIndex ? 'active' : ''}"></i>`;
  }

  $pagination.html(pagination);
  const $paginationI = $pagination.find('i');

  $pagination = null;
  pagination = null;
  i = null;

  function doFrame() {
    $li.prop('class', 'center-company-card');
    distance = null;
    activeIndex = (length + activeIndex) % length;
    $li.forEach(function (item, index) {
      $(item).addClass(`center-company-card${(length + index - activeIndex) % length}`);
    });
    $paginationI.eq(activeIndex).addClass('active').siblings().removeClass('active');
  }
  function loop() {
    timer = setTimeout(function () {
      activeIndex += 1;
      doFrame();
      loop();
    }, seconds);
  }
  loop();
  $wrap
    .css('height', `${$('.center-company-card0').height()}px`)
    .on('touchstart', function (e) {
      timer && clearTimeout(timer);
      const touch = e.touches[0];
      startX = touch.screenX;
      startY = touch.screenY;
    }).on('touchmove', function (e) {
      const touch = e.touches[0];
      const endX = touch.screenX;
      const endY = touch.screenY;
      const distanceX = endX - startX;
      if (Math.abs(endY - startY) < Math.abs(distanceX)) {
        distance = distanceX;
        e.preventDefault();
      }
    }).on('touchend', function () {
      loop();
      if (typeof distance !== 'number' || Math.abs(distance) < witdh) {
        return true;
      }
      if (distance < 0) {
        activeIndex += 1;
      } else {
        activeIndex -= 1;
      }
      doFrame();
    });

  $(window).on('unload', function () {
    timer && clearTimeout(timer);
  });
}
