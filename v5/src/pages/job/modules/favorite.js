/**
 * 收藏/取消收藏职位
 */
import { Message } from '@liepin/react-violet-h5';
import Ajax from '../../../lib/utils/request';
import User from '../../../lib/utils/user';
import { cRoot } from '../../../lib/utils/domain';

const { jobId, jobKind } = $CONFIG;

$('[data-selector="favorite"]').on('click', function (event) {
  event.preventDefault();
  event.stopPropagation();
  const $this = $(this);
  const $icon = $this.find('.text-icon');
  if (!User.isLogin) {
    window.location.href = `/register/?return_url=${encodeURIComponent(window.location.href)}`;
    return false;
  }
  if ($icon.hasClass('icon-collected')) { // 取消收藏
    Ajax({
      url: `${cRoot}/job/unfavorite.json`,
      type: 'jsonp',
      data: {
        job_id: jobId,
        job_kind: jobKind,
      },
    }).then(({ flag }) => {
      if (flag === 1) {
        Message.toast('取消收藏成功');
        $icon.removeClass('icon-collected').addClass('icon-collection').siblings('p').text('收藏职位');
      } else {
        Message.toast('取消收藏失败');
      }
    });
  } else { // 收藏
    Ajax({
      url: `${cRoot}/job/favorite.json`,
      type: 'jsonp',
      data: {
        job_id: jobId,
        job_kind: jobKind,
      },
    }).then(({ flag }) => {
      if (flag === 1) {
        Message.toast('收藏成功');
        $icon.addClass('icon-collected').removeClass('icon-collection').siblings('p').text('已收藏');
      } else {
        Message.toast('收藏失败');
      }
    });
  }
});
