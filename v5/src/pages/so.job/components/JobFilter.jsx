import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Industry from '@liepin/react-industry-h5/src/components/industry-item';
import Header from '../../../components/business/header/HeaderHasCity';
import useRedux, { FilterContext } from '../hooks/useRedux';
import JobCondition from './JobCondition';
import CompCondition from './CompCondition';
import Order from './Order';
import '../style/job-filter.less';


function JobFilter({ controller }) {
  const [visibleJobFilter, setVisibleJobFilter] = useState(false);
  const [visibleIndustry, setVisibleIndustry] = useState(false);
  const [visibleCompFilter, setVisibleCompFilter] = useState(false);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const { state, actions } = useRedux();

  const handleSearch = useCallback((condition) => {
    actions.search(state, condition);
  }, [state, actions.search]);

  const handleOrderChange = useCallback((order) => {
    handleSearch({ order });
  }, [handleSearch]);

  const handleIndustryChange = useCallback((items = []) => {
    handleSearch({ industryCode: items.map(({ code }) => code) });
  }, [handleSearch]);

  controller.showJob = useCallback(() => setVisibleJobFilter(true), []);
  controller.showOrder = useCallback(() => setVisibleOrder(true), []);
  controller.showCompany = useCallback(() => setVisibleCompFilter(true), []);
  controller.showIndustry = useCallback(() => setVisibleIndustry(true), []);
  useEffect(() => {
    const len = state.industryCode.length;
    const countShow = len > 0 ? `·<em>${len}</em>` : '';
    $('.so-job-filter-industry').html(`行业筛选${countShow}`);
  }, []);

  return (
    <FilterContext.Provider value={ { state, actions } }>
      <Header
        cityName={ state.cityName }
        cityCode={ state.cityCode }
        onSearch={ handleSearch }
        keyword={ state.keyword }
        placeholder={ state.lastSearch }
      />
      <JobCondition
        defaultValue={ state.job }
        visible={ visibleJobFilter }
        onClose={ () => setVisibleJobFilter(false) }
      />
      <CompCondition
        defaultValue={ state.company }
        visible={ visibleCompFilter }
        onClose={ () => setVisibleCompFilter(false) }
      />
      <div style={ { display: 'none' } }>
        <Industry
          all
          onChange={ handleIndustryChange }
          defaultValue={ state.industryCode || [] }
          max={ 3 }
          deep={ 1 }
          onShow={ () => setVisibleIndustry(true) }
          onClose={ () => setVisibleIndustry(false) }
          visible={ visibleIndustry }
        />
      </div>
      <Order
        onChange={ handleOrderChange }
        defaultValue={ state.order }
        visible={ visibleOrder }
        onClose={ () => setVisibleOrder(false) }
      />
    </FilterContext.Provider>
  );
}


JobFilter.propTypes = {
  controller: PropTypes.any.isRequired,
};

export default JobFilter;
