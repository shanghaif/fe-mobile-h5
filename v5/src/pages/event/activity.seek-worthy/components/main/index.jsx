import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { observer, inject } from 'mobx-react';
import { Message } from '@liepin/react-violet-h5';

import Ajax from '../../../../../lib/utils/request';

import MainJobCard from '../mainJobCard/index';
import MainCityCard from '../mainCityCard/index';
import SideSelector from '../sideSelector/index';
import { getScrollTop } from '../../modules/scrollLocation';
import hotCities from '../../modules/hotCities';

import './index.less';

@inject('store')
@observer
class Main extends React.Component {
  static propTypes = {
    store: propTypes.object.isRequired,
  }
  state = {
    loaded: false,
    isShowRecruitEntry: false,
  }
  componentDidMount() {
    Promise
      .all([this.fetchUserData(), this.fetchJobData()])
      .then(([userinfo, jobs]) => {
        this.setState({
          userinfo,
          ...jobs,
          loaded: true,
        }, () => {
          getScrollTop();
        });
      }).catch(() => {
        Message.toast(<p className="text-center">系统错误，请稍后再试</p>);
      });
  }
  fetchUserData = () => (
    new Promise((resolve, reject) => {
      Ajax({
        url: '/seek-worthy/working-copy.json',
      }).then(({ data, flag }) => {
        if (flag === 1) {
          resolve(data);
        } else {
          reject();
        }
      }, reject);
    })
  )
  fetchJobData = () => (
    new Promise((resolve, reject) => {
      Ajax({
        url: '/seek-worthy/jobs.json',
      }).then(({ data, flag }) => {
        if (flag === 1) {
          resolve(data);
        } else {
          reject();
        }
      }, reject);
    })
  )
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
  render() {
    const {
      loaded,
      userinfo,
      yearPostions,
      customPostions,
      isShowRecruitEntry,
    } = this.state;
    return (
      <div
        className="seeking-main-wrap seeking-season-container"
        onTouchStart={ this.handlePackUpRaise }
      >
        <section className="seeking-main-banner-wrap header-word">
          <i className="banner-bg"/>
        </section>
        {
          loaded ? (
            <React.Fragment>
              <section className="section-wrap user-wrap">
                <div className="user-info-wrap">
                  <h5><span className="underline">{ userinfo.name[0] }</span>{ userinfo.name.slice(1) }</h5>
                  <p className="user-welcome">{ userinfo.registerTime }</p>
                  <p className="user-welcome">你第一次来到猎聘</p>
                </div>
                {
                  userinfo.textShow ? (
                    <dl className="user-excel-wrap">
                      <dt>用户数</dt>
                      <dd>
                        <div className={ `user-chart chart-${userinfo.imgFlag}` }/>
                        <p>您的期望年薪为<span className="text-orange">{ userinfo.yearSalary }万</span>，在<span className="text-orange">{ userinfo.dqName }{ userinfo.jobtitleName }中{ userinfo.textShow }</span></p>
                      </dd>
                    </dl>
                    ) : (
                      <div className="user-default-wrap text-center">
                        <i className="chart-default"/>
                        <p>你的薪资还在保密状态</p>
                        <p>想必优秀的人士都是低调内敛~</p>
                      </div>
                    )
                }
              </section>
              {
                customPostions.length ? (
                  <React.Fragment>
                    <section className="section-decoration"/>
                    <section className="section-wrap">
                      <div className="title-wrap">
                        <p>这{ customPostions.length }个高薪职位</p>
                        <p>和你的匹配度更高</p>
                      </div>
                      <ul>
                        {
                          customPostions.map((job) => <MainJobCard { ...job } key={ job.jobId }/>)
                        }
                      </ul>
                    </section>
                  </React.Fragment>
                ) : null
              }
              {
                yearPostions.length ? (
                  <React.Fragment>
                    <section className="section-decoration reverse"/>
                    <section className="section-wrap">
                      <div className="title-wrap">
                        {
                          userinfo.workYears ? (
                            <p>
                              { userinfo.workYears }年经验的你
                            </p>
                          ) : null
                        }
                        <p>这些职位让你更高薪</p>
                      </div>
                      <ul>
                        {
                          yearPostions.map((job) => <MainJobCard { ...job } key={ job.jobId }/>)
                        }
                      </ul>
                    </section>
                  </React.Fragment>
                ) : null
              }
              <section className="section-decoration"/>
              <section className="section-wrap cities-wrap">
                <div className="title-wrap">
                  <p>让人薪动的城市</p>
                  <p>排行 TOP 10</p>
                </div>
                <ul>
                  {
                    hotCities.map((city, index) => (
                      <MainCityCard
                        key={ city.code }
                        index={ index }
                        { ...city }
                      />
                    ))
                  }
                </ul>
              </section>
              <div
                className={
                  classnames({
                    'raise-container': true,
                    active: isShowRecruitEntry,
                  })
                }
                onTouchStart={ (e) => e.stopPropagation() }
                onClick={ this.handleOpen }
              >
                <a
                  className="link-trigger"
                  onClick={ (e) => e.stopPropagation() }
                  href="https://wow.liepin.com/t1000923/d9eed294.html"
                />
              </div>
            </React.Fragment>
          ) : null
        }
        <SideSelector/>
      </div>
    );
  }
}

export default Main;
