import React from 'react';
import PropTypes from 'prop-types';
import { Message, Portal } from '@liepin/react-violet-h5';
import domain from '@liepin/native-domain-fe';

import Ajax from '../../../../lib/utils/request';
import cookieUtil from '../../../../lib/utils/cookie';

import NoResumeModal from './NoResumeModal';
import ResumeCompleteLowModal from './ResumeCompleteLowModal';
import ImproveDutyModal from './ImproveDutyModal';
import AppGuideModal from './AppGuideModal';

import './sideMenu.less';

const mcRoot = domain('m-c');
const passportRoot = domain('passport');

export default class SideMenu extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    userInfo: PropTypes.object.isRequired,
    isShowSideMenu: PropTypes.bool.isRequired,
    sideFlag: PropTypes.bool.isRequired,
    onHandleClose: PropTypes.func.isRequired,
    newsNum: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      isShowNoResumeModal: false,
      isShowImProveDutyModal: false,
      isShowResumeCompleteModal: false,
      isShowAppGuideModal: false,
    };
  }
  handleClose = () => {
    const { onHandleClose } = this.props;
    onHandleClose();
  }
  handleNews = () => {
    this.handleClose();
    $.dialog({
      title: false,
      content: '请下载猎聘 APP，查看最新求职消息',
      okVal: '去下载',
      cancelVal: '取消',
      ok() {
        window.location.href = `${domain('m-c')}/tdown`;
      },
      cancel() {
        $.dialog.focus.close();
      },
      width: '300px',
      css: {
        'text-align': 'center',
      },
    });
  }
  // 刷新简历
  handleRefresh = () => {
    window.tlog.push('c:C000000353');
    setTimeout(() => {
      Ajax({
        url: `${mcRoot}/resume/refresh.json`,
      }).then(({ data, flag, code, msg }) => {
        if (flag === 1) {
          if (data.needImproveDuty && !cookieUtil.get('navIsFirst')) {
            // 职责业绩过于简单弹窗
            this.setState({
              isShowImProveDutyModal: true,
            });
          } else {
            // 刷新成功弹窗
            this.setState({
              isShowAppGuideModal: true,
            });
          }
        } else if (flag === 0 && code === '5067') {
          // 无简历弹窗
          this.setState({
            isShowNoResumeModal: true,
          });
        } else if (flag === 0 && code === '5183') {
          // 简历完整度较低弹窗
          this.setState({
            isShowResumeCompleteModal: true,
          });
        } else {
          Message.toast(msg || '刷新失败');
        }
      }).catch(() => {
        Message.toast('网络错误，请稍候再试！');
      });
    }, 320);
  }
  handleCloseNoResumeModal = () => {
    this.setState({
      isShowNoResumeModal: false,
    });
  }
  handleCloseImproveDutyModal = () => {
    this.setState({
      isShowImProveDutyModal: false,
    });
  }
  handleCloseResumeCompeteModal = () => {
    this.setState({
      isShowResumeCompleteModal: false,
    });
  }
  handleCloseAppGuideModal = () => {
    this.setState({
      isShowAppGuideModal: false,
    });
  }
  render() {
    const { userInfo, isShowSideMenu, sideFlag, newsNum } = this.props;
    const {
      isShowNoResumeModal,
      isShowImProveDutyModal,
      isShowResumeCompleteModal,
      isShowAppGuideModal,
    } = this.state;
    return (
      <React.Fragment>
        <Portal>
          <aside className={ `m-panel ${isShowSideMenu ? 'm-panel-left' : sideFlag ? '' : 'm-panel-right'} ` }>
            <div className="m-panel-head">
              <div className="private-photo">
                <img className="miniFace" src={ userInfo.miniFaceUrl } alt=""/>
              </div>
              <p className="private-title"><span>{ userInfo.userName } / { userInfo.jobTitle }</span></p>
              <p className="private-company">{ userInfo.companyName }</p>
              <span className="close">
                <i role="presentation" className="text-icon icon-close" onClick={ this.handleClose }/>
              </span>
            </div>
            <div className="m-panel-body">
              <ul className="box clearfix">
                <li role="presentation" className="refresh-resume-btn" onClick={ this.handleRefresh }>
                  <span><i className="text-icon icon-refresh-resume"/></span>
                  <span>刷新简历</span>
                </li>
                <li>
                  <a href={ `${mcRoot}/resume/getdefaultresume/` }>
                    <span><i className="text-icon icon-resume"/></span>
                    <span>我的简历</span>
                  </a>
                </li>
              </ul>
              <ul className="box clearfix">
                <li role="presentation" className="news-resume-btn" onClick={ this.handleNews }>
                  <span><i className="text-icon icon-news"/></span>
                  {newsNum !== 0 ? <em className="news-num">{newsNum}</em> : null}
                  <span>求职消息</span>
                </li>
                <li>
                  <a href={ `${mcRoot}/profile/showapplyjoblist/` }>
                    <span><i className="text-icon icon-progress "/></span>
                    <span>应聘进展</span>
                  </a>
                </li>
              </ul>
              <ul className="box clearfix">
                <li>
                  <a href={ `${mcRoot}/profile/showfavoritejoblist/` }>
                    <span><i className="text-icon icon-collection"/></span>
                    <span>职位收藏</span>
                  </a>
                </li>
                <li>
                  <a href={ `${mcRoot}/profile/editsecret/` }>
                    <span><i className="text-icon icon-private"/></span>
                    <span>隐私保护</span>
                  </a>
                </li>

              </ul>
              <ul className="box clearfix">
                <li>
                  <a href={ `${mcRoot}/resume/editjobwant/` }>
                    <span><i className="text-icon icon-subscribe"/></span>
                    <span>职位意向</span>
                  </a>
                </li>
                <li>
                  <a href={ `${passportRoot}/v1/logout` } onClick={ () => { window.tlog.push('c:C000000354'); } }>
                    <span><i className="text-icon icon-quit"/></span>
                    <span>　退出　</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </Portal>
        <ImproveDutyModal
          isShowImProveDutyModal={ isShowImProveDutyModal }
          onHandleCloseImproveDutyModal={ this.handleCloseImproveDutyModal }
        />
        <NoResumeModal
          isShowNoResumeModal={ isShowNoResumeModal }
          onHandleCloseNoResumeModal={ this.handleCloseNoResumeModal }
        />
        <ResumeCompleteLowModal
          resumeCompleteDegree={ userInfo.resumeCompleteDegree }
          isShowResumeCompleteModal={ isShowResumeCompleteModal }
          onHandleCloseResumeCompleteModal={ this.handleCloseResumeCompeteModal }
        />
        <AppGuideModal
          isShowAppGuideModal={ isShowAppGuideModal }
          onHandleCloseAppGuideModal={ this.handleCloseAppGuideModal }
        />
      </React.Fragment>
    );
  }
}
