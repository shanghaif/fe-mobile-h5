/**
 * 页面链接地址： https://m.liepin.cn/seek-worthy/
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, observer } from 'mobx-react';
import share, { share4App } from '@liepin/share';

import store from './store/index';
import MeetingPlace from './components/meetingPlace/index';
import UserForm from './components/userForm/index';
import JobList from './components/jobList/index';

import { getUrlParams } from './modules/urlUtil';
import shareData from './modules/shareData';

import './index.less';

// 分享设置
if (Apps.isTd) {
  share4App({
    type: [17, 16],
    showshare: true,
    title: shareData.shareTitle,
    shareTitle: shareData.shareTitle,
    imgUrl: shareData.img,
    shareUrl: shareData.url,
    desc: shareData.desc,
    mediaType: shareData.mediaType,
    thumburl: shareData.img,
  });
} else if (Apps.isWx) {
  share({
    title: shareData.shareTitle,
    link: shareData.url,
    msgImg: shareData.img,
    desc: shareData.desc,
  });
}

function handleBack() {
  const state = getUrlParams();
  if (Object.keys(state).length) {
    const { tab, city, page } = state;
    if (city && page === 'joblist') {
      store.changeCity(city);
    } else if (tab) {
      store.changeTab(tab);
    } else if (page) {
      store.changePage(page);
    }
  }
}

@observer
class Index extends React.Component {
  componentDidMount() {
    window.addEventListener('popstate', handleBack, false);
    handleBack();
  }
  componentWillUnmount() {
    window.removeEventListener('popstate', handleBack, false);
  }
  renderPage = () => {
    const {
      activePage,
    } = store;
    switch (activePage) {
      case 'joblist':
        return <JobList onChange={ this.handleChangePage }/>;
      case 'userform':
        return <UserForm onChange={ this.handleChangePage }/>;
      case 'meetingplace':
        return <MeetingPlace onChange={ this.handleChangePage }/>;
      default:
        return null;
    }
  }
  render() {
    return <Provider store={ store }>{ this.renderPage() }</Provider>;
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('app')
);
