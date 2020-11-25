import React from 'react';
import propTypes from 'prop-types';

import goJobDetail from '../modules/goJobDetail';


function JobCard({
  jobId,
  jobKind,
  index,
  url,
  salaryShow,
  requireWorkYearsShow,
  title,
  dqName,
  requireEdulevelName,
  compName,
}) {
  return (
    <li className="job-card-item" data-info={ JSON.stringify({ job_id: jobId, job_kind: jobKind }) }>
      <a
        href="javascript:;"
        className="job-card-link"
        onClick={ () => goJobDetail(jobKind, jobId, index, url) }
      >
        <div className="job-salary-wrap">
          <span className="job-title ellipsis-1">{ title }</span>
          <span className="job-salary">{ salaryShow }</span>
        </div>
        <p className="company-name ellipsis-1">{ compName }</p>
        <div className="requirement">
          <span className="requirement-item">{ dqName }</span>
          <span className="requirement-item">{ requireWorkYearsShow }</span>
          <span className="requirement-item">{ requireEdulevelName }</span>
        </div>
      </a>
    </li>
  );
}

JobCard.propTypes = {
  jobId: propTypes.string.isRequired,
  jobKind: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  url: propTypes.string.isRequired,
  salaryShow: propTypes.string.isRequired,
  requireWorkYearsShow: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  dqName: propTypes.string.isRequired,
  requireEdulevelName: propTypes.string.isRequired,
  compName: propTypes.string.isRequired,
};

export default JobCard;
