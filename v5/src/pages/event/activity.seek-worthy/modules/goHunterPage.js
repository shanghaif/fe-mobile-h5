import { share4App } from '@liepin/share';
import domain from '@liepin/native-domain-fe';
import { setScrollTop } from './scrollLocation';

export default function goHunterPage(userId, userType) {
  if (Apps.isTd) {
    share4App({
      scheme: 'lptd',
      host: 'lp',
      bridge: 'p',
      bridgeType: 'otherHomePage',
      source: 'app',
      params: {
        userId,
        userType, // 1" C用户  "0" 小B用户（HR） "2"猎头主页
      },
    });
  } else {
    setScrollTop();
    window.location.href = `${domain('m')}/hunter/${userId}`;
  }
}
