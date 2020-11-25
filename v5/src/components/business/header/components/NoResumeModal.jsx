/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@liepin/react-violet-h5';
import domain from '@liepin/native-domain-fe';

const cRoot = domain('m-c');


export default class NoResumeModal extends PureComponent {
  static propTypes = {
    isShowNoResumeModal: PropTypes.bool.isRequired,
    onHandleCloseNoResumeModal: PropTypes.func.isRequired,
  }
  handleOk = () => {
    window.location.href = `${cRoot}/resume-guidance/`;
  }
  handleCancel = () => {
    const { onHandleCloseNoResumeModal } = this.props;
    onHandleCloseNoResumeModal();
  }
  render() {
    const { isShowNoResumeModal } = this.props;
    return (
      <Modal
        visible={ isShowNoResumeModal }
        okText="立即创建"
        cancelText="暂不"
        onCancel={ this.handleCancel }
        onClose={ this.handleCancel }
        onOk={ this.handleOk }
      >
        <div className="text-center">很抱歉您还没有简历，无法刷新<br/>请先创建简历</div>
      </Modal>
    );
  }
}


