import React from 'react';
import propTypes from 'prop-types';
import { Button } from '@liepin/react-violet-h5';

import goJobDetail from '../modules/goJobDetail';
import goChat from '../modules/goChat';

import './index.less';

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
  recruiterName,
  recruiterTitle,
  recruiterPhoto,
  compName,
  userId,
  applied,
  recruiterImUserType,
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
        <dl className="job-info-wrap">
          <dt>
            <img src={ recruiterPhoto } alt=""/>
          </dt>
          <dd className="flex-1 ellipsis-1">{recruiterName}{ recruiterTitle ? '·' : null }{recruiterTitle}</dd>
        </dl>
      </a>
      <Button
        type="primary"
        size="small"
        content="立即沟通"
        className={ Apps.isTd && Apps.appVc < 610 ? 'hide' : '' }
        onClick={ () => goChat({
            oppositeUserId: userId,
            jobKind,
            jobId,
            isApplied: applied,
            imUserType: recruiterImUserType,
          }) }
      />
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
  recruiterName: propTypes.string.isRequired,
  recruiterTitle: propTypes.string.isRequired,
  recruiterPhoto: propTypes.string.isRequired,
  compName: propTypes.string.isRequired,
  userId: propTypes.string.isRequired,
  applied: propTypes.bool.isRequired,
  recruiterImUserType: propTypes.string.isRequired,
};

export default JobCard;
