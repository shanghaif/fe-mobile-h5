import './index.less';

export default function () {
  const $hotLinksContent = $('.hot-links-content');
  const $tabContent = $('.tab-content', $hotLinksContent);
  const height = $tabContent.height();
  const len = $('li', $hotLinksContent).length;
  const $tab = $('[data-selector="tab"]', $hotLinksContent);
  if (height > 93 || len > 1) {
    $tab.show();
  }
  if (height > 93) {
    $tabContent.addClass('cut-off');
  }
  $tab.on('click', function () {
    const $this = $(this);
    const $i = $this.find('i');
    if ($i.hasClass('icon-down')) {
      $this.find('strong').text('收起');
      $i.removeClass('icon-down').addClass('icon-up');
      $tabContent.removeClass('cut-off');
      $hotLinksContent.removeClass('hot-links-hide');
    } else {
      $this.find('strong').text('展开');
      $i.removeClass('icon-up').addClass('icon-down');
      $tabContent.addClass('cut-off');
      $hotLinksContent.addClass('hot-links-hide');
    }
  });
}


