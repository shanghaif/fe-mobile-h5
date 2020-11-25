/**
 * https://m.liepin.com/help/apply-guide/incr-interview-opportunity/goldCard/
 * https://m.liepin.com/help/apply-guide/incr-interview-opportunity/hrPreferences/
 * https://m.liepin.com/help/apply-guide/incr-interview-opportunity/improveRes/
 * https://m.liepin.com/help/apply-guide/incr-interview-opportunity/invitationRate
 * https://m.liepin.com/help/apply-guide/incr-interview-opportunity/jobCredit
 * https://m.liepin.com/help/apply-guide/incr-interview-opportunity/refreshRes
 */
import { share4App } from '@liepin/share';
import './index.css';

const $root = $('.view');
// 优化简历
$('[data-selector="optimize-resume"]', $root).on('click', () => {
  share4App({
    type: [29],
    target: 1,
  });
});
// 搜索职位
$('[data-selector="search-job"]', $root).on('click', () => {
  share4App({
    type: [21],
    selectJobType: 0,
  });
});
