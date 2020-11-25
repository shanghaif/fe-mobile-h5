import React from 'react';

import './index.less';

function preventDefault(e) {
  e.preventDefault();
}

export default function () {
  return (
    <div
      className="seeking-loading-wrap seeking-season-container"
      onTouchMove={ preventDefault }
    >
      <div className="header-word"/>
      <div className="foot-word"/>
      <div className="content-wrap">
        <div className="icon-wrap">
          <i/>
        </div>
        <h5>一大波offer正在袭来……</h5>
      </div>
    </div>
  );
}
