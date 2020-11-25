import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Message } from '@liepin/react-violet-h5';

import './index.less';

const secondsInOneMinute = 60;
const secondsInOneHour = 3600;
const secondsInOneDay = 86400;

let timer = null;
const { location } = window;

function getRemainTimeText(time) {
  let result = '已预约 ';
  let current = time;
  const day = Math.floor(current / secondsInOneDay);
  if (day) {
    result += `${day}天`;
    current -= day * secondsInOneDay;
  }

  const hour = Math.floor(current / secondsInOneHour);
  if (hour) {
    result += `${hour}时`;
    current -= hour * secondsInOneHour;
  }

  const minute = Math.floor(current / secondsInOneMinute);
  if (minute) {
    result += `${minute}分`;
    current -= minute * secondsInOneMinute;
  }
  if (current) {
    result += `${current}秒`;
  }
  result += '后开播';
  return result;
}

class Tabbar extends Component {
  propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    ordered: PropTypes.bool.isRequired,
    logined: PropTypes.bool.isRequired,
    remainLaunchTime: PropTypes.number.isRequired,
  }
  constructor(props) {
    super(props);
    const counting = (props.ordered && props.status === 2);
    this.state = {
      counting,
      status: props.status,
      remainTime: props.remainLaunchTime,
    };
    if (counting) {
      this.handleCountDown();
    }
  }
  componentDidMount() {
    window.removeEventListener('beforeunload', this.handleExit);
    window.addEventListener('beforeunload', this.handleExit);
  }
  componentWillUnmount() {
    this.handleExit();
  }
  handleExit = () => {
    timer && clearTimeout(timer);
  }
  handleOrder = () => {
    if (this.requesting) {
      return false;
    }
    const { id, logined } = this.props;
    const goLogin = () => {
      location.href = `/register/?return_url=${encodeURIComponent(location.href)}&nonstop=1`;
    };
    if (!logined) {
      goLogin();
      return false;
    }
    this.requesting = true;
    $.ajax({
      url: '/live/order.json',
      data: {
        liveId: id,
      },
      success: ({ data, flag, msg, code }) => {
        this.requesting = false;
        if (flag === 1) {
          if (data === 0) {
            location.href = `/live/home/?liveId=${id}`;
          } else {
            Message.toast('预约成功，开播前10分钟短信提醒您');
            this.setState({
              remainTime: data,
            }, () => {
              this.handleCountDown();
            });
          }
        } else if (code === '5003') {
          goLogin();
        } else {
          Message.toast(msg);
        }
      },
      error: () => {
        this.requesting = false;
        Message.toast('网络请求失败');
      },
    });
  }
  handleCountDown = () => {
    const { remainTime } = this.state;
    if (remainTime > 1) {
      this.setState({
        counting: true,
        remainTime: remainTime - 1,
      });
      timer = setTimeout(this.handleCountDown, 1000);
    } else {
      this.handleExit();
      this.setState({
        status: 6,
      });
    }
  }
  handleView = () => {
    const { id } = this.props;
    location.href = `/live/home?liveId=${id}`;
  }
  switchBtn() {
    const {
      counting,
      status,
      remainTime,
    } = this.state;

    if (status === 5) {
      return (
        <Button
          key="canceled"
          block
          disabled
          type="primary"
          content="已取消"
          size="xlarge"
        />
      );
    }
    if (status === 6) {
      return (
        <Button
          key="living"
          block
          type="primary"
          content="立即观看"
          size="xlarge"
          onClick={ this.handleView }
        />
      );
    }
    if (counting) {
      return (
        <Button
          key="order"
          block
          className="no-active"
          type="primary"
          content={ getRemainTimeText(remainTime) }
          size="xlarge"
        />
      );
    }
    return (
      <Button
        key="order"
        block
        type="primary"
        content="预约直播"
        size="xlarge"
        onClick={ this.handleOrder }
      />
    );
  }
  render() {
    return (
      <div className="preparing-tabbar-wrap">
        {
          this.switchBtn()
        }
      </div>
    );
  }
}

export default Tabbar;
