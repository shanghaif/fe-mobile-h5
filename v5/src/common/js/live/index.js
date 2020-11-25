import domain from '@liepin/native-domain-fe';
import appsUtil from '../../../lib/utils/apps';

if (appsUtil.isIos) {
  const domains = [domain('m-c'), domain('m')];
  const pageId = Math.random();
  window.addEventListener('message', function (event) {
    const msg = event.data;
    if (domains.includes(event.origin) && msg.type === 'iframe') {
      document.body.style.setProperty('height', '100%');
      document.body.style.setProperty('overflow-y', 'scroll');
      document.body.style.setProperty('overflow-x', 'hidden');
      document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
    }
  });
  window.addEventListener('load', () => {
    if (window.parent) {
      window.parent.postMessage({
        pageId,
        type: 'ios',
        url: window.location.href,
        pathname: window.location.pathname,
      }, window.location.origin);
    }
  }, false);
}
