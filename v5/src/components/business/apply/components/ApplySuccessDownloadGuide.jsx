import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import localCookie from '@liepin/native-sweet-fe';
import { Modal } from '@liepin/react-violet-h5';
import { mcRoot } from '../lib/utils/domain';
import '../style/apply-success-download-guide.less';
import isFromAlipay from '../../app/alipay';
import goDownload from '../images/goDownload.png';
import blackClose from '../images/blackClose.png';

class ApplySuccessDownloadGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
    // 一次会话期间只弹一次 APP 下载引导弹层
    localCookie.set('fe_m_first_apply', 'no');
  }
  handleClick = () => {
    const location = window.locationProxy || window.location;
    location.href = `${mcRoot}/tdown`;
  }
  handleClose = () => {
    this.setState({
      isVisible: false,
    });
  }
  render() {
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    const { isVisible } = this.state;
    return isFromAlipay() ? null : (
      <Modal
        visible={ isVisible }
        onClose={ this.handleClose }
        destroyOnClose
        contentClass="apply-success-banner-content"
        style={ {
          boxShadow: 'none',
          backgroundColor: 'transparent',
        } }
      >
        <div className="apply-success-wrap">
          <img
            className="apply-success-close-btn"
            onClick={ this.handleClose }
            src={ blackClose }
            alt=""
          />
          <img className="apply-success-img" src={ goDownload } alt=""/>
          <a href="javascript:;" onClick={ this.handleClick } className="apply-success-click-area"/>
        </div>
      </Modal>
    );
  }
}

export default ApplySuccessDownloadGuide;
