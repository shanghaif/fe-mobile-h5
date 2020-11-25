/**
 * 页面：猎聘问答
 * 链接：https://m.liepin.com/wenda/question-detail/?questionId=1
 */
import navSet from '@liepin/zepto-nav';
import './index.css';

navSet();

$(() => {
  const $root = $('.view');
  const $answerDetail = $('[data-selector="answer-detail"]', $root);
  const $all = $('[data-selector="all"]', $root);
  if ($answerDetail.height() > 244) {
    $answerDetail.addClass('detail-height');
    $all.show();
  }
  $all.on('click', function () {
    $answerDetail.removeClass('detail-height');
    $(this).remove();
  });
});
