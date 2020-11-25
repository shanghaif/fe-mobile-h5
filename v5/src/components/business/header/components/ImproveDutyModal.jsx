/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import domain from '@liepin/native-domain-fe';
import { Modal } from '@liepin/react-violet-h5';
import cookieUtil from '../../../../lib/utils/cookie';

const mcRoot = domain('m-c');

export default class ImproveDutyModal extends React.Component {
  static propTypes = {
    isShowImProveDutyModal: PropTypes.bool.isRequired,
    onHandleCloseImproveDutyModal: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    window.tlog.push('s:S000010605');
  }
  handleOk = () => {
    window.tlog.push('c:C000010606');
    window.location.href = `${mcRoot}/resume/edit-def-duty`;
  }
  handleCancel = () => {
    const { onHandleCloseImproveDutyModal } = this.props;
    cookieUtil.set('navIsFirst', false, 1, '/');
    onHandleCloseImproveDutyModal();
  }
  render() {
    const { isShowImProveDutyModal } = this.props;
    return (
      <Modal
        visible={ isShowImProveDutyModal }
        mask
        okText="去完善"
        cancelText="取消"
        onCancel={ this.handleCancel }
        onClose={ this.handleCancel }
        onOk={ this.handleOk }
        className="improveDuty-container"
      >
        <p className="refresh-success"><span><i className="text-icon icon-checkright"/>刷新成功</span></p>
        <p>职责业绩填写的太过简单，继续完善可提升简历曝光量</p>
      </Modal>
    );
  }
}


