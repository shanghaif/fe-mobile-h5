import React from 'react';
import classnames from 'classnames';
import { Button, Message } from '@liepin/react-violet-h5';
import Ajax from '../../../../../lib/utils/request';
import { getScrollTop } from '../../modules/scrollLocation';

import goChat from '../../modules/goChat';
import goJobDetail from '../../modules/goJobDetail';
import SideSelector from '../sideSelector';

import './index.less';

export default class Boss extends React.Component {
  state = {
    loaded: false,
    isShowRecruitEntry: false,
    list: [],
  }
  componentDidMount() {
    Ajax({
      url: '/seek-worthy/boss-recruit.json',
      success: ({ data, flag, msg }) => {
        if (flag === 1) {
          this.setState({
            loaded: true,
            list: data,
          }, () => {
            getScrollTop();
          });
        } else {
          Message.toast(<p className="text-center">{msg}</p>);
        }
      },
      error: () => {
        Message.toast('网络错误，请稍候再试！');
      },
    });
  }
  handleOpen = () => {
    const { isShowRecruitEntry } = this.state;
    this.setState({
      isShowRecruitEntry: !isShowRecruitEntry,
    });
  }
  handlePackUpRaise = () => {
    this.setState({
      isShowRecruitEntry: false,
    });
  }
  // 立即沟通
  handleGoChat = (e, data) => {
    e.stopPropagation();
    const { oppositeUserId, jobKind, jobId, isApplied, imUserType } = data;
    goChat(oppositeUserId, jobKind, jobId, isApplied, imUserType);
  }
  render() {
    const { loaded, isShowRecruitEntry, list } = this.state;
    return (
      <React.Fragment>
        {
          loaded ?
            <div
              className={ classnames('seeking-season-container', {
                'seeking-season-container-empty': list && list.length <= 1,
              }) }
              onTouchStart={ this.handlePackUpRaise }
            >
              <section className={
                    classnames('boss-banner', 'header-word', {
                      'boss-banner-prompt': list && list.length < 3,
                    })
                  }
              >
                <i/>
                {
                  list && list.length <= 3 ?
                    <div className="boss-word-content">
                      <p>符合您期望的老板直招职位，数量有限。</p>
                      <p>您可进入高薪定制页，浏览更多机会哦~</p>
                    </div>
                      :
                     null
                }
              </section>
              <ul className="boss-job-container">
                {
                list && list.length ?
                list.map((item, index) => (
                  <li
                    role="presentation"
                    key={ item.jobId }
                    className="job-item"
                    onClick={ () => goJobDetail(
                      item.jobKind,
                      item.jobId,
                      index,
                      item.url,
                    ) }
                  >
                    <dl className="flexbox">
                      <dt>
                        <img src={ item.recruiterPhoto } alt=""/>
                      </dt>
                      <dd className="flexbox">
                        <div>
                          <p className="boss-name">{ item.recruiterName}</p>
                          <p className="boss-title">{ item.recruiterTitle}</p>
                        </div>
                        <Button
                          type="primary"
                          content="立即沟通"
                          className={ Apps.isTd && Apps.appVc < 610 ? 'hide' : '' }
                          onClick={ (e) => this.handleGoChat(e, {
                              oppositeUserId: item.userId,
                              jobKind: item.jobKind,
                              jobId: item.jobId,
                              isApplied: item.applied,
                              imUserType: item.recruiterImUserType,
                            }) }
                        />
                      </dd>
                    </dl>
                    <p className="job-info flexbox">
                      <span className="job-name ellipsis">{ item.title }</span>
                      <span className="job-salary">{ item.salaryShow }</span>
                    </p>
                    <p className="job-comp ellipsis">{ item.compName }</p>
                    <p className="job-require">
                      <span>{ item.dqName}</span>
                      <span>{ item.requireWorkYearsShow }</span>
                      <span>{ item.requireEdulevelName }</span>
                    </p>
                  </li>
                )) : null
              }
              </ul>
              <div
                className={
                  classnames({
                    'recruit-container': true,
                    active: isShowRecruitEntry,
                  })
                }
                onTouchStart={ (e) => e.stopPropagation() }
                onClick={ this.handleOpen }
              >
                <a
                  className="link-trigger"
                  onClick={ (e) => e.stopPropagation() }
                  href="https://m-c.liepin.cn/tdown?v=1&open_target=lpre://lp/p/auth?s=sms"
                />
              </div>
              <SideSelector/>
            </div> : null
        }
      </React.Fragment>
    );
  }
}
