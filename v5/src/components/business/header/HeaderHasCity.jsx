import React, { useState, useEffect, useRef, useCallback } from 'react';
import domain from '@liepin/native-domain-fe';
import { Message, Condition } from '@liepin/react-violet-h5';
import { cRoot, passportRoot } from '../../../lib/utils/domain';
import Ajax from '../../../lib/utils/request';
import userUtil from '../../../lib/utils/user';
import SideMenu from './components/SideMenu';
import SearchBar from './components/SearchBarHasCity';

import './index.less';

export default function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const flagRef = useRef(true);
  const [newsNum, setNewsNum] = useState(0);

  useEffect(() => {
    if (userUtil.isLogin && showMenu) {
      Ajax({
        url: `${cRoot}/user/cover-info.json`,
        type: 'jsonp',
      }).then(({ data, flag }) => {
        if (flag === 1) {
          flagRef.current = false;
          setUserInfo({
            companyName: data.companyName,
            jobTitle: data.jobTitle,
            miniFaceUrl: data.miniFaceUrl,
            resumeCompleteDegree: data.resumeCompleteDegree,
            resumeIdEncode: data.resumeIdEncode,
            userName: data.userName,
          });
        } else {
          window.location.href = `${passportRoot}/v1/logout/`;
        }
      }).catch(() => {
        Message.toast('网络错误，请稍候再试！');
      });
    }
    // 登录后获取消息数量
    if (userUtil.isLogin) {
      Ajax({
        url: `${domain('c')}/im/basic/m-unreadcount.json`,
        type: 'json',
        method: 'get',
        withCredentials: true,
      }).then(({ data, flag }) => {
        if (flag === 1 && data && data.count && data.count > 0) {
          setNewsNum(data.count > 99 ? '99+' : data.count);
        }
      });
    }
  }, [showMenu]);

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);
  return (
    <React.Fragment>
      <SearchBar { ...props } onShowMenu={ () => setShowMenu(true) } newsNum={ newsNum }/>
      <Condition when={ userInfo }>
        <SideMenu
          userInfo={ userInfo || {} }
          isShowSideMenu={ showMenu }
          sideFlag={ flagRef.current }
          onHandleClose={ handleCloseMenu }
          newsNum={ newsNum }
        />
      </Condition>
    </React.Fragment>
  );
}
