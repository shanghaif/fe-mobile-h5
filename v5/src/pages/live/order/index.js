import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import { Message } from '@liepin/react-violet-h5';
import '../modules/sendPostMessage';
import stringUtil from '../../../lib/utils/string';

import Tabbar from './components/tabbar/';
import Jobs from './components/jobs/';

import configShare from '../modules/configShare';
import prefix from '../modules/prefix';
import './index.less';

const id = stringUtil.getQuery('liveId');
class App extends Component {
  state = {
    loaded: false,
    liveInfo: {},
    showAllDesc: false,
    enableShowAllDesc: false,
  };
  componentDidMount() {
    $.ajax({
      url: '/live/v1/get-order-detail.json',
      data: {
        liveId: id,
      },
      success: ({ data, flag, msg }) => {
        if (flag === 1) {
          configShare({
            shareTitle: data.shareTitle,
            title: data.title,
            desc: data.shareSubTitle,
            img: data.shareIcon,
            id,
          });
          document.title = data.title;
          const launchTime = new Date(data.launchTime);
          const launchTimeShow = `${launchTime.getFullYear()}年${launchTime.getMonth() + 1}月${launchTime.getDate()}日 ${prefix(launchTime.getHours())}:${prefix(launchTime.getMinutes())} 开播`;
          data.launchTimeShow = launchTimeShow;
          const noJobs = !data.jobs || !data.jobs.length;
          this.setState({
            loaded: true,
            liveInfo: data,
            showAllDesc: noJobs,
          }, () => {
            if (noJobs) {
              return false;
            }
            const wh = this.$descWrap.current.getBoundingClientRect().height;
            const h = this.$desc.current.getBoundingClientRect().height;
            if (wh < h) {
              setTimeout(() => {
                this.setState({
                  enableShowAllDesc: true,
                });
              }, 160);
            }
          });
        } else {
          Message.toast(msg);
        }
      },
      error: () => {
        Message.toast('网络请求失败');
      },
    });
  }

  $desc = React.createRef()
  $descWrap = React.createRef()
  handleShowAllDesc = () => {
    this.setState({
      showAllDesc: true,
    });
  }
  render() {
    const {
      loaded,
      liveInfo,
      showAllDesc,
      enableShowAllDesc,
    } = this.state;
    const descWrapStyle = {};
    if (showAllDesc) {
      descWrapStyle.maxHeight = 'initial';
    }
    return loaded ? (
      <Fragment>
        <div className="live-schedule-wrap">
          <div className="schedule-banner-wrap">
            <img
              className="schedule-banner"
              src={ `//image0.lietou-static.com/img/${liveInfo.image}` }
              alt=""
            />
          </div>
          <dl className="landing-info-wrap">
            <dt>{liveInfo.title}</dt>
            {
              liveInfo.status === 6 ?
              (
                <dd>
                  <span className="living-symbol">
                    <i/>
                    <i/>
                    <i/>
                  </span>
                  <span>{ `${liveInfo.hot}人围观`}</span>
                </dd>
              ) : (
                <dd>
                  <i className="icon-launchtime"/>
                  <span className="ellipsis-1">{liveInfo.launchTimeShow}</span>
                </dd>
              )
            }
          </dl>
          {
            liveInfo.lecturers.length ? (
              <div className="landing-host-wrap">
                <h3>主播</h3>
                <div className="landing-host-scroll-wrap">
                  <div className="landing-host-scroller">
                    {
                      liveInfo.lecturers.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <dl key={ index }>
                          <dt>
                            <img
                              src={ `//image0.lietou-static.com/img/${item.photo}` }
                              alt=""
                            />
                          </dt>
                          <dd className="flex-1">
                            <p className="host-name ellipsis-1">{item.name}</p>
                            <p className="host-desc ellipsis-1">{item.title}</p>
                          </dd>
                        </dl>
                      ))
                    }
                  </div>
                </div>
              </div>
            ) : null
          }
          <div className="landing-desc-wrap">
            <h3>本场亮点</h3>
            <div
              className="desc-content-wrap"
              style={ descWrapStyle }
              ref={ this.$descWrap }
            >
              <pre
                className={ classnames({ 'desc-content-pre': true, overflowed: enableShowAllDesc && !showAllDesc }) }
                ref={ this.$desc }
              >
                {liveInfo.descr}
              </pre>
            </div>
            {
              (enableShowAllDesc && !showAllDesc) ? (
                <a
                  href="javascript:;"
                  onClick={ this.handleShowAllDesc }
                  className="btn-show-all"
                >
                  查看全部
                </a>
              ) : null
            }
          </div>
          <Jobs data={ liveInfo.jobs }/>
        </div>
        <Tabbar
          id={ id }
          status={ liveInfo.status }
          ordered={ liveInfo.ordered }
          logined={ liveInfo.loggedIn }
          launchTime={ liveInfo.launchTime }
        />
      </Fragment>
    ) : null;
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
