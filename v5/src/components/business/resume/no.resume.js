export default ({ content, editUrl, stlogCode }) => {
  $.dialog({
    width: '90%',
    title: false,
    content, // '<div class="text-center">很抱歉您还没有简历，无法刷新<br/>请先创建简历</div>',
    button: [{
      name: '暂不',
      callback: true,
      className: 'btn-normal',
    }, {
      name: '立即创建',
      callback() {
        window.location.href = editUrl; // '/registerresume/toedituserbaseinfo/';
      },
      className: 'btn-normal',
    }],
    showEnd() {
      window.tlog.push(`s:${stlogCode}`);
    },
  });
};
