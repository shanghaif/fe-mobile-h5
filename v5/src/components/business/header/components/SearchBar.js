import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchLayer from '@liepin/react-search-layer-h5';

import userUtil from '../../../../lib/utils/user';
import { mRoot } from '../../../../lib/utils/domain';
import logo from '../images/logo.png';

const { cityCode, cityName } = window.$CONFIG || {};
function SearchBar({ onShowMenu, placeholder, newsNum }) {
  const [visibleLayer, setVisibleLayer] = useState(false);
  return (
    <nav className="m-top-nav">
      <a href={ mRoot }>
        <img className="m-top-nav-logo" src={ logo } alt=""/>
      </a>
      <div className="m-top-nav-input-wrap">
        <i className="text-icon icon-search"/>
        <input onClick={ () => setVisibleLayer(true) } className="m-top-nav-input" placeholder={ placeholder }/>
        <SearchLayer
          visible={ visibleLayer }
          cityCode={ cityCode }
          cityName={ cityName }
          onClose={ () => setVisibleLayer(false) }
        />
      </div>
      <span className="m-top-nav-photo">
        {
        userUtil.isLogin
        ? <div className="m-top-nav-photo-new"><a onClick={ onShowMenu }><img src={ `https://image0.lietou-static.com/img/${userUtil.user_photo}` } alt=""/></a>{ newsNum !== 0 ? <em>{newsNum}</em> : null }</div>
            : <a href={ `/register/?return_url=${window.location.href}` }>登录</a>
        }
      </span>
    </nav>
  );
}
SearchBar.propTypes = {
  onShowMenu: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  newsNum: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default SearchBar;
