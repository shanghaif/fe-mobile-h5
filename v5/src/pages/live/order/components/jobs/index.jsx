import React from 'react';
import PropTypes from 'prop-types';
import getJobH5Link from '../../../modules/getJobH5Link';


function Jobs({ data }) {
  function handleJobClick({ jobId, jobKind, selectIndex }) {
    const url = getJobH5Link({ jobId, jobKind, selectIndex });
    if (url) {
      window.location.href = url;
    }
  }
  return data.length ? (
    <div className="landing-job-list-wrap">
      <h3>直播职位</h3>
      <section className="landing-job-list">
        {
          data.map((item, index) => {
            const {
              jobId,
              jobKind,
              jobTitle,
              salaryShow,
              compName,
              compStage,
              tags,
              recruiterPhoto,
              recruiterTitle,
              recruiterName,
            } = item;
            return (
              <div
                className="landing-job-card"
                key={ `${item.jobId}_${item.jobKind}` }
                onClick={ () => handleJobClick({
                  jobId,
                  jobKind,
                  index,
                }) }
              >
                <div className="landing-job-wrap flexbox">
                  <span className="landing-job-title flex-1 ellipsis-1">{ jobTitle }</span>
                  <span className="landing-job-salary">{ salaryShow }</span>
                </div>
                {
                  compName || compStage ? (
                    <p className="landing-company-show ellipsis-1">{`${compName} ${compStage || ''}`}</p>
                  ) : null
                }
                <div className="flexbox">
                  {
                    tags.map((tag) => tag ? (
                      <span key={ tag } className="laning-job-requirement">{tag}</span>
                    ) : null)
                  }
                </div>
                {
                  recruiterPhoto || recruiterTitle || recruiterName ? (
                    <dl className="landing-publisher-wrap flexbox">
                      <dt>
                        {
                          recruiterPhoto ? (
                            <img
                              src={ `//image0.lietou-static.com/img/${recruiterPhoto}` }
                              alt=""
                            />
                          ) : null
                        }
                      </dt>
                      <dd className="flex-1">
                        {
                          [recruiterName, recruiterTitle].filter((hr) => (!!hr)).join(' · ')
                        }
                      </dd>
                    </dl>
                  ) : null
                }
              </div>
            );
          })
        }
      </section>
    </div>
  ) : null;
}
Jobs.propTypes = {
  data: PropTypes.array,
};
Jobs.defaultProps = {
  data: [],
};

export default Jobs;
