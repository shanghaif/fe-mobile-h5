import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import Main from '../main/index';
import Boss from '../boss/index';
import Hunter from '../hunter/index';
import Tabbar from '../tabbar/index';

import './index.less';

@inject('store')
@observer
class MeetingPlace extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };
  state = {
  }
  renderPage = () => {
    const {
      activeTab,
    } = this.props.store;
    switch (activeTab) {
      case 'salary':
        return <Main/>;
      case 'hunter':
        return <Hunter/>;
      case 'boss':
        return <Boss/>;
      default:
        return null;
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="seeking-content-wrap">
          { this.renderPage() }
        </div>
        <Tabbar/>
      </React.Fragment>
    );
  }
}

export default MeetingPlace;
