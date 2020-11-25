import { createContext, useReducer, useMemo } from 'react';
import domain from '@liepin/native-domain-fe';
import { Message } from '@liepin/react-violet-h5';
import Ajax from '../../../../lib/utils/request';
import stringUtil from '../../../../lib/utils/string';
import { validUserCard } from '../valid';

export const ResumeCompleteContext = createContext(null);

const initState = {
  isLoad: false,
  currentStep: 0,
  hasCity: false,
  hasEmail: false,
  resId: '简历ID', // 简历Id
  needUserCard: false,
  needEduExp: false,
  needWorkExp: false,
  needJobWant: false,
  needSelfDescr: true,
  userCard: {
    name: '',
    sex: '',
    birthday: '', // 默认定位在当前年- 24 的1月1日
    email: '',
    dqCode: '',
    dqName: '',
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'userCard':
    {
      const {
        needUserCard,
        needEduExp,
        needWorkExp,
        needJobWant,
        needSelfDescr,
        workId,
        eduId,
        resId,
        ...userCard
      } = payload;
      return {
        ...state,
        resId,
        needUserCard,
        needEduExp,
        needWorkExp,
        needJobWant,
        needSelfDescr,
        userCard,
        workId,
        eduId,
        isLoad: true,
        hasCity: !!userCard.dqCode,
        hasEmail: !!userCard.email,
        workExperience: {
          ...state.workExperience,
          workId,
        },
        eduExperience: {
          ...state.eduExperience,
          eduId,
        },
      };
    }
    case 'editUserCard':
      return {
        ...state,
        userCard: {
          ...state.userCard,
          ...payload,
        },
      };
    case 'nextStep':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const nextUrl = stringUtil.getQuery('backUrl') || domain('m');

const initActions = (dispatch) => ({
  dispatch,
  loadUserCard() {
    Ajax({
      url: `${domain('m-c')}/resume-complete/need-improve-info.json`,
      type: 'jsonp',
    }).then(({ flag, data, msg }) => {
      if (flag === 1) {
        data.sex === undefined && (data.sex = '男');
        dispatch({ type: 'userCard', payload: data });
      } else {
        msg && Message.toast(msg);
      }
    });
  },
  saveUserCard(userCard, hasCity, hasEmail) {
    const formData = validUserCard(userCard, hasCity, hasEmail);
    if (formData) {
      Ajax({
        url: `${domain('m-c')}/resume-complete/save-base-info.json`,
        data: formData,
        type: 'jsonp',
      }).then(({ flag, msg }) => {
        if (flag === 1) {
          window.location.replace(nextUrl);
        } else {
          msg && Message.toast(msg);
        }
      });
    }
  },
});

const useRedux = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const actions = useMemo(() => initActions(dispatch), [dispatch]);
  return {
    state,
    actions,
  };
};

export default useRedux;
