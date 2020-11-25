// 企业信息和职位信息展开
$('.view-more').on('tap', function () {
  /**
   * 点击查看全部时, 移除内容元素上的折叠样式
   * 职位信息展示10行, 企业信息展示5行
   */
  $(this)
    .siblings('.ellipsis-5,.ellipsis-10')
    .removeClass('ellipsis-5 ellipsis-10')
    .end()
    .remove();
}).each(function () {
  /**
   * 判断内容是否有折叠, 有则显示查看全部, 没有则隐藏
   */
  const elm = $(this).siblings('.ellipsis-5,.ellipsis-10')[0];
  if (!elm || elm.clientHeight >= elm.scrollHeight) {
    $(this).remove();
  }
});
