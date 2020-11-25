/* eslint-disable import/prefer-default-export */
/**
 * 渲染React组件到页面
 * Component - React组件，必传
 * id - 为了防止重复渲染多余html结构，id最好传
 * target - 渲染的节点，默认是body
 * method - 向渲染的节点添加Root的方式，默认是添加为最后一个子元素
 */
import React from 'react';
import ReactDom from 'react-dom';

export function RenderToPage({
  component: Component,
  target = document.body,
  method = 'appendChild',
  id,
  props = {},
}) {
  if (!Component) { return; }
  if (id) {
    const divRoot = document.getElementById(id);
    if (!divRoot) {
      const div = document.createElement('div');
      div.id = id;
      target[method](div);
    }
    ReactDom.render(<Component { ...props }/>, document.getElementById(id));
  } else {
    const div = document.createElement('div');
    target[method](div);
    ReactDom.render(<Component { ...props }/>, div);
  }
}
