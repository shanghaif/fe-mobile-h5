/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';

export function renderReactComponentToHtml(Component) {
  try {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(Component, div);
  } catch (err) {
    console.log('err ->', err);
  }
}
