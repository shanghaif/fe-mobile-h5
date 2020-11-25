import share, { share4App } from '@liepin/share';
import domain from '@liepin/native-domain-fe';

// 旧直播如果在新直播的iframe里打开时也需要刷新页面
const pageId = Math.random();
if (window.parent) {
  window.parent.postMessage({ type: 'live', pageId, url: window.location.href }, window.location.origin);
}

export default function ({
  title,
  shareTitle,
  img,
  desc,
  id,
}) {
  const path = `${domain('m')}/live/order/?liveId=`;
  if (Apps.isTd) {
    share4App({
      type: [17, 16],
      showshare: true,
      title,
      shareTitle,
      imgUrl: `https://image0.lietou-static.com/img/${img}`,
      shareUrl: `${path}${id}`,
      desc,
      mediaType: 0,
      thumburl: `https://image0.lietou-static.com/img/${img}`,
    });
  } else if (Apps.isWx) {
    share({
      title: shareTitle,
      link: `${path}${id}`,
      msgImg: `https://image0.lietou-static.com/img/${img}`,
      desc,
    });
  }
}
