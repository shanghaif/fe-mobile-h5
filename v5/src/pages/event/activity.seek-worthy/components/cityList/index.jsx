import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Message } from '@liepin/react-violet-h5';

import Ajax from '../../../../../lib/utils/request';
import goJobDetail from '../../modules/goJobDetail';
import { getScrollTop } from '../../modules/scrollLocation';
import SideSelector from '../sideSelector/index';

import './index.less';

const code = {
  '010': '0',
  '020': '1',
  '050090': '2',
  '050020': '3',
  '070020': '4',
  '060020': '5',
  '090040': '6',
  '050050': '7',
  280020: '8',
  '090020': '9',
};

@inject('store')
@observer
class CityList extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  state = {
    loaded: false,
    jobCards: [],
  }
  componentDidMount() {
    const {
      activeCity,
    } = this.props.store;
    Ajax({
      url: '/seek-worthy/salary-city.json',
      data: {
        dqCode: activeCity,
      },
      success: ({ data, flag, msg }) => {
        if (flag === 1) {
          this.setState({
            loaded: true,
            jobCards: data,
          }, getScrollTop);
        } else {
          Message.toast(<p className="text-center">{msg}</p>);
        }
      },
      error: () => {
        Message.toast(<p className="text-center">网络错误，请稍候再试！</p>);
      },
    });
  }
  render() {
    const { loaded, jobCards } = this.state;
    const {
      activeCity,
    } = this.props.store;
    return (
      <div className="seeking-season-container city-list-container flexbox-v">
        <div className={ `city-banner city-banner${code[activeCity]} header-word` }/>
        <section className="city-list-content">
          {
            loaded ?
              <ul className="city-list">
                {
                  jobCards.length ?
                  jobCards.map((item, index) => (
                    <li
                      key={ item.jobId }
                      className="city-list-item"
                      role="presentation"
                      onClick={ () => goJobDetail(
                        item.jobKind,
                        item.jobId,
                        index,
                        item.url,
                      ) }
                    >
                      <p className="city-info flexbox">
                        <span className="city-job-title ellipsis">{ item.title }</span>
                        <span className="city-job-salary">{ item.salaryShow }</span>
                      </p>
                      <p className="city-job-comp">{ item.compName }</p>
                      <p className="city-job-require">
                        <span>{ item.dqName }</span>
                        <span>{ item.requireWorkYearsShow }</span>
                        <span>{ item.requireEdulevelName }</span>
                      </p>
                      <dl className="flexbox">
                        <dt>
                          <img src={ item.recruiterPhoto } alt=""/>
                        </dt>
                        <dd>{ item.recruiterName }{ item.recruiterTitle ? '·' : '' }{ item.recruiterTitle }</dd>
                      </dl>
                    </li>
                  )) : null
                }
              </ul> : null
          }
        </section>
        <div className="foot-logo-container">
          <span className="foot-logo"/>
        </div>
        <div className="foot-word"/>
        <SideSelector/>
      </div>
    );
  }
}

export default CityList;
