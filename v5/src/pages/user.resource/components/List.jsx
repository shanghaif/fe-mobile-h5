import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

import { Button } from '@liepin/react-violet-h5';


function List({ title, desc, valid, label, url }) {
  return (
    <li
      className={ classnames('backPack-item flexbox', {
                      'backPack-item-active': valid,
                      'backPack-item-gray': !valid,
                    })
                  }
    >
      <div className="backPack-info">
        <h6>{ title}</h6>
        <p>{ desc }</p>
        <p>{ label }</p>
      </div>
      <Button
        disabled={ !valid }
        href={ valid ? url : 'javascript:;' }
        type="primary"
        size="mini"
        content={ valid ? '去使用' : '已过期' }
      />
    </li>
  );
}
List.propTypes = {
  title: propTypes.string.isRequired,
  desc: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
  valid: propTypes.bool.isRequired,
};

export default List;
