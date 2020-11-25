import { share4App } from '@liepin/share';
import appsUtil from '../../../lib/utils/apps';

const asFrom = 'webcast_job_list';
export default (function () {
  if (appsUtil.isTd) {
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
  return function ({ jobId }) {
    const { location } = window;
    location.href = `/job/19${jobId}.shtml?d_sfrom=${asFrom}&source=zhibo`;
  };
}());
