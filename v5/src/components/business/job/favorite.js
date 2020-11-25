import { jsonp } from '../../../lib/ajax';
import UserUtil from '../../../lib/utils/user';

function fav(url) {
  const favorite = jsonp(url);
  return function (success, failure) {
    const callback = data => (data.flag === 1 ? success(data) : failure(data));
    return job => UserUtil.needLogin() && favorite({
      data: job,
      success: callback,
    });
  };
}

export const favorite = fav(`${LT.Env.cRoot}job/favorite.json`);

export const unfavorite = fav(`${LT.Env.cRoot}job/unfavorite.json`);


