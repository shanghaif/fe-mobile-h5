import React from 'react';
// import ReactDOM from 'react-dom';
import { initUserInfo } from '@liepin/zepto-user-h5';
import localCookie from '@liepin/native-sweet-fe';
import { Message } from '@liepin/react-violet-h5';
import completeResume from './components/CompleteResume';
import { mcRoot } from './lib/utils/domain';
import { renderReactComponentToHtml } from './lib/utils/index';
import cookieUtil from '../../../lib/utils/cookie';
import SalaryEditMask from './components/SalaryEditMask';

function toSearch(obj) {
  return obj && Object.keys(obj).map((k) => `${k}=${obj[k]}`).join('&') || '';
}

function toUrl(url) {
  const location = window.locationProxy || window.location;
  location.href = url;
}

function fixUrl(url, ext) {
  if (!ext) {
    return url;
  }
  const search = toSearch(ext);
  if (!search) {
    return url;
  }
  if (~url.indexOf('?')) {
    return `${url}&${toSearch(ext)}`;
  }
  return `${url}?${toSearch(ext)}`;
}

function isShow() {
  return !(localCookie.get('fe_m_salary_dialog')
    || localCookie.get('fe_m_duty_dialog')
    || localCookie.get('fe_m_resume_dialog'));
}
/**
 * 没有可用简历的用户
 * 引导其创建简历
 */
function noResume(ext) {
  Message.confirm({
    content: <div className="text-center">您还没有可以用于投递的简历<br/>请先创建简历后再继续应聘</div>,
    okText: '立即创建',
    cancelText: '暂不',
    onOk: () => {
      toUrl(fixUrl(`${mcRoot}/resume-guidance/?url=${encodeURIComponent(window.location.href)}`, ext));
    },
  });
}

/**
 * 简历完整度不够
 * 引导用不完善简历
 */
function incompleteResume(data) {
  const { complete_degree: degree } = data;
  return function (ext) {
    localCookie.set('fe_m_resume_dialog', 1);
    completeResume({ completeDegree: degree }, true, ext);
  };
}

/**
 * 老简历用户
 * 引导升级简历
 */
function expireResume() {
  Message.alert({
    okText: '我知道了',
    content: <div className="text-center">欢迎回来，老朋友<br/>我们的简历已进行全新升级<br/>快拨打客服电话升级简历吧！<br/>客服电话：400-6838-789<br/><em className="muted">工作日 9:00-19:00</em></div>,
  });
}

// 应聘次数已用尽
function applyCountSpend(count) {
  return function () {
    Message.alert({
      okText: '我知道了',
      content: <div className="text-center">您今天的投递次数已用完<em className="text-warning">({count}次)</em><br/>若需投递更多职位，明天再继续吧</div>,
    });
  };
}

// 重复投递
function duplicateApply() {
  Message.alert({
    okText: '我知道了',
    content: <div className="text-center">您已成功应聘过该职位<br/>无需重复应聘</div>,
  });
}

// 无效的薪资
function invalidSalary(directApply) {
  if (isShow()) {
    return function () {
      localCookie.set('fe_m_salary_dialog', 1);
      Message.confirm({
        contentIsHtmlStr: true,
        content: '<div style="font-size:14px;color:#666;"><p class="text-center" style="font-size:16px;color:#333">温馨提示</p><div>正确填写薪资，更容易获得HR/猎头的青睐，增加面试机会。赶快填写吧！<p><span style="color:#ff7101;">可自由选择薪资是否保密，</span>请您放心填写</p></div></div>',
        okText: '修改并投递',
        onClose: () => {
          cookieUtil.set('salary_edit', 1, 3, '/', window.location.hostname);
        },
        onOk: () => {
          // eslint-disable-next-line max-len
          renderReactComponentToHtml(<SalaryEditMask callback={ () => { directApply && directApply(); } }/>);
        },
        cancelText: '直接投递',
        onCancel: () => {
          directApply && directApply();
        },
      });
    };
  }
  return directApply;
}

// 无效的职责业绩, 职责业绩过于简单
function invalidDuty({ url }, directApply) {
  if (isShow()) {
    return function (ext) {
      initUserInfo()
        .then(({ userName }) => {
          // 职责业绩过于简单--PM姜单
          localCookie.set('fe_m_duty_dialog', 1);
          const content = `
            <p>Hi，${userName}</p>
            <p>职责业绩填写的太过简单，继续完善可提升简历曝光量</p>
          `;
          Message.confirm({
            contentIsHtmlStr: true,
            content,
            okText: '完善职责业绩',
            onClose: () => {
              cookieUtil.set('complete_dialog', 1, 3, '/', window.location.hostname);
            },
            onOk: () => {
              toUrl(fixUrl(url, ext));
            },
            cancelText: '直接投递',
            onCancel: () => {
              directApply && directApply();
            },
          });
        });
    };
  }
  return directApply;
}

// 有新的工作经历
function hasNewWorkExp({ data, url }, directApply) {
  if (isShow()) {
    return function (ext) {
      initUserInfo()
        .then(({ userName }) => {
          localCookie.set('work_dialog', 1);
          const { companyName, workYears, workMonths } = data;
          const workcontent = `
            <p>Hi，${userName}</p>
            <p>您已经在${companyName}工作<span style="color:#ff5600;">${workYears}年${(workMonths === 0 || workMonths === '0') ? '' : `${+workMonths}个月`}</span>了</p>
            <p>是否已经换了新的工作？</p>
          `;
          Message.confirm({
            contentIsHtmlStr: true,
            content: workcontent,
            okText: '添加工作经历',
            onClose: () => {
              cookieUtil.set('work_add', 1, 180, '/', window.location.hostname);
            },
            onOk: () => {
              toUrl(fixUrl(url, ext));
            },
            cancelText: '直接投递',
            onCancel: () => {
              cookieUtil.set('work_add', 1, 180, '/', window.location.hostname);
              directApply && directApply();
            },
          });
        });
    };
  }
  return directApply;
}

/**
 * 该猎头顾问已被您移入黑名单
 */
function hasShieldThisHunter() {
  Message.alert({
    okText: '我知道了',
    content: <p className="text-center">该猎头顾问已被您移入黑名单，<br/>操作已被限制</p>,
  });
}

export default function ({ code, data = {}, directApply, ext }) {
  const showFailMsg = () => {
    Message.toast(code);
  };
  const applyStatusMapping = {
    5067: noResume, // 无可用简历
    5183: incompleteResume(data), // 简历不完善
    5190: expireResume, // 老简历
    5191: applyCountSpend(data.apply_count), // 应聘次数已用完
    5077: duplicateApply, // 重复应聘
    5068: invalidSalary(directApply), // 无效的薪资
    5069: invalidDuty(data, directApply), // 无效的岗位职责
    5070: hasNewWorkExp(data, directApply), // 有新的工作经历变更未同步
    5194: hasShieldThisHunter, // 这个猎头已经被你屏蔽了，无法应聘
  };
  (applyStatusMapping[code] || showFailMsg)(ext);
}
