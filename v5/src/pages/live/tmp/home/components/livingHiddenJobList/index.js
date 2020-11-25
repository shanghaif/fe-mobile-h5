import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from '@liepin/react-violet-h5';
import JobList from '../jobList/';
import './index.less';

function LivingHiddenJobList({
  visible,
  onClose,
}) {
  return (
    <Popup
      mask={ false }
      maskClosable
      visible={ visible }
      onClose={ onClose }
      className="hidden-job-popup"
    >
      <JobList title={ false }/>
    </Popup>
  );
}

LivingHiddenJobList.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LivingHiddenJobList;
