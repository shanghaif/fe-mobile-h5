import domain from '@liepin/native-domain-fe';
import { share4App } from '@liepin/share';
import appsUtil from '../../../lib/utils/apps';

const asFrom = 'webcast_job_list';

const domainM = domain('m');
const domainXy = domain('mxy');
export default function ({
  jobId,
  jobKind,
  selectIndex = 0,
}) {
  let link = '';
  if (appsUtil.isTd && jobKind !== '7' && jobKind !== '6') {
    share4App({
      type: [9],
      jobKind, // 职位类型
      jobId, // 职位ID
      asFrom, // 跳转职位详情页来源
      selectIndex,
    });
  } else {
    switch (jobKind) {
      case '1':
        link = `${domainM}/a/${jobId}.shtml?d_sfrom=${asFrom}&source=zhibo`;
        break;
      case '2':
        link = `${domainM}/job/19${jobId}.shtml?d_sfrom=${asFrom}&source=zhibo`;
        break;
      case '5':
        link = `${domainM}/rpojob/${jobId}/?d_sfrom=${asFrom}&source=zhibo`;
        break;
      case '6':
      case '7':
        link = `${domainXy}/job/showxyejobdetail/?job_id=${jobId}&d_sfrom=${asFrom}&source=zhibo`;
        break;
      default:
        break;
    }
  }
  return link;
}
