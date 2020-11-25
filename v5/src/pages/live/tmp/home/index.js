import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { baseDomain } from '@liepin/native-domain-fe';
import { Provider } from 'mobx-react';
import { Message } from '@liepin/react-violet-h5';

import { CUR_LIVE_BROADCAST_URL, LIVE_BROADCAST_STREAM } from '../../../../common/js/global/source/constants/';
import stringUtil from '../../../../lib/utils/string';
import cookieUtil from '../../../../lib/utils/cookie';

import Living from './components/living';
import Ending from './components/ending';

import chatStore from './store/chat';
import liveStore from './store/live';
import jobStore from './store/job';

import configShare from '../modules/configShare';

import './index.less';

cookieUtil.del(CUR_LIVE_BROADCAST_URL, '/', baseDomain);
cookieUtil.del(LIVE_BROADCAST_STREAM, '/', baseDomain);

const screenRect = document.documentElement.getBoundingClientRect();
const screenWidth = screenRect.width;
const videoHeight = Math.round(screenWidth * 0.56187290);
const id = stringUtil.getQuery('liveId');
class App extends Component {
  state = {
    loaded: false,
    ended: false,
  };
  componentDidMount() {
    jobStore.setRect({
      screenWidth,
      videoHeight,
    });
    liveStore.setId(id);
    jobStore.fetchJobs(id);
    this.fetchLive();
  }
  fetchLive() {
    $.ajax({
      url: '/live/get-watch-detail.json',
      data: {
        liveId: id,
      },
      success: ({ data, flag, msg }) => {
        if (flag === 1) {
          document.title = data.title;
          liveStore.set(data);
          this.setState({
            loaded: true,
            ended: data.ended,
          });
          configShare({
            shareTitle: data.shareTitle,
            title: data.title,
            desc: data.shareSubTitle,
            img: data.shareIcon,
            id,
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
  render() {
    const {
      loaded,
      ended,
    } = this.state;
    return loaded ? (
      <Provider
        chatStore={ chatStore }
        liveStore={ liveStore }
        jobStore={ jobStore }
      >
        {
          ended ? <Ending/> : <Living/>
        }
      </Provider>
    ) : null;
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
