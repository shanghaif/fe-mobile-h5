/* eslint-disable no-new */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Adslot4H5 } from '@liepin/native-adslot-fe';
import stringUtil from '../../../lib/utils/string';
import '../style/live.less';

class Ads extends Component {
  static propTypes = {
    adslotList: PropTypes.array,
  }
  static defaultProps = {
    adslotList: [],
  }
  state = {
    list: [],
  }
  componentDidMount() {
    const { adslotList } = this.props;
    const ids = adslotList.map((item) => (stringUtil.getQuery('liveId', item.link))).filter((item) => !!item).join(',');
    if (ids.length) {
      $.ajax({
        url: '/live/v1/get-adcards.json',
        data: {
          ids,
        },
        success: ({ data: { datas }, flag }) => {
          if (flag === 1 && datas.length) {
            this.setState({
              list: datas,
            }, () => {
              new window.Swiper('#live-swiper');
              $('#live-swiper').parent().show();
            });
          }
        },
      });
    }
  }
  render() {
    const { list } = this.state;
    return list.length ? (
      <div className="swiper-contianer" id="live-swiper">
        <div className="swiper-wrapper">
          {
            list.map(({
              label,
              labelIcon,
              link,
              title,
              info,
              button,
              icons,
              infoIcon,
            }) => (
              <a href={ link } key={ link } className="swiper-slide">
                <div className="live-card">
                  <div className="live-status flexbox">
                    <span>{label}</span>
                    {
                      labelIcon ? (
                        <img
                          src={ `//image0.lietou-static.com/img/${labelIcon}` }
                          alt=""
                        />
                      ) : null
                    }
                  </div>
                  <div className="live-title ellipsis-1">{title}</div>
                  <div className="live-info-wrap flexbox">
                    <div className="live-info-icon-wrap">
                      {
                        infoIcon ? (
                          <img
                            src={ `//image0.lietou-static.com/img/${infoIcon}` }
                            alt=""
                            className="pre-live-icon"
                          />
                        ) : null
                      }
                      {
                        icons && icons.length ? icons.map((img) => (
                          <img
                            key={ img }
                            src={ `//image0.lietou-static.com/img/${img}` }
                            className="joined-user-icon"
                            alt=""
                          />
                        ))
                        : null
                      }
                    </div>
                    <span className="flex-1 live-info ellipsis-1">{info}</span>
                    <span
                      className={
                        classnames('live-fade-btn btn-primary', {
                          'live-fade-already': button === '已预约',
                        })
                      }
                    >
                      {button}
                    </span>
                  </div>
                </div>
              </a>
            ))
          }
        </div>
      </div>
    ) : null;
  }
}

export default function () {
  new Adslot4H5({
    opCodeList: [{
      opCode: 'lp_c_1130',
      renderOperation: Ads,
    }],
  });
}
