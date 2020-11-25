import React, { useMemo, useCallback, useState } from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import { Input, Message, Button } from '@liepin/react-violet-h5';
import domain from '@liepin/native-domain-fe';
import '@liepin/react-violet-h5/lib/index.css';
import ajaxUtil from '../../../../lib/utils/request';
import CompanySelect from '../../../../components/ui/company/CompanySelect';
import './index.less';

function validMobile(mobile) {
  return /^1[3-9][0-9]{9}$/.test(mobile);
}
function noEmpty(str) {
  return !/^\s*$/.test(str);
}

const dqs = {
  '010': '北京',
  '020': '上海',
  '050020': '广州',
  '280020': '成都', // eslint-disable-line
  '070020': '杭州',
  '000': '其他',
};
const $body = document.querySelector('body');
const fixRoot = () => {
  $body.style = 'overflow: hidden;height: 100%;';
};

const resetRoot = () => {
  $body.style = '';
};
const { dqCode } = window.$CONFIG || {};
const Index = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dq, setDq] = useState(dqCode || '000');
  const [company, setCompany] = useState('');
  const [showDq, setShowDq] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const handleChange = useCallback((key, value) => {
    switch (key) {
      case 'name':
        setName(value);
        break;
      case 'mobile':
        setMobile(value);
        break;
      case 'dq':
        setDq(value);
        break;
      case 'company':
        setCompany(value.compName);
        break;
      default:
        // nothing
    }
  }, []);

  const autoSubmit = useMemo(() => {
    let canSubmit = 1;
    return (userName, dqNo, compName) => {
      if (canSubmit) {
        ajaxUtil({
          url: '/sem-put/leads-sales/collect.json',
          data: { name: userName, mobile, dqCode: dqNo, compName },
        });
        canSubmit = 0;
      }
    };
  }, [mobile]);

  const active = useMemo(
    () => validMobile(mobile)
      && noEmpty(name)
      && noEmpty(dq)
      && noEmpty(company)
      && !submiting,
    [name, mobile, dq, company, submiting]
  );

  const handleSubmit = () => {
    if (active) {
      setSubmiting(true);
      ajaxUtil({
        url: '/sem-put/leads-sales/submit.json',
        data: {
          name,
          mobile,
          dqCode: dq,
          compName: company,
        },
        success({ flag, msg }) {
          if (flag === 1) {
            window.location.href = domain('m');
          } else {
            setSubmiting(false);
            Message.toast(msg);
          }
        },
      });
    }
  };

  const handleMobileBlur = () => {
    if (validMobile(mobile)) {
      autoSubmit(name, dq, company);
    } else {
      Message.toast('请输入11位的手机号');
    }
  };

  const handleNameBlur = () => {
    if (!noEmpty(name)) {
      Message.toast('请输入姓名');
    }
  };

  const handleDq = () => {
    setShowDq(!showDq);
  };

  return (
    <div className="view">
      <header className="banner-wrap"/>
      <div className="form-warpper">
        <div className="form-item">
          <Input size="xxlarge" value={ name } block onBlur={ handleNameBlur } placeholder="姓名" maxlength={ 15 } onChange={ (value) => handleChange('name', value) }/>
        </div>
        <div className="form-item">
          <Input size="xxlarge" value={ mobile } block onBlur={ handleMobileBlur } placeholder="手机号" maxlength={ 11 } onChange={ (e) => handleChange('mobile', e) }/>
        </div>
        <div className="form-item">
          <a className="dq-input" style={ { display: 'block', position: 'relative' } } onClick={ handleDq }>
            { dqs[dq] }
            <i className={ classnames('down-arrow', { active: showDq }) }/>
          </a>
          <ul className="dq-list clearfix" style={ { display: showDq ? 'block' : 'none' } } data-selector="dq-select">
            <li className={ classnames({ active: dq === '010' }) }><a onClick={ () => { setDq('010'); setShowDq(0); } }>北京</a></li>
            <li className={ classnames({ active: dq === '020' }) }><a onClick={ () => { setDq('020'); setShowDq(0); } }>上海</a></li>
            <li className={ classnames({ active: dq === '050020' }) }><a onClick={ () => { setDq('050020'); setShowDq(0); } }>广州</a></li>
            <li className={ classnames({ active: dq === '280020' }) }><a onClick={ () => { setDq('280020'); setShowDq(0); } }>成都</a></li>
            <li className={ classnames({ active: dq === '070020' }) }><a onClick={ () => { setDq('070020'); setShowDq(0); } }>杭州</a></li>
            <li className={ classnames({ active: dq === '000' }) }><a onClick={ () => { setDq('000'); setShowDq(0); } }>其他</a></li>
          </ul>
        </div>
        <div className="form-item">
          <CompanySelect
            block
            size="xxlarge"
            placeholder="公司名称"
            placeholderTips="公司"
            onShow={ fixRoot }
            onCancel={ resetRoot }
            onChange={ (val) => { handleChange('company', val); resetRoot(); } }
          />
        </div>
        <div className="form-item text-center btn-wrap">
          <Button size="large" type="primary" className={ classnames({ 'no-active': !active }) } circle block content="进入猎聘" onClick={ handleSubmit }/>
          <p className="sem-alert">点击进入猎聘，代表您同意猎聘联系您</p>
        </div>
        <div className="form-item text-center hotline-wrap">
          <p className="sem-alert">咨询热线：<a href="tel:4006212266">400-6212-266</a></p>
        </div>
      </div>
    </div>
  );
};
ReactDom.render(
  <Index/>,
  document.getElementById('app')
);
