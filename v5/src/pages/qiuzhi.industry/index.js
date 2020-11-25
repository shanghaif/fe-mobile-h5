/**
 * 求职 职位搜索 行业
 * https://m.liepin.com/qiuzhi/${行业code 如: 480}/
 * https://m.liepin.com/qiuzhi/480/
 */
import '@liepin/zepto-dialog';
import '@liepin/zepto-back-top';
import '@liepin/zepto-input-search';
import '@liepin/zepto-pagerBar';
import navSet from '@liepin/zepto-nav';
import './index.css';
import initHotLink from '../../components/ui/hotlink/tab.hotlink';
import recruitLayer from '../../components/ui/recruit/recruit.layer';

const $root = $('body');

navSet();

$(() => {
  // 初始化表单插件
  $('[data-selector="search-input"]', $root).searchInput({});
  // 分页
  $('[data-selector="pager-count"]', $root).pagerBar();
});

$(window).on('load', function () {
  // 拉新浮层
  recruitLayer();
  // 底部热链
  initHotLink();
  // 初始化回到顶部插件
  $root.backTop();
});
