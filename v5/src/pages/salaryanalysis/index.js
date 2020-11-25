/*
 * https://m.liepin.com/salaryanalysis/
 * 2019-08-27 改版 需求方： 童猛
 */
import domain from '@liepin/native-domain-fe';
import './index.less';

const mDomain = domain('m');

$('body').on('click', function () {
  if (LT.User.isLogin) {
    window.location.href = '/salaryanalysis/editcard/';
  } else if (LT.User.is_lp_user) {
    window.location.href = `/login/?url=${mDomain}/salaryanalysis/editcard/&step=0`;
  } else {
    window.location.href = `/register/?return_url=${mDomain}/salaryanalysis/editcard/&step=0`;
  }
});
