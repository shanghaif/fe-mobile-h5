import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import link2Comp from '../../modules/link2Comp';

import './index.less';

function CompanyCard({ data, active, onClick, btnVisible, pullUrl }) {
  const {
    compId,
    compNameShow,
    compIndustryShow,
    compKindShow,
    compScaleShow,
    compFxLogo,
  } = data;
  const btnClassname = classnames({
    'show-job-btn': true,
    flexbox: true,
    active,
  });
  return (
    <div className="live-company-card" onClick={ () => link2Comp({ cid: compId, pullUrl }) }>
      <img
        src={ `//image0.lietou-static.com/img/${compFxLogo}` }
        className="live-company-logo"
        alt=""
      />
      <div className="live-company-info flex-1">
        <h5 className="ellipsis-1">{compNameShow}</h5>
        <div className="live-company-selector flexbox">
          <div className="flex-1 ellipsis-1">
            {compIndustryShow ? (<span className="require-item">{compIndustryShow}</span>) : null}
            {compKindShow ? (<span className="require-item">{compKindShow}</span>) : null}
            {compScaleShow ? (<span className="require-item">{compScaleShow}</span>) : null}
          </div>
          {
            btnVisible ? (
              <a
                href="javascript:;"
                onClick={ onClick }
                className={ btnClassname }
              >
                <span className="shown-text">职位</span>
                <i className="text-icon icon-go-ahead"/>
              </a>
            ) : null
          }
        </div>
      </div>
    </div>
  );
}
CompanyCard.propTypes = {
  data: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  btnVisible: PropTypes.bool,
  pullUrl: PropTypes.string,
};
CompanyCard.defaultProps = {
  btnVisible: true,
  pullUrl: '',
};
export default CompanyCard;

