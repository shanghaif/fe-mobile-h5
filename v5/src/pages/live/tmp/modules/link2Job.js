import { share4App } from '@liepin/share';
import { baseDomain } from '@liepin/native-domain-fe';
import { CUR_LIVE_BROADCAST_URL, LIVE_BROADCAST_STREAM } from '../../../../common/js/global/source/constants/';
import cookieUtil from '../../../../lib/utils/cookie';

const asFrom = 'webcast_job_list';
export default (function () {
  if (Apps.isTd) {
    return function ({ jobKind, jobId, index = 0 }) {
      share4App({
        type: [9],
        jobKind, // 职位类型
        jobId, // 职位ID
        asFrom, // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  // 只支持企业职位
  return function ({ jobId, pullUrl }) {
    const { location } = window;
    if (pullUrl) {
      cookieUtil.set(CUR_LIVE_BROADCAST_URL, location.href, false, '/', baseDomain);
      cookieUtil.set(LIVE_BROADCAST_STREAM, pullUrl, false, '/', baseDomain);
    }
    location.href = `/job/19${jobId}.shtml?d_sfrom=${asFrom}&source=zhibo`;
  };
}());
