import { Message } from '@liepin/react-violet-h5';
import Ajax from '../../../lib/utils/request';

const $CONFIG = window.$CONFIG || {};

const initActions = (dispatch) => ({
  dispatch,
  loadHotWord() {
    Ajax({ url: '/hot-search.json' })
      .then(({ flag, data, msg }) => {
        if (flag === 1) {
          dispatch({ type: 'hotWord', payload: { hotWord: data.data } });
        } else {
          msg && Message.toast(msg);
        }
      });
  },
  search(...args) {
    const condition = Object.assign({}, ...args);
    const [low, high] = condition.job.salary.split('-');
    const queryString = `dqs=${
      condition.cityCode
    }&industrys=${
      condition.industryCode.join()
    }&keyword=${
      encodeURIComponent(condition.keyword)
    }&sortflag=${
      condition.order
    }&compKinds=${
      condition.company.kind.join()
    }&compScales=${
      condition.company.scale.join()
    }&compStageCodes=${
      condition.company.stage.join()
    }&salarylow=${
      low
    }&salaryhigh=${
      high
    }&edus=${
      condition.job.degreeCode.join()
    }&pubtime=${
      condition.job.pubtime
    }&workYears=${
      condition.job.workExp.join()
    }&jobkind=${
      condition.job.kind
    }&openShieldComp=${
      condition.job.openShieldComp
    }&d_headId=${
      $CONFIG.d_headId
    }&d_ckId=${
      $CONFIG.d_ckId
    }&d_sfrom=${
      $CONFIG.d_sfrom
    }&siTag=${
      $CONFIG.siTag
    }&d_pageSize=${
      $CONFIG.d_pageSize
    }`;
    window.location.href = `/zhaopin?${queryString}`;
  },
});

export default initActions;
