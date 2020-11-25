/**
 * 推荐职位
 * 点击加载更多
 */
const $recommendJob = $('.recommend-job');

$recommendJob.on('click', '.job-card', function () {
  const $this = $(this);
  const linkHref = $this.attr('href');
  const dataPromid = $this.data('promid');

  if (linkHref && linkHref.indexOf('?') > 0) {
    window.location.href = `${linkHref}&${dataPromid}`;
  } else {
    window.location.href = `${linkHref}?${dataPromid}`;
  }

  return false;
});

$('[data-selector="load-more-job"]').on('click', function () {
  const recommentList = $recommendJob.find('.job-card.hide');
  const len = recommentList.size();

  // 点击加载更多推荐职位的时候, 若还有隐藏的职位, 显示前5条, 不足5条全部显示
  if (len > 0) {
    for (let i = 0; i < 5 && i < len; i++) {
      $(recommentList[i]).removeClass('hide');
    }
  }

  // 若剩余未显示职位小于等于5条, 此时应已全部显示, 隐藏加载更多按钮
  if (len <= 5) {
    $(this).remove();
  }
});
