import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/business/header/index';
import { mRoot } from '../../lib/utils/domain';
import hotLinkInit from '../../components/ui/real-hotlink/hotlink';

import './index.less';

// nav初始化
ReactDOM.render(
  <Header/>,
  document.querySelector('.nav-container')
);
// 初始化底部热链
hotLinkInit();
if (!LT.User.isLogin) {
  const href = `${mRoot}/register/?return_url=${window.location.href}`;
  $('.view').append(`
  <section class="stance"></section>
  <section class="unlogin-container">
        <div class="unlogin-content clearfix">
            <i class="text-icon icon-mine"></i>
            <span>登录获取更匹配职位</span>
            <a href="${href}">注册/登录</a>
        </div>
    </section>
  `);
}
