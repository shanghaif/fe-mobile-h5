import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from '@liepin/react-violet-h5';

export default ({ fetchSuggestHeight, keyword }) => class Select extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    size: PropTypes.string,
    cancelText: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTips: PropTypes.string,
    block: PropTypes.bool,
    onShow: PropTypes.func,
    onCancel: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    suggests: PropTypes.array,
  }
  static defaultProps = {
    cancelText: '取消',
    placeholder: '',
    placeholderTips: '',
    defaultValue: '',
    block: false,
    suggests: [],
    size: '',
    onShow: () => {},
    onCancel: () => {},
  }

  constructor(props) {
    super(props);
    this.fetchSuggest = fetchSuggestHeight();
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    onChange && onChange(value);
  }

  render() {
    const { defaultValue,
      block,
      placeholder,
      placeholderTips,
      cancelText, suggests, size, onShow, onCancel } = this.props;
    return (
      <AutoComplete
        size={ size }
        showName={ keyword }
        name={ keyword }
        block={ block }
        onShow={ onShow }
        onCancel={ onCancel }
        cancelText={ cancelText }
        placeholderTips={ placeholderTips }
        defaultValue={ defaultValue }
        placeholder={ placeholder }
        fetchData={ this.fetchSuggest }
        onChange={ this.handleChange }
        suggests={ suggests }
      />
    );
  }
};



