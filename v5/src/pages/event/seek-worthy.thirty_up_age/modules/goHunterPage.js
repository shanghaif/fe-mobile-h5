import { share4App } from '@liepin/share';
import domain from '@liepin/native-domain-fe';
import { recordScroll } from './recordScroll';

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
    recordScroll();
    window.location.href = `${domain('m')}/hunter/${userId}`;
  }
}
