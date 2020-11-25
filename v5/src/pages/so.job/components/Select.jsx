import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


function Select({ title, value, onChange, data, unlimited, multi }) {
  const dataObject = useMemo(() => data
    .reduce(
      (a, b) => {
        a[b.value] = ({ ...b });
        return a;
      },
      {}
    ), [data]);
  const handleClick = useCallback(({ value: val, name }) => {
    if (unlimited === val) {
      onChange([unlimited], { name, value: val });
    } else if (value.includes(val)) {
      // no thing
    } else if (multi) {
      // 多选的时候, 如果已选中的值包含多选, 则取消多选的选中
      if (value.includes(unlimited)) {
        onChange([val], { name, value: val });
      } else {
        const newVal = [...value, val];
        onChange(newVal, newVal.map(v => dataObject[v]));
      }
    } else {
      onChange([val], { name, value: val });
    }
  }, [value, dataObject, unlimited, multi, onChange]);

  return (
    <dl className="so-job-select">
      <dt>{ title }</dt>
      <dd>
        {
          data.map(item => (
            <a key={ item.value } onClick={ () => handleClick(item) } className={ classnames('so-job-select-item', { active: ~value.indexOf(item.value) }) }>
              <span className="so-job-select-label">{ item.name }</span>
            </a>
          ))
        }
      </dd>
    </dl>
  );
}

Select.propTypes = {
  title: PropTypes.any,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  unlimited: PropTypes.string,
  multi: PropTypes.bool,
};
Select.defaultProps = {
  title: '',
  value: [],
  unlimited: '',
  multi: true,
};

export default Select;
