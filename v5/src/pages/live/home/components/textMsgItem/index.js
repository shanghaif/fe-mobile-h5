import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

const TextMsgItem = React.forwardRef(({ msg }, ref) => {
  const { nickname, message: { text } } = msg || { message: { text: '' } };
  return (
    <div className="live-text-msg-wrap" ref={ ref }>
      <div className="live-text-msg-item">
        {
          nickname ? (
            <span className="user-show-name">{ `${nickname}：` }</span>
          ) : null
        }
        <span>{ text }</span>
      </div>
    </div>
  );
});
TextMsgItem.propTypes = {
  msg: PropTypes.object.isRequired,
};

export default TextMsgItem;
