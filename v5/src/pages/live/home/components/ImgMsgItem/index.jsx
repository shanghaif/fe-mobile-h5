import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Portal } from '@liepin/react-violet-h5';
import './index.less';

const ImgMsgItem = React.forwardRef(({ msg }, ref) => {
  const { nickname, message: { text } } = msg || { message: { text: '' } };
  const [isVisible, setIsVisible] = useState(false);
  console.log(isVisible, 'isVisible->');
  return (
    <div className="live-text-msg-wrap" ref={ ref }>
      <div className="live-text-msg-item">
        {
      nickname ? (
        <span className="user-show-name">{ `${nickname}：` }</span>
      ) : null
    }
        <div
          className="thumb-photo"
          role="presentation"
          style={ { backgroundImage: `url(${text.thumb})`, width: text.thumbSize ? text.thumbSize.width : 50, height: text.thumbSize ? text.thumbSize.height : 50 } }
          onClick={ () => setIsVisible(true) }
        />
        <Portal>
          <div
            role="presentation"
            className={ classnames('photo-modoal-wrap', {
          'photo-modoal-wrap-show': isVisible,
        }) }
            onClick={ () => setIsVisible(false) }
          >
            <div className="photo-content" style={ { backgroundImage: `url(${text.url})`, width: text.size.width, height: text.size.height } }/>
          </div>
        </Portal>
      </div>
    </div>
  );
});
ImgMsgItem.propTypes = {
  msg: PropTypes.object.isRequired,
};
export default ImgMsgItem;
