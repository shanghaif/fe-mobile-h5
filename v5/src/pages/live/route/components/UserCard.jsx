import React, { useState, useContext, useMemo, useCallback } from 'react';
import { Input, Radio, DatePicker, SafeAreaView, Button, Condition } from '@liepin/react-violet-h5';
import City from '@liepin/react-city-h5';
import Email from '../../../../components/ui/email/Email';
import { ResumeCompleteContext } from '../hooks/useRedux';


const defaultBirthday = `${new Date().getFullYear() - 24}0101`;
function UserCard() {
  const [visibleBirthday, setVisibleBirthday] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [visibleCity, setVisibleCity] = useState(false);
  const { state, actions } = useContext(ResumeCompleteContext);
  const { userCard } = state;
  const birthdayShow = useMemo(() => userCard.birthday
    ? userCard.birthday.replace(/^(\d{4})(\d{2})(\d{2})$/, (...arg) => `${arg[1]}年${arg[2]}月${arg[3]}日`)
    : '', [userCard.birthday]);
  const handleNext = useCallback(() => {
    actions.saveUserCard(userCard, state.hasCity, state.hasEmail);
  }, [userCard, actions]);

  const handleChange = useCallback((name, value) => {
    actions.dispatch({ type: 'editUserCard', payload: { [name]: value } });
  }, [actions.dispatch]);

  const handleCityChange = (valCode = [], valArr = []) => {
    const dqCode = valCode[0] || '';
    const dqName = valArr[0] && valArr[0].name || '';
    actions.dispatch({ type: 'editUserCard', payload: { dqCode, dqName } });
    setVisibleCity(false);
  };
  return (
    <div className="resume-complete-container">
      <div className="resume-complete-content">
        <nav className="resume-complete-nav">
          <a className="resume-complete-next" onClick={ handleNext }>完成</a>
        </nav>
        <div className="resume-complete-hgroup">
          <h1>欢迎来到猎聘</h1>
          <p className="resume-complete-subtitle">快速创建个人档案，猎聘帮你升职加薪</p>
        </div>
        <div className="form-item-wrap">
          <Input placeholder="请输入真实姓名" maxLength="15" value={ userCard.name } onChange={ (value) => handleChange('name', value) }/>
        </div>
        <div className="form-item-wrap">
          <div className="resume-complete-sex-wrap">
            <span>性别</span>
            <Radio.Group name="sex" onChange={ v => handleChange('sex', v) } defaultValue={ userCard.sex }>
              <Radio value="男" key="男">男</Radio>
              <Radio value="女" key="女">女</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="form-item-wrap">
          <Input readOnly onClick={ () => setVisibleBirthday(true) } placeholder="出生日期" value={ birthdayShow }/>
          <DatePicker
            title="出生日期"
            format="yyyyMMdd"
            visible={ visibleBirthday }
            defaultValue={ userCard.birthday || defaultBirthday }
            onChange={ v => handleChange('birthday', v) }
            onClose={ () => setVisibleBirthday(false) }
          />
        </div>
        <Condition when={ !state.hasEmail }>
          <div className="form-item-wrap">
            <Input readOnly placeholder="请输入常用邮箱" onClick={ () => setVisibleEmail(true) } value={ userCard.email }/>
            <Email
              input={ userCard.email }
              title="联系邮箱"
              onChange={ m => handleChange('email', m) }
              visible={ visibleEmail }
              onClose={ () => setVisibleEmail(false) }
            />
          </div>
        </Condition>
        <Condition when={ !state.hasCity }>
          <div className="form-item-wrap">
            <Input placeholder="设置当前城市" onClick={ () => setVisibleCity(true) } readOnly value={ userCard.dqName }/>
            <City
              max={ 1 }
              visible={ visibleCity }
              onChange={ handleCityChange }
              showParentsPath
              onClose={ () => setVisibleCity(false) }
              value={ userCard.cityCode ? [userCard.cityCode] : [] }
            />
          </div>
        </Condition>
      </div>
      <SafeAreaView>
        <div className="form-btn-wrap">
          <Button block content="完成" onClick={ handleNext } type="primary" size="xlarge"/>
        </div>
      </SafeAreaView>
    </div>
  );
}

export default UserCard;
