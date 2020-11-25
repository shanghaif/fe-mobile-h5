import { share4App } from '@liepin/share';
import { baseDomain } from '@liepin/native-domain-fe';
import { CUR_LIVE_BROADCAST_URL, LIVE_BROADCAST_STREAM } from '../../../../common/js/global/source/constants/';
import cookieUtil from '../../../../lib/utils/cookie';

const { location } = window;

export default (function () {
  if (Apps.isTd) {
    return function ({ cid }) {
      share4App({
        type: [12],
        entityId: '',
        cid,
      });
    };
  }
  return function ({ cid, pullUrl }) {
    if (pullUrl) {
      cookieUtil.set(CUR_LIVE_BROADCAST_URL, location.href, false, '/', baseDomain);
      cookieUtil.set(LIVE_BROADCAST_STREAM, pullUrl, false, '/', baseDomain);
    }
    location.href = `/company/${cid}/?source=zhibo`;
  };
}());
