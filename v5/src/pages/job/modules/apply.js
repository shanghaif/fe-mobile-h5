/**
 * 应聘模块
 */
import User from '../../../lib/utils/user';

const { jobId, jobKind, applyType, appUser } = $CONFIG;

// $('[data-selector="apply-btn"]').on('click', function () {
$('.btn-group-bottom .btn-primary').on('click', function () {
  if (!User.isLogin) {
    window.location.href = `/register/?return_url=${encodeURIComponent(window.location.href)}`;
    return;
  }
  // 动态加载应聘模块
  import(/* webpackChunkName: "thunk/components/business/apply/applystart" */ '../../../components/business/apply/applystart')
    .then((module) => {
      const applyJob = module.default;
      $(this).is('[disabled]') || applyJob({
        applyData: {
          jobId,
          jobKind,
          applyType,
          appUser,
        },
        onSuccess: () => {
          $(this).attr('disabled', true).html('<span>已应聘</span>');
        },
      });
    });
});
