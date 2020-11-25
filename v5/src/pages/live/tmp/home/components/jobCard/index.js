import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { share4App } from '@liepin/share';
import { Button } from '@liepin/react-violet-h5';
import { baseDomain } from '@liepin/native-domain-fe';
import { CUR_LIVE_BROADCAST_URL, LIVE_BROADCAST_STREAM } from '../../../../../../common/js/global/source/constants/';
import { getApplyLink } from '../../modules/links';
import link2Job from '../../../modules/link2Job';
import apply from '../../../../../../components/business/apply/applystart';
import cookieUtil from '../../../../../../lib/utils/cookie';

import './index.less';

@inject('liveStore')
@inject('jobStore')
@observer
class JobCard extends React.Component {
  propTypes = {
    jobStore: PropTypes.object.isRequired,
    liveStore: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onApply: PropTypes.func.isRequired,
  }
  handleJobClick = () => {
    const {
      liveStore: {
        info,
      },
      data: {
        jobKind,
        jobId,
      },
    } = this.props;
    link2Job({ jobId, jobKind, pullUrl: info.ended ? '' : info.pullUrl });
  }
  handleApplyClick = (e) => {
    e.stopPropagation();
    const {
      liveStore: {
        info,
      },
      onApply,
      index,
      data: {
        jobKind,
        jobId,
      },
    } = this.props;
    if (!info.loggedIn) {
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
        cookieUtil.set(CUR_LIVE_BROADCAST_URL, window.location.href, false, '/', baseDomain);
        cookieUtil.set(LIVE_BROADCAST_STREAM, info.pullUrl, false, '/', baseDomain);
        window.location.href = getApplyLink();
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
            as_from: 'recom_hp',
          },
        },
      });
      return false;
    }
    if (!info.ended) {
      cookieUtil.set(CUR_LIVE_BROADCAST_URL, window.location.href, false, '/', baseDomain);
      cookieUtil.set(LIVE_BROADCAST_STREAM, info.pullUrl, false, '/', baseDomain);
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
      dqName,
      jobTitle,
      requiredEduLevelShow,
      requiredWorkYearShow,
      salaryShow,
      applied,
      recruiterName,
      recruiterPhoto,
      recruiterTitle,
      online,
      label,
      jobKind,
      jobId,
    } = data;
    const [id, kind] = active.split('_');
    const actived = !ended && jobKind === kind && ((id | 0) === jobId);
    return (
      <div
        className="live-job-card-item"
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
          <div className="salary-show">{ salaryShow }</div>
          <div className="flexbox ellipsis-1">
            { dqName ? (<span className="require-item">{ dqName }</span>) : null }
            { requiredWorkYearShow ? (<span className="require-item">{ requiredWorkYearShow }</span>) : null }
            { requiredEduLevelShow ? (<span className="require-item">{ requiredEduLevelShow }</span>) : null }
          </div>
          <div className="flexbox hr-info-wrap">
            <div className="hr-portrait-wrap">
              <img src={ `//image0.lietou-static.com/img/${recruiterPhoto}` } alt=""/>
              { online ? <i/> : null }
            </div>
            <div className="flex-1 ellipsis-1">
              { `${recruiterName}${recruiterTitle ? ` · ${recruiterTitle}` : ''}` }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobCard;
