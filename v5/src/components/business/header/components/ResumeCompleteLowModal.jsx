/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@liepin/react-violet-h5';
import domain from '@liepin/native-domain-fe';

const cRoot = domain('m-c');

export default class ResumeCompleteLowModal extends PureComponent {
  static propTypes = {
    resumeCompleteDegree: PropTypes.string.isRequired,
    isShowResumeCompleteModal: PropTypes.bool.isRequired,
    onHandleCloseResumeCompleteModal: PropTypes.func.isRequired,
  }
  handleOk = () => {
    window.location.href = `${cRoot}/resume-guidance/?url=${encodeURIComponent(window.location.href)}`;
  }
  handleCancel = () => {
    const { onHandleCloseResumeCompleteModal } = this.props;
    onHandleCloseResumeCompleteModal();
  }
  render() {
    const { isShowResumeCompleteModal, resumeCompleteDegree } = this.props;
    return (
      <Modal
        visible={ isShowResumeCompleteModal }
        mask
        okText="立即完善"
        cancelText="取消"
        onCancel={ this.handleCancel }
        onClose={ this.handleCancel }
        onOk={ this.handleOk }
      >
        <div className="text-center">很抱歉您的默认简历完整度较低<em className="text-warning">{ resumeCompleteDegree }%</em><br/>若需刷新简历，请先完善您的简历</div>
      </Modal>
    );
  }
}


