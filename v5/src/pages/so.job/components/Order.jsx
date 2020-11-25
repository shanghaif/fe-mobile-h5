import React from 'react';
import propTypes from 'prop-types';
import { SingleSelect } from '@liepin/react-violet-h5';

const orderData = [
  { value: '0', name: '智能排序' },
  { value: '1', name: '薪资排序' },
  { value: '2', name: '发布时间排序' },
];

function Order({ onChange, onClose, defaultValue, visible }) {
  return (
    <SingleSelect
      okText="完成"
      cancelText="取消"
      title="排序"
      visible={ visible }
      data={ orderData }
      defaultValue={ defaultValue }
      onClose={ onClose }
      onChange={ onChange }
    />
  );
}
Order.propTypes = {
  onChange: propTypes.func.isRequired,
  onClose: propTypes.func.isRequired,
  defaultValue: propTypes.string,
  visible: propTypes.bool,
};
Order.defaultProps = {
  defaultValue: '010',
  visible: false,
};
export default Order;

