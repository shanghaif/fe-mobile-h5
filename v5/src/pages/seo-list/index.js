/**
 * 职位搜索页
 * https://m.liepin.com/bj/zhaopin/
 * 职位搜索:
 * https://m.liepin.com/zp${职位名全拼}/
 * 如: java网站项目
 * https://m.liepin.com/zpjavawangzhanxiangmu/
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/business/header/index';
import noRealhotLinkInit from '../../components/ui/hotlink/tab.hotlink'; // 非真实的底部热链
import hotLinkInit from '../../components/ui/real-hotlink/hotlink'; // 真实的底部热链
import initAdslots from '../../components/business/adslot/index'; // 百中广告位
import '../../components/ui/profile-card/profile-card.less';
import '../../components/ui/job-card/job-card.less';
import './index.less';



$(() => {
  initAdslots();
  ReactDOM.render(
    <Header/>,
    document.querySelector('.nav-container')
  );
  $('.job-card').on('click', function () {
    const $this = $(this);
    const $jobName = $this.find('[data-promid]');
    const linkHref = $jobName.attr('href');
    const dataPromid = $jobName.attr('data-promid');
    if (linkHref && linkHref.indexOf('?') > 0) {
      window.location.href = `${linkHref}&${dataPromid}`;
    } else {
      window.location.href = `${linkHref}?${dataPromid}`;
    }
  });
  // 底部热链
  hotLinkInit();
  noRealhotLinkInit();
});

