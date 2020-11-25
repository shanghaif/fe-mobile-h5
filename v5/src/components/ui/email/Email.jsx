import React from 'react';
import { Recommend } from '@liepin/react-violet-h5';

const emailSuffix = [
  'qq.com',
  '163.com',
  '126.com',
  'gmail.com',
  'foxmail.com',
  'sina.com',
  'hotmail.com',
];
function fetchData(keyword) {
  const index = keyword.indexOf('@');
  const prefix = index > 0 ? keyword.slice(0, index) : keyword;
  return Promise.resolve(emailSuffix.map(suffix => ({ value: `${prefix}@${suffix}` })));
}

function Email(props) {
  return (
    <Recommend
      { ...props }
      fetchData={ fetchData }
      showName="value"
    />
  );
}

export default Email;

