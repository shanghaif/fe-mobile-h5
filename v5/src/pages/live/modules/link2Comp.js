import { share4App } from '@liepin/share';
import appsUtil from '../../../lib/utils/apps';

const { location } = window;

export default (function () {
  if (appsUtil.isTd) {
    return function ({ cid }) {
      share4App({
        type: [12],
        entityId: '',
        cid,
      });
    };
  }
  return function ({ cid }) {
    location.href = `/company/${cid}/?source=zhibo`;
  };
}());
