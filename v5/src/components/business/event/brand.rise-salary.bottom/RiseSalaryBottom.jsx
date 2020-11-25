import React from 'react';

import './index.less';

export default function RiseSalaryBottom() {
  let link = window.location.href.replace(window.location.search, '');
  !link.endsWith('/') && (link += '/');
  const gift = '/brand/rise-salary/gift-package/';
  const links = [{ url: '/brand/rise-salary/high-salary/', className: 'salary-link' }, { url: '/brand/rise-salary/hot-company/', className: 'hot-company' }, { url: '/brand/rise-salary/hunter-and-boss/', className: 'hunter-and-boss' }];
  return (
    <div className="brand-rise-salary-bottom-container">
      {
        link !== gift ? (
          <a href={ gift } className="suspension-wrap"/>
        ) : null
      }
      <div className="brand-bottom-wrap">
        {
          links.map(item => <a key={ item.url } href={ link === item.url ? 'javascript:;' : item.url } className={ item.className }/>)
        }
      </div>
    </div>
  );
}
