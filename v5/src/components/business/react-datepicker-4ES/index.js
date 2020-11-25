/**
 * 新日期组件（React 转换 jQuery 使用）
 */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDom from 'react-dom';
import { DatePicker } from '@liepin/react-violet-h5';


class DatePicker4ES {
  constructor(options) {
    const defaults = {
      onChange: () => {}, // 回填函数
      en: false, // 是否是英文
      // ...其他参数查阅组件文档
    };
    this.options = Object.assign(defaults, options);
    this.init();
  }

  init() {
    const { onChange = () => {}, ...props } = this.options;
    this.handleChange = onChange;
    this.props = props;
    this.$div = $('<div/>');
    $('body').append(this.$div);
  }

  setValue = (value) => {
    this.render({ value });
  }

  render(newProps = {}) {
    ReactDom.render(
      <DatePicker
        onChange={ this.handleChange }
        onClose={ this.handleCloseModal }
        { ...this.props }
        { ...newProps }
      />,
      this.$div[0]
    );
  }
  handleCloseModal = () => {
    this.render({
      visible: false,
    });
  }
}

export default DatePicker4ES;
