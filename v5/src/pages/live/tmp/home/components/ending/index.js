import React from 'react';
import JobList from '../jobList/';
import './index.less';

export default function Ending() {
  return (
    <div className="ending-home-wrap">
      <div className="ending-banner-wrap">
        <span className="ending-banner-text">直播已结束</span>
      </div>
      <JobList className="ending-job-list-wrap"/>
    </div>
  );
}
