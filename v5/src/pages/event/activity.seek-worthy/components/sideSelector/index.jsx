import React from 'react';
import { share4App } from '@liepin/share';
import './index.less';

const screenHeight = document.documentElement.getBoundingClientRect().height;

export default class SideSelector extends React.Component {
  state = {
    isShowBack: false,
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleRootScroll, false);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    window.removeEventListener('scroll', this.handleRootScroll);
  }
  timer = null
  handleRootScroll = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const scrollTop = document.querySelector('body').scrollTop || document.documentElement.scrollTop;
      this.setState({
        isShowBack: scrollTop >= screenHeight,
      });
    }, 32);
  }
  handleBackClick = () => {
    window.scrollTo(0, 0);
  }
  handleHomeClick = () => {
    if (Apps.isTd) {
      share4App({
        nativeLink: 'lptd://lp/p/tabHome?s=h5&params={"current":1}',
      });
      setTimeout(function () {
        share4App({
          nativeLink: 'lptd://lp/p/backNative?s=h5',
        });
      }, 16);
    } else {
      window.location.href = 'https://m.liepin.com/';
    }
  }
  render() {
    const {
      isShowBack,
    } = this.state;
    return (
      <div className="seeking-selector-wrap">
        <a
          className={ isShowBack ? 'selector-item back' : 'selector-item back hide' }
          href="javascript:;"
          onClick={ this.handleBackClick }
        />
        <a
          href="javascript:;"
          className="selector-item home"
          onClick={ this.handleHomeClick }
        />
      </div>
    );
  }
}
