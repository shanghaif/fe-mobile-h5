/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved  */
import React, { Fragment } from 'React';
import ReactDOM from 'react-dom';
import domain from '@liepin/native-domain-fe';
import './index.less';

function FixBottomLoginGuide() {
  const {
    location,
  } = window;
  return (
    <Fragment>
      <div className="fix-bottom-login-guide-wrap-placeholder"/>
      <div className="fix-bottom-login-guide-wrap">
        <a
          className="flexbox"
          href={ `${domain('m')}/register/?return_url=${encodeURIComponent(`${location.href}${location.href.indexOf('?') === -1 ? '?' : '&'}stamp=${new Date().getTime()}`)}` }
        >
          <i className="text-icon icon-user"/>
          <p className="fix-login-desc flex-1">登录获取更匹配职位</p>
          <span className="fix-login-btn">注册/登录</span>
        </a>
      </div>
    </Fragment>
  );
}

export default function () {
  if (!LT.User.isLogin) {
    const $div = document.createElement('div');
    document.body.appendChild($div);
    ReactDOM.render(<FixBottomLoginGuide/>, $div);
  }
}
