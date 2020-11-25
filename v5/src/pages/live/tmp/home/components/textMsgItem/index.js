import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

function TextMsgItem({ msg }, ref) {
  return (
    <div className="live-text-msg-wrap" ref={ ref }>
      <div className="live-text-msg-item">
        {
          msg.ext.fromName ? (
            <span className="user-show-name">{ `${msg.ext.fromName}：` }</span>
          ) : null
        }
        <span>{ msg.data }</span>
      </div>
    </div>
  );
}
TextMsgItem.propTypes = {
  msg: PropTypes.object.isRequired,
};

export default React.forwardRef(TextMsgItem);
