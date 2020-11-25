import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import link2Job from '../../../modules/link2Job';
import './index.less';

function List({ data, visible }) {
  return data.length ? (
    <div
      className={ classnames({
        'live-schedule-job-list': true,
        hide: !visible,
      }) }
    >
      {
        data.map((item, index) => {
          const {
            jobId,
            jobKind,
            jobTitle,
            salaryShow,
            dqName,
            requiredWorkYearShow,
            requiredEduLevelShow,
          } = item;
          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <dl
              className="live-schedule-job"
              key={ `${item.jobId}_${item.jobKind}` }
              onClick={ () => link2Job({
                jobId,
                jobKind,
                index,
              }) }
            >
              <dt className="flexbox">
                <h5 className="flex-1 ellipsis-1">{ jobTitle }</h5>
                <p className="salaryShow">{ salaryShow }</p>
              </dt>
              <dd className="flexbox">
                { dqName ? (<span className="require-item">{ dqName }</span>) : null }
                { requiredWorkYearShow ? (<span className="require-item">{ requiredWorkYearShow }</span>) : null }
                { requiredEduLevelShow ? (<span className="require-item">{ requiredEduLevelShow }</span>) : null }
              </dd>
            </dl>
          );
        })
      }
    </div>
  ) : null;
}

List.propTypes = {
  data: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
};
export default List;
