/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import domain from '@liepin/native-domain-fe';
import { share4App } from '@liepin/share';
import appsUtil from '../../../../../lib/utils/apps';

import getJobH5Link from '../../../modules/getJobH5Link';
import './index.less';

@inject('jobStore')
@inject('liveStore')
@observer
class ActiveJob extends Component {
  static propTypes = {
    jobStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
  }
  handleJobClick = ({ jobId, jobKind }) => {
    const url = getJobH5Link({ jobId, jobKind });
    if (url) {
      this.props.liveStore.setIframeSrc(url);
    }
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
    const job = jobList.find(({ jobId, jobKind }) => (jobId === numId && jobKind === kind));
    return job ? (
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
              src={ `//image0.lietou-static.com/img/${job.compFxLogo}` }
              alt=""
            />
          </dt>
          <dd className="flex-1">
            <div className="flexbox">
              <h3 className="flex-1 ellipsis-1">{ job.jobTitle }</h3>
              <span className="salary-show">{ job.salaryShow }</span>
            </div>
            <p className="comp-name ellipsis-1">{ job.compName }</p>
          </dd>
        </dl>
        <i className="bot-trangle-icon"/>
      </div>
    ) : null;
  }
}

export default ActiveJob;
