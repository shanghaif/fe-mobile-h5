export default function () {
  if (!$CONFIG.isLogin) {
    $('[data-selector="judge-isLogined"]').each(function () {
      const $this = $(this);
      const type = $this.attr('data-type');
      $this.find('.symbol-mask').each(function () {
        const $me = $(this);
        const { length } = $me.html();
        let res = '';
        for (let i = 0; i < length; i++) {
          res += '*';
        }
        $me.html(res);
      });
      $this.addClass(`grab-login-guide-wrap${type === 'list' ? '-list' : ''}`).append('<div class="grab-login-guide">登录后查看全部 <a href="javascript:;" data-selector="go-loigin">去登录</a><div>');
    });
  }
}
