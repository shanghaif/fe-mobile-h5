import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import domain from '@liepin/native-domain-fe';
import { PopupList, Message } from '@liepin/react-violet-h5';
import Ajax from '../../../lib/utils/request';

const reportTypes = [
  { id: 5, name: '虚假信息' },
  { id: 3, name: '涉及政治、非法、色情类违规内容' },
  { id: 9, name: '违规收费，诈骗，传销' },
  { id: 10, name: '广告内容' },
  { id: 11, name: '语言骚扰' },
  { id: 12, name: '人身攻击' },
  { id: 13, name: '求职歧视' },
  { id: 14, name: '强迫威胁' },
  { id: 7, name: '其他' },
];

const Report = ({ onCancel, params, visible, onClose }) => {
  const handleSelect = useCallback((item) => {
    Ajax({
      type: 'jsonp',
      url: `${domain('m-c')}/webcomplaint/submit.json`,
      data: { ...params, code: item.id },
    }).then(({ flag, msg }) => {
      onClose && onClose();
      Message.toast(flag === 1 ? '举报成功' : msg);
    });
  }, []);

  return (
    <PopupList
      visible={ visible }
      list={ reportTypes }
      onCancel={ onCancel }
      onClose={ onClose }
      onSelect={ handleSelect }
    />
  );
};
Report.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Report;
