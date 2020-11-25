import React from 'react';
import PropTypes from 'prop-types';
import localCookie from '@liepin/native-sweet-fe';
import { Modal, Message } from '@liepin/react-violet-h5';
import Ajax from '../../../../lib/utils/request';
import cookieUtil from '../../../../lib/utils/cookie';
import { mRoot } from '../lib/utils/domain';
import '../style/salary-edit-mask.less';

let nowSalary;
let salaryMonths = '12';

class SalaryEditMask extends React.Component {
  static propTypes = {
    callback: PropTypes.func,
  }
  static defaultProps = {
    callback: () => {},
  }
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }
  shouldComponentUpdate() {
    return true;
  }
  handleClose = () => {
    this.setState({
      isVisible: false,
    });
  }
  handleSalaryChange = (e) => {
    const { value } = e.target;
    nowSalary = value;
  }
  handleMounthChange = (e) => {
    const { value } = e.target;
    salaryMonths = value;
  }
  // 跳过
  handleSkip = () => {
    const { callback } = this.props;
    this.setState({
      isVisible: false,
    });
    localCookie.set('salary_edit', 1, 3, '/', window.location.hostname);
    callback && callback();
  }
  // 修改并提交
  handleSubmit = () => {
    const that = this;
    const { callback } = this.props;
    cookieUtil.set('salary_edit', 1, 3, '/', window.location.hostname);
    const salaryReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    if (nowSalary === '') {
      Message.toast('请填写月薪');
      return false;
    } else if (Number(nowSalary) < 101 || !salaryReg.test(nowSalary)) {
      Message.toast('请填写正确的薪资');
      return false;
    } else if (salaryMonths === '') {
      Message.toast('请填写月份');
      return false;
    } else if (!/^\d+$/.test(salaryMonths)) {
      Message.toast('月份必须是数字');
      return false;
    } else if (salaryMonths === '0') {
      Message.toast('月份不能小于0');
      return false;
    }
    Ajax({
      data: {
        nowSalary,
        salaryMonths,
      },
      type: 'jsonp',
      url: `${mRoot}/user/savesalary.json`,
    }).then(({ flag, msg }) => {
      if (flag === 1) {
        localCookie.set('salary_edit', 1, 3, '/', window.location.hostname);
        that.setState({
          isVisible: false,
        });
        callback && callback();
      } else {
        Message.toast(msg || '修改薪资失败，请稍后再试');
      }
    }).catch(() => {
      Message.toast('修改薪资失败，请稍后再试');
    });
  }
  render() {
    return (
      <Modal
        visible={ this.state.isVisible }
        onClose={ this.handleClose }
      >
        <div className="salary-edit-mask-container">
          <p className="title">请填写当前薪资</p>
          <form action="" method="POST">
            <input className="salary text" type="text" validate-title="薪资" validate-rules="[['required','请填写$'],['number',{'min':101},'请正确填写薪资，可选择保密对招聘方不可见']]" name="nowSalary" onChange={ this.handleSalaryChange }/><span>元/月</span><i className="text-icon icon-close"/>
            <input className="month text" type="text" validate-title="月" validate-rules="[['required','请填写$']]" name="salaryMonths" defaultValue={ salaryMonths } onChange={ this.handleMounthChange }/><span>月</span>
          </form>
          <div className="btn-box flexbox">
            <button type="button" className="flex-1 btn-secrecy-submit" data-selector="btn-cancel-submit" onClick={ this.handleSkip }>跳过</button>
            <button type="submit" className="flex-1 btn-submit" data-selector="btn-submit" onClick={ this.handleSubmit }>修改并投递</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default SalaryEditMask;
