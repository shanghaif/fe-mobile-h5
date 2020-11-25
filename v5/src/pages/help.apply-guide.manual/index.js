/**
 * https://m.liepin.com/help/apply-guide/manual/
 */
import { share4App } from '@liepin/share';
import Apps from '../../common/js/apps/index';
import './index.css';

const strategy = require('./tpls/strategy.tpl');

$(() => {
  const $root = $('.view');
  const autoHight = `${(document.body.clientHeight - 330) * 100 / (document.body.clientHeight * 2)}%`;
  $('ul li', $root).on('click', function () {
    const item = $(this).attr('data-selector');
    const dialog = $.dialog({
      width: '84%',
      zIndex: 2503,
      title: false,
      className: 'strategy-dialog',
      content: strategy.render({
        item,
        appVc: Apps.appVc,
        isTd: Apps.isTd,
        close() {
          dialog.close();
        },
        improveResume() {
          // 完善简历
          dialog.close();
          share4App({
            type: [29],
            target: 1,
          });
        },
        searchJob() {
          // 搜索职位结果
          dialog.close();
          share4App({ type: [40] });
        },
        tailor() {
        // 私人订制
          dialog.close();
          share4App({ type: [73] });
        },
        setPrivacy() {
          // 隐私设置
          dialog.close();
          share4App({ type: [41] });
        },
        feedback() {
          // 意见反馈
          dialog.close();
          share4App({ type: [35] });
        },
      }),
      contentPadding: 0,
      top: autoHight,
    });
  });
});
