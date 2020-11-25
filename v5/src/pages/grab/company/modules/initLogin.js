export default function () {
  $('[data-selector="go-loigin"]').on('click', function () {
    const { location } = window;
    location.href = `/register/?return_url=${encodeURIComponent(`${location.href}${location.href.indexOf('?') === -1 ? '?' : '&'}stamp=${new Date().getTime()}`)}`;
  });
}
