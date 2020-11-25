import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import City from '@liepin/react-city-h5';
import SearchLayer from '@liepin/react-search-layer-h5';
import domain from '@liepin/native-domain-fe';
import Ajax from '../../../../lib/utils/request';
import userUtil from '../../../../lib/utils/user';
import { mRoot } from '../../../../lib/utils/domain';
import logo from '../images/logo.png';

const fetchData = (keyword) => new Promise((resolve, reject) => {
  Ajax({
    url: `${domain('m-c')}/suggest/user-title-suggest.json`,
    data: { keyword },
  }).then(({ data, flag }) => {
    if (flag === 1 && data.data && data.data.length) {
      resolve(data.data.map(value => ({ value })));
    } else {
      resolve([]);
    }
  }).catch(reject);
});
function SearchBar({ onShowMenu, cityName, cityCode, onSearch, keyword, placeholder, newsNum }) {
  const [visibleCity, setVisibleCity] = useState(false);
  const [visibleLayer, setVisibleLayer] = useState(false);
  const inputRef = useRef(null);

  const handleCityChange = useCallback(([code]) => {
    onSearch({ cityCode: code });
  }, []);

  const handleSearch = useCallback((options) => {
    onSearch(options);
  }, [onSearch]);

  return (
    <nav className="m-top-nav">
      <a href={ mRoot }>
        <img className="m-top-nav-logo" src={ logo } alt=""/>
      </a>
      <div className="m-top-nav-input-has-city">
        <a className="m-top-nav-city" onClick={ () => setVisibleCity(true) }>
          { cityName }
          <i className="text-icon icon-new-down2"/>
        </a>
        <City
          max={ 1 }
          foreign={ false }
          all
          visible={ visibleCity }
          onChange={ handleCityChange }
          showParentsPath
          onClose={ () => setVisibleCity(false) }
          value={ cityCode ? [cityCode] : [] }
        />
        <SearchLayer
          visible={ visibleLayer }
          onSearch={ handleSearch }
          cityCode={ cityCode }
          cityName={ cityName }
          fetchData={ fetchData }
          input={ keyword }
          onClose={ () => setVisibleLayer(false) }
          placeholder={ placeholder }
        />
        <input
          ref={ inputRef }
          value={ keyword }
          className="m-top-nav-input"
          onClick={ () => setVisibleLayer(true) }
          placeholder={ placeholder }
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
  keyword: PropTypes.string,
  cityCode: PropTypes.string,
  cityName: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  newsNum: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

SearchBar.defaultProps = {
  keyword: '',
  cityCode: '000',
  cityName: '全国',
  placeholder: '',
};

export default SearchBar;
