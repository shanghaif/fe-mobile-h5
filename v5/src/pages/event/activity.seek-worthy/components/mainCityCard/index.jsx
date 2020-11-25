import React from 'react';
import propTypes from 'prop-types';
import { Button } from '@liepin/react-violet-h5';
import { setScrollTop } from '../../modules/scrollLocation';
import store from '../../store/index';
import './index.less';

function handleCardClick(code) {
  setScrollTop();
  store.changeCity(code);
  store.changeUrl();
  window.scrollTo(0, 0);
}
function MainCityCard({ salary, name, code, index }) {
  return (
    <li className="main-city-card">
      <a
        className="main-city-card-link"
        href="javascript:;"
        onClick={ () => handleCardClick(code) }
      >
        <i className={ `city-medal city-media-${index}` }/>
        <div className="city-info-wrap">
          <p>{ name }</p>
          <p>平均月薪{ ` ${salary}` }元</p>
        </div>
        <Button
          circle
          type="primary"
          content="查看详情"
        />
      </a>
    </li>
  );
}
MainCityCard.propTypes = {
  salary: propTypes.string.isRequired,
  code: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
};

export default MainCityCard;
