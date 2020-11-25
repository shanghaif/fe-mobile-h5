import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Button, Popup } from '@liepin/react-violet-h5';
import Resume from './Resume';
import '../style/resume-select.less';

const RadioGroup = Radio.Group;

class ResumeSelect extends Component {
  static propTypes = {
    show: PropTypes.bool,
    integrityFlag: PropTypes.bool,
    resumes: PropTypes.oneOfType([PropTypes.array]).isRequired,
    onSelectResume: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    show: false,
    integrityFlag: true,
  }

  constructor(props) {
    super(props);
    const { resumes } = props;
    let defaultResId; // 默认简历id
    let firstResId; // 列表第一个建立id，兜底
    resumes.forEach((res, index) => {
      if (index === 0) {
        firstResId = res.resId;
      }
      if (res.isDefaultRes) {
        defaultResId = res.resId;
      }
    });
    this.state = {
      defaultResList: resumes,
      activeValue: defaultResId || firstResId, // 记录当前选中的简历id
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { resumes } = props;
    const { defaultResList } = state;
    if (defaultResList && (JSON.stringify(defaultResList) !== JSON.stringify(resumes))) {
      let defaultResId;
      let firstResId;
      resumes.forEach((res, index) => {
        if (index === 0) {
          firstResId = res.resId;
        }
        if (res.isDefaultRes) {
          defaultResId = res.resId;
        }
      });
      return { activeValue: defaultResId || firstResId, defaultResList: resumes };
    }
    return null;
  }
  handleApply = () => {
    const { resumes, onSelectResume } = this.props;
    const { activeValue } = this.state;
    resumes.forEach(res => {
      if (activeValue === res.resId) {
        onSelectResume(res);
      }
    });
  };

  handleSelectResume = (val) => {
    this.setState({ activeValue: val });
  };

  render() {
    const { resumes, integrityFlag, show, onClose } = this.props;
    const { activeValue } = this.state;
    return (
      <Popup title="选择简历" visible={ show } onClose={ onClose }>
        <div className="resume-select">
          <RadioGroup name="applyType" onChange={ this.handleSelectResume } value={ activeValue }>
            {
              resumes.map(item => <Resume onClose={ onClose } key={ item.resId } { ...item }/>)
            }
          </RadioGroup>
          { integrityFlag ? null : <p className="integrity-warning"><i className="text-icon icon-warning-down"/><span>此职位发布者未加入《猎头诚信联盟》，猎聘提醒您慎重投递简历！</span></p>}
          <div className="btn-wrap">
            <Button type="primary" size="xlarge" block onClick={ this.handleApply } content="确认投递"/>
          </div>
        </div>
      </Popup>
    );
  }
}

export default ResumeSelect;
