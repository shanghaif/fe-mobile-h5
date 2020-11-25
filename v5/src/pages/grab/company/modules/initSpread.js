
export default function () {
  $('[data-selector="ellipsis-wrap"]').each(function () {
    const $this = $(this);
    const $btn = $this.siblings('[data-selector="more"]');
    if ($this.height() < $this.find('p').height()) {
      $this.addClass('ellipsis-5').removeClass('grab-company-info');
      $btn.one('click', function () {
        $this.removeClass('ellipsis-5');
        $btn.remove();
      });
    } else {
      $btn.remove();
    }
  });
}
