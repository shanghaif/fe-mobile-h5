/**
 * 新行业组件（React 转换 jQuery 使用）
 */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDom from 'react-dom';
import Job from '@liepin/react-job-h5';

class Jobs4ES {
  constructor(options) {
    const defaults = {
      $inputContainer: null, // 必传，渲染根节点坐标
      onChange: () => {}, // 回填函数
      multi: false, // 是否允许多选
      en: false, // 是否是英文
      // ...其他参数查阅组件文档
    };
    this.options = Object.assign(defaults, options);
    this.init();
  }

  init() {
    const { $inputContainer, onChange = () => {}, ...props } = this.options;
    const originInputValue = $inputContainer.val();
    this.$inputContainer = $inputContainer;
    this.onChange = onChange;
    this.props = props;
    if (this.options.multi) {
      this.defaultValue = originInputValue ? originInputValue.split(',') : [];
    } else {
      this.defaultValue = originInputValue || '';
    }
    $inputContainer.css({
      opacity: 0,
      position: 'absolute',
    });
    this.$div = $('<div class="new-react-jobs"></div>').css({
      display: 'inline-block',
      'background-color': '#fff',
      'line-height': 'initial',
    });
    $($inputContainer).after(this.$div);
  }

  render(newProps = {}) {
    ReactDom.render(
      <Job
        visible={ newProps.visible }
        onChange={ (valArr, result) => {
          const idArr = valArr;
          let idStr;
          if (this.options.multi) {
            idStr = idArr.join(',');
          } else {
            idStr = idArr;
          }
          this.$inputContainer.removeClass('valid-error text-error');
          this.$inputContainer.val(idStr);
          this.onChange(valArr, result);
        } }
        onClose={ this.handleCloseModal }
        defaultValue={ this.defaultValue }
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
