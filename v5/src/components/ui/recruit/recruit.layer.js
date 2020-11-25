import './recruit.layer.css';

export default function () {
  const $win = $(window);
  const $loginMask = $('[data-selector="login-mask"]');
  if (!LT.User.isLogin) {
    $win.on('scroll load', () => {
      const sTop = $win.scrollTop();
      (sTop > 50 || sTop === 0) ? $loginMask.show() : $loginMask.hide();
    });
    // 关闭浮层
    $('[data-selector="mask-close"]', $loginMask).on('tap', () => {
      $loginMask.remove();
    });
  }
}
