import React from 'react';
import propTypes from 'prop-types';

import goJobDetail from '../../modules/goJobDetail';
import './index.less';

function MainJobCard({
  jobId,
  jobKind,
  index,
  url,
  salaryShow,
  requireWorkYearsShow,
  title,
  dqName,
  requireEdulevelName,
  recruiterName,
  recruiterTitle,
  recruiterPhoto,
  compName,
}) {
  return (
    <li className="main-job-card">
      <a
        href="javascript:;"
        className="main-job-card-link"
        onClick={ () => goJobDetail(jobKind, jobId, index, url) }
      >
        <div className="job-salary-wrap">
          <span className="job-title ellipsis-1">{ title }</span>
          <span className="job-salary">{ salaryShow }</span>
        </div>
        <p className="company-name ellipsis-1">{ compName }</p>
        <div>
          <span className="requirement-item">{ dqName }</span>
          <span className="requirement-item">{ requireWorkYearsShow }</span>
          <span className="requirement-item">{ requireEdulevelName }</span>
        </div>
        <div className="job-info-wrap">
          <img src={ recruiterPhoto } alt=""/>
          <span className="flex-1 ellipsis-1">{recruiterName}{ recruiterTitle ? '·' : null }{recruiterTitle}</span>
        </div>
      </a>
    </li>
  );
}

MainJobCard.propTypes = {
  jobId: propTypes.string.isRequired,
  jobKind: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  url: propTypes.string.isRequired,
  salaryShow: propTypes.string.isRequired,
  requireWorkYearsShow: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  dqName: propTypes.string.isRequired,
  requireEdulevelName: propTypes.string.isRequired,
  recruiterName: propTypes.string.isRequired,
  recruiterTitle: propTypes.string.isRequired,
  recruiterPhoto: propTypes.string.isRequired,
  compName: propTypes.string.isRequired,
};

export default MainJobCard;
