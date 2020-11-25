import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Radio } from '@liepin/react-violet-h5';
import ProfileCard from './profile-card/ProfileCard';
import { mcRoot } from '../lib/utils/domain';
import enImg from '../images/en.png';
import cnImg from '../images/cn.png';

function toUrl(url) {
  const location = window.locationProxy || window.location;
  location.href = url;
}

const Resume = ({ isCnRes, onClose, caption, completeDegree, isDefaultRes, resId }) => {
  const handleClose = () => {
    onClose && onClose();
    toUrl(`${mcRoot}/resume/showresumedetail/?res_id_encode=${resId}`);
  };

  return (
    <div className="resume-wrap">
      <ProfileCard
        imgUrl={ isCnRes ? cnImg : enImg }
        title={ `${caption}${isDefaultRes ? '(默认)' : ''}` }
        descArr={ [<Fragment key={ resId }>完整度：{completeDegree}% <a className="view-resume" onClick={ handleClose }>预览</a></Fragment>] }
      />
      <Radio value={ resId }/>
    </div>
  );
};

Resume.propTypes = {
  isDefaultRes: PropTypes.bool.isRequired,
  isCnRes: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  completeDegree: PropTypes.number.isRequired,
  resId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Resume;
