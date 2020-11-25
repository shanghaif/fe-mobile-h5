const $root = $('body');
// 推荐企业
export default function initRecommendCompanyChange() {
  const recommendList = $('.recommend-company-list', $root);
  const recommendListA = recommendList.find('.company-card ');
  const recommendListLen = Math.ceil(recommendListA.length / 4);
  const changeBtn = $('[data-selector="btn-change-company"]', $root);
  let elmIndex = 0;
  let changeIndex = 0;
  function doMove() {
    recommendListA.hide();
    recommendList.find(`[data-elmIndex="${changeIndex}"]`).show();
  }
  if (recommendListA.length <= 4) {
    changeBtn.hide();
    return false;
  }
  recommendListA.each(function (ind) {
    $(this).attr('data-elmIndex', elmIndex);
    ind % 4 === 3 && elmIndex++;
  });
  changeBtn.on('click', function () {
    changeIndex++;
    if (changeIndex >= recommendListLen) {
      changeIndex = 0;
    }
    doMove();
  });
  doMove();
}
