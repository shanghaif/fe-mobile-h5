/**
 * url: https://m.liepin.com/user/resource 求职背包
 * 活动时间：2020.03.16零点-2020.04.14 23:59:59
 */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Message } from '@liepin/react-violet-h5';
import InfiniteScroll from 'react-infinite-scroller';

import Ajax from '../../lib/utils/request';
import List from './components/List';
import './index.less';

const UserResoure = () => {
  const [loaded, setLoaded] = useState(false);
  const [list, setList] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const getList = (page = 0) => {
    Ajax({
      url: '/user/resource-page.json',
      data: {
        curPage: page,
        pageSize: 20,
      },
      success: ({ data, flag, msg }) => {
        if (flag === 1) {
          const newList = data.datas || [];
          newList.length && newList.map((item) => (list.push(item)));
          setList([...list]);
          setLoaded(true);
          setHasNext(data.hasNextPage);
        } else {
          Message.toast(msg);
        }
      },
    });
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="demo-container">
      {
        loaded ?
        list && list.length ?
          <div className="backPack-scroll-container">
            <InfiniteScroll
              pageStart={ 0 }
              initialLoad={ false }
              loadMore={ getList }
              hasMore={ hasNext }
              useWindow={ false }
            >
              <ul className="backPack-content">
                {
              list.map((item) => (
                <List
                  { ...item }
                  key={ `${item.desc}-${item.title}` }
                />
              ))
            }
              </ul>
            </InfiniteScroll>
          </div>
          :
          <dl className="empty-container">
            <dt/>
            <dd>暂未获得道具，请继续加油</dd>
          </dl> : null
      }
    </div>
  );
};
ReactDOM.render(<UserResoure/>, document.getElementById('app'));


