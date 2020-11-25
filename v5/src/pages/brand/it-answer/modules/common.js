import share, { share4App } from '@liepin/share';
import nativeGoBack from '@liepin/native-app-communication-h5';
import domain from '@liepin/native-domain-fe';
import sweet from '@liepin/native-sweet-fe';
import shareImg from '../images/share.jpg';

const cookieKey = 'luck-draw-20191024';
export const maxChance = Apps.isTd ? 1 : 2;
export const priceLink = 'https://shop43636123.youzan.com/v2/feature/02VeysXl6p?kdt_id=43443955&scan=3&from=groupmessage&redirect_count=1&sf=wx_sm&is_share=1&from_uuid=3260e6d1-77e9-2577-e0b4-ff05b727789f';
export const jobLink = `${domain('wow')}/t1000021/ba697dfb.html`;
nativeGoBack(function () {
  share4App({
    bridge: 'p',
    bridgeType: 'backNative',
  });
});
// 分享设置
const shareData = {
  shareTitle: '这些题，Google的程序员都答不对',
  url: `${domain('m')}/brand/it-answer/home/`,
  img: `https:${shareImg}`,
  desc: '内涵福利',
};

export const getShareCount = () => {
  const savedCookie = sweet.get(cookieKey);
  if (!savedCookie) {
    return 0;
  }
  return savedCookie | 0;
};

export const rasieShareCount = () => {
  const count = getShareCount();
  sweet.set(cookieKey, count + 1, 30);
};
if (Apps.isTd) {
  share4App({
    type: [17, 16],
    showshare: true,
    title: shareData.shareTitle,
    shareTitle: shareData.shareTitle,
    imgUrl: shareData.img,
    shareUrl: shareData.url,
    desc: shareData.desc,
    mediaType: 0,
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

export const getUserLoginStatus = () => (new Promise(function (resolve, reject) {
  $.ajax({
    url: '/user/status.json',
    success({ flag, data }) {
      if (flag === 1 && data.loggedIn) {
        resolve();
      } else {
        reject();
      }
    },
    error: reject,
  });
}));
