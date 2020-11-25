import navSet from '@liepin/zepto-nav';
import hotLinkInit from '../../components/ui/hotlink/tab.hotlink';
import './index.less';

navSet();
const $root = $('.guquan-container');

// 关注
const numElm = $('.follow-count i', $root);
$('[data-selector="add-favorite"]').on('tap', function () {
  const $this = $(this);
  if (!LT.User.isLogin) {
    window.location.href = `/login/?url=${window.location.href}`;
    return;
  }
  if ($this.hasClass('active')) {
    $this.removeClass('active').html('关注');
    numElm.html(numElm.html() - 1);
  } else {
    $this.addClass('active').html('已关注');
    numElm.html((numElm.html() | 0) + 1);
  }
});

// 登录后查看
$('[data-selector="login-to-see"]', $root).on('click', function () {
  const currentUrl = encodeURIComponent(window.location.href);
  if (!LT.User.isLogin) {
    if (LT.User.is_lp_user) {
      window.location.href = `/login/?url=${currentUrl}`;
    } else {
      window.location.href = `/register/?return_url=${currentUrl}`;
    }
  }
});

// 推荐企业
(function () {
  const recommendList = $('[data-selector="recommend-company-list"]', $root);
  const recommendListA = recommendList.find('.company-card ');
  const recommendListLen = Math.ceil(recommendListA.length / 4);
  let elmIndex = 0;
  let changeIndex = 0;
  const changeBtn = $('[data-selector="btn-change-company"]', $root);
  if (recommendListA.length <= 4) {
    changeBtn.hide();
    return false;
  }
  function doMove() {
    recommendListA.hide();
    recommendList.find(`[data-elmIndex="${changeIndex}"]`).show();
  }
  recommendListA.each(function (ind) {
    $(this).attr('data-elmIndex', elmIndex);
    ind % 4 === 3 && elmIndex++;
  });
  changeBtn.on('click', () => {
    changeIndex++;
    if (changeIndex >= recommendListLen) {
      changeIndex = 0;
    }
    doMove();
  });
  doMove();
}());

// 内链模块tab切换
hotLinkInit();
