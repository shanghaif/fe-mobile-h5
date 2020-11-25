/**
 * 人才网
 * https://m.liepin.com/${城市}/rencai/
 * 如: 北京人才网
 * https://m.liepin.com/bj/rencai/
 */
import '@liepin/zepto-dialog';
import '@liepin/zepto-pagerBar';
import '@liepin/autocomplete';
import navSet from '@liepin/zepto-nav';
import './index.css';
import hotLinkInit from '../../components/ui/hotlink/tab.hotlink'; // 底部热门tab
import recruitLayer from '../../components/ui/recruit/recruit.layer'; // 拉新浮层

navSet();
const $root = $('body');
$('[data-selector="more-img"]', $root).on('tap', function () {
  const $this = $(this);
  const $filterItem = $this.closest('.filter-item');
  const icon = $filterItem.hasClass('short') ? 'up' : 'down';
  $this.html(`<i class="text-icon icon-${icon}">`);
  $filterItem.toggleClass('short');
});

// 分页
$('[data-selector="pager-count"]', $root).pagerBar();

$('.list-card', $root).on('tap', function () {
  $(this).find('.job-name').trigger('click');
});
// 拉新浮层
recruitLayer();
// 内链模块tab切换
hotLinkInit();
