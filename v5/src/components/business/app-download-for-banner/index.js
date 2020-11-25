/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
// import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import localCookie from '@liepin/native-sweet-fe';
// import classnames from 'classnames';
import { Modal } from '@liepin/react-violet-h5';
// import domain from '@liepin/native-domain-fe';
import './index.less';

import closeImg from './images/close.png';
import isFromAlipay from '../app/alipay';
import downloadImg from './images/banner.png';

window.tlog = window.tlog || [];

// 中央引导下载，暂时未使用
export default class AppDownloadForBanner extends React.Component {
  static propTypes = {
    limitKey: PropTypes.string,
    showTlog: PropTypes.string,
    closeFn: PropTypes.func,
    clickFn: PropTypes.func,
    downloadImg: PropTypes.string,
  }
  static defaultProps = {
    limitKey: 'index-app-banner',
    showTlog: '',
    closeFn: () => {},
    clickFn: () => {},
    downloadImg,
  }
  state = {
    isVisible: !localCookie.get(this.props.limitKey),
  }
  componentDidMount() {
    const { showTlog } = this.props;
    this.state.isVisible && showTlog && window.tlog.push(showTlog);
  }
  shouldComponentUpdate() {
    return true;
  }
  // banner点击
  handleClick = () => {
    const { clickFn } = this.props;
    this.setState({
      isVisible: false,
    });
    clickFn && clickFn();
  }
  // 关闭
  handleClose = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { closeFn } = this.props;
    this.setState({
      isVisible: false,
    });
    closeFn && closeFn();
  }
  render() {
    // eslint-disable jsx-a11y/click-events-have-key-events
    return isFromAlipay() ? null : (
      <Modal
        mask
        className="download-center-box"
        visible={ this.state.isVisible }
      >
        <img onClick={ this.handleClick } className="index-banner" src={ this.props.downloadImg } alt=""/>
        <img onClick={ this.handleClose } data-nick="index_banner_close" className="index-banner-close" src={ closeImg } alt=""/>
      </Modal>
    );
  }
}

/*
 * export default function AppDownloadForBannerRender(args) {
 *   let div = null;
 *   const id = 'app-download-for-banner';
 *   const divRoot = document.getElementById(id);
 *   if (!divRoot) {
 *     div = document.createElement('div');
 *     div.id = id;
 *     document.body.appendChild(div);
 *   }
 *   ReactDom.render(<AppDownloadForBanner { ...args }/>, document.getElementById(id));
 * }
 */
