import React from 'react';
import ReactDOM from 'react-dom';
import lazyLoad from '@liepin/native-lazyload-fe';
import '../../common/js/live'; // 直播iframe iOS兼容
import cookieUtil from '../../lib/utils/cookie';
import stringUtil from '../../lib/utils/string';
import Header from '../../components/business/header/index';
import hotLinkInit from '../../components/ui/real-hotlink/hotlink';
import './modules/apply'; // 应聘
import './modules/favorite'; // 收藏
import './modules/recommend'; // 推荐
import './modules/report'; // 举报
import './modules/send-msg'; // 立即沟通
import './modules/fold'; // 折叠职位信息与公司信息
import './modules/share'; // 设置分享

import './index.less';
import './components/style/base-info.less';
import './components/style/btn-group-bottom.less';
import './components/style/job-company.less';
import './components/style/job-describe.less';
import './components/style/job-lens.less';
import './components/style/job-working-place.less';
import '../../components/ui/profile-card/profile-card.less';
import '../../components/ui/job-card/job-card.less';


// nav初始化

$(() => {
  const { jobName } = $CONFIG;
  ReactDOM.render(
    <Header placeholder={ jobName }/>,
    document.querySelector('.nav-container')
  );
});

// 初始化底部热链
hotLinkInit();

// 京东金融, 不显示立即沟通按钮
if (
  cookieUtil.get('__tlog')
  && cookieUtil.get('__tlog').split('|').pop() === 'jd_rz_02'
  || stringUtil.getQuery('mscid') === 's_o_m10'
) {
  $('[data-selector="send-msg"]').remove();
}

$(window).on('load', function () {
  // 图片懒加载, 优先度很低
  lazyLoad();
});
