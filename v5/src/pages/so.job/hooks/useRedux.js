import { useReducer, useMemo, createContext } from 'react';
import localStore from '@liepin/native-sweet-fe';
import { SEARCH_KEYWORD } from '@liepin/react-search-layer-h5';
import reducer from './reducer';
import initActions from './actions';

export const FilterContext = createContext(null);

const $CONFIG = window.$CONFIG || {};
const words = localStore.get(SEARCH_KEYWORD) || [];
const {
  industry = {},
  dqs = {},
  keyword = '',
  sortflag = '0',
  compKinds = '',
  compScales = '',
  compStageCodes = '',
} = $CONFIG;
const industryCode = industry.code === '000' ? '' : industry.code;
const initState = {
  lastSearch: words[0] || '',
  cityCode: dqs.code || '000',
  cityName: dqs.name || '全国',
  industryCode: industryCode ? industryCode.split(',') : [],
  keyword,
  order: sortflag,
  company: {
    kind: compKinds ? compKinds.split(',') : ['000'],
    scale: compScales ? compScales.split(',') : ['000'],
    stage: compStageCodes ? compStageCodes.split(',') : [''],
  },
  job: {
    salary: `${$CONFIG.salarylow}-${$CONFIG.salaryhigh}`,
    degreeCode: $CONFIG.edus ? $CONFIG.edus.split(',') : [''],
    workExp: $CONFIG.workYears ? $CONFIG.workYears.split(',') : ['0'],
    pubtime: $CONFIG.pubtime || '000',
    kind: $CONFIG.jobkind || '',
    openShieldComp: $CONFIG.openShieldComp,
  },
};



const useRedux = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const actions = useMemo(() => initActions(dispatch), [dispatch]);
  return {
    state,
    actions,
  };
};

export default useRedux;
