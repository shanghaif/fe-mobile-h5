import {
  observable,
  action,
} from 'mobx';
import domain from '@liepin/native-domain-fe';
import { Message } from '@liepin/react-violet-h5';
import stringUtil from '../../../../lib/utils/string';
import jobStore from './job';
import scoreStore from './score';

const { location } = window;
const screenRect = document.documentElement.getBoundingClientRect();
const screenWidth = screenRect.width;
const videoHeight = Math.round(screenWidth * 0.56187290);
const currentUrl = encodeURIComponent(location.href);
const loginUrl = `${domain('m')}/register/?return_url=${currentUrl}`;

class Live {
  @observable
  info = {};

  player = null;

  @observable
  visibleLogin = false;

  @observable
  showFixedWin = true;

  @observable
  liveSize = {
    screenWidth,
    videoHeight,
  };

  /**
   * 0, "草稿"
   * 1, "审核中"
   * 2, "审核通过(待播)"
   * 3, "审核失败"
   * 4, "直播结束"
   * 5, "直播取消"
   * 6, "直播中"
   */
  @observable
  liveStatus = 6;

  @observable
  liveId = stringUtil.getQuery('liveId');

  iframe = null;

  @observable
  fixed = false;

  @action.bound
  closeFixedWin = () => {
    this.showFixedWin = false;
  }

  @action.bound
  setIframe(iframe) {
    if (iframe) {
      this.iframe = iframe;
      this.iframe.addEventListener('load', () => {
        this.iframe.setAttribute('scrolling', 'auto');
      });
    }
  }

  @action.bound
  setFixed(fixed) {
    if (fixed) {
      this.liveSize = {
        screenWidth: 187,
        videoHeight: 110,
      };
    } else if (Math.abs(window.orientation) === 90) {
      this.liveSize = {
        videoHeight: window.innerHeight,
        screenWidth: window.innerWidth,
      };
    } else {
      this.setRect();
    }
    // 返回直播的时候重新显示直播窗口
    if (!fixed) {
      this.showFixedWin = true;
    }
    this.fixed = fixed;
  }

  @action.bound
  setRect = () => {
    const width = window.innerWidth;
    const height = Math.round(width * 0.56187290);
    this.liveSize = {
      videoHeight: height,
      screenWidth: width,
    };
  }

  @action.bound
  initPlayerSize() {
    window.addEventListener('orientationchange', () => {
      try {
        if (!this.fixed) {
          switch (window.orientation) {
            case 90:
            case -90:
              setTimeout(() => {
                // 旋转事件触发时获取window.innerHeight 和window.innerWidth 有问题, 因此延迟触发
                this.liveSize = {
                  videoHeight: window.innerHeight,
                  screenWidth: window.innerWidth,
                };
              }, 100);
              break;
            case 0:
            case 180:
              setTimeout(this.setRect, 100);
              break;
            default:
              // nothing
          }
        }
      } catch (err) {
        // nothing
      }
    });
  }

  setIframeSrc(url) {
    if (this.iframe) {
      if (this.info.ended || url.startsWith(`${domain('m')}/live/`)) {
        window.location.href = url;
      } else {
        jobStore.setListVisible(false);
        scoreStore.setVisibleBubble(false);
        this.setFixed(true);
        this.iframe.src = url;
        const domains = [domain('m-c'), domain('m'), domain('mxy')];
        window.addEventListener('message', (event) => {
          const msg = event.data;
          if (domains.includes(event.origin) && msg.type === 'ios') {
            this.iframe.setAttribute('scrolling', 'no');
            this.iframe.contentWindow.postMessage({ type: 'iframe' }, window.location.origin);
          }
        });
      }
    }
  }
  @action.bound
  setLiveStatus(status) {
    this.liveStatus = status;
  }

  @action.bound
  set(value) {
    this.info = value;
    this.liveStatus = value.ended ? 4 : 6;
  }

  setId(id) {
    this.liveId = id;
  }

  fetchLive() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/live/v1/get-watch-detail.json',
        data: { liveId: this.liveId },
        success: ({ data, flag, msg }) => {
          if (flag === 1) {
            this.set(data);
            resolve(data);
          } else {
            Message.toast(msg);
            reject();
          }
        },
        error: () => {
          Message.toast('网络请求失败');
          reject();
        },
      });
    });
  }

  setLivePlayer(player) {
    this.player = player;
  }

  @action.bound
  setHot(hot) {
    if (hot > this.info.hot) {
      this.info = { ...this.info, hot };
    }
  }

  getStatus() {
    if (this.player) {
      return this.player.playing() ? '0' : '1';
    }
    return '1';
  }

  @action.bound
  showLogin() {
    this.visibleLogin = true;
  }

  @action.bound
  hideLogin() {
    this.visibleLogin = false;
  }
  toLogin() {
    this.hideLogin();
    this.setIframeSrc(loginUrl);
  }
}

export default new Live();
