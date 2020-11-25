import shareImg from '../images/share.jpg';

const { location } = window;
export default {
  shareTitle: '求贤季·高薪定制',
  url: `${location.protocol}//${location.hostname}${location.pathname}`,
  img: `https:${shareImg}`,
  desc: '用猎聘更高薪，年轻更有为!',
  mediaType: 0,
};
