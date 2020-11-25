import Ajax from '../../../lib/utils/request';
import { mRoot } from './lib/utils/domain';

const codes = ['5067', '5183', '5190', '5191', '5077', '5068', '5069', '5070'];
export default function (dataObject) {
  return new Promise((resolve, reject) => {
    Ajax({
      url: `${mRoot}/apply/beforeapplyjob.json`,
      data: dataObject,
    }).then(({ flag, data, code, msg }) => {
      if (flag === 1) {
        const { code: status } = data;
        codes.includes(status) ?
          reject({ code: status, data }) : /* eslint-disable-line prefer-promise-reject-errors */
          resolve(data);
      } else if (code === '5194') { // 猎头已被列入黑名单
        reject({ code, data }); /* eslint-disable-line prefer-promise-reject-errors */
      } else {
        reject({ code: msg, data }); /* eslint-disable-line prefer-promise-reject-errors */
      }
    });
  });
}
