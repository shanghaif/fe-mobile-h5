/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import link2Job from '../../../modules/link2Job';

import './index.less';


@inject('liveStore')
@inject('jobStore')
@observer
class ActiveJob extends Component {
  propTypes = {
    jobStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
  }
  handleJobClick = ({ jobId, jobKind }) => {
    link2Job({ jobId, jobKind, pullUrl: this.props.liveStore.info.pullUrl });
  }
  render() {
    const {
      jobList,
      active,
      showActiiveJob,
      closeActiveJob,
    } = this.props.jobStore;
    if (!active || !showActiiveJob) {
      return null;
    }
    const [id, kind] = active.split('_');
    const numId = id | 0;
    // eslint-disable-next-line max-len
    const item = jobList.find(({ jobs }) => (jobs.find(({ jobId, jobKind }) => (jobId === numId && jobKind === kind))));
    if (!item) {
      return null;
    }
    const job = item.jobs.find(({ jobId, jobKind }) => (jobId === numId && jobKind === kind));
    return (
      <div
        className="living-active-job-wrap"
        data-selector="living-active-job-wrap"
      >
        <div className="flexbox live-tip-wrap">
          <span className="living-symbol"><i/><i/><i/></span>
          <span>主讲人正在讲解</span>
          <a
            href="javascript:;"
            onClick={ (e) => { e.stopPropagation(); closeActiveJob(); } }
            className="text-icon icon-close"
          />
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <dl
          onClick={ () => this.handleJobClick({ jobId: job.jobId, jobKind: job.jobKind }) }
        >
          <dt>
            <span className="index-icon">{ job.label }</span>
            <img
              src={ `//image0.lietou-static.com/img/${item.comp.compFxLogo}` }
              alt=""
            />
          </dt>
          <dd className="flex-1">
            <div className="flexbox">
              <h3 className="flex-1 ellipsis-1">{ job.jobTitle }</h3>
              <span className="salary-show">{ job.salaryShow }</span>
            </div>
            <p className="comp-name ellipsis-1">{ item.comp.compNameShow }</p>
          </dd>
        </dl>
        <i className="bot-trangle-icon"/>
      </div>
    );
  }
}

export default ActiveJob;
