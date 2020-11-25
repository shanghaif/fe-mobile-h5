import React from 'react';
import { share4App } from '@liepin/share';
import domain from '@liepin/native-domain-fe';
import { Message } from '@liepin/react-violet-h5';

import { setScrollTop } from './scrollLocation';

export default function goChat(oppositeUserId, jobKind, jobId, isApplied, imUserType) {
  if (Apps.isTd) {
    share4App({
      scheme: 'lptd',
      host: 'lp',
      bridge: 'f',
      bridgeType: 'chatInPositionDetail',
      params: {
        chatParam: {
          oppositeUserId,
          imUserType,
          referer: '',
        },
        isApplied,
        tLogParam: {
          job_kind: jobKind,
          job_id: jobId,
        },
      },
    });
  } else {
    Message.confirm({
      content: <p>仅支持猎聘APP内沟通</p>,
      okText: '下载APP',
      cancelText: '取消',
      onOk() {
        setScrollTop();
        window.location.href = `${domain('m')}/tdown/`;
      },
    });
  }
}

