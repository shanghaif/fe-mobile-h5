/**
 * 求贤季-黄金时代
 * url: https://m.liepin.com/seek-worthy/thirty_up_age/
 * 活动时间： 2020-03-02至2020-03-25
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from '@liepin/react-violet-h5';
import Ajax from '../../../lib/utils/request';


import JobCard from './components/JobCard';
import HunterCard from './components/HunterCard';
import { recoverScroll } from './modules/recordScroll';

import './index.less';

export default class Demo extends React.Component {
  state = {
    jobList: [],
    frontList: [],
    hunterList: [],
    loaded: false,
  }
  componentDidMount() {
    Promise
      .all([this.handleGetHighSalary(), this.handleGetNewFront(), this.handleGetHunter()])
      .then((result) => {
        this.setState({
          jobList: result[0] || [],
          frontList: result[1] || [],
          hunterList: result[2] || [],
          loaded: true,
        }, () => {
          recoverScroll();
        });
      }).catch(() => {
        Message.toast('系统错误，请稍后再试');
      });
  }
  handleGetHighSalary = () => (
    new Promise((resolve, reject) => {
      Ajax({
        url: '/seek-worthy/high-salary.json',
      }).then(({ data, flag }) => {
        if (flag === 1) {
          resolve(data);
        } else {
          reject();
        }
      }).then((err) => {
        reject(err);
      });
    })
  )
  handleGetNewFront = () => (
    new Promise((resolve, reject) => {
      Ajax({
        url: '/seek-worthy/new-front.json',
      }).then(({ data, flag }) => {
        if (flag === 1) {
          resolve(data);
        } else {
          reject();
        }
      }).then((err) => {
        reject(err);
      });
    })
  )
  handleGetHunter = () => (
    new Promise((resolve, reject) => {
      Ajax({
        url: '/seek-worthy/special-hunters.json',
      }).then(({ data, flag }) => {
        if (flag === 1) {
          resolve(data);
        } else {
          reject();
        }
      }).then((err) => {
        reject(err);
      });
    })
  )
  render() {
    const { jobList, frontList, hunterList, loaded } = this.state;
    return (
      <div className="seeking-gold-container">
        <section className="seeking-gold-banner">
          <i className="banner-logo"/>
          <i className="banner-bg"/>
          <p className="banner-content">30岁+ 资深牛人招聘专场</p>
        </section>
        <section className="section-wrap user-info-wrap">
          <h5 className="salary-plan-title">30岁+ 职场人平均月薪情况</h5>
          <div className="chart-info"/>
          <p className="explain-content">
            猎聘大数据表明，30岁+职场人的平均月薪会随年龄段的增长而提高。
            对于优秀的职场人而言，年龄并非影响他们找工作的不利因素，
            而是他们在工作经验、稳定性和抗压能力上更具优势的有力证明。
          </p>
        </section>
        {
          loaded ?
            <React.Fragment>
              {
                jobList.length ?
                  <React.Fragment>
                    <section className="section-decoration"/>
                    <section className="section-wrap">
                      <div className="title-wrap"><p>不止高薪</p></div>
                      <div className="welfare-wrap">
                        <span>环境舒适</span>
                        <span>福利健全</span>
                        <span>待遇优厚</span>
                      </div>
                      <ul>
                        {
                          jobList.map((item) => <JobCard { ...item } key={ item.jobId }/>)
                        }
                      </ul>
                    </section>
                  </React.Fragment> : null
              }
              {
                frontList.length ?
                  <React.Fragment>
                    <section className="section-decoration reverse"/>
                    <section className="section-wrap">
                      <div className="title-wrap"><p>开拓新一线</p></div>
                      <div className="welfare-wrap">
                        <span>发展空间大</span>
                        <span>待遇优厚</span>
                        <span>公司稳定</span>
                      </div>
                      <ul>
                        {
                          frontList.map((item) => <JobCard { ...item } key={ item.jobId }/>)
                        }
                      </ul>
                    </section>
                  </React.Fragment> : null
              }
              <section className="section-decoration"/>
              <section className="section-wrap">
                <div className="title-wrap"><p>这些猎头</p><p>更合适资深的你</p></div>
                <ul className="hunter-card-container">
                  {
                    hunterList.map((item) => <HunterCard { ...item } key={ item.userId }/>)
                  }
                </ul>
              </section>
            </React.Fragment> : null
        }
        <section className="foot-logo-container">
          <span className="foot-logo"/>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
