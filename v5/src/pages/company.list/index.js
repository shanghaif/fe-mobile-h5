/**
 * 企业名录
 * https://m.liepin.com/company/${地区编号}-${行业编号}/
 * https://m.liepin.com/company/070100-000/
 */
import '@liepin/zepto-dialog';
import '@liepin/zepto-pagerBar';
import navSet from '@liepin/zepto-nav';
import './index.css';
import hotLinkInit from '../../components/ui/hotlink/tab.hotlink'; // 底部热门tab
import recruitLayer from '../../components/ui/recruit/recruit.layer'; // 拉新浮层

navSet();
const $root = $('#company-list');
$('[data-selector="more-img"]', $root).on('tap', function () {
  const $this = $(this);
  if ($this.closest('.filter-item').hasClass('short')) {
    $this.closest('.filter-item').removeClass('short');
    $this.html('<i class="text-icon icon-up">');
  } else {
    $this.closest('.filter-item').addClass('short');
    $this.html('<i class="text-icon icon-down">');
  }
});

// 分页
$('[data-selector="pager-count"]', $root).pagerBar();
// 卡片式点击特殊处理
$('[data-selector="card-link"]', $root).on('tap', function () {
  $(this).find('.company-list-title').trigger('click');
});
// 拉新浮层
recruitLayer();
// 内链模块tab切换
hotLinkInit();
