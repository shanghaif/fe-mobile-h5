import sweet from '@liepin/native-sweet-fe';
import StringUtil from '../../../../lib/utils/string';

const getScrollTop = () => {
  const key = `seekWorthy-scrollTop-${StringUtil.getQuery('page')}`;
  const defaultScrollTop = sweet.get(key) || 0;
  if (defaultScrollTop) {
    window.scrollTo(0, defaultScrollTop);
    sweet.remove(key);
  }
};

const setScrollTop = () => {
  const scrollTop = document.querySelector('body').scrollTop || document.documentElement.scrollTop;
  sweet.set(`seekWorthy-scrollTop-${StringUtil.getQuery('page')}`, scrollTop);
};

export { getScrollTop, setScrollTop };
