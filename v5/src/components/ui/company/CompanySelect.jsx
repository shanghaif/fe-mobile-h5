import domain from '@liepin/native-domain-fe';
import Ajax from '../../../lib/utils/request';
import autoCompleteGenerate from '../auto-complete/autoCompleteGenerate';

const mcRoot = domain('m-c');

export default autoCompleteGenerate({
  fetchSuggestHeight() {
    return (keyword) => new Promise((resolve, reject) => {
      Ajax({
        url: `${mcRoot}/suggest/comps.json`,
        data: {
          keyword,
        },
      }).then(({ data, flag }) => {
        if (flag === 1) {
          resolve(data.data);
        } else {
          resolve([]);
        }
      }).catch(reject);
    });
  },
  keyword: 'compName',
});
