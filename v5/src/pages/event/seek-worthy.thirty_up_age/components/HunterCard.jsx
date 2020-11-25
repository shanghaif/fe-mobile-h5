import React from 'react';
import propTypes from 'prop-types';
import { Button } from '@liepin/react-violet-h5';

import goHunterPage from '../modules/goHunterPage';

function HunterCard({
  photo,
  name,
  checkRate,
  feedbackRate,
  userId,
  userType,
}) {
  return (
    <li className="hunter-card-item">
      <dl className="flexbox">
        <dt>
          <img src={ photo } alt=""/>
        </dt>
        <dd className="flexbox">
          <div className="hunter-info">
            <p>{ name }</p>
            <p>应聘查看率 <span>{ checkRate }</span></p>
            <p>应聘反馈率 <span>{ feedbackRate }</span></p>
          </div>
          <Button
            type="primary"
            size="medium"
            content="进入主页"
            onClick={ () => goHunterPage(userId, userType) }
          />
        </dd>
      </dl>
    </li>
  );
}

HunterCard.propTypes = {
  photo: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  checkRate: propTypes.string.isRequired,
  feedbackRate: propTypes.string.isRequired,
  userId: propTypes.string.isRequired,
  userType: propTypes.string.isRequired,
};

export default HunterCard;
