
import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import './index.less';

@inject('store')
@observer
class Tabbar extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  handleClick = (code) => {
    const { store } = this.props;
    if (code !== store.activeTab) {
      store.changeTab(code);
      store.changeUrl(true);
    }
  }

  render() {
    const { activeTab } = this.props.store;
    return (
      <React.Fragment>
        <div className="tabbar-holder"/>
        <div className="seeking-tabbar-wrap">
          <div className="tabbar-item-wrap">
            <a
              href="javascript:;"
              className={ activeTab === 'boss' ? 'boss-icon active' : 'boss-icon' }
              onClick={ () => this.handleClick('boss') }
            >
              <i className="unactive"/>
              <i className="active"/>
              <p>老板直招</p>
            </a>
            <a
              href="javascript:;"
              className={ activeTab === 'salary' ? 'salary-icon active' : 'salary-icon' }
              onClick={ () => this.handleClick('salary') }
            >
              <i className="unactive"/>
              <i className="active"/>
              <p>高薪定制</p>
            </a>
            <a
              href="javascript:;"
              className={ activeTab === 'hunter' ? 'hunter-icon active' : 'hunter-icon' }
              onClick={ () => this.handleClick('hunter') }
            >
              <i className="unactive"/>
              <i className="active"/>
              <p>专属猎头</p>
            </a>
          </div>
          <div className="iphonex-holder"/>
        </div>
      </React.Fragment>
    );
  }
}

export default Tabbar;
