import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';

import { Button, Input, Icon, Message } from '@liepin/react-violet-h5';
import City from '@liepin/react-city-h5';
import Job from '@liepin/react-job-h5';
import Ajax from '../../../../../lib/utils/request';
import './index.less';
import Loading from '../loading/index';
import shareData from '../../modules/shareData';

const { location } = window;

const submitStyle = {
  backgroundColor: '#f50',
  fontSize: '13px',
  fontWeight: 'bold',
  width: '100%',
  border: 'none',
};

const salmonthsStyle = {
  textAlign: 'right',
  width: '3em',
  paddingRight: 0,
  color: 'inherit',
};

const iconStyle = {
  color: '#666',
};

const salaryReg = /^\+?\d+\.?\d*$/;
const nameReg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;

@inject('store')
@observer
class UserForm extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };
  state = {
    loaded: false,
    isVisibleCity: false,
    isVisibleJob: false,
    submitting: false,
    redirecting: false,
    showJob: false,
    form: {
      jobtitleCode: '',
      jobtitleName: '',
      name: '',
      realName: false,
      dpCode: '',
      dpName: '',
      salary: '',
      salmonths: 12,
    },
  }
  componentDidMount() {
    Ajax({
      url: '/seek-worthy/home.json',
    }).then(({ data, flag, msg }) => {
      if (flag === 1) {
        this.setState({
          loaded: true,
          form: data,
          showJob: !data.jobtitleCode,
        });
      } else {
        Message.toast(<p className="text-center">{ msg }</p>);
        if (data.code === '5002') {
          setTimeout(function () {
            location.replace(`/register?return_url=${encodeURIComponent(shareData.url)}`);
          }, 1000);
        }
      }
    });
  }
  handleCloseModal = (type) => {
    switch (type) {
      case 'job':
        this.setState({
          isVisibleJob: false,
        });
        break;
      case 'city':
        this.setState({
          isVisibleCity: false,
        });
        break;
      default:
        break;
    }
  }
  handleOpenModal = (type) => {
    switch (type) {
      case 'job':
        this.setState({
          isVisibleJob: true,
        });
        break;
      case 'city':
        this.setState({
          isVisibleCity: true,
        });
        break;
      default:
        break;
    }
  }
  handleJobChange = (code, selected) => {
    const { form } = this.state;
    form.jobtitleCode = code;
    form.jobtitleName = selected[1];
    this.setState({
      form,
    });
  }
  handleCityChange = (codes = [], selected = []) => {
    const { form } = this.state;
    form.dqCode = codes[0];
    form.dqName = selected[0] && selected[0].name || '';
    this.setState({
      form,
    });
  }
  handleInputChange = (value, key) => {
    const { form } = this.state;
    form[key] = value.trim();
    this.setState({
      form,
    });
  }
  handleSalaryMonthBlur = (e) => {
    let result = e.target.value;
    result = result.replace(/\D/g, '');
    const { form } = this.state;
    result -= 0;
    if (result > 99) {
      result = 99;
    } else if (result < 12) {
      result = 12;
    }
    form.salmonths = result;
    this.setState({
      form,
    });
  }
  handleSubmit = () => {
    const { form, submitting, showJob } = this.state;
    if (submitting) {
      return false;
    }
    // 提交字段校验
    if (!form.realName) {
      const { name } = form;
      if (!name) {
        return Message.toast(<p className="text-center">姓名不能为空</p>);
      }
      if (!name.match(nameReg)) {
        return Message.toast(<p className="text-center">请填写正确格式的姓名</p>);
      }
      const { length } = name.split('·').join('');
      if (length > 15 || length < 2) {
        return Message.toast(<p className="text-center">姓名长度应介于2~15个汉字</p>);
      }
    }
    if (showJob && !form.jobtitleCode) {
      return Message.toast(<p className="text-center">期望职能不能为空</p>);
    }
    if (form.salary) {
      const { salary } = form;
      const sStr = salary.toString();
      const sNum = salary - 0;
      if (!sStr.match(salaryReg) || sNum < 101 || sNum > 9999999) {
        return Message.toast(<p className="text-center">请填写正确的期望月薪</p>);
      }
    }
    if (!form.salmonths) {
      return Message.toast(<p className="text-center">请填写正确的薪资月份</p>);
    }
    if (!form.dqCode) {
      return Message.toast(<p className="text-center">期望地点不能为空</p>);
    }
    this.setState({
      submitting: true,
    });
    Ajax({
      url: '/seek-worthy/save-userInfo.json',
      method: 'POST',
      data: form,
      success: ({ flag, msg }) => {
        if (flag === 1) {
          this.setState({
            submitting: false,
            redirecting: true,
          });
          setTimeout(() => {
            const { changePage, changeUrl } = this.props.store;
            changePage('meetingplace');
            changeUrl(true);
          }, 2000);
        } else {
          Message.toast(<p className="text-center">{ msg }</p>);
          this.setState({
            submitting: false,
          });
        }
      },
      error: () => {
        this.setState({
          submitting: false,
        });
      },
    });
  }
  render() {
    const {
      isVisibleCity,
      isVisibleJob,
      showJob,
      form,
      loaded,
      submitting,
      redirecting,
    } = this.state;
    const jobClassname = classnames({
      'flex-1': true,
      muted: !form.jobtitleCode || form.jobtitleCode === '000',
    });

    const cityClassname = classnames({
      'flex-1': true,
      muted: !form.dqCode || form.dqCode === '000',
    });
    return loaded ? (
      <div className="seeking-userform-wrap header-word">
        <div className="banner-wrap seeking-season-container">
          <i className="banner-bg"/>
          <i className="banner-woman"/>
        </div>
        <div className="form-wrap">
          <h5>填写基本信息后，开始为您定制高薪职位</h5>
          <div className="form-item-wrap">
            <Input
              className={ form.realName ? 'form-item muted' : 'form-item' }
              placeholder="请输入您的姓名"
              size="large"
              readOnly={ form.realName }
              defaultValue={ form.name }
              onChange={ e => this.handleInputChange(e, 'name') }
            />
          </div>
          <div className="form-item-wrap">
            <a
              href="javascript:;"
              className="form-item-fake"
              onClick={ () => this.handleOpenModal('job') }
            >
              <span className={ jobClassname }>{ form.jobtitleName || '期望职能' }</span>
              {
                showJob ? (
                  <Icon type="go-ahead" style={ iconStyle }/>
                ) : null
              }
            </a>
          </div>
          <div className="form-item-wrap">
            <Input
              type="number"
              className="form-item"
              placeholder="期望月薪"
              maxlength="7"
              defaultValue={ form.salary }
              value={ form.salary }
              onChange={ e => this.handleInputChange(e, 'salary') }
              size="large"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label
              className="form-item-salary-month"
            >
              <Input
                style={ salmonthsStyle }
                type="number"
                maxlength="3"
                defaultValue={ form.salmonths }
                value={ form.salmonths }
                onChange={ e => this.handleInputChange(e, 'salmonths') }
                onBlur={ this.handleSalaryMonthBlur }
                size="large"
              />
              <span >个月</span>
            </label>
          </div>
          <div className="form-item-wrap">
            <a
              href="javascript:;"
              className="form-item-fake"
              onClick={ () => this.handleOpenModal('city') }
            >
              <span className={ cityClassname }>{ form.dqName || '期望地点' }</span>
              <Icon type="go-ahead" style={ iconStyle }/>
            </a>
          </div>
          <div className="form-button-wrap">
            <Button
              disabled={ submitting }
              style={ submitStyle }
              content="提交信息"
              size="large"
              onClick={ this.handleSubmit }
              circle="50%"
            />
          </div>
        </div>
        {/* 当前职位 */}
        {
          showJob ? (
            <Job
              defaultValue={ form.jobtitleCode }
              visible={ isVisibleJob }
              onChange={ this.handleJobChange }
              onClose={ () => this.handleCloseModal('job') }
            />
          ) : null
        }
        {/* 所在城市 */}
        <City
          defaultValue={ [form.dqCode] }
          visible={ isVisibleCity }
          onChange={ this.handleCityChange }
          onClose={ () => this.handleCloseModal('city') }
        />
        {
          redirecting ? <Loading/> : null
        }
      </div>
    ) : null;
  }
}

export default UserForm;
