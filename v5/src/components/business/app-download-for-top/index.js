import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import localCookie from '@liepin/native-sweet-fe';
import classnames from 'classnames';
import domain from '@liepin/native-domain-fe';
import { Icon } from '@liepin/react-violet-h5';
import './index.less';

window.tlog = window.tlog || [];

export class AppDownloadForTop extends React.Component {
  static propTypes = {
    showTlog: PropTypes.string,
  }
  static defaultProps = {
    showTlog: '',
  }
  state = {
    isVisible: !localCookie.get('fe_c_downloadTopGuideClose'),
  }
  componentDidMount() {
    const { showTlog } = this.props;
    this.state.isVisible && showTlog && window.tlog.push(showTlog);
  }
  shouldComponentUpdate() {
    return true;
  }
  handleDownload = () => {
    window.location.href = `${domain('m-c')}/tdown/`;
  }
  handleClose = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      isVisible: false,
    });
    localCookie.set('fe_c_downloadTopGuideClose', true, 1);
  }
  render() {
    return (
      <a
        href="javascript:;"
        className={ classnames('app-download-for-top-container', {
          hide: !this.state.isVisible,
        }) }
        onClick={ this.handleDownload }
      >
        <button type="button" className="app-download-for-top-close" onClick={ this.handleClose }>
          <Icon type="close"/>
        </button>
      </a>
    );
  }
}

export default function AppDownloadForTopRender(args) {
  let div = null;
  const id = 'app-download-for-top';
  const divRoot = document.getElementById(id);
  if (!divRoot) {
    div = document.createElement('div');
    div.id = id;
    document.body.insertBefore(div, document.body.firstChild);
  }
  ReactDom.render(<AppDownloadForTop { ...args }/>, document.getElementById(id));
}
