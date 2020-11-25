import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Popup, Button } from '@liepin/react-violet-h5';
import { mcRoot } from '../lib/utils/domain';
import proGress from '../lib/resume/resume.progress';
import '../style/complete-resume.less';

function toSearch(obj) {
  return obj && Object.keys(obj).reduce((k, search) => `${search}&${k}=${obj[k]}`, '') || '';
}
function toUrl(url) {
  const location = window.locationProxy || window.location;
  location.href = url;
}

function DrawDegree({ completeDegree }) {
  useEffect(() => {
    proGress('#canvas', completeDegree);
  }, []);
  return (
    <div className="canvaswrap">
      <canvas id="canvas" className="canvas" height="400px" width="400px;"/>
      <div className="current-degree">
        <p>当前完整度</p>
        <p className="current-num">{completeDegree}%</p>
      </div>
      <div className="norm-degree">标准完整度:65%</div>
    </div>
  );
}
DrawDegree.propTypes = {
  completeDegree: PropTypes.number.isRequired,
};

class CompleteResume extends Component {
  static propTypes = {
    resume: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    ext: PropTypes.any,
  }

  static defaultProps = {
    ext: null,
  }

  handleComplete = () => {
    const { resume: { resId, isCnRes }, onClose, ext } = this.props;
    onClose();
    const url = !resId || isCnRes
      ? `${mcRoot}/resume-guidance/?url=${encodeURIComponent(window.location.href)}${toSearch(ext)}`
      : `${mcRoot}/resume/editresumedetail/?res_id_encode=${resId}${toSearch(ext)}`;
    toUrl(url);
  }

  render() {
    const { resume: { completeDegree }, visible, onClose } = this.props;

    return (
      <Popup visible={ visible } title="简历完整度不足" onClose={ onClose }>
        <div className="complete-dialog text-center">
          <div className="complete-title">您的简历完整度为{completeDegree}%<br/>
            <span className="tip-text">完善简历</span>提高HR/猎头的关注度!
          </div>
          <DrawDegree completeDegree={ completeDegree }/>
          <div className="btn-wrap">
            <Button onClick={ this.handleComplete } type="primary" block size="xlarge" content="完善简历"/>
          </div>
        </div>
      </Popup>
    );
  }
}

const div = document.createElement('div');
document.body.appendChild(div);

const toggleCompleteMask = (resume, show, ext) => {
  ReactDOM.render(
    <CompleteResume
      resume={ resume }
      ext={ ext }
      visible={ show }
      onClose={ () => toggleCompleteMask(resume, false) }
    />,
    div
  );
};

export default function showComplete(resume, show, ext) {
  toggleCompleteMask(resume, show, ext);
}
