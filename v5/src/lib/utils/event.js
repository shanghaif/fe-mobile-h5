/* eslint-disable no-underscore-dangle */
import Browser from './browser';

/**
 * Event相关方法
 * @namespace Event
 * @name Event
 * @static
 */
export default {
  /**
   * CapseLock是否打开
   * @name Event.isCapsLockOn
   * @function
   * @grammar Event.isCapsLockOn( e )
   * @param {Event} event event对象
   *
   * @return {Boolean} CapseLock的打开状态
   */
  isCapsLockOn(e) {
    const c = e.keyCode || e.which;
    const s = e.shiftKey;
    if (((c >= 65 && c <= 90) && !s) || ((c >= 97 && c <= 122) && s)) { return true; }
    return false;
  },
  /**
   * 获取事件触发的对象
   * @name Event.element
   * @function
   * @grammar Event.element( e )
   * @param {Event} event event对象
   *
   * @return {Element} 事件触发的对象
   */
  element(e) {
    const n = e.target || e.srcElement;
    return this.resolveTextNode(n);
  },
  /**
   * 获取mouseover和mouseout事件的相关对象
   * 对于 mouseover 事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。
   * 对于 mouseout 事件来说，该属性是离开目标时，鼠标指针进入的节点。
   * 对于其他类型的事件来说，这个属性没有用。
   * @name Event.relatedTarget
   * @function
   * @grammar Event.relatedTarget( e )
   * @param {Event} event event对象
   *
   * @return {Element} mouseover和mouseout事件的相关对象
   */
  relatedTarget(e) {
    let t = e.relatedTarget;
    if (!t) {
      if (e.type === 'mouseout' || e.type === 'mouseleave') {
        t = e.toElement;
      } else if (e.type === 'mouseover') {
        t = e.fromElement;
      }
    }
    return this.resolveTextNode(t);
  },
  /**
   * 获取非文本节点对象
   * @name Event.resolveTextNode
   * @function
   * @grammar Event.resolveTextNode( n )
   * @param {Element} n 节点对象
   *
   * @return {Element} 非文本的节点对象
   */
  resolveTextNode(n) {
    try {
      if (n && n.nodeType === 3) {
        return n.parentNode;
      }
    } catch (e) {
      console.log(e);
    }
    return n;
  },
  /**
   * 获取event对象触发的X坐标
   * @name Event.pointerX
   * @function
   * @grammar Event.pointerX()
   * @param {Event} event event对象
   *
   * @return {Int} event对象触发的X坐标
   */
  pointerX(event) {
    return event.pageX
      ||
    (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
  },
  /**
   * 获取event对象触发的Y坐标
   * @name Event.pointerY
   * @function
   * @grammar Event.pointerY()
   * @param {Event} event event对象
   *
   * @return {Int} event对象触发的Y坐标
   */
  pointerY(event) {
    return event.pageY
     ||
      (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
  },
  /**
   * 判断当前页面是否是标准模式
   * @name Event.isStrictMode
   * @function
   * @grammar Event.isStrictMode
   * @deprecated 已由Page.isStrictMode替代
   * @see LT#Page#isStrictMode
   *
   * @return {Boolean} 当前页面是否是标准模式
   */
  isStrictMode: document.compatMode !== 'BackCompat',
  /**
   * 获取页面高度
   * @name Event.pageHeight
   * @function
   * @grammar Event.pageHeight()
   * @deprecated 已由Page.pageHeight
   * @see LT#Page#pageHeight
   *
   * @return {Int} 页面高度
   */
  pageHeight() {
    return this.isStrictMode
      ?
      Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
      :
      Math.max(document.body.scrollHeight, document.body.clientHeight);
  },
  /**
   * 获取页面宽度
   * @name Event.pageWidth
   * @function
   * @grammar Event.pageWidth()
   * @deprecated 已由Page.pageWidth
   * @see LT#Page#pageWidth
   *
   * @return {Int} 页面宽度
   */
  pageWidth() {
    return this.isStrictMode
      ?
      Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth)
      :
      Math.max(document.body.scrollWidth, document.body.clientWidth);
  },
  /**
   * 获取窗口宽度
   * @name Event.winWidth
   * @function
   * @grammar Event.winWidth()
   * @deprecated 已由Page.winWidth
   * @see LT#Page#winWidth
   *
   * @return {Int} 窗口宽度
   */
  winWidth() {
    return this.isStrictMode ? document.documentElement.clientWidth : document.body.clientWidth;
  },
  /**
   * 获取窗口高度
   * @name Event.winHeight
   * @function
   * @grammar Event.winHeight()
   * @deprecated 已由Page.winHeight
   * @see LT#Page#winHeight
   *
   * @return {Int} 窗口高度
   */
  winHeight() {
    return this.isStrictMode ? document.documentElement.clientHeight : document.body.clientHeight;
  },
  /**
   * 获取滚动条向上滚动的距离
   * @name Event.scrollTop
   * @function
   * @grammar Event.scrollTop()
   * @deprecated 已由Page.scrollTop
   * @see LT#Page#scrollTop
   *
   * @return {Int} 滚动条向上滚动的距离
   */
  scrollTop() {
    if (Browser.WebKit) {
      return window.pageYOffset;
    }
    return this.isStrictMode ? document.documentElement.scrollTop : document.body.scrollTop;
  },
  /**
   * 获取滚动条向左滚动的距离
   * @name Event.scrollLeft
   * @function
   * @grammar Event.scrollLeft()
   * @deprecated 已由Page.scrollLeft
   * @see LT#Page#scrollLeft
   *
   * @return {Int} 滚动条向左滚动的距离
   */
  scrollLeft() {
    if (Browser.WebKit) {
      return window.pageXOffset;
    }
    return this.isStrictMode ? document.documentElement.scrollLeft : document.body.scrollLeft;
  },
  /**
   * 阻止事件默认行为
   * @name Event.preventDefault
   * @function
   * @grammar Event.preventDefault(event)
   * @param {Event} event event对象
   *
   * @return {Null}
   */
  preventDefault(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  /**
   * 阻止事件冒泡
   * @name Event.stopPropagation
   * @function
   * @grammar Event.stopPropagation(event)
   * @param {Event} event event对象
   *
   * @return {Null}
   */
  stopPropagation() {
    this.stop = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
  },
  /**
   * 事件队列列表
   */
  _queue: {},
  /**
   * 添加一个事件队列
   * @name Event.queue
   * @function
   * @grammar Event.queue(name,func)
   * @param {String} name 队列名称
   * @param {Function} func 队列事件
   *
   * @return {Null}
   */
  queue(name, func) {
    if (func) {
      if (!this._queue[name]) { this._queue[name] = []; }
      this._queue[name].push(func);
    } else {
      this.deQueue(name, func);
    }
  },
  /**
   * 执行一个事件队列
   * @name Event.deQueue
   * @function
   * @grammar Event.deQueue(name)
   * @param {String} name 队列名称
   *
   * @return {Null}
   */
  deQueue(name) {
    const that = this;
    // eslint-disable-next-line prefer-rest-params
    const arg = arguments;
    name && that._queue[name] && (function () {
      that._queue[name].forEach(function (v) {
        v.apply(window, arg);
      });
    }());
  },
};
