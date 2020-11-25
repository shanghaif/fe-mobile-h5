/* 系统维护时的用户提示小黄条, 需要的时候修改文案和生效时间, 在相应页面引入即可 */
function systemUpdate() {
  const startTime = new Date('2018-12-28 12:00:00').getTime();
  const endTime = new Date('2018-12-29 02:00:00').getTime();
  const nowTime = Date.now();
  if (nowTime > startTime && nowTime < endTime) {
    const div = document.createElement('div');
    div.style = 'position:fixed;bottom:0;z-index:99;background:#ffffe5;text-align:center;line-height:25px;color:#e75c00;border-bottom:1px solid #d2d2d2;';
    div.innerText = '网站于2018年12月29日凌晨00:00-02:00进行升级维护，期间可能会发生请求失败，请稍后重试。';
    document.body.appendChild(div);
    const height = div.offsetHeight;
    const bodyBottom = parseInt(document.body.style.paddingBottom, 10) || 0;
    document.body.style.paddingBottom = `${height + bodyBottom}px`;
  }
}
systemUpdate();
