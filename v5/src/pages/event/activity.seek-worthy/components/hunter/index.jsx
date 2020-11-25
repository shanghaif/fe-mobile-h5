import React from 'react';
import { Button, Message } from '@liepin/react-violet-h5';
import Ajax from '../../../../../lib/utils/request';
import { getScrollTop } from '../../modules/scrollLocation';

import goHunterPage from '../../modules/goHunterPage';
import goJobDetail from '../../modules/goJobDetail';
import SideSelector from '../sideSelector/index';

import './index.less';

export default class Hunter extends React.Component {
  state = {
    loaded: false,
    userHinfos: [],
    jobCards: [],
  }
  componentDidMount() {
    Ajax({
      url: '/seek-worthy/exclusive-hunters.json',
      success: ({ data, flag, msg }) => {
        if (flag === 1) {
          this.setState({
            loaded: true,
            ...data,
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
  render() {
    const { loaded, userHinfos, jobCards } = this.state;
    return (
      <div className="seeking-season-container flexbox-v">
        <section className="header-word exclusive-hunter-banner"><i/></section>
        {
          loaded ?
            <section className="exclusive-hunter-container">
              <ul className="hunter-content">
                {
                  userHinfos.length ?
                  userHinfos.map((item) => (
                    <li className="hunter-item" key={ item.name }>
                      <dl className="flexbox">
                        <dt>
                          <img src={ item.photo } alt=""/>
                        </dt>
                        <dd className="flexbox">
                          <div className="hunter-info">
                            <p>{ item.name}</p>
                            <p>应聘查看率 <span>{ item.checkRate }</span></p>
                            <p>应聘反馈率 <span>{ item.feedbackRate }</span></p>
                          </div>
                          <Button
                            type="primary"
                            content="进入主页"
                            onClick={ () => goHunterPage(item.userId, item.userType) }
                          />
                        </dd>
                      </dl>
                    </li>
                  )) : null
                }
              </ul>
              {
                jobCards.length ? (
                  <ul className="hunter-job-list">
                    {
                      jobCards.map((item, index) => (
                        <li
                          role="presentation"
                          key={ item.jobId }
                          className="hunter-job-item"
                          data-info={
                            JSON.stringify({ job_id: item.jobId, job_kind: item.jobKind })
                          }
                          onClick={ () => goJobDetail(
                            item.jobKind,
                            item.jobId,
                            index,
                            item.url,
                          ) }
                        >
                          <p className="hunter-info flexbox">
                            <span className="hunter-job-title ellipsis">{ item.title }</span>
                            <span className="hunter-job-salary">{ item.salaryShow }</span>
                          </p>
                          <p className="hunter-job-comp">{ item.compName }</p>
                          <p className="hunter-job-require">
                            <span>{ item.dqName }</span>
                            <span>{ item.requireWorkYearsShow }</span>
                            <span>{ item.requireEdulevelName }</span>
                          </p>
                        </li>
                      ))
                    }
                  </ul>
                ) : null
              }
            </section> : null
        }
        <SideSelector/>
      </div>
    );
  }
}
