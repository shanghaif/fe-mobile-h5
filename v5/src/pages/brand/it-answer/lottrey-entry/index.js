/**
 * https://m.liepin.com/brand/it-answer/lottrey-entry/
 */
import domain from '@liepin/native-domain-fe';
import loginTpl from './tpls/login.tpl';
import { getUserLoginStatus } from '../modules/common';

import '../style/common.less';
import './index.less';

$('[data-selector="choose-prise"]').on('click', function () {
  const $this = $(this);
  $this.siblings().removeClass('prise-checked').addClass('prise-nocheck');
  $this.removeClass('prise-nocheck').addClass('prise-checked');
  $this.parents('.prise-content').find('span').html('');
});

$('[data-selector="open-prise"]').on('click', function () {
  if (!$('.prise-checked').length || $('.open-checked').length) {
    return false;
  }
  $(this).addClass('open-checked');
  getUserLoginStatus().then(() => {
    // 已登录
    window.location.replace(`${domain('m')}/brand/it-answer/lottrey-award/`);
  }, () => {
    // 未登录弹登录弹窗
    $.dialog({
      content: loginTpl.render(),
    });
  });
});
