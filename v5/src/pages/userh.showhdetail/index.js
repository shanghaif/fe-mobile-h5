/**
 * https://m.liepin.com/userh/showhdetail/?user_id=0091cbf7a09a9d7b7acc0752ffc776ea
 */
import '@liepin/pulldata';
import '@liepin/zepto-dialog';
import navSet from '@liepin/zepto-nav';
import './index.css';

const $moreMenu = $('[data-selector="more-menu"]');
const $more = $('.nav .more');
const $addblack = $('[data-selector="add-blacklist"]');

navSet();

$(() => {
  $more.on('tap', function () {
    if ($more.data('locked')) { return; }
    $moreMenu.toggleClass('hide');
  });
  // 加入黑名单
  $addblack.on('tap', function () {
    $moreMenu.addClass('hide');
    const $this = $(this);
    if ($this.data('locked')) {
      return;
    }
    const userHId = $this.attr('userh-id');
    $this.data('locked', true);
    $more.data('locked', true);
    $.dialog({
      width: '80%',
      title: false,
      content: '<div class="text-center">确定要将猎头移入黑名单吗？</div>',
      button: [{
        name: '确定',
        callback() {
          const that = this;
          $.ajax({
            url: `${LT.Env.cRoot}user/adduserhblacklist.json?userHId=${userHId}`,
            dataType: 'jsonp',
            success(data) {
              if (data.flag === 1) {
                window.location.reload();
              } else {
                that.showed && that.close();
                $this.data('locked', false);
                $more.data('locked', false);
                $.dialog.alert(data.msg);
              }
            },
          });
        },
        className: 'btn-normal',
      }, {
        name: '取消',
        callback() {
          this.showed && this.close();
          $this.data('locked', false);
          $more.data('locked', false);
          $('body').append($('<div class="mask-layer">'));
        },
        className: 'btn-normal',
      }],
    });
  });
  // 移出黑名单
  $('[data-selector="remove-blacklist"]').on('tap', function () {
    const userHId = $(this).data('userid');
    $.dialog({
      width: '80%',
      title: false,
      content: '<div class="text-center">确定要将猎头移出黑名单吗？</div>',
      button: [{
        name: '确定',
        callback() {
          const that = this;
          $.ajax({
            url: `${LT.Env.cRoot}user/removeuserhblacklist.json?userHId=${userHId}`,
            dataType: 'jsonp',
            success(data) {
              if (data.flag === 1) {
                window.location.reload();
              } else {
                that.showed && that.close();
                $.dialog.alert(data.msg);
              }
            },
          });
        },
        className: 'btn-normal',
      }, {
        name: '取消',
        callback() {
          this.showed && this.close();
          $('body').append($('<div class="mask-layer">'));
        },
        className: 'btn-normal',
      }],
    });
  });
  // 上拉加载
  $(document.body).pullData({
    direction: 'upB',
    slideName: '.position-list',
    curPage: 1,
    pageSize: 20,
    firstLoadNum: 20,
    noPullTip: true,
    ajax: {
      url: '/userh/gethjobs.json',
      data: { userId: window.config.userId },
      success(data) {
        if (data.flag === 1) {
          const html = data.data.reduce((fragment, item) => `${fragment}<li><a href="${item.job_url}"><label>${item.title}</label><span>${item.salary}<i class="text-icon icon-go-ahead"/></span></a></li>`);
          $(html).appendTo($('.position-list ul'));
        }
      },
      error(data) {
        $.dialog.alert(`<div class="text-center">${data.msg || '获取数据失败'}</div>`);
      },
    },
  });
});
