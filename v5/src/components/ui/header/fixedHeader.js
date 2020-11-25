export default function initFixedTab(top) {
  const $win = $(window);
  const $fixedTab = $('[data-selector="fixed-tab"]');
  $win.on('load scroll', () => {
    if ($win.scrollTop() > top) {
      $fixedTab.addClass('show');
    } else if ($win.scrollTop() === 0) {
      $fixedTab.removeClass('show');
    }
  });
}
