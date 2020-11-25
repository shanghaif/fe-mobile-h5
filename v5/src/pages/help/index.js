/**
 * 帮助页
 * https://m.liepin.com/h/?c=4
 */
import navSet from '@liepin/zepto-nav';
import '@liepin/pulldata';
import './index.css';

const $root = $('[data-selector="help-main"]');
const $list = $('.help-list', $root);
navSet();
// 点击问题展开内容
$list.on('tap', 'li', function () {
  const $this = $(this);
  if ($this.find('article').length === 0) {
    $.ajax({
      url: `/help/gethelp.json?id=${$this.attr('data-id')}`,
      type: 'POST',
      dataTyep: 'json',
      cache: false,
      success(data) {
        if (data.flag === 1) {
          const dataList = data.data;
          if (dataList) {
            $(dataList.content || '').appendTo($this);
          }
        } else {
          $.dialog.alert(data.msg);
        }
      },
    });
  }
  if ($this.hasClass('active')) {
    $this.removeClass('active');
  } else {
    $this.addClass('active').siblings().removeClass('active');
  }
});

// 上拉加载
const category = parseInt(window.location.search.split('=')[1], 10);
$list.pullData({
  direction: 'up',
  slideName: '.list-con',
  curPage: 1,
  pageSize: 15,
  firstLoadNum: 15,
  noPullTip: true,
  ajax: {
    url: '/help/gethelplist.json',
    data: { c: category },
    success({ flag, data = [] }) {
      if (flag === 1) {
        $(data.map(({ id, title }) => `<li data-id="${id}"><h3>${title}</h3></li>`)
          .join('')).appendTo($('.list-con ul', $list));
      }
    },
  },
});
