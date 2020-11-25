import React from 'react';
import PropTypes from 'prop-types';

import '../textMsgItem/index.less';

function WelcomeMsgItem({ msg }, ref) {
  return (
    <div className="live-text-msg-wrap" ref={ ref }>
      <div className="live-text-msg-item">
        <span className="user-show-name">{ msg.data }</span>
      </div>
    </div>
  );
}
WelcomeMsgItem.propTypes = {
  msg: PropTypes.object.isRequired,
};

export default React.forwardRef(WelcomeMsgItem);
