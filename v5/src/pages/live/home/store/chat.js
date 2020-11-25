/* eslint-disable no-shadow */
import { observable, action } from 'mobx';
import domain from '@liepin/native-domain-fe';
import { Message } from '@liepin/react-violet-h5';
import IMBridge from '@liepin/cnpm-js-groupchat-fe';
import cookieUtil from '../../../../lib/utils/cookie';
import liveStore from './live';
import jobStore from './job';
import confirmOfResume from '../modules/confirms';

let currentUniqueKey = cookieUtil.get('UniqueKey');

const maxMsg = 200;
class Chat {
  resetStatus = false;
  msgQueue = [];

  @observable
  chatRecord = [];

  @observable
  manageNotice = null;

  @observable
  chatEnabled = false;

  @observable
  socketConnected = false;

  @observable
  chatGroupStaus = false;

  @action.bound
  appendChatRecord(item) {
    this.chatRecord.push(item);
    const start = this.chatRecord.length - maxMsg;
    if (start > 0) {
      this.chatRecord = this.chatRecord.slice(start);
    }
  }
  @action.bound
  sendMsg(text) {
    return this.sendImMsg(text);
  }

  checkUser() {
    const nowUniqueKey = cookieUtil.get('UniqueKey');
    if (nowUniqueKey !== currentUniqueKey) {
      this.resetIM();
      currentUniqueKey = nowUniqueKey;
      return false;
    }
    return true;
  }

  @action.bound
  sendImMsg = (text) => {
    if (this.resetStatus || !this.checkUser()) {
      return new Promise((resolve, reject) => {
        this.msgQueue.push({ text, resolve, reject });
      });
    }
    if (!this.groupChatId) {
      Message.toast('聊天室初始化失败, 请稍后再试!');
      return Promise.reject('聊天室初始化失败, 请稍后再试'); // eslint-disable-line
    }
    if (this.muteAllStatus) {
      Message.toast('全体禁言中');
      return Promise.reject();
    }
    if (this.muteStatus) {
      Message.toast('您的账号状态异常，无法评论');
      return Promise.reject();
    }
    const nickname = '我';
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/live/v1/group-chat/before-send-message.json',
        data: {
          groupChatId: this.groupChatId,
          message: text,
        },
        success: ({ flag, data, msg, code }) => {
          if (flag === 1) {
            if (data.needImprove) {
              confirmOfResume(data.resLangKind);
              reject();
            } else {
              this.webIM.sendMsg({ text })
                .then((data) => {
                  const message = {
                    nickname,
                    messageId: data.messageId,
                    message: {
                      text,
                      type: 'txt',
                      bizType: '',
                    },
                  };
                  this.appendChatRecord(message);
                  resolve();
                }).catch(reject);
            }
          } else if (code === '5002') {
            liveStore.showLogin();
            reject();
          } else {
            msg && Message.toast(msg);
            reject();
          }
        },
        error: reject,
      });
    });
  }

  @action.bound
  removeChatRecord = (id) => {
    const newRecords = [...this.chatRecord];
    const index = newRecords.findIndex((item) => item.messageId === id);
    if (index > -1) {
      newRecords.splice(index, 1);
      this.chatRecord = newRecords;
    }
  }

  updateLiveStatus(status) {
    this.webIM && this.webIM.updateLiveStatus(status);
  }

  resetIM = () => {
    liveStore.fetchLive()
      .then(data => {
        liveStore.set(data);
        this.resetStatus = true;
        this.webIM.destroy()
          .finally(this.initIM);
      });
  }

  @action.bound
  initIM = () => {
    const { info } = liveStore;
    const { user = {}, taskId, loggedIn } = info;
    this.webIM = new IMBridge({
      taskId,
      domain: domain('m-tdvideo'),
      role: loggedIn ? 'audience' : 'guest',
      nickname: user.name || '',
      avatarUrl: user.avatarUrl || '',
      extraInfo: user.extraInfo || null,
    });

    this.webIM.on('success', this.dependencySocket);
    // 开始直播
    this.webIM.on('onStartLive', () => {
      liveStore.setLiveStatus(6);
    });

    // 结束直播
    this.webIM.on('onEndLive', () => {
      liveStore.setLiveStatus(4);
    });
    this.webIM.on('onMuteAllGroupChat', (data) => {
      this.muteAllStatus = data.mute;
    });
    this.webIM.on('onMuteGroupChat', (data) => {
      this.muteStatus = data.mute;
    });
    this.webIM.on('onGroupChatDeleteMessage', ({ data: { bizData } = {} } = {}) => {
      if (bizData && this.groupChatId === bizData.groupChatId) {
        this.removeChatRecord(bizData.delMessageId);
      }
    });
    this.webIM.on('receive', ({ baseinfo: { userInfo = {} } = {}, data } = {}) => {
      // 只处理当前直播间的消息
      if (data.groupChatId === this.groupChatId) {
        const { bodies } = JSON.parse(data.payload);
        const msgBody = bodies[0];
        let message = {};
        switch (msgBody.type) {
          case 'txt':
            message = {
              nickname: userInfo.nickname,
              messageId: data.msgId,
              message: {
                text: msgBody.msg,
                type: msgBody.type,
                bizType: '',
              },
            };
            break;
          case 'img':
            message = {
              nickname: userInfo.nickname,
              messageId: data.msgId,
              message: {
                text: {
                  thumb: msgBody.thumb,
                  url: msgBody.url,
                  size: msgBody.size,
                  thumbSize: msgBody.thumbSize,
                },
                type: msgBody.type,
                bizType: '',
              },
            };
            break;
          default:
            break;
        }
        this.appendChatRecord(message);
      }
    });
    this.webIM.on('onReceiveCmdMsg', ({ data }) => { //
      this.cmdProxy(data || {});
    });
    this.webIM.on('errMsg', () => {
      // nothing
    });
  }
  getHistoryMsg = () => {
    const { info: { user = {} } } = liveStore;
    this.webIM.getHistoryMsg({ pageSize: 5 }).then((data) => {
      data.dataList.length && data.dataList.forEach((item) => {
        let message = {};
        switch (item.msgType) {
          case 'txt':
            message = {
              nickname: item.nickname === user.name ? '我' : item.nickname,
              messageId: item.messageId,
              message: {
                text: item.data.bodies[0].msg,
                type: item.msgType,
                bizType: item.data.extBody.bizType,
              },
            };
            break;
          case 'img':
            message = {
              nickname: item.nickname === user.name ? '我' : item.nickname,
              messageId: item.messageId,
              message: {
                text: {
                  thumb: item.data.bodies[0].thumb,
                  url: item.data.bodies[0].url,
                  size: item.data.bodies[0].size,
                  thumbSize: item.data.bodies[0].thumbSize,
                },
                type: item.data.bodies[0].type,
                bizType: '',
              },
            };
            break;
          default:
            break;
        }
        this.chatRecord.push(message);
      });
    });
  }

  dependencySocket = () => {
    // 必须有tokenData才算成功
    const { info: { welcomes = [] }, liveStatus } = liveStore;
    this.webIM.getIMData(({ userId, groupID, forbidOne, forbidAll }) => {
      this.socketConnected = true; // 设置socket状态未连接成功
      this.userId = userId; // 用户ID
      this.groupChatId = groupID; // 房间号
      this.muteStatus = forbidOne;
      this.muteAllStatus = forbidAll;

      this.chatRecord.length = 0; // 清空消息列表, 切换用户身份的时候清空消息, 重新拉历史消息
      const { info: { topNotice } } = liveStore;
      this.manageNotice = topNotice;
      this.chatRecord.push({
        message: {
          type: 'welcome',
          text: welcomes,
        },
      });

      if (this.resetStatus) {
        this.resetStatus = false;
        while (this.msgQueue.length > 0) {
          const { resolve, reject, text } = this.msgQueue.shift();
          this.sendMsg(text)
            .then(resolve)
            .catch(reject);
        }
      }
    });
    if (liveStatus === 6) {
      this.getHistoryMsg();
    }
  }

  @action.bound
  cmdProxy = ({ body: { bizType, bizData }, type }) => {
    if (bizType && bizData && bizData.groupChatId === this.groupChatId && type === 10001) {
      switch (bizType) {
        case 101: // 房间热度
          liveStore.setHot(bizData.hot);
          break;
        case 100:
          jobStore.setActive(`${bizData.jobId}_${bizData.jobKind}`);
          break;
        case 102: // 管理公告
          this.manageNotice = !bizData.content && !bizData.link ?
            null : {
              content: bizData.content,
              link: bizData.link,
            };
          break;
        default:
          break;
      }
    }
  };

  @action.bound
  exitIM() {
    // nothing
  }
}

export default new Chat();

