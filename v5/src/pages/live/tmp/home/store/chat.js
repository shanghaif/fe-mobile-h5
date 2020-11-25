/* eslint-disable no-shadow */
import { observable, action } from 'mobx';
import WebIM from 'easemob-websdk';
import { Message } from '@liepin/react-violet-h5';
import imConfig from '../modules/imConfig';
import { confirmOfLogin, confirmOfNamecard } from '../modules/confirms';
import liveStore from './live';
import jobStore from './job';

const maxMsg = 200;
class Chat {
  @observable
  chatRecord = [{
    type: 'welcome',
    data: '欢迎来到直播间，点击左下角可以查看本场全部职位哦～',
  }];

  @observable
  chatEnabled = false;

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
    return new Promise((resolve, reject) => {
      if (this.leaved) {
        Message.toast('请刷新页面后再次发送消息');
        reject();
      } else {
        this.beforeSendMsg(text).then(() => {
          this.sendImMsg(text).then(resolve, reject);
        }, reject);
      }
    });
  }
  @action.bound
  sendImMsg(text) {
    const fromName = liveStore.info.userName;
    const { webIM, config, chatEnabled } = this;
    return new Promise((resolve, reject) => {
      if (text && webIM && chatEnabled) {
        // eslint-disable-next-line new-cap
        const msgItem = new WebIM.message('txt', webIM.getUniqueId()); // 创建文本消息
        const msgOptions = {
          msg: text, // 消息内容
          to: config.roomId, // 接收消息对象(群组id)
          roomType: true,
          ext: {
            fromName,
          },
        };
        msgItem.set({
          ...msgOptions,
          success: (id, serverMsgId) => {
            resolve();
            this.appendChatRecord({
              contentsType: 'TEXT',
              data: text,
              id: serverMsgId,
              from: liveStore.info.imUserId,
              ext: {
                fromName,
              },
            });
            this.saveRemoteMsg(msgItem, serverMsgId);
          },
          fail: (res) => {
            console.log(res);
            reject();
          },
        });
        msgItem.setGroup('groupchat');
        webIM.send(msgItem.body);
      } else {
        reject();
      }
    });
  }
  @action.bound
  beforeSendMsg(msgText) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/live/chat/before-send-msg.json',
        data: {
          msg: msgText,
          liveId: liveStore.info.liveId,
        },
        success: ({ flag, msg, code }) => {
          if (flag === 1) {
            resolve();
          } else {
            reject();
            if (code === '10008') {
              confirmOfNamecard();
            } else if (code === '5003') {
              confirmOfLogin();
            } else {
              Message.toast(msg);
            }
          }
        },
        abort: reject,
        error: reject,
      });
    });
  }

  @action.bound
  removeChatRecord(id) {
    const index = this.chatRecord.findIndex((item) => item.id === id);
    if (index > -1) {
      this.chatRecord.splice(index, 1);
    }
  }

  @action.bound
  saveRemoteMsg({ body }, serverMsgId) {
    const {
      chatroomId,
      emUserId,
      liveId,
    } = liveStore.info;
    $.ajax({
      url: '/live/chat/submit-msg.json',
      type: 'POST',
      data: {
        liveId,
        emUserId,
        chatroomId,
        msgId: serverMsgId,
        ext: JSON.stringify({
          fromUserName: body.ext.fromName,
          msg: body.msg,
          contentType: body.type,
        }),
      },
    });
  }

  @action.bound
  initIM(config) {
    this.config = config;
    const {
      user,
      pwd,
      roomId,
    } = config;
    WebIM.config = imConfig;
    // eslint-disable-next-line new-cap
    this.webIM = new WebIM.connection({
      appKey: imConfig.appkey,
      isHttpDNS: imConfig.isHttpDNS,
      isMultiLoginSessions: imConfig.isMultiLoginSessions,
      https: imConfig.https,
      url: imConfig.xmppURL,
      apiUrl: imConfig.apiURL,
      isDebug: imConfig.isDebug,
      isAutoLogin: imConfig.isAutoLogin,
      heartBeatWait: imConfig.heartBeatWait,
      autoReconnectNumMax: imConfig.autoReconnectNumMax,
      autoReconnectInterval: imConfig.autoReconnectInterval,
      isStropheLog: imConfig.isStropheLog,
      delivery: imConfig.delivery,
    });
    this.webIM.listen({
      onOpened() {
        console.log('im opened');
      },
      onClosed: () => {
        this.leaved = true;
      },
      // 收到文本消息
      onTextMessage: (message) => {
        // 只显示当前聊天室内的消息
        if (message.to === this.config.roomId) {
          this.appendChatRecord(message);
        }
      },
      // 收到命令消息
      onCmdMessage: ({ action }) => {
        if (action) {
          const [type, data] = action.split('-');
          if (type && data) {
            switch (type) {
              case 'delete':
                this.removeChatRecord(data);
                break;
              case 'showJob':
                jobStore.setActive(data);
                break;
              default:
                break;
            }
          }
        }
      },
    });
    // 登录im
    this.webIM.open({
      apiUrl: imConfig.apiURL,
      user,
      pwd,
      appKey: imConfig.appkey,
      success: () => {
        setTimeout(() => {
          this.webIM.joinChatRoom({
            roomId,
            success: () => {
              console.log('加入聊天室');
              this.chatEnabled = true;
            },
            error: ({ data }) => {
              console.log('加入聊天失败', JSON.stringify(data));
            },
          });
        }, 1000);
      },
    });
  }

  @action.bound
  exitIM() {
    if (this.webIM) {
      this.webIM.quitChatRoom({
        roomId: liveStore.info.chatroomId, // 聊天室id
      });
      this.webIM.close();
    }
  }
}

export default new Chat();

