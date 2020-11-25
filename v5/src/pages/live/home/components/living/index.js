import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import FixedWin from '../../../../../components/ui/fixed-win';
import YunxinVideo from './Player';
import appsUtil from '../../../../../lib/utils/apps';

import LivingDesc from '../livingDesc/';
import ManageNotice from '../manageNotice';
import ChatList from '../chatList/';
import LivingTabbar from '../livingTabbar/';
import ActiveJob from '../activeJob/';
import ScoringBubble from '../scoringBubble';

import './index.less';

@inject('liveStore')
@inject('chatStore')
@inject('scoreStore')
@observer
class Living extends Component {
  static propTypes = {
    chatStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
    scoreStore: PropTypes.object.isRequired,
  }
  constructor(prop) {
    super(prop);
    this.state = {
      landscapeHide: false,
    };
    // 初始化im
    document.addEventListener('focusout', function () {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 160);
    }, false);
  }
  componentDidMount() {
    const { liveStore: { setIframe }, scoreStore: { initVisibleBubble } } = this.props;
    setIframe(document.getElementById('live-iframe'));
    initVisibleBubble();
    window.addEventListener('orientationchange', () => {
      try {
        switch (window.orientation) {
          case 90:
          case -90: // 横屏
            this.setState({
              landscapeHide: true,
            });
            break;
          case 0:
          case 180: // 竖屏
            this.setState({
              landscapeHide: false,
            });
            break;
          default:
            // nothing
        }
      } catch (err) {
        // nothing
      }
    });
  }

  handleEnd = () => {
    this.props.liveStore.setLiveStatus(4);
  }

  handleInitSuccess = (player) => {
    this.props.liveStore.setLivePlayer(player);
  }

  handleStatusChange = (status) => {
    this.props.chatStore.updateLiveStatus(status);
  }

  handleBack = () => {
    this.props.liveStore.setFixed(false);
    this.props.scoreStore.setVisibleBubble(true);
  }

  handleClose = () => {
    this.props.liveStore.closeFixedWin();
  }

  render() {
    const {
      liveStore: {
        liveSize,
        info: { pullUrl, launchTime, ended, loggedIn },
        fixed,
        showFixedWin,
      },
    } = this.props;
    const { landscapeHide } = this.state;
    return (
      <div className="living-home-wrap">
        {
          ended ? (
            <div className="ending-banner-wrap">
              <span className="ending-banner-text">直播已结束</span>
            </div>
          ) : (
            <FixedWin
              key="fixed-win"
              fixed={ fixed }
              className={ classnames('live-video-wrap', { 'live-video-hidden': !showFixedWin }) }
            >
              <div className={ classnames('live-video-back', { hide: !fixed }) }>
                <a onClick={ this.handleBack }>返回直播</a>
                <a className="float-right">
                  <i className="text-icon icon-close" onClick={ this.handleClose }/>
                </a>
              </div>
              <YunxinVideo
                key="video"
                launchTime={ launchTime }
                onInitSuccess={ this.handleInitSuccess }
                onStatusChange={ this.handleStatusChange }
                size={ liveSize }
                pullUrl={ pullUrl }
                iconSize="medium"
                controls="system"
              />
            </FixedWin>
          )
        }
        <div className={ classnames('live-studio-wrap', { hide: fixed, 'landscape-hide': landscapeHide }) }>
          <div className="live-group-wrap">
            <LivingDesc/>
            <ManageNotice/>
            <ChatList/>
          </div>
          <ActiveJob/>
          <LivingTabbar/>
        </div>
        <div className={ classnames('live-iframe-wrap', { hide: !fixed }) }>
          {
            appsUtil.isIos
              ? <iframe title="live" id="live-iframe" src="" className="iframe-in-ios" scrolling="auto" height="100%" frameBorder="0"/>
              : <iframe title="live" id="live-iframe" src="" scrolling="auto" width="100%" height="100%" frameBorder="0"/>
          }
        </div>
        {
         loggedIn && !landscapeHide ? <ScoringBubble/> : null
       }
      </div>
    );
  }
}

export default Living;
