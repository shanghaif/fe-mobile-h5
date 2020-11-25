import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { share4App } from '@liepin/share';
import { Button } from '@liepin/react-violet-h5';
import apply from '../../../../../components/business/apply/applystart';
import getJobH5Link from '../../../modules/getJobH5Link';

import './index.less';

@inject('liveStore')
@inject('jobStore')
@observer
class JobCard extends React.Component {
  static propTypes = {
    jobStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onApply: PropTypes.func.isRequired,
  }
  handleJobClick = () => {
    const {
      data: {
        jobId,
        jobKind,
      },
      liveStore,
    } = this.props;

    const url = getJobH5Link({ jobId, jobKind });
    if (url) {
      liveStore.setIframeSrc(url);
    }
  }
  handleApplyClick = (e) => {
    e.stopPropagation();
    const {
      liveStore,
      onApply,
      index,
      data: {
        jobKind,
        jobId,
      },
    } = this.props;
    if (jobKind === '7' || jobKind === '6') {
      const url = getJobH5Link({ jobId, jobKind });
      if (url) {
        liveStore.setIframeSrc(url);
      }
      return false;
    }
    if (!liveStore.info.loggedIn) {
      if (Apps.isTdAndroid) {
        share4App({
          type: [74],
          code: '00001',
        });
      } else if (Apps.isTdIos && Apps.appVc >= 600) {
        share4App({
          type: [74],
          code: '00001',
        });
      } else {
        liveStore.toLogin();
      }
      return false;
    }
    if (Apps.isTd && Apps.appVc >= 610) {
      window.applySuccessCallback = onApply;
      share4App({
        scheme: 'lptd',
        host: 'lp',
        bridge: 'f',
        bridgeType: 'applySocialPosition',
        source: 'h5',
        params: {
          applySuccessCallback: 'applySuccessCallback',
          applyParam: {},
          tLogParam: {
            index,
            job_id: jobId,
            job_kind: jobKind,
            as_from: 'webcast_job_list',
          },
        },
      });
      return false;
    }
    apply({
      applyData: {
        jobId,
        jobKind,
        applyType: 0,
        appUser: false,
      },
      ext: {
        source: 'zhibo',
      },
      onSuccess: onApply,
    });
  }
  render() {
    const { data, jobStore: { active }, liveStore: { info: { ended } } } = this.props;
    const {
      jobTitle,
      salaryShow,
      compName,
      compStage,
      tags,
      recruiterPhoto,
      recruiterTitle,
      recruiterName,
      applied,
      online,
      label,
      jobKind,
      jobId,
    } = data;
    const [id, kind] = active.split('_');
    const actived = !ended && jobKind === kind && ((id | 0) === jobId);
    return (
      <div
        className="live-job-card"
        onClick={ this.handleJobClick }
      >
        <span className="index-icon">{ label }</span>
        <div className="flex-1 job-info-wrap">
          <div className="top-wrap flexbox">
            <div className="flex-1 top-wrap-left">
              <h3 className="ellipsis-1">{ jobTitle }</h3>
              { actived ? (<span className="living-symbol"><i/><i/><i/></span>) : null }
            </div>
            <span className="live-apply-btn-wrap">
              <Button
                type="primary"
                disabled={ applied }
                content={ applied ? '已应聘' : '应聘职位' }
                size="mini"
                data-info={ JSON.stringify({ job_id: jobId, job_kind: jobKind }) }
                className="live-apply-btn"
                onClick={ this.handleApplyClick }
              />
            </span>
          </div>
          {
            salaryShow ? (
              <div className="salary-show">{ salaryShow }</div>
            ) : null
          }
          {
            compName || compStage ? (
              <div className="company-name-show">{ `${compName} ${compStage || ''}`}</div>
            ) : null
          }
          {
            tags && tags.length ? (
              <div className="flexbox">
                {
                  tags.map((tag) => tag ? (<span key={ tag } className="require-item">{ tag }</span>) : null)
                }
              </div>
            ) : null
          }
          {
            recruiterPhoto || recruiterTitle || recruiterName ? (
              <div className="living-publisher-wrap flexbox">
                {
                  recruiterPhoto ? (
                    <div className="publisher-portrait-wrap">
                      <img
                        src={ `//image0.lietou-static.com/img/${recruiterPhoto}` }
                        alt=""
                      />
                      { online ? <i/> : null }
                    </div>
                  ) : null
                }
                <span className="flex-1">
                  {
                    [recruiterName, recruiterTitle].filter((hr) => (!!hr)).join(' · ')
                  }
                </span>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default JobCard;
