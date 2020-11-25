/*
 * https://m.liepin.com/salaryanalysis2019/
 * 20191201-新版薪资报告入口页
 */
import domain from '@liepin/native-domain-fe';
import './index.less';

const mDomain = domain('m');

$('body').on('click', function () {
  if (LT.User.isLogin) {
    window.location.href = '/salaryanalysis2019/editcard/';
  } else if (LT.User.is_lp_user) {
    window.location.href = `/login/?url=${mDomain}/salaryanalysis2019/editcard/&step=0`;
  } else {
    window.location.href = `/register/?return_url=${mDomain}/salaryanalysis2019/editcard/&step=0`;
  }
});
