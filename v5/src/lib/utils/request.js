import { share4App } from '@liepin/share';
import reqwest from '@liepin/reqwest';
import Apps from './apps';
import { mRoot } from './domain';

/**
 * 将 reqwest 重命名，便于记忆
 * 可以后续做集中拓展（例如，登录失效状态的处理）
 * 文档：https://github.com/ded/reqwest
 */

export default (options) => new Promise((resolve, reject) => {
  reqwest({
    ...options,
    complete(responseData) {
      options.complete && options.complete(responseData);
    },
    success(responseData) {
      const { code } = responseData;
      // 接口要求登录异常code处理
      if (code && code === '5002') {
        if (Apps.isTdAndroid) {
          share4App({
            type: [74],
            code: '00001',
          });
        } else if (Apps.isTdIos && Apps.appVc >= 600) {
          share4App({
            type: [74],
            code: '00001',
          });
        } else {
          window.location.href = `${mRoot}/register/?return_url=${encodeURIComponent(window.location.href)}`;
        }
        return;
      }
      options.success && options.success(responseData);
      resolve(responseData);
    },
    error(e) {
      options.error && options.error(e);
      reject(e);
    },
  });
});
