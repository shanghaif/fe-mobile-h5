import React from 'react';
import { Message } from '@liepin/react-violet-h5';
import Ajax from '../../../lib/utils/request';
import { mRoot, cRoot } from '../../../lib/utils/domain';
import UserUtil from '../../../lib/utils/user';

const { jobId, jobKind, recruiterId } = $CONFIG;
/**
 * 立即沟通
 */
const $sendMsg = $('[data-selector="send-msg"]');
$sendMsg.on('click', function (event) {
  event.preventDefault();
  event.stopPropagation();
  if (UserUtil.isLogin) {
    Ajax({
      type: 'jsonp',
      url: `${cRoot}/job/communicate.json`,
      data: { jobId, jobKind, recruiterId },
    }).then(({ flag }) => {
      if (flag === 1) {
        Message.confirm({
          content: <dl><dt>对方已收到您的消息</dt><dd>下载APP，不再错过对方回复消息</dd></dl>,
          okText: '下载APP',
          cancelText: '取消',
          onOk() {
            window.location.href = `${mRoot}/tdown/`;
          },
        });
      }
    });
  } else {
    window.location.href = `/register/?return_url=${encodeURIComponent(window.location.href)}`;
  }
  return false;
});
