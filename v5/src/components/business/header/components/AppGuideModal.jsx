import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@liepin/react-violet-h5';
import domain from '@liepin/native-domain-fe';
import DownloadImg from '../images/index-download-img.png';
import CloseImg from '../images/index-download-close.png';
import isFromAlipay from '../../../business/app/alipay';

const mcRoot = domain('m-c');

export default class AppGuideModal extends React.Component {
  static propTypes = {
    isShowAppGuideModal: PropTypes.bool.isRequired,
    onHandleCloseAppGuideModal: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    window.tlog.push('s:S000013567');
  }
  handleCancel = () => {
    const { onHandleCloseAppGuideModal } = this.props;
    onHandleCloseAppGuideModal();
  }
  handleJump = () => {
    window.location.href = `${mcRoot}/tdown?imscid=R000013518`;
  }
  render() {
    const { isShowAppGuideModal } = this.props;
    return isFromAlipay() ? null : (
      <Modal
        visible={ isShowAppGuideModal }
        cancelText={ false }
        onCancel={ this.handleCancel }
        onClose={ this.handleCancel }
        onOk={ this.handleOk }
        style={ {
          width: '90%',
        } }
      >
        <div className="refresh-download-center-box">
          <img
            role="presentation"
            className="index-banner"
            src={ DownloadImg }
            alt=""
            onClick={ this.handleJump }
          />
          <img
            role="presentation"
            data-nick="index_banner_close"
            className="index-banner-close"
            src={ CloseImg }
            alt=""
            onClick={ this.handleCancel }
          />
        </div>
      </Modal>
    );
  }
}


