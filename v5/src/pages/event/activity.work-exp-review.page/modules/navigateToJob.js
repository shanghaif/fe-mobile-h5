import { share4App } from '@liepin/share';

export default (function () {
  const { isTd } = Apps;
  if (isTd) {
    return function (jobId, index) {
      share4App({
        type: [9],
        jobKind: '2', // 职位类型
        jobId, // 职位ID
        asFrom: 'special_activity_mycareer_2019', // 跳转职位详情页来源
        selectIndex: index,
      });
    };
  }
  return function (jobId) {
    window.location.href = `/job/19${jobId}.shtml`;
  };
}());
