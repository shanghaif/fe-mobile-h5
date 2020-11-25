/**
 * 页面链接地址：https://m.liepin.cn/seek-worthy/eighteen_cities_special?dqCode=xxxxxx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Message } from '@liepin/react-violet-h5';

import Ajax from '../../../lib/utils/request';
import stringUtil from '../../../lib/utils/string';
import JobCard from './components/JobCard';
import { recoverScroll } from './modules/recordScroll';

import beijingPng from './images/beijing.png';
import changshaPng from './images/changsha.png';
import chengduPng from './images/chengdu.png';
import chongqingPng from './images/chongqing.png';
import dalianPng from './images/dalian.png';
import guangzhouPng from './images/guangzhou.png';
import hangzhouPng from './images/hangzhou.png';
import nanjingPng from './images/nanjing.png';
import qingdaoPng from './images/qingdao.png';
import shanghaiPng from './images/shanghai.png';
import shenzhenPng from './images/shenzhen.png';
import suzhouPng from './images/suzhou.png';
import tianjinPng from './images/tianjin.png';
import wuhanPng from './images/wuhan.png';
import xiamenPng from './images/xiamen.png';
import xianPng from './images/xian.png';
import zhenzhouPng from './images/zhenzhou.png';
import hefeiPng from './images/hefei.png';

import './index.less';

const cityFieldImg = {
  '010': beijingPng,
  '020': shanghaiPng,
  '030': tianjinPng,
  '040': chongqingPng,
  '050020': guangzhouPng,
  '050090': shenzhenPng,
  '060020': nanjingPng,
  '060080': suzhouPng,
  '070020': hangzhouPng,
  '080020': hefeiPng,
  '090040': xiamenPng,
  150020: zhenzhouPng,
  170020: wuhanPng,
  180020: changshaPng,
  210040: dalianPng,
  250070: qingdaoPng,
  270020: xianPng,
  280020: chengduPng,
};
export default class Demo extends React.Component {
  state = {
    loaded: false,
    salaryJobList: [],
    cityJobList: [],
  }
  componentDidMount() {
    Promise
      .all([this.handleGetSalaryJob(), this.handleGetCityJob()])
      .then((result) => {
        this.setState({
          salaryJobList: result[0],
          cityJobList: result[1],
          loaded: true,
        }, () => {
          recoverScroll();
        });
      }).catch(() => {
        Message.toast('系统错误，请稍后再试');
      });
  }
  dqCode = stringUtil.getQuery('dqCode');
  handleGetSalaryJob = () => (
    new Promise((resolve, reject) => {
      Ajax({
        url: '/seek-worthy/custom-highSalary.json',
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
  handleGetCityJob = () => (
    new Promise((resolve, reject) => {
      Ajax({
        url: '/seek-worthy/city-hotRecruit.json',
        data: {
          dqCode: this.dqCode,
        },
      }).then(({ data, flag }) => {
        if (flag === 1) {
          resolve(data);
        } else {
          reject();
        }
      }).catch((err) => {
        reject(err);
      });
    })
  )
  render() {
    const {
      loaded,
      salaryJobList,
      cityJobList,
    } = this.state;
    return (
      <div className={ classnames('seeking-season-city-container flexbox-v', {
          'seeking-season-empty-container': !salaryJobList.length && !cityJobList.length,
        }) }
      >
        <section className="city-banner-container header-word">
          <div className="city-banner">
            <div className="city-content">
              <div className="logo"/>
              <div className="field-banner">
                <img src={ cityFieldImg[this.dqCode] } alt=""/>
              </div>
              <div className="field-line"/>
            </div>
          </div>
        </section>
        <section className="job-list-container flex-1">
          {
            loaded ?
              <React.Fragment>
                {
                      salaryJobList.length ?
                        <div className="section-wrap">
                          <div className="title-wrap">
                            <p>定制高薪</p>
                          </div>
                          <ul>
                            {
                              salaryJobList.map((item) => <JobCard { ...item } key={ item.jobId }/>)
                            }
                          </ul>
                        </div> : null
                }
                {
                  cityJobList.length ?
                    <div className="section-wrap">
                      <div className="title-wrap">
                        <p>城市热招</p>
                      </div>
                      <ul>
                        {
                          cityJobList.map((item) => <JobCard { ...item } key={ item.jobId }/>)
                        }
                      </ul>
                    </div> : null
                }
              </React.Fragment> : null
          }
        </section>
        <section className="foot-container">
          <div className="foot-logo-container">
            <span className="foot-logo"/>
          </div>
          <div className="foot-word"/>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
