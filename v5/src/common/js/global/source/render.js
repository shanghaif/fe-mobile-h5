import React from 'react';
import ReactDOM from 'react-dom';

function renderComp(condition, Comp, props) {
  if (condition) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<Comp { ...props }/>, div);
  }
}
export default renderComp;
