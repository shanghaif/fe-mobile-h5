import React from 'react';
import PropTypes from 'prop-types';
import './profile-card.less';

const ProfileCard = ({ imgUrl, title, descArr }) => (
  <div className="profile-card clearfix">
    <img src={ imgUrl } alt=""/>
    <div className="profile-card-title">{ title }</div>
    {
      descArr && descArr.length ? descArr.map(desc => <div key={ desc } className="profile-card-desc">{ desc }</div>) : null
    }
  </div>
);

ProfileCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  descArr: PropTypes.oneOfType([PropTypes.array]),
};
ProfileCard.defaultProps = {
  title: null,
  descArr: null,
};

export default ProfileCard;
