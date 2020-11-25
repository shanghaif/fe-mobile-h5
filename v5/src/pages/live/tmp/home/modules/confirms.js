
import { Message } from '@liepin/react-violet-h5';
import { baseDomain } from '@liepin/native-domain-fe';
import liveStore from '../store/live';
import { getLoginLink, getRouteLink } from './links';
import { CUR_LIVE_BROADCAST_URL, LIVE_BROADCAST_STREAM } from '../../../../../common/js/global/source/constants/';
import cookieUtil from '../../../../../lib/utils/cookie';

const { location } = window;
export const confirmOfLogin = () => {
  Message.confirm({
    content: '发言需要获取您的登录信息',
    maskClosable: false,
    onOk() {
      cookieUtil.set(CUR_LIVE_BROADCAST_URL, window.location.href, false, '/', baseDomain);
      cookieUtil.set(LIVE_BROADCAST_STREAM, liveStore.info.pullUrl, false, '/', baseDomain);
      location.href = getLoginLink();
    },
  });
};

export const confirmOfNamecard = () => {
  Message.confirm({
    content: '发言需要获取您的信息',
    maskClosable: false,
    onOk() {
      cookieUtil.set(CUR_LIVE_BROADCAST_URL, window.location.href, false, '/', baseDomain);
      cookieUtil.set(LIVE_BROADCAST_STREAM, liveStore.info.pullUrl, false, '/', baseDomain);
      location.href = getRouteLink();
    },
  });
};

