/**
 * https://m.liepin.com/help/faq
 */
import './index.css';

const $root = $('.view');

$('.content ul li', $root).on('click', function () {
  const $this = $(this);
  const $answer = $this.find('.answer');
  $this.siblings('li').removeClass('active').find('.answer').hide();
  if ($answer.is(':visible')) {
    $this.removeClass('active');
    $answer.hide();
  } else {
    $this.addClass('active');
    $answer.show();
  }
});
