export default function () {
  $('[data-selector="follow-btn"]').one('click', function () {
    if ($CONFIG.isLogin) {
      const $this = $(this);
      $this.find('i').removeClass('icon-unfollow').addClass('icon-follow');
      const $span = $this.find('span');
      $span.html($span.html().replace(/\d+/, function (num) {
        return +num + 1;
      }));
    } else {
      const { location } = window;
      location.href = `/register/?return_url=${encodeURIComponent(location.href)}`;
    }
  });
}
