import '@liepin/zepto-dialog';
import '@liepin/zepto-valid';
import { mRoot } from '../../../lib/utils/domain';
import './index.css';

const $root = $('body');

function sendAjax(url) {
  return () => {
    $.ajax({
      url,
      datatype: 'jsonp',
      data: { accessToken: window.$CONFIG.accessToken },
      cache: false,
      success({ flag, data, msg }) {
        if (flag === 1) {
          window.location.href = data.returnUrl;
        } else {
          $.dialog.toast(msg);
        }
      },
    });
  };
}

$('[data-selector="btn-submit"]', $root)
  .on('click', sendAjax(`${mRoot}/jd/certificate.json`));
$('[data-selector="btn-cancle"]', $root)
  .on('click', sendAjax(`${mRoot}/jd/giveUp.json`));
