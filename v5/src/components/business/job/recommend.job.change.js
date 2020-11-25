export default () => {
  // 推荐职位换一换
  const recommendList = $('[data-selector="recommend-list"]');
  const recommendListA = recommendList.find('.job-card, .item');
  const recommendListLen = Math.ceil(recommendListA.length / 5);
  let elmIndex = 0;
  let changeIndex = 0;
  const changeBtn = $('.change-btn');
  function doMove() {
    recommendListA.hide();
    recommendList.find(`[data-elmIndex="${changeIndex}"]`).show();
  }
  if (recommendListA.length <= 5) {
    changeBtn.hide();
  } else {
    recommendListA.each(function (ind) {
      $(this).attr('data-elmIndex', elmIndex);
      ind % 5 === 4 && elmIndex++;
    });

    changeBtn.on('click', () => {
      changeIndex = (changeIndex + 1) % recommendListLen;
      doMove();
    });
    // 卡片式点击特殊处理
    recommendList.find('.job-card').on('click', function () {
      window.location.href = $(this).find('.job-name').attr('href');
    });
    $('.job-card a.job-name', recommendList).on('click', function (ev) {
      ev.stopPropagation();
    });
    doMove();
  }
};
