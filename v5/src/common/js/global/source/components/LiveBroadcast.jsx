
import React, { useState } from 'react';
import { Condition } from '@liepin/react-violet-h5';
import TcPlayer from '@liepin/react-tcplayer-h5';
import YunxinVideo from '@liepin/react-yunxin-video';
import { baseDomain } from '@liepin/native-domain-fe';
import cookieUtil from '../../../../../lib/utils/cookie';
import FixedWin from '../../../../../components/ui/fixed-win';
import { CUR_LIVE_BROADCAST_URL, LIVE_BROADCAST_STREAM } from '../constants';
import '../style/live-broadcast.less';

export default function LiveBroadcastView() {
  const url = cookieUtil.get(CUR_LIVE_BROADCAST_URL);
  const pullUrl = cookieUtil.get(LIVE_BROADCAST_STREAM);
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    cookieUtil.del(CUR_LIVE_BROADCAST_URL, '/', baseDomain);
    setVisible(false);
  };
  const isNew = /live\/v1/.test(url);
  return (
    <Condition when={ visible }>
      <FixedWin className="live-broadcast-win">
        <div className="live-broadcast-win-btn-wrap clearfix">
          <a href={ url } className="float-left">
            <i className="text-icon icon-go-back"/>
            <span>返回直播</span>
          </a>
          <a className="float-right">
            <i className="text-icon icon-close" onClick={ handleClose }/>
          </a>
        </div>
        {
          isNew
            ? <TcPlayer width={ 187 } height={ 110 } pullUrl={ pullUrl }/>
            : <YunxinVideo width={ 187 } height={ 110 } pullUrl={ pullUrl }/>
        }
      </FixedWin>
    </Condition>
  );
}

