import React from 'react';
import beforeApply from './before.apply';
import applyFailure from './apply.failure';
import selectResume from './select.resume';
import Ajax from '../../../lib/utils/request';
import userUtil from '../../../lib/utils/user';
import { mcRoot, mRoot } from './lib/utils/domain';
import { renderReactComponentToHtml } from './lib/utils/index';
import ApplySuccessDownloadGuide from './components/ApplySuccessDownloadGuide';

// 函数节流, 一次执行完成之后才能进行下一次执行
export function singleThread(func) {
  let lock = false;
  return function (options) {
    if (lock) {
      return;
    }
    lock = true;
    func(Object.assign(options, {
      unlockSingleThread: () => {
        lock = false;
      },
    }));
  };
}

/**
 * 登录校验 登录后才能应聘
 * 经理人校验 只有经理人能应聘职位
 * 是否猎聘用户 猎聘用户未登录跳转登录页, 非猎聘用户未登录跳转注册页
 * 已登录的经理人 返回 true
 * @returns {boolean}
 */
function checkAuth() {
  // 登录认证
  if (userUtil.isLogin) {
    return true;
  }
  // 直播需要在iframe打开2级页面
  const location = window.locationProxy || window.location;
  if (userUtil.isLPUser) {
    location.href = `${mRoot}/login/?url=${encodeURIComponent(window.location.href)}`;
  } else {
    location.href = `${mRoot}/register/?return_url=${encodeURIComponent(window.location.href)}`;
  }
  return false;
}

// 投递职位Ajax
const applyJobFn = (data, success) => new Promise((resolve, reject) => {
  Ajax({
    data,
    type: 'jsonp',
    url: `${mcRoot}/apply/apply.json`,
  }).then(({ flag, msg }) => {
    flag === 1
      ? resolve()
      : reject({ code: msg }); // eslint-disable-line prefer-promise-reject-errors
  });
}).then(() => {
  success();
  // 应聘成功 引导下载 APP
  renderReactComponentToHtml(<ApplySuccessDownloadGuide/>);
})
  .catch(applyFailure);

// async function applyJob(applyData, onSuccess, callback) {
/**
 * H5投递
 * @param {Object} applyData 投递数据
 * @param {Function} onSuccess 投递成功回调函数
 * @param {Function} unlockSingleThread 接触节流点击限定回调函数, 内部自动添加
 */
async function applyJob({ applyData, onSuccess, unlockSingleThread, ext }) {
  let applyFormData = applyData;
  // 校验是否登录
  if (!checkAuth()) {
    unlockSingleThread();
  }
  try {
    // 应聘前验证
    const data = await beforeApply(applyData);
    // 选择简历弹层, 选择简历的数据并没有用
    await selectResume(data);
    // 应聘数据合并
    applyFormData = { sfrom: 'm-resume-send', ...applyData };
    // 发起应聘职位
    await applyJobFn(applyFormData, onSuccess);
  } catch (e) {
    // 无效的岗位职责, 无效的薪资, 有新的工作经历 这几种情况 可以直接应聘
    e && applyFailure({
      ...e,
      ext,
      directApply: () => {
        applyFormData = { sfrom: 'm-resume-send', ...applyData };
        selectResume(e.data).then(() => applyJobFn(applyFormData, onSuccess));
      },
    });
  }
  unlockSingleThread();
}

export default singleThread(applyJob);
