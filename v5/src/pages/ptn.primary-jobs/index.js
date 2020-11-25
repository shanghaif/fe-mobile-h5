/**
 * https://m.liepin.com/ptn/primary-jobs/
 */
import domain from '@liepin/native-domain-fe';
import './index.less';

$(() => {
  const $campusList = $('[data-selector="campus"]');
  const $societyList = $('[data-selector="society"]');
  let selectedTab = 'campus';
  // 校招、社招切换
  $('[data-selector="tabBar"]').on('click', 'li', function () {
    const $this = $(this);
    if (!$this.hasClass('selected')) {
      $this.addClass('selected').siblings().removeClass('selected');
      selectedTab = $this.data('type');
      if (selectedTab === 'campus') {
        $campusList.addClass('show');
        $societyList.removeClass('show');
      } else {
        $campusList.removeClass('show');
        $societyList.addClass('show');
      }
    }
  });
  // 职位跳转
  $('.job-list').on('click', 'dl', function () {
    const url = $(this).data('url');
    url && (window.location.href = url);
  });
  // 更多
  $('[data-selector="more"]').on('click', () => {
    window.location.href = selectedTab === 'campus'
      ? `${domain('mxy')}/xy/weixin/jobSearch/index/?mscid=${window.$CONFIG.mscid}`
      : `/zhaopin/?salarylow=0&salaryhigh=20&jobkind=2&mscid=${window.$CONFIG.mscid}`;
  });
});
