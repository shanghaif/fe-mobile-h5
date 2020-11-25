import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { observer, inject } from 'mobx-react';
import { Popup } from '@liepin/react-violet-h5';
import './index.less';

@inject('jobStore')
@inject('liveStore')
@inject('chatStore')
@observer
class LivingDesc extends Component {
  static propTypes = {
    liveStore: PropTypes.object.isRequired,
    jobStore: PropTypes.object.isRequired,
    chatStore: PropTypes.object.isRequired,
  }
  state = {
    popupHeight: 0,
    visible: false,
  }
  componentDidMount() {
    const { liveStore: { info: { ended } }, jobStore: { jobList: { length } } } = this.props;
    if (!length && ended) {
      this.handleOpenPopup();
    }
  }
  handleOpenPopup = () => {
    const { videoHeight } = this.props.liveStore.liveSize;
    const { height } = document.documentElement.getBoundingClientRect();
    this.setState({
      popupHeight: height - videoHeight - (Apps.isBaidu ? 80 : 0),
      visible: true,
    });
  }
  handleClosePopup = () => {
    this.setState({ visible: false });
  }
  render() {
    const { visible, popupHeight } = this.state;
    const { info } = this.props.liveStore;
    const { manageNotice } = this.props.chatStore;
    return (
      <div className="live-desc-wrap">
        <div className={ classnames('desc-bg', {
          'desc-notice-bg': manageNotice,
        }) }
        />
        <div className="live-desc-content">
          <h5 className="ellipsis-1">{ info.title }</h5>
          <div className="live-info-wrap flexbox">
            <span className="live-hot-count">{ `${info.hot}观看` }</span>
            <a
              href="javascript:;"
              onClick={ this.handleOpenPopup }
            >
              <span>详情</span>
              <i className="text-icon icon-go-ahead"/>
            </a>
          </div>
        </div>
        <Popup
          mask={ false }
          visible={ visible }
          maskClosable={ !info.ended }
          closeable={ !info.ended }
          onClose={ this.handleClosePopup }
          title={ false }
          className="live-hidden-desc-wrap"
        >
          <div
            className="popup-desc-wrap"
            style={ {
              height: `${popupHeight}px`,
            } }
          >
            <h2>直播详情</h2>
            <div className="popup-desc-scroller">
              <p className="live-title">{ info.title }</p>
              <h3 className="live-host-title">主播</h3>
              <div className="landing-host-scroll-wrap">
                <div className="landing-host-scroller">
                  {
                    info.lecturers.map((item, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <dl key={ index }>
                        <dt>
                          <img
                            src={ `//image0.lietou-static.com/img/${item.photo}` }
                            alt=""
                          />
                        </dt>
                        <dd className="flex-1">
                          <p className="host-name ellipsis-1">{ item.name }</p>
                          <p className="host-desc ellipsis-1">{ item.title }</p>
                        </dd>
                      </dl>
                    ))
                  }
                </div>
              </div>
              <h3 className="desc-title">本场亮点</h3>
              <pre>{ info.descr }</pre>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

export default LivingDesc;
