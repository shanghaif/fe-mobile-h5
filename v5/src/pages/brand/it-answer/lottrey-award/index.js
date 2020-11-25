/**
 * https://m.liepin.com/brand/it-answer/lottrey-award/
 */
import '../modules/common';

import perfectTpl from './tpls/perfect.tpl';

import '../style/common.less';
import './index.less';

// 完善邮寄信息
$('[data-selector="go-perfect-mail"]').on('click', () => {
  $.dialog({
    content: perfectTpl.render(),
  });
});


