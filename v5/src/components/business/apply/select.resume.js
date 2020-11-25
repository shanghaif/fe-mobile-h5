import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from '@liepin/react-violet-h5';
import ResumeSelect from './components/ResumeSelect';
import completeResume from './components/CompleteResume';

const resumePerfectionRate = 65;

const div = document.createElement('div');
document.body.appendChild(div);

function toggleSelect(props, show) {
  ReactDOM.render(
    <ResumeSelect { ...props } show={ show }/>,
    div,
  );
}


/**
 * code: "0"
 * doubleSecret: false
 * integrity_flag: true
 * res_list: [{
 */
export default function selectResume({ integrity_flag: integrityFlag, res_list: resList }) {
  const resumes = resList.map(item => ({
    isDefaultRes: item.isDefaultRes,
    isCnRes: item.isCnRes,
    caption: item.res_caption,
    completeDegree: item.completeDegree,
    resId: item.res_id_encode,
  }));
  return new Promise((resolve, reject) => {
    if (resumes.length < 1) {
      // 如果没有简历
      Message.toast('请先创建一份简历！');
      reject();
      return;
    } else if (resumes.length === 1 && resumes[0].completeDegree < resumePerfectionRate) {
      // 如果只有一份简历且不完善，直接弹完善引导
      completeResume(resumes[0], true);
      reject();
      return;
    }
    const props = {
      resumes,
      integrityFlag,
      onClose() {
        toggleSelect(props, false);
        reject();
      },
      onSelectResume(res) {
        // 隐藏简历选择
        toggleSelect(props, false);
        if (res.completeDegree < resumePerfectionRate) {
          // 弹出简历完善
          completeResume(res, true);
          reject();
        } else {
          resolve();
        }
      },
    };
    toggleSelect(props, true);
  });
}


