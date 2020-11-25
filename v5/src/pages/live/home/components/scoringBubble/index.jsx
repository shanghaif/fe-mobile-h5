import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import LivingHiddenScore from '../LivingHiddenScore';
import './index.less';

@inject('scoreStore')
@observer

class ScoringBubble extends React.Component {
  static propTypes = {
    scoreStore: PropTypes.object.isRequired,
  }
  handleGoScore = () => {
    const { scoreStore: { setScoreVisible, clickBubble, setVisibleBubble } } = this.props;
    setScoreVisible(true);
    setVisibleBubble(false);
    clickBubble();
  }
  handleCloseScore = () => {
    const { scoreStore: { setScoreVisible } } = this.props;
    setScoreVisible(false);
  }
  render() {
    const { scoreStore: { scoreVisible, isVisibleBubble } } = this.props;
    return (
      <div className="score-feedback-container">
        {
          isVisibleBubble ? <div className="score-bubble" onClick={ this.handleGoScore }/> : null
        }
        <LivingHiddenScore onClose={ this.handleCloseScore } visible={ scoreVisible }/>
      </div>
    );
  }
}

export default ScoringBubble;
