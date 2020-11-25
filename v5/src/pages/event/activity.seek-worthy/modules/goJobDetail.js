import { share4App } from '@liepin/share';
import { setScrollTop } from './scrollLocation';

export default function goJobDetail(jobKind, jobId, selectIndex, link) {
  if (Apps.isTd) {
    share4App({
      type: [9],
      jobKind, // 职位类型
      jobId, // 职位ID
      asFrom: 'search_userc_2020_c', // 跳转职位详情页来源
      selectIndex,
    });
  } else {
    setScrollTop();
    window.location.href = link;
  }
}
