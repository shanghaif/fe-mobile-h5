import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import { Input } from '@liepin/react-violet-h5';
import LivingHiddenJobList from '../livingHiddenJobList/';
import { confirmOfLogin } from '../../modules/confirms';
import './index.less';

@inject('liveStore')
@inject('jobStore')
@inject('chatStore')
@observer
class Tabbar extends Component {
  propTypes = {
    chatStore: PropTypes.object.isRequired,
    jobStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
  }
  state = {
    listVisible: false,
    btnEnabled: false,
  }
  sending = false;
  $input = React.createRef()
  handleSendMessage = () => {
    const { chatStore } = this.props;
    const text = this.$input.value.trim();
    if (!this.sending && text) {
      this.sending = true;
      chatStore.sendMsg(text).then(() => {
        this.$input.value = '';
        this.sending = false;
        this.setState({
          btnEnabled: false,
        });
      }, () => {
        this.sending = false;
      }).catch(() => {
        this.sending = false;
      });
    }
  }
  handleJobClick = () => {
    this.setState({
      listVisible: true,
    }, () => {
      this.props.jobStore.fetchJobs();
    });
  }
  handleJobListClick = () => {
    this.setState({
      listVisible: false,
    });
  }
  handleIputChange = (e) => {
    this.setState({
      btnEnabled: !!e,
    });
  }
  render() {
    const {
      listVisible,
      btnEnabled,
    } = this.state;
    const {
      jobStore: {
        jobCount,
      },
      liveStore: {
        info: {
          loggedIn,
        },
      },
    } = this.props;
    const btnClassname = classnames({
      'btn-send-msg': true,
      active: btnEnabled && loggedIn,
    });
    return (
      <div className="live-input-wrap flexbox">
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
        {
          loggedIn ? (
            <Fragment>
              <Input
                className="chat-input needsclick"
                onChange={ this.handleIputChange }
                ref={ (ref) => { this.$input = ref; } }
                autoComplete={ false }
                maxlength={ 50 }
                placeHolder="跟主讲人聊点什么？"
              />
              <a
                href="javascript:;"
                className={ btnClassname }
                onClick={ this.handleSendMessage }
              />
            </Fragment>
          ) : (
            <Fragment>
              <Input
                className="chat-input needsclick"
                readOnly
                placeHolder="跟主讲人聊点什么？"
                onFocus={ confirmOfLogin }
              />
              <a
                href="javascript:;"
                className={ btnClassname }
              />
            </Fragment>
          )
        }
        <LivingHiddenJobList
          visible={ listVisible }
          onClose={ this.handleJobListClick }
        />
      </div>
    );
  }
}

export default Tabbar;
