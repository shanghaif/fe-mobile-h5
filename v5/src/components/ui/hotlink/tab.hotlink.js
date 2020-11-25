import './index.less';

export default function () {
// 内链模块tab切换
  const $hotLinksTab = $('[data-selector="hot-links-tab"] p');
  const $hotLinksMain = $('[data-selector="hot-links-main"]');
  $hotLinksTab.on('tap', function () {
    const $this = $(this);
    $hotLinksTab.removeClass('active');
    $this.addClass('active');
    $hotLinksMain.find('.tab-content').hide();
    $hotLinksMain.find(`.tab-content:eq(${$this.index()})`).show();
  });
}
