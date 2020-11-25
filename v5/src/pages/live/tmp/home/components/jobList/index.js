import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CompanyCard from '../../../components/companyCard';
import JobCard from '../jobCard/';
import './index.less';

const { height } = document.documentElement.getBoundingClientRect();

@inject('liveStore')
@inject('jobStore')
@observer
class JobList extends Component {
  propTypes = {
    jobStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
  }
  componentDidMount() {
    if (this.$list.current) {
      this.$list.current.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      this.$list.current.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    }
  }
  $scroller = React.createRef()
  $list = React.createRef()
  startY = 0;
  handleTouchStart = (e) => {
    this.listHeigt = this.$list.clientHeight;
    this.scrollerHeigt = this.$scroller.clientHeight;
    this.startY = e.touches[0].pageY;
  }
  handleTouchMove = (e) => {
    if (!Apps.isIos && this.props.liveStore.info.ended) {
      return;
    }
    const {
      scrollerHeigt,
      listHeigt,
    } = this;
    if (scrollerHeigt >= listHeigt) {
      return;
    }
    const { startY } = this;
    const { scrollTop } = this.$scroller.current;
    const { pageY } = e.touches[0];
    if (
      (!scrollTop && (pageY - startY) > 0) ||
      ((scrollTop + scrollerHeigt === listHeigt) && (pageY - startY) < 0)
    ) {
      e.preventDefault();
    }
    this.startY = pageY;
  }
  render() {
    const {
      jobStore: {
        jobList = [],
        handleApply,
        jobCount,
        videoHeight,
      },
      liveStore: {
        info,
      },
    } = this.props;
    const popupHeight = height - videoHeight - (Apps.isBaidu ? 80 : 0);
    return (
      <div
        className="living-job-list"
        style={ { height: `${popupHeight}px` } }
      >
        {
          jobCount ? (<h2>{`全部${jobCount}个职位`}</h2>) : null
        }
        <div className="living-scroll-wrap">
          <div
            className="living-scroller"
            ref={ this.$scroller }
          >
            <div
              ref={ this.$list }
            >
              {
                jobList.map((item) => (
                  <div
                    className="living-comp-job-wrap"
                    key={ item.comp.compId }
                  >
                    <CompanyCard
                      pullUrl={ info.ended ? '' : info.pullUrl }
                      data={ item.comp }
                      btnVisible={ false }
                      key={ item.comp.compId }
                    />
                    {
                      item.jobs.map((job, index) => (
                        <JobCard
                          data={ job }
                          index={ index }
                          key={ `${job.jobId}_${job.jobKind}` }
                          onApply={ () => { handleApply(item.comp.compId, index); } }
                        />
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobList;
