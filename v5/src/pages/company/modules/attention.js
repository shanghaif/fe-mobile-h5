import domain from '@liepin/native-domain-fe';
import { Message } from '@liepin/react-violet-h5';
import Ajax from '../../../lib/utils/request';
import userUtil from '../../../lib/utils/user';

export default () => {
  const { compId } = $CONFIG;
  const $btn = $('[data-selector="follow-btn"]');
  const $icon = $btn.find('.text-icon');
  const $span = $btn.find('span');
  $btn.on('click', () => {
    if (!userUtil.isLogin) {
      window.location.href = `/register/?return_url=${window.location.href}`;
      return;
    }
    if ($icon.hasClass('icon-follow')) {
      Ajax({
        url: `${domain('m-c')}/connection/unfollow-comp.json`,
        type: 'jsonp',
        data: { compId },
        success({ flag, msg }) {
          if (flag === 1) {
            $icon.removeClass('icon-follow').addClass('icon-unfollow');
            $span.text('关注');
            Message.toast('取消关注成功');
          } else {
            msg && Message.toast(msg);
          }
        },
      });
    } else {
      Ajax({
        url: `${domain('m-c')}/connection/follow-comp.json`,
        type: 'jsonp',
        data: { compId },
        success({ flag, msg }) {
          if (flag === 1) {
            $icon.removeClass('icon-unfollow').addClass('icon-follow');
            $span.text('已关注');
            Message.toast('关注成功');
          } else {
            msg && Message.toast(msg);
          }
        },
      });
    }
  });
};
