import React, { useCallback, useContext, useEffect } from 'react';
import { PageMock, Button } from '@liepin/react-violet-h5';
import PropTypes from 'prop-types';
import { FilterContext } from '../hooks/useRedux';
import useHistory from '../hooks/useHistory';
import financingStageDict from '../../../lib/dict/financing-stage';
import scaleDict from '../../../lib/dict/company-scale';
import kindDict from '../../../lib/dict/company-kind';
import Select from './Select';


function toObj(arr) {
  return { name: arr[1], value: arr[0] };
}


const stageData = financingStageDict.map(toObj);
const scaleData = scaleDict.map(toObj);
const kindData = kindDict.map(toObj);
kindData.unshift({ name: '不限', value: '000' });
scaleData.unshift({ name: '不限', value: '000' });

const defaulData = {
  kind: ['000'],
  scale: ['000'],
  stage: [''],
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
function CompCondition({ visible, onCancel, onClose }) {
  const { state, actions } = useContext(FilterContext);
  const { company } = state;

  const handleChange = useCallback((item) => {
    actions.dispatch({ type: 'company', payload: { company: { ...company, ...item } } });
  }, [company]);

  const [cache, change] = useHistory(company);
  const handleCancel = useCallback(() => {
    handleChange({ cache });
    onCancel && onCancel();
    onClose && onClose();
  }, []);

  const handleReset = useCallback(() => {
    handleChange(defaulData);
  }, []);

  const handleConfirm = useCallback(() => {
    actions.search(state, { company });
    change();
  }, [actions.search, company, change]);

  const count = getCount(company);
  const countShow = count > 0 ? <span>·<em>{count}</em></span> : null;

  useEffect(() => {
    const show = count > 0 ? `·<em>${count}</em>` : '';
    $('.so-job-filter-company').html(`公司筛选${show}`);
  }, []);

  return (
    <PageMock
      title={ <span>公司筛选{countShow}</span> }
      className="so-job-filter-container"
      visible={ visible }
      onLeftCallback={ handleCancel }
      contentClass="so-job-filter-content"
    >
      <Select
        data={ scaleData }
        onChange={ (scale) => handleChange({ scale }) }
        title="企业规模"
        unlimited="000"
        value={ company.scale }
      />
      <Select
        data={ stageData }
        onChange={ (stage) => handleChange({ stage }) }
        title="融资阶段"
        value={ company.stage }
      />
      <Select
        data={ kindData }
        onChange={ (kind) => handleChange({ kind }) }
        title="企业性质"
        unlimited="000"
        value={ company.kind }
      />
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

CompCondition.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

CompCondition.defaultProps = {
  visible: false,
  onCancel: null,
};

export default CompCondition;
