import { Message } from '@liepin/react-violet-h5';
import { CHINESE_CHAR } from '../../../common/js/reg-exp';

const len90Reg = /^[\S\s]{1,90}$/;

const formatDate = (year, month) => `${year}.${month}`;

export const validUserCard = (userCard, hasCity = false, hasEmail = false) => {
  if (!CHINESE_CHAR.test(userCard.name)) {
    Message.toast('姓名应为2-15个汉字');
    return false;
  } else if (!userCard.sex) {
    Message.toast('请填写性别');
    return false;
  } else if (!userCard.birthday) {
    Message.toast('请填写出生日期');
    return false;
  } else if (!/^[A-Za-z0-9]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/.test(userCard.email) && !hasEmail) {
    Message.toast('请填写正确的邮箱');
    return false;
  } else if (!userCard.dqCode && !hasCity) {
    Message.toast('请填写当前城市');
    return false;
  }
  const { name, sex, birthday, email, dqCode } = userCard;
  const formData = { name, sexCode: sex, birthday };
  if (!hasCity) {
    formData.dqCode = dqCode;
  }
  if (!hasEmail) {
    formData.email = email;
  }
  return formData;
};

export const validEduExp = (eduExp) => {
  if (!len90Reg.test(eduExp.school)) {
    Message.toast('学校名称应为1-90个字');
    return false;
  } else if (!(eduExp.degree && eduExp.tz)) {
    Message.toast('请设置学历');
    return false;
  } else if (!len90Reg.test(eduExp.special)) {
    Message.toast('专业名称应为1-90个字');
    return false;
  } else if (!(eduExp.startYear && eduExp.startMonth && eduExp.endYear && eduExp.endMonth)) {
    Message.toast('请填写就读时间');
    return false;
  } else if (
    eduExp.endYear < eduExp.startYear
    || (eduExp.endYear === eduExp.startYear && eduExp.endMonth < eduExp.startMonth)
  ) {
    Message.toast('入学时间不能晚于毕业时间');
    return false;
  }
  const { resId, id, school, special, degree, tz } = eduExp;
  return {
    resId,
    id,
    school,
    special,
    start: formatDate(eduExp.startYear, eduExp.startMonth),
    end: formatDate(eduExp.endYear, eduExp.endMonth),
    degree,
    tz,
  };
};
export const validWorkExp = (workExp) => {
  if (!/^[\S\s]{1,128}$/.test(workExp.compName)) {
    Message.toast('公司名称为1-128个字');
    return false;
  } else if (!workExp.industryCode) {
    Message.toast('请填写行业');
    return false;
  } else if (!(workExp.startYear && workExp.startMonth && workExp.endYear && workExp.endMonth)) {
    Message.toast('请填写在职时间');
    return false;
  } else if (
    workExp.endYear < workExp.startYear
    || (workExp.endYear === workExp.startYear && workExp.endMonth < workExp.startMonth)
  ) {
    Message.toast('入职时间不能晚于离职时间');
    return false;
  } else if (!workExp.jobTitleCode) {
    Message.toast('请填写职位类别');
    return false;
  } else if (!len90Reg.test(workExp.title)) {
    Message.toast('职位名称应为1-90个字');
    return false;
  } else if (!workExp.salary) {
    Message.toast('请填写月薪');
    return false;
  }
  const { industryCode, jobTitleCode, compName, start, end, salary, id, resId, title } = workExp;
  return {
    resId,
    id,
    title,
    salary,
    industryCode,
    workStart: start,
    workEnd: end,
    jobtitle: jobTitleCode,
    company: compName,
  };
};
export const validJobWant = (jobWant) => {
  if (!jobWant.workStatusCode) {
    Message.toast('请设置求职状态');
    return false;
  } else if (!jobWant.industryCodes || jobWant.industryCodes.length === 0) {
    Message.toast('请填写期望行业');
    return false;
  } else if (!jobWant.jobTitleCodes || jobWant.jobTitleCodes.length === 0) {
    Message.toast('请填写期望职位');
    return false;
  } else if (!jobWant.dqCodes || jobWant.dqCodes.length === 0) {
    Message.toast('请填写期望地点');
    return false;
  } else if (!(jobWant.wantSalaryLow && jobWant.wantSalaryHigh && jobWant.months)) {
    Message.toast('请选择薪资区间');
    return false;
  }
  const {
    resId,
    industryCodes,
    jobTitleCodes,
    dqCodes,
    wantSalaryLow,
    wantSalaryHigh,
    months,
    workStatusCode,
  } = jobWant;
  return {
    resId,
    industryCodes: industryCodes.join('|'),
    jobTitleCodes: jobTitleCodes.join('|'),
    dqCodes: dqCodes.join('|'),
    wantSalaryLow,
    wantSalaryHigh,
    months,
    workStatusCode,
  };
};
export const validSelfassess = ({ resId, selfassess }) => {
  if (!/^[\S\s]{10,1000}$/.test(selfassess)) {
    Message.toast('自我评价应为10-1000个字');
    return false;
  }
  return { resId, content: selfassess };
};
