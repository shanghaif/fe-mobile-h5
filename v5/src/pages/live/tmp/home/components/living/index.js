import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import YunxinVideo from '@liepin/react-yunxin-video';
// import { Message } from '@liepin/react-violet-h5';

import LivingDesc from '../livingDesc/';
import ChatList from '../chatList/';
import LivingTabbar from '../livingTabbar/';
import ActiveJob from '../activeJob/';

import './index.less';

@inject('liveStore')
@inject('chatStore')
@inject('jobStore')
@observer
class Living extends Component {
  propTypes = {
    chatStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
    jobStore: PropTypes.object.isRequired,
  }
  constructor(prop) {
    super(prop);
    const { liveStore: { info }, chatStore } = this.props;
    Apps.isBaidu = window.navigator.userAgent.match(/baidu/i);
    // 初始化im
    chatStore.initIM({
      user: info.emUserId,
      pwd: info.emUserToken,
      roomId: info.chatroomId,
    });
    document.addEventListener('focusout', function () {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 160);
    }, false);
    window.removeEventListener('beforeunload', this.handleExit);
    window.addEventListener('beforeunload', this.handleExit);
  }
  componentWillUnmount() {
    this.handleExit();
  }
  handleExit = () => {
    this.props.chatStore.exitIM();
  }
  handleVideoError = (code) => {
    switch (code) {
      // eslint-disable-next-line no-case-declarations
      case 4:
        const start = this.props.liveStore.info.launchTime;
        const diff = start - (new Date()).getTime();
        if (diff > 0 && diff <= 900000) {
          return '直播马上开始，请稍后刷新';
        }
        return '';
      default:
        return '';
    }
  }
  render() {
    const {
      jobStore: {
        videoHeight,
        screenWidth,
      },
      liveStore: {
        info: { pullUrl },
      },
    } = this.props;
    return (
      <div className="living-home-wrap">
        <YunxinVideo
          className="live-video-wrap"
          height={ videoHeight }
          width={ screenWidth }
          pullUrl={ pullUrl }
          iconSize="medium"
          controls
          onError={ this.handleVideoError }
        />
        <div className="live-group-wrap">
          <LivingDesc/>
          <ChatList/>
        </div>
        <ActiveJob/>
        <LivingTabbar/>
      </div>
    );
  }
}

export default Living;
