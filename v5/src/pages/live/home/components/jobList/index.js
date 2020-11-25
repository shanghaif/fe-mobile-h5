import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import JobCard from '../jobCard/';
import './index.less';


@inject('liveStore')
@inject('jobStore')
@observer
class JobList extends Component {
  static propTypes = {
    jobStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
  };
  render() {
    const {
      jobStore: {
        jobList,
        handleApply,
      },
      liveStore: {
        liveSize,
      },
    } = this.props;
    const jobCount = jobList.length;
    const { height } = document.documentElement.getBoundingClientRect();
    const popupHeight = height - liveSize.videoHeight - (Apps.isBaidu ? 80 : 0);
    return jobCount ? (
      <div
        className="living-job-list"
        style={ { height: `${popupHeight}px` } }
      >
        <h2>{`全部${jobCount}个职位`}</h2>
        <div className="living-scroll-wrap">
          <div className="living-scroller">
            <div>
              {
                jobList.map((item) => (
                  <JobCard
                    data={ item }
                    key={ `${item.jobId}_${item.jobKind}` }
                    onApply={ () => { handleApply(item.jobId, item.jobKind); } }
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default JobList;
