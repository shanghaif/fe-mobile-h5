import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyCard from '../../../components/companyCard/';

function Company({ data, listCard, listVisible }) {
  const {
    comp,
    jobs,
  } = data;
  const [
    showJobs,
    setShowJobs,
  ] = useState(listVisible);

  return (
    <Fragment>
      <CompanyCard
        data={ comp }
        active={ showJobs }
        onClick={ (e) => { e.stopPropagation(); setShowJobs(!showJobs); } }
      />
      {
        (jobs && jobs.length) ? listCard({ data: jobs, visible: showJobs }) : null
      }
    </Fragment>
  );
}
Company.propTypes = {
  data: PropTypes.object.isRequired,
  listCard: PropTypes.instanceOf(React).isRequired,
  listVisible: PropTypes.bool,
};
Company.defaultProps = {
  listVisible: false,
};


export default Company;
