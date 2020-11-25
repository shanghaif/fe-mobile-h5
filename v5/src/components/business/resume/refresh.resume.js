/**
 * 刷新简历
 * 点击刷新按钮, 向后端发送刷新简历请求
 * 根据后端返回code判断刷新状态
 * flag: 0
 *    code: 5067 用户无简历, 引导用户创建简历
 *    code: 5183 用户简历不完善, 引导用户完善简历
 * flag: 非0
 *    data.bool: true 刷新成功
 *    data.bool: false 刷新失败
 */
import { compose } from '../../../lib/lambda/lambda';
import noResume from './no.resume';
import incompleteResume from './incomplete.resume';
// 刷新简历按钮处理事件

function incomplete(degree, resId) {
  return {
    5067: noResume, // 无简历
    5183: () => incompleteResume(degree, resId), // 完善简历
  };
}
const resumeStatus = statusObj => code => statusObj[code] && statusObj[code]();
const complete = compose(resumeStatus, incomplete);
const refreshResult = status => {
  $.dialog.message(status ? '刷新成功' : '刷新失败', 2, true, {
    width: 'auto',
    top: '75%',
    contentPadding: '10px 20px',
  });
};

const refreshJson = (refreshFail, refreshSuccess) => () => {
  $.ajax({
    url: `${LT.Env.mRoot}resume/refresh.json`,
    type: 'POST',
    dataType: 'json',
    cache: false,
    success({ flag, code, data }) {
      flag === 0 ? refreshFail(code) : refreshSuccess(data.bool);
    },
  });
};


export default ($ele, degree, resId) => {
  $ele.on('tap', () => setTimeout(refreshJson(complete(degree, resId), refreshResult), 320));
};
