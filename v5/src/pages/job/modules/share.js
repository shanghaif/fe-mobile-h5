import share from '@liepin/share';

const { dataForWeixin } = $CONFIG;
// wx分享
share({
  title: dataForWeixin.title,
  link: window.location.href,
  msgImg: dataForWeixin.msgImg,
  desc: dataForWeixin.desc,
});
