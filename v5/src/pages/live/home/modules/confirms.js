
import { Message } from '@liepin/react-violet-h5';
import domain from '@liepin/native-domain-fe';
import { share4App } from '@liepin/share';

import appsUtil from '../../../../lib/utils/apps';
import liveStore from '../store/live';

const url = window.location.href;
const confirmOfResume = (resLangKind) => {
  Message.confirm({
    content: '发言需要获取您的简历信息',
    maskClosable: false,
    onOk() {
      if (appsUtil.isTd) {
        share4App({
          scheme: 'lptd',
          host: 'lp',
          bridge: 'f',
          bridgeType: 'improve_resume',
          source: 'appsincev4.8.0',
        });
      } else {
        const link = resLangKind === '0' ? `${domain('m-c')}/resume-guidance?url=${url}` : `${domain('m-c')}/resume/editresumedetail/`;
        liveStore.setIframeSrc(link);
      }
    },
  });
};

export default confirmOfResume;


