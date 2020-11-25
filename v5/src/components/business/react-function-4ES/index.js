
/**
 * 新日期组件（React 转换 jQuery 使用）
 */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDom from 'react-dom';
import Jobs from '@liepin/cnpm-react-jobs-h5';

class Jobs4ES {
  constructor(options) {
    const defaults = {
      onChange: () => {}, // 回填函数
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
      <Jobs
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

export default Jobs4ES;
