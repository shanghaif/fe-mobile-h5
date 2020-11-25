import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import { Input, Popup, SafeAreaView } from '@liepin/react-violet-h5';
import LivingHiddenJobList from '../livingHiddenJobList/';
import appsUtil from '../../../../../lib/utils/apps';
import './index.less';


@inject('liveStore')
@inject('jobStore')
@inject('chatStore')
@observer
class Tabbar extends Component {
  static propTypes = {
    chatStore: PropTypes.object.isRequired,
    jobStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
  }
  state = {
    btnEnabled: false,
    isFocus: false,
  }
  componentDidMount() {
    if (appsUtil.isAndroid) {
      this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      window.addEventListener('resize', this.resize);
    }
  }
  componentWillUnmount() {
    if (appsUtil.isAndroid) {
      window.removeEventListener('resize', this.resize);
    }
  }
  sending = false;
  $input = React.createRef()
  clientHeight = 0;
  resize = () => {
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (this.clientHeight > clientHeight) {
      this.inputFocusHandle(); // 键盘弹出
    } else {
      this.inputBlurHandle(); // 键盘收起
    }
  }
  inputFocusHandle = () => {
    this.setState({
      isFocus: true,
    });
  }
  inputBlurHandle = () => {
    this.setState({
      isFocus: false,
    });
  }
  handleSendMessage = () => {
    const { chatStore, liveStore: { info: { ended } } } = this.props;
    if (ended) {
      return false;
    }
    const $input = this.$input.current;
    const text = $input.value.trim();
    if (!this.sending && text) {
      this.sending = true;
      // 5秒没有响应可以重新发
      const timer = setTimeout(() => {
        this.sending = false;
      }, 5000);
      chatStore.sendMsg(text).then(() => {
        $input.value = '';
        this.sending = false;
        this.setState({
          btnEnabled: false,
        });
        clearTimeout(timer);
      }, () => {
        this.sending = false;
        clearTimeout(timer);
      }).catch(() => {
        this.sending = false;
        clearTimeout(timer);
      });
    }
  }
  handleJobClick = () => {
    this.props.jobStore.setListVisible(true);
    this.props.jobStore.fetchJobs();
  }
  handleJobListClick = () => {
    this.props.jobStore.setListVisible(false);
  }
  handleIputChange = (e) => {
    this.setState({
      btnEnabled: !!e,
    });
  }

  handleShowLogin = () => {
    const { liveStore: { info: { ended }, showLogin } } = this.props;
    if (!ended) {
      showLogin();
    }
  }

  handleCloseLogin = () => {
    this.props.liveStore.hideLogin();
  }

  handleToLogin = () => {
    this.props.liveStore.toLogin();
  }
  switchInputArea = () => {
    const {
      liveStore: {
        info: {
          loggedIn,
          ended,
        },
      },
      chatStore: {
        socketConnected,
      },
    } = this.props;
    if (ended || !loggedIn) {
      return (
        <Fragment>
          <div
            className="chat-input needsclick"
            onClick={ this.handleShowLogin }
          >
            跟主讲人聊点什么？
          </div>
          <a href="javascript:;" className="btn-send-msg"/>
        </Fragment>
      );
    }
    if (socketConnected) {
      const btnClassname = classnames({
        'btn-send-msg': true,
        active: this.state.btnEnabled,
      });
      return (
        <Fragment>
          <Input
            className="chat-input needsclick"
            onChange={ this.handleIputChange }
            ref={ this.$input }
            autoComplete="off"
            maxLength={ 50 }
            placeholder="跟主讲人聊点什么？"
            onFocus={ appsUtil.isIos ? this.inputFocusHandle : () => {} }
            onBlur={ appsUtil.isIos ? this.inputBlurHandle : () => {} }
          />
          <a
            href="javascript:;"
            className={ btnClassname }
            onClick={ this.handleSendMessage }
          />
        </Fragment>
      );
    }
    return null;
  }
  render() {
    const {
      jobStore: {
        jobList,
        listVisible,
      },
      liveStore: {
        visibleLogin,
        info: {
          ended,
        },
      },
    } = this.props;
    const { isFocus } = this.state;
    const jobCount = jobList.length;
    return (
      <SafeAreaView className={ classnames('live-tabbr-wrap', {
        'live-tabbr-focus': isFocus,
      }) }
      >
        <div className="live-input-wrap flexbox">
          {
            jobCount ? (
              <Fragment>
                <a
                  href="javascript:;"
                  className="job-toggle-btn"
                  onClick={ this.handleJobClick }
                >
                  <i/>
                  <span className="total-job-count" key={ jobCount }>
                    { jobCount }
                  </span>
                </a>
                <LivingHiddenJobList
                  ended={ ended }
                  visible={ listVisible }
                  onClose={ this.handleJobListClick }
                />
              </Fragment>
            ) : null
          }
          { this.switchInputArea() }
          <Popup
            mask={ false }
            maskClosable
            visible={ visibleLogin }
            onClose={ this.handleCloseLogin }
            okText="确认"
            onOk={ this.handleToLogin }
            onCancel={ this.handleCloseLogin }
          >
            <p className="send-need-login">发言需要获取您的登录信息</p>
          </Popup>
        </div>
      </SafeAreaView>
    );
  }
}

export default Tabbar;
