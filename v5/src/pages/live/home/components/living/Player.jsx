import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import appsUtil from '../../../../../lib/utils/apps';

function loadJS(src) {
  const script = document.createElement('script');
  document.head.appendChild(script);
  return new Promise((resolve, reject) => {
    script.src = src;
    script.onload = () => {
      window.TcPlayer ? resolve() : reject();
    };
  });
}

function getVideoType(src) {
  let type = '';
  switch (src.substring(0, 4)) {
    case 'http':
      type = src.indexOf('mp4') !== -1 ? 'mp4' : src.indexOf('flv') !== -1 ? 'flv' : src.indexOf('m3u8') !== -1 ? 'm3u8' : '';
      break;
    case 'rtmp':
      type = 'rtmp';
      break;
    default:
      type = 'm3u8';
      break;
  }
  return type;
}
function Yunxinvideo({
  size,
  pullUrl,
  className,
  controls,
  onInitSuccess,
  onStatusChange,
  launchTime,
  onEnd,
}) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const firstRenderRef = useRef(true);
  // normal 初始状态 error 直播流异常
  const [status, setStatus] = useState('normal');
  const [errorTip, setErrorTip] = useState();

  const handlePlay = () => {
    if (videoRef.current) {
      setStatus('loading');
      videoRef.current.load();
    }
  };

  const handleError = useCallback(() => {
    const diff = launchTime - (new Date()).getTime();
    if (diff > 0 && diff <= 900000) {
      setErrorTip('直播马上开始，请稍后重试');
    } else {
      setErrorTip('网络异常，请稍后重试');
    }
    setStatus('error');
  }, [setStatus, setErrorTip]);

  const initPlayer = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.destroy();
    }
    try {
      videoRef.current = new window.TcPlayer('my-video', {
        width: size.screenWidth,
        height: size.videoHeight,
        [getVideoType(pullUrl)]: pullUrl,
        live: true,
        autoplay: !(appsUtil.isBaidu || appsUtil.isUcOrDingding),
        controls,
        wording: {
          1: '直播马上开始，请稍后重试',
          2: '直播马上开始，请稍后重试',
          3: '直播马上开始，请稍后重试',
          4: '直播马上开始，请稍后重试',
          1001: '直播马上开始，请稍后重试',
          1002: '直播马上开始，请稍后重试',
          2032: '直播马上开始，请稍后重试',
        },
        listener(msg) {
          // msg.type !== 'timeupdate' && console.log(msg); // eslint-disable-line
          switch (msg.type) {
            case 'play': // 播放
            case 'pause': // 暂停
              // nothing
              break;
            case 'playing': // 播放中
              setStatus(msg.type);
              setErrorTip('');
              break;
            case 'click': // 点击
              videoRef.current.load();
              break;
            case 'error': // 异常
              handleError();
              break;
            case 'ended': // 结束
              onEnd && onEnd();
              break;
            case 'progress':
              // 当前是异常状态尝试重新播放
              status === 'error' && videoRef.current.load();
              break;
            default:
              // nothing
          }
          videoRef.current
            && onStatusChange
            && onStatusChange(videoRef.current.playing() ? 0 : 1);
        },
      });
      onInitSuccess && onInitSuccess(videoRef.current);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }, [size, status, videoRef.current]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (videoRef.current && videoRef.current.playing()) {
      const wrapElm = wrapRef.current;
      if (wrapElm) {
        const wrap = wrapElm.querySelector('.vcp-player');
        if (wrap) {
          const video = wrap.querySelector('video');
          video.style.setProperty('width', `${size.screenWidth}px`);
          video.style.setProperty('height', `${size.videoHeight}px`);
          wrap.style.setProperty('width', `${size.screenWidth}px`);
          wrap.style.setProperty('height', `${size.videoHeight}px`);
        }
      }
    } else {
      initPlayer();
    }
  }, [size]);

  useEffect(() => {
    loadJS('//imgcache.qq.com/open/qcloud/video/vcplayer/TcPlayer-2.3.2.js')
      .then(() => {
        initPlayer();
      })
      .catch(() => {
        console.log('SDK 加载失败!!!'); // eslint-disable-line no-console
      });
    return () => {
      videoRef.current && videoRef.current.destroy();
    };
  }, []);
  return (
    <div className={ classnames('video-wrap', className) }>
      <div id="my-video" ref={ wrapRef } style={ { width: `${size.screenWidth}px`, height: `${size.videoHeight}px` } } className="my-video"/>
      {
        /^(playing|loading)$/.test(status) ? null : <div onClick={ handlePlay } className="video-mask">{ errorTip }</div>
      }
    </div>
  );
}

Yunxinvideo.propTypes = {
  size: PropTypes.any.isRequired,
  pullUrl: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  controls: PropTypes.string,
  onInitSuccess: PropTypes.func,
  onEnd: PropTypes.func,
  launchTime: PropTypes.number,
};

Yunxinvideo.defaultProps = {
  className: '',
  controls: 'system',
  onInitSuccess: null,
  onEnd: null,
  launchTime: 0,
};

export default Yunxinvideo;

