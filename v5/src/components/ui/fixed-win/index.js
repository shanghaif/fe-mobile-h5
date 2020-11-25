import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less';

const winWidth = window.innerWidth;

export default function FixedWin({ className, fixed, children }) {
  const winRef = useRef(null);

  useEffect(() => {
    const win = winRef.current;
    const rect = win.getBoundingClientRect();
    const winHeight = window.innerHeight;
    let { width, height } = rect;
    let left = winWidth - width;
    let boundary = (left) / 2;
    let curRight = 0;
    let curBottom = 0;
    let startX = 0;
    let startY = 0;
    let mRight = 16;
    let mBottom = 66;
    let hasMove = false;
    const maxBottom = winHeight - height - 16 - 50;
    win.style.setProperty('top', `${mBottom}px`);
    win.style.setProperty('right', `${mRight}px`);
    function touchMove(event) {
      const touch = event.touches[0];
      const x = touch.pageX;
      const y = touch.pageY;
      const dx = x - startX;
      const dy = y - startY;
      hasMove = true;
      mRight = curRight - dx;
      mBottom = curBottom + dy;
      // 悬浮窗距离左右最小距离16px
      win.style.setProperty('right', `${Math.max(16, Math.min(mRight, left - 16))}px`);
      win.style.setProperty('top', `${Math.min(Math.max(mBottom, 66), maxBottom)}px`);
      event.stopPropagation();
      event.preventDefault();
    }
    function touchEnd(event) {
      win.style.setProperty('right', `${mRight < boundary ? 16 : left - 16}px`);
      win.style.setProperty('top', `${Math.min(Math.max(mBottom, 66), maxBottom)}px`);
      win.style.setProperty('transition-duration', '300ms');
      if (hasMove) {
        hasMove = false;
        event.stopPropagation();
        event.preventDefault();
      }
      win.removeEventListener('touchmove', touchMove);
      document.removeEventListener('touchend', touchEnd);
    }
    function touchStart(event) {
      const touch = event.touches[0];
      const curRect = win.getBoundingClientRect();
      width = curRect.width; // eslint-disable-line
      height = curRect.height; // eslint-disable-line
      mRight = curRight = winWidth - curRect.x - width; // eslint-disable-line
      mBottom = curBottom = curRect.y; // eslint-disable-line
      left = winWidth - width;
      boundary = left / 2;
      startX = touch.pageX;
      startY = touch.pageY;
      win.style.setProperty('transition-duration', '0ms');
      win.addEventListener('touchmove', touchMove, { passive: false });
      document.addEventListener('touchend', touchEnd, { passive: false });
    }
    if (fixed) {
      win.addEventListener('touchstart', touchStart, false);
    } else {
      win.removeEventListener('touchstart', touchStart, false);
      win.removeEventListener('touchmove', touchMove);
      document.removeEventListener('touchend', touchEnd);
    }

    return () => {
      if (fixed) {
        win.removeEventListener('touchstart', touchStart);
        win.removeEventListener('touchmove', touchMove);
        document.removeEventListener('touchend', touchEnd);
      }
    };
  }, [fixed]);

  return (
    <div ref={ winRef } className={ classnames({ 'fixed-win': fixed }, className) }>
      { children }
    </div>
  );
}
FixedWin.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  fixed: PropTypes.bool,
};
FixedWin.defaultProps = {
  className: '',
  children: null,
  fixed: true,
};

