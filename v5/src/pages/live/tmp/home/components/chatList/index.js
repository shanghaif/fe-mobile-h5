import React, { Component } from 'react';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import TextMsgItem from '../textMsgItem/';
import WelcomeMsgItem from '../welcomeMsgItem/';
import './index.less';

function stopPropagation(e) {
  e.stopPropagation();
}

@inject('jobStore')
@inject('chatStore')
@observer
class ChatList extends Component {
  propTypes = {
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
    this.$wrap.scrollTop += diff;
  }
  handleChatChange() {
    const {
      chatRecord,
    } = this.props.chatStore;
    if (chatRecord.length && this.$lastMsg.getBoundingClientRect) {
      const listHeight = this.$list.getBoundingClientRect().height;
      const wrapHeight = this.$wrap.getBoundingClientRect().height;
      const { scrollTop } = this.$wrap;
      if (scrollTop + wrapHeight >= listHeight - this.$lastMsg.getBoundingClientRect().height) {
        this.$wrap.scrollTop = listHeight - wrapHeight;
      }
    }
  }
  saveLastMsgRef = (ref) => {
    this.$lastMsg = ref;
  }
  switchMsgItem = (msg, lastest) => {
    const type = msg.contentsType || msg.type;
    switch (type) {
      case 'TEXT':
      case 'txt':
        return (
          <TextMsgItem
            msg={ msg }
            key={ msg.id }
            ref={ lastest ? this.saveLastMsgRef : null }
          />
        );
      case 'welcome':
        return (
          <WelcomeMsgItem
            msg={ msg }
            key="welcome"
            ref={ lastest ? this.saveLastMsgRef : null }
          />
        );
      default:
        return null;
    }
  }
  render() {
    const {
      chatRecord,
    } = this.props.chatStore;
    const last = chatRecord.length - 1;
    return (
      <div
        className="live-chat-wrap"
        onTouchMove={ stopPropagation }
        ref={ (ref) => { this.$wrap = ref; } }
      >
        <div className="live-chat-holder"/>
        <div
          className="chat-item-list"
          ref={ (ref) => { this.$list = ref; } }
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
