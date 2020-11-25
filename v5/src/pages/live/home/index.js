import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import { baseDomain } from '@liepin/native-domain-fe';

import './modules/locationFilter';
import '../modules/sendPostMessage';


import { CUR_LIVE_BROADCAST_URL, LIVE_BROADCAST_STREAM } from '../../../common/js/global/source/constants/';
import stringUtil from '../../../lib/utils/string';
import cookieUtil from '../../../lib/utils/cookie';

import Living from './components/living';

import chatStore from './store/chat';
import liveStore from './store/live';
import jobStore from './store/job';
import scoreStore from './store/score';

import configShare from '../modules/configShare';

import './index.less';


const id = stringUtil.getQuery('liveId');
cookieUtil.del(CUR_LIVE_BROADCAST_URL, '/', baseDomain);
cookieUtil.del(LIVE_BROADCAST_STREAM, '/', baseDomain);

class App extends Component {
  state = { loaded: false };
  componentDidMount() {
    liveStore.initPlayerSize();
    jobStore.fetchJobs(id);
    liveStore.fetchLive()
      .then(data => {
        document.title = data.title;
        configShare({
          shareTitle: data.shareTitle,
          title: data.title,
          desc: data.shareSubTitle,
          img: data.shareIcon,
          id,
        });
        if (!data.ended) {
          chatStore.initIM();
        }
        this.setState({ loaded: true });
      });
  }

  render() {
    const { loaded } = this.state;
    return loaded ? (
      <Provider
        chatStore={ chatStore }
        liveStore={ liveStore }
        jobStore={ jobStore }
        scoreStore={ scoreStore }
      >
        <Living/>
      </Provider>
    ) : null;
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
