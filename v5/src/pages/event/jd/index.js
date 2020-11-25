/**
 * 京东小白认证
 * https://m.liepin.com/jd/index
 */
import '@liepin/zepto-dialog';
import '@liepin/zepto-valid';
import { mRoot } from '../../../lib/utils/domain';
import './index.css';

const $root = $('.view');
const $btnSubmit = $('[data-selector="btn-submit"]', $root);
$('.checkbox').on('change', () => {
  if ($('input:checked').length < 12) {
    $btnSubmit.addClass('btn-disabled').removeAttr('data-selector');
  } else {
    $btnSubmit.removeClass('btn-disabled').removeAttr('disabled').attr('data-selector', 'btn-submit');
  }
});

function sendAjax(url) {
  $.ajax({
    url,
    datatype: 'jsonp',
    data: { accessToken: window.$CONFIG.accessToken },
    cache: false,
    success(data) {
      if (data.flag === 1) {
        window.location.href = data.data.returnUrl;
      } else {
        $.dialog.toast(data.msg);
      }
    },
  });
}
$btnSubmit.on('click', () => {
  if ($('input:checked').length < 12) {
    return false;
  }
  sendAjax(`${mRoot}/jd/certificate.json`);
});
$('[data-selector="btn-cancle"]', $root).on('click', () => sendAjax(`${mRoot}/jd/giveUp.json`));
