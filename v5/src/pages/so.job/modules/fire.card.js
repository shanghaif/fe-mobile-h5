// 拉新广告卡片
export default function initFireCard() {
  const fireCard = $('[data-selector="fire-card"]');
  const data = window.$CONFIG;

  const fireCardHtml = `
  <dl class="clearfix">
    <dt class="job-card-logo">
      <img src=https://image0.lietou-static.com/img/58dca8347032bfe7c3ee464905a.jpg alt="" class="job-card-logo">
    </dt>
    <dd class="right-info">
      <ul>
        <li class="flexbox">
          <a class="flex-3 job-name" ${LT.User.isLogin ? 'href="/tdown" data-selector="download-link"' : 'href="/register/?imscid=R000010827"'} >
            <span class="name-text">${data.ggTitle}</span>
            <img class="fire" src="https://image0.lietou-static.com/img/58ca5a0d70321f8a8b37f94f05a.png" alt="">
          </a>
          <span class="text-warning flex-1">${data.ggSalary}万起</span>
        </li>
        <li>
          <span class="add-job">本期新增<span class="special-text">${data.ggJobCount}</span>个职位</span>
        </li>
        <li>
          ${LT.User.isLogin ? '<span>实时更新&nbsp;尽在猎聘</span>' : `<time>1分钟前</time>&nbsp;<a href="${data.dqUri}">${data.dqName}</a>&nbsp;学历不限&nbsp;经验不限`}
        </li>
    </ul>
  </dd>
</dl>
`;

  fireCard.each(function () {
    const $this = $(this);
    const dataIndex = $this.attr('data-index') | 0;
    $this.html(fireCardHtml);
    if (dataIndex === 1 || dataIndex === 2) {
      $this.find('.job-card-logo').attr('src', 'https://image0.lietou-static.com/img/58dca81d7032d65ebc52fd3405a.jpg');
    }
  });
}
