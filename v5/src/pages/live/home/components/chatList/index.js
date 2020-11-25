import React, { Component } from 'react';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TextMsgItem from '../textMsgItem/';
import WelcomeMsgItem from '../welcomeMsgItem/';
import ImgMsgItem from '../ImgMsgItem/';
import './index.less';

function stopPropagation(e) {
  e.stopPropagation();
}

@inject('jobStore')
@inject('chatStore')
@observer
class ChatList extends Component {
  static propTypes = {
    chatStore: PropTypes.object.isRequired,
    jobStore: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.handleChatChange();
    reaction(() => this.props.jobStore.showActiiveJob, (bol) => {
      if (bol) {
        this.changeScroll();
      }
    }, {
      delay: 300,
    });
  }
  componentDidUpdate() {
    this.handleChatChange();
  }
  $wrap = React.createRef()
  $list = React.createRef()
  $lastMsg = React.createRef()

  changeScroll = () => {
    const diff = document.querySelector('[data-selector="living-active-job-wrap"]').getBoundingClientRect().height;
    this.$wrap.current.scrollTop += diff;
  }
  handleChatChange() {
    const {
      chatRecord,
      manageNotice,
    } = this.props.chatStore;
    const $lastMsg = this.$lastMsg.current;
    const $wrap = this.$wrap.current;
    const $list = this.$list.current;

    if (chatRecord.length && $lastMsg && $lastMsg.getBoundingClientRect) {
      const listHeight = $list.getBoundingClientRect().height;
      const wrapHeight = $wrap.getBoundingClientRect().height;
      const { scrollTop } = $wrap;
      if (scrollTop + wrapHeight >= listHeight - $lastMsg.getBoundingClientRect().height) {
        const paddingT = manageNotice ? 135 : 66; // 66, 135 是wrap的padding-top
        $wrap.scrollTop = listHeight - wrapHeight + paddingT;
      }
    }
  }
  switchMsgItem = (msg, lastest) => {
    const { type } = msg.message;
    switch (type) {
      case 'txt':
        return (
          <TextMsgItem
            msg={ msg }
            key={ msg.messageId }
            ref={ lastest ? this.$lastMsg : null }
          />
        );
      case 'welcome':
        return (
          <WelcomeMsgItem
            msg={ msg }
            key="welcome"
            ref={ lastest ? this.$lastMsg : null }
          />
        );
      case 'img':
        return (
          <ImgMsgItem
            msg={ msg }
            key="img"
            ref={ lastest ? this.$lastMsg : null }
          />
        );
      default:
        return null;
    }
  }
  render() {
    const {
      chatRecord,
      manageNotice,
    } = this.props.chatStore;
    const last = chatRecord.length - 1;
    return (
      <div
        className={ classnames('live-chat-wrap', {
          'live-chat-notice-wrap': manageNotice,
        }) }
        onTouchMove={ stopPropagation }
        ref={ this.$wrap }
      >
        <div className="live-chat-holder"/>
        <div
          className="chat-item-list"
          ref={ this.$list }
        >
          {
            chatRecord.map((item, index) => (this.switchMsgItem(item, last === index)))
          }
        </div>
      </div>
    );
  }
}

export default ChatList;
