import '../style/apply-log-tips.less';

export default () => {
  let tipsList;
  const jobKindAllowList = ['1', '2']; // 只有企业和猎头职位有数据，by邹恒
  const { compRootId, recruiterId, jobId, jobKind } = $CONFIG;
  if (!jobKindAllowList.includes(jobKind)) { return; }
  // 初始化容器
  const $div = $('<div class="apply-log-tips-wrap"><ul></ul></div>');
  $('body').append($div);
  // 准备基础变量
  const $ulWrap = $div.find('ul');
  let curIndex = 0;
  // 轮播html处理
  function autoChangeContent() {
    if (curIndex === tipsList.length - 1) { // 滚动到倒数第一个
      $ulWrap.html(`
        <li class="auto-one"><p><span class="text-warning">${tipsList[curIndex].maskName}</span>${tipsList[curIndex].showOperWords}</p></li>
        <li class="auto-two"><p><span class="text-warning">${tipsList[0].maskName}</span>${tipsList[0].showOperWords}</p></li>
        <li class="auto-three"><p><span class="text-warning">${tipsList[1].maskName}</span>${tipsList[2].showOperWords}</p></li>
      `);
      curIndex = 0;
    } else if (curIndex === tipsList.length - 2) { // 滚动到倒数第二个
      $ulWrap.html(`
        <li class="auto-one"><p><span class="text-warning">${tipsList[curIndex].maskName}</span>${tipsList[curIndex].showOperWords}</p></li>
        <li class="auto-two"><p><span class="text-warning">${tipsList[curIndex + 1].maskName}</span>${tipsList[curIndex + 1].showOperWords}</p></li>
        <li class="auto-three"><p><span class="text-warning">${tipsList[0].maskName}</span>${tipsList[0].showOperWords}</p></li>
      `);
      curIndex++;
    } else { // 容器最低数量3个，正常执行
      $ulWrap.html(`
        <li class="auto-one"><p><span class="text-warning">${tipsList[curIndex].maskName}</span>${tipsList[curIndex].showOperWords}</p></li>
        <li class="auto-two"><p><span class="text-warning">${tipsList[curIndex + 1].maskName}</span>${tipsList[curIndex + 1].showOperWords}</p></li>
        <li class="auto-three"><p><span class="text-warning">${tipsList[curIndex + 2].maskName}</span>${tipsList[curIndex + 2].showOperWords}</p></li>
      `);
      curIndex++;
    }
  }
  $.ajax({
    url: '/job/applied-list.json',
    type: 'post',
    data: {
      compRootId,
      recruiterId,
      jobId,
      jobKind,
    },
    success(data) {
      if (data.flag === 1) {
        tipsList = data.data;
        if (tipsList.length < 3) {
          return;
        }
        autoChangeContent();
        // 这里延时时间和动画时间一致，需要同步修改
        setInterval(autoChangeContent, 1800);
      } else {
        $.dialog.toast(data.msg);
      }
    },
  });
};
