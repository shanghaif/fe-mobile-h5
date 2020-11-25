import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from '@liepin/react-violet-h5';
import Score from '../score/index'; // 评分
import './index.less';

export default class LivingHiddenScore extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
    this.$score.clearStar();
  }
  render() {
    const {
      visible,
    } = this.props;
    return (
      <Popup
        mask={ false }
        maskClosable
        visible={ visible }
        onClose={ this.handleClose }
        className="hidden-job-popup"
      >
        <Score onRef={ (ref) => { this.$score = ref; } }/>
      </Popup>
    );
  }
}



