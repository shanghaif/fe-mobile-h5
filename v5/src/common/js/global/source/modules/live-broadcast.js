import LiveBroadcastView from '../components/LiveBroadcast';
import BackToLiveBroadcast from '../components/BackToLiveBroadcast';
import stringUtil from '../../../../../lib/utils/string';
import render from '../render';

import { QUERY_NAME, CUR_LIVE_BROADCAST_URL } from '../constants';

const isBaidu = window.navigator.userAgent.indexOf('baidu') > -1;

setTimeout(function () {
  const hasQuery = stringUtil.getQuery(QUERY_NAME) === 'zhibo';
  const broadcastUrl = LT.Cookie.get(CUR_LIVE_BROADCAST_URL);
  render(!!broadcastUrl, (hasQuery && !isBaidu) ? LiveBroadcastView : BackToLiveBroadcast);
}, 300);

