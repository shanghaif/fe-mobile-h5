/**
 * app下载页
 * https://m.liepin.com/app/
 */
import { isIOS } from '../../lib/env/index';
import { cRoot } from '../../lib/utils/domain';
import './index.less';

$('[data-selector="download"]').on('click', function () {
  if (isIOS && document.cookie.indexOf('iphone_redirect=false') === -1) { // ios
    window.location.href = `${cRoot}/tdown?mscid=C000000235`;
  } else { // android
    window.location.href = `${cRoot}/tdown?mscid=C000000234`;
  }
});
