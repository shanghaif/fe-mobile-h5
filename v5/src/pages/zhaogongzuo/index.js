/**
 * 找工作
 * https://m.liepin.com/${城市}/zhaogongzuo/
 * 如: 北京找工作
 * https://m.liepin.com/bj/zhaogongzuo/
 */

import '@liepin/zepto-back-top';
import '@liepin/zepto-input-search';
import navSet from '@liepin/zepto-nav';
import initHotLink from '../../components/ui/hotlink/tab.hotlink';
import recruitLayer from '../../components/ui/recruit/recruit.layer';
import './index.css';

navSet();
const $root = $('body');
// 浮层字体大小自适应
const clientHeight = parseInt(document.documentElement.clientHeight, 10);
const bodyfont = 32 * clientHeight / 960;
document.documentElement.style.fontSize = `${bodyfont}px`;

$(() => {
  // 初始化表单插件
  $('[data-selector="search-input"]', $root).searchInput({
    placeholder: '请输入职位名称',
    goButtonCallback({ value, searchType }) {
      const dqs = $('[data-selector="search-dqs"]').val();
      window.location.href = (searchType === 'job')
        ? `/zhaopin/?keyword=${encodeURIComponent(value)}&dqs=${dqs}`
        : `/so/company/?keyword=${encodeURIComponent(value)}&dqs=${dqs}`;
    },
  });
  // 展开收起
  $('[data-selector="pull"]', $root).on('click', function () {
    const $this = $(this);
    const $pullContent = $this.closest('dd');
    if ($pullContent.hasClass('short')) {
      $pullContent.removeClass('short');
      $this.removeClass('icon-down').addClass('icon-up');
    } else {
      $pullContent.addClass('short');
      $this.removeClass('icon-up').addClass('icon-down');
    }
  });
});

$(window).on('load', function () {
  // 拉新浮层
  recruitLayer();
  // 底部热链
  initHotLink();
  // 初始化回到顶部插件
  $root.backTop();
});
