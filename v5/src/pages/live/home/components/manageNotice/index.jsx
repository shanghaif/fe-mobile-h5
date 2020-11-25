import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import './index.less';

@inject('chatStore')
@observer

class ManageNotice extends React.Component {
  static propTypes = {
    chatStore: PropTypes.object.isRequired,
  }
  render() {
    const { chatStore: { manageNotice } } = this.props;
    return manageNotice ? (
      <div className="live-manage-notice-wrap">
        <div className="live-manage-notice-item">
          <span>直播小助手：</span>
          { manageNotice.content }
          {
            manageNotice.link ?
              <a href={ manageNotice.link }>请点击</a> : null
          }
        </div>
      </div>
    ) : null;
  }
}

export default ManageNotice;

