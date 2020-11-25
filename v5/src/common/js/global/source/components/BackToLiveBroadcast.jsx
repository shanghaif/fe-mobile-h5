import React, { useState } from 'react';
import { Condition } from '@liepin/react-violet-h5';
import { baseDomain } from '@liepin/native-domain-fe';
import FixedWin from '../../../../../components/ui/fixed-win';
import { CUR_LIVE_BROADCAST_URL } from '../constants';
import '../style/back-to-live-broadcast.less';


export default function BackToLiveBroadcast() {
  const url = LT.Cookie.get(CUR_LIVE_BROADCAST_URL);
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    LT.Cookie.del(CUR_LIVE_BROADCAST_URL, '/', baseDomain);
    setVisible(false);
  };
  return (
    <Condition when={ visible }>
      <FixedWin className="fixed-back-bar">
        <a href={ url } className="back-to-broadcast">
          <span className="living-symbol"><i/><i/><i/></span>
          <span>返回直播</span>
        </a>
        <a className="fixed-back-bar-close-btn"><i className="text-icon icon-close" onClick={ handleClose }/></a>
      </FixedWin>
    </Condition>
  );
}

