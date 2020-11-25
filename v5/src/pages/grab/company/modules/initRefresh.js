export default function () {
  const $btn = $('[data-selector="list-refresh-btn"]');
  $btn.each(function () {
    const $this = $(this);
    const $a = $this.parent().siblings('a');
    const numOnePage = 4;
    const maxIndex = Math.floor($a.length / numOnePage);
    let curIndex = -1;
    function handleClick() {
      if (maxIndex > curIndex) {
        curIndex += 1;
      } else {
        curIndex = 0;
      }
      const min = numOnePage * curIndex;
      const max = numOnePage * (curIndex + 1);
      $a.each(function (index, item) {
        if (index >= min && index < max) {
          $(item).show();
        } else {
          $(item).hide();
        }
      });
    }
    handleClick();
    $this.on('click', handleClick);
  });
}
