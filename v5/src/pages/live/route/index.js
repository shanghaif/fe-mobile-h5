import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useRedux, { ResumeCompleteContext } from './hooks/useRedux';
import UserCard from './components/UserCard';
import Loading from './components/Loading';
import './index.less';

function Index() {
  const { state, actions } = useRedux();

  useEffect(() => {
    actions.loadUserCard();
  }, []);
  return (
    <ResumeCompleteContext.Provider value={ { state, actions } }>
      { state.isLoad ? <UserCard/> : <Loading/> }
    </ResumeCompleteContext.Provider>
  );
}
ReactDOM.render(<Index/>, document.getElementById('app'));
