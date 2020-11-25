import React from 'react';
import ReactDom from 'react-dom';

import Report from './Report';
import UserUtil from '../../../lib/utils/user';

// 去登录
function goLogin(url) {
  window.location.href = `/login/?url=${encodeURIComponent(url || window.location.href)}`;
}

let defaultProps = {};
const div = $('<div/>').appendTo('body')[0];
function renderReport(props) {
  defaultProps = { ...defaultProps, ...props };
  ReactDom.render(<Report { ...defaultProps }/>, div);
}

export default function initReport($btn, params) {
  $btn.on('click', () => {
    if (!UserUtil.isLogin) {
      goLogin();
    } else {
      renderReport({ visible: true });
    }
  });
  renderReport({
    params,
    visible: false,
    onCancel() {
      renderReport({ visible: false });
    },
    onClose() {
      renderReport({ visible: false });
    },
  });
}
