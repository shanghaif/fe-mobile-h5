import React from 'react';
import PropTypes from 'prop-types';

import '../textMsgItem/index.less';

const WelcomeMsgItem = React.forwardRef(({ msg }, ref) => msg.message.text.length ? (
  msg.message.text.map((item) => (
    <div className="live-text-msg-wrap" ref={ ref } key={ item }>
      <div className="live-text-msg-item">
        <span className="user-show-name">{ item }</span>
      </div>
    </div>
  ))
) : null);

WelcomeMsgItem.propTypes = {
  msg: PropTypes.any.isRequired,
};
export default WelcomeMsgItem;

