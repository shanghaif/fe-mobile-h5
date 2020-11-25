
import IScroll from '@liepin/zepto-iscroll';

function StaticCity(elm, selCode, cancelFn) {
  this.elm = $(elm) || '';
  this.$scrollwrap = this.elm.find('.aui-localdataui-scroll');
  this.scroll = [];
  if (!selCode || selCode === '000') {
    this.elm.find('.content-html:eq(0)').css('display', 'block').find('li').attr('data-selected', 'selected');
    this.elm.find('.main-html li:eq(0)').attr('data-selected', 'selected');
  }

  const that = this;
  this.$scrollwrap.each(function (ind) {
    const opts = ind === 0 ? { click: true } : {};
    const m = new IScroll($(this)[0], opts);
    that.scroll.push(m);
    m.scrollToElement('[data-selected="selected"]', 0);
  });
  this.elm.css('width', $(window).width());
  this.elm.find('.main-html li').on('click', function () {
    const index = $(this).index();
    $(this).attr('data-selected', 'selected').siblings().removeAttr('data-selected');
    that.elm.find('.content-html').hide();
    that.elm.find('.content-html').eq(index).show();
    that.scroll[index + 1].refresh();
  });
  this.elm.find('[data-selector="cancel-static-city"]').on('click', function () {
    setTimeout(function () {
      cancelFn();
      that.elm.hide();
    }, 100);
  });
  return this;
}
StaticCity.prototype.refresh = function () {
  this.scroll.forEach(function (val) {
    val.refresh();
  });
};
export default function (elm, selCode, cancelFn) {
  return new StaticCity(elm, selCode, cancelFn);
}
