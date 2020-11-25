import domain from '@liepin/native-domain-fe';
import sweet from '@liepin/native-sweet-fe';

export default function () {
  return new Promise(function (resolve) {
    const { userId } = $CONFIG;
    if (userId) {
      const key = `career_achievement_${$CONFIG.userId}`;
      const remain = sweet.get(key);
      if (remain) {
        resolve(remain);
      } else {
        $.ajax({
          url: `${domain('m-c')}/activity/work-exp-review/data.json`,
          dataType: 'jsonp',
          success({ data, flag }) {
            if (flag === 1) {
              sweet.set(key, data, 60);
              resolve(data);
            } else {
              resolve(null);
            }
          },
          fail() {
            resolve(null);
          },
        });
      }
    } else {
      resolve(null);
    }
  });
}
