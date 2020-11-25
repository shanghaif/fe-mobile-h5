/**
 * 求职 职位搜索页
 * https://m.liepin.com/qiuzhi/
 */
import '@liepin/zepto-back-top';
import '@liepin/zepto-input-search';
import navSet from '@liepin/zepto-nav';
import recruitLayer from '../../components/ui/recruit/recruit.layer';
import initHotLink from '../../components/ui/hotlink/tab.hotlink';
import './index.css';

const $root = $('body');

navSet();

$(() => {
  // 搜索浮层
  $('[data-selector="search-input"]', $root).searchInput({
    placeholder: '请输入职位名称',
    goButtonCallback({ value, searchType }) {
      const dqs = $('[data-selector="search-dqs"]').val();
      window.location.href = (searchType === 'job')
        ? `/zhaopin/?keyword=${value}&dqs=${dqs}`
        : `/so/company/?keyword=${value}&dqs=${dqs}`;
    },
  });
});

$(window).on('load', function () {
  // 底部热链
  initHotLink();
  // 拉新浮层
  recruitLayer();
  // 初始化回到顶部插件
  $root.backTop();
});
