/**
 * 简历完整度不够引导用户完善简历的弹层
 * @param content 弹层内容, 刷新简历、应聘等不同的业务弹层内容不同
 * @param editUrl 用户点 立即完善时跳转的url
 */
export default ({ content, editUrl }) => {
  $.dialog({
    width: '90%',
    title: false,
    content,
    button: [{
      name: '取消',
      callback: true,
      className: 'btn-normal',
    }, {
      name: '立即完善',
      callback() {
        window.location.href = editUrl;
      },
      className: 'btn-normal',
    }],
  });
};
