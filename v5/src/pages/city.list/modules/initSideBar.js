// 侧边导航栏
export default () => {
  const $root = $('#city-list');
  const $html = $('<div class="side-nav"></div>');
  const toolData = [];
  $('[data-hash]', $root).each(function () {
    const $this = $(this);
    toolData.push({
      key: $this.attr('data-hash'),
      topVal: $this.offset().top,
    });
    $html.append(`<a href="javascript:;" data-id="${$this.attr('data-hash')}">${$this.attr('data-name')}</a>`);
  });
  $html.prependTo('.view', $root);
  let nowKey = '';
  $(window).on('load resize scroll', function () {
    const top = $(this).scrollTop();
    for (let i = 0; i < toolData.length; i++) {
      if (top < toolData[i].topVal) {
        nowKey = toolData[(i - 1 < 0 ? 0 : i - 1)].key;
        break;
      }
    }
    $html.find('a').removeClass('active');
    $html.find(`a[data-id="${nowKey}"]`).addClass('active');
  });
  const showNumHtml = $('<div id="show-num" style="width:50px; height:50px; overflow:hidden; line-height:50px;text-align:center; color:#fff; background:#999;font-size:30px;border-radius:3px;position:fixed;top:50%;left:50%;margin-top:-50px;margin-left:-25px;"></div>');
  let showNumTimer = null;
  function showNum(text) {
    clearTimeout(showNumTimer);
    if (!text) { return; }
    $('#show-num').remove();
    showNumHtml.html(text).appendTo('body').show();
  }
  function domove(ind = 0) {
    const key = $html.find(`a:eq(${ind})`).attr('data-id');
    const nowArr = toolData.filter((val) => (val.key === key || val.toString() === key));
    showNum($html.find(`a:eq(${ind})`).html());
    nowArr[0] && $(window).scrollTop(nowArr[0].topVal);
  }
  $html.on('touchstart touchmove', (ev) => {
    const touch = ev.touches[0];
    const moveY = touch.pageY - $html.offset().top;
    const ind = Math.floor(moveY / 14);
    domove(ind);
    return false;
  });
  $html.on('touchend', () => {
    showNumTimer = setTimeout(() => {
      showNumHtml.fadeOut(() => {
        showNumHtml.remove();
      });
    }, 500);
  });
};
