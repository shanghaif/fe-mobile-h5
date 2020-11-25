import React, { useCallback, useContext, useEffect } from 'react';
import { PageMock, Button, Switch } from '@liepin/react-violet-h5';
import PropTypes from 'prop-types';
import { FilterContext } from '../hooks/useRedux';
import useHistory from '../hooks/useHistory';
import salaryScale from '../../../lib/dict/salary-scale';
import degreeDict from '../../../lib/dict/degree';
import expDict from '../../../lib/dict/work-exp';
import pubtimeDict from '../../../lib/dict/pubtime';
import jobKindDict from '../../../lib/dict/job-kind';
import Select from './Select';


function toObj(arr) {
  return { name: arr[1], value: arr[0] };
}

const wantSalaryData = salaryScale.map(toObj);
const degreeData = degreeDict.map(toObj);
degreeData.unshift({ name: '不限', value: '' });
const expData = expDict.map(toObj);
const pubtimeData = pubtimeDict.map(toObj);
const jobKindData = jobKindDict.map(toObj);

const defaulData = {
  salary: '0-999',
  degreeCode: [''],
  workExp: ['0'],
  pubtime: '000',
  kind: '',
};

function getCount(obj) {
  let count = 0;
  Object.keys(defaulData).forEach(k => {
    const val = obj[k];
    const len = val.length;
    if (Array.isArray(val)) {
      if (len > 1 || (len === 1 && val[0] !== defaulData[k][0])) {
        count += len;
      }
    } else if (val !== defaulData[k]) {
      count += 1;
    }
  });
  return count;
}
function JobCondition({ visible, onCancel, onClose }) {
  const { state, actions } = useContext(FilterContext);
  const { job } = state;
  const handleChange = useCallback((item) => {
    actions.dispatch({ type: 'job', payload: { job: { ...job, ...item } } });
  }, [job]);

  const [cache, change] = useHistory(job);
  const handleCancel = useCallback(() => {
    handleChange({ cache });
    onCancel && onCancel();
    onClose && onClose();
  }, []);

  const handleReset = useCallback(() => {
    handleChange({ ...defaulData, openShieldComp: true });
  }, []);

  const handleConfirm = useCallback(() => {
    actions.search(state, { job });
    change();
  }, [job, change, actions.search]);

  const count = getCount(job);
  const countShow = count > 0 ? <span>·<em>{count}</em></span> : null;
  useEffect(() => {
    const show = count > 0 ? `·<em>${count}</em>` : '';
    $('.so-job-filter-job').html(`职位筛选${show}`);
  }, []);
  return (
    <PageMock
      title={ <span>职位筛选{countShow}</span> }
      className="so-job-filter-container"
      visible={ visible }
      onLeftCallback={ handleCancel }
      contentClass="so-job-filter-content"
    >
      <Select
        data={ wantSalaryData }
        onChange={ ([val]) => handleChange({ salary: val }) }
        title="期望年薪"
        unlimited="0-999"
        multi={ false }
        value={ [job.salary] }
      />
      <Select
        data={ degreeData }
        onChange={ (degreeCode) => handleChange({ degreeCode }) }
        title="学历要求"
        value={ job.degreeCode }
      />
      <Select
        data={ expData }
        onChange={ (workExp) => handleChange({ workExp }) }
        title="经验要求"
        unlimited="0"
        value={ job.workExp }
      />
      <Select
        data={ pubtimeData }
        onChange={ ([pubtime]) => handleChange({ pubtime }) }
        title={ <span>职位刷新时间<small>（单选）</small></span> }
        unlimited="000"
        multi={ false }
        value={ [job.pubtime] }
      />
      <Select
        data={ jobKindData }
        onChange={ ([kind]) => handleChange({ kind }) }
        title={ <span>职位类型<small>（单选）</small></span> }
        multi={ false }
        value={ [job.kind] }
      />
      <dl className="so-job-select">
        <dt>其他设置</dt>
        <dd>
          <div style={ { padding: '0 6px', fontSize: '15px' } }>隐藏已屏蔽公司职位 <Switch className="float-right" checked={ job.openShieldComp } onChange={ openShieldComp => handleChange({ openShieldComp }) }/></div>
        </dd>
      </dl>
      <div className="button-group">
        <div className="button-group-2">
          <Button block onClick={ handleReset } size="xlarge" content="重置"/>
        </div>
        <div className="button-group-3">
          <Button block onClick={ handleConfirm } type="primary" size="xlarge" content="确定"/>
        </div>
      </div>
    </PageMock>
  );
}

JobCondition.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

JobCondition.defaultProps = {
  visible: false,
  onCancel: null,
};

export default JobCondition;
