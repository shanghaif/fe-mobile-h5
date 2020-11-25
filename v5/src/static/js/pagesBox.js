define("//s.lietou-static.com/dev/c/h5/v2/js/plugins/pagesBox.js", [], function (require, exports) {
  return function ($, window, undefined) {
    function Page(seq, pagesbox) {
      this.$page = pagesbox.pages.eq(seq);
      this.seq = seq;
      this.pagenum = this.$page.length;
      this.unTouched = pagesbox.unTouchedArr.indexOf(this.seq) > -1 ? true : false;
      var pageH = pagesbox.axis === 'y' ? parseInt(this.$page.css('height')) : parseInt(this.$page.css('width'));
      this.transArr = [-pageH * this.seq, -pageH * this.seq - pageH + 1];
    }
    Page.prototype.isUntouched = function () {
      return this.unTouched;
    };
    Page.prototype.getPageTrans = function () {
      return this.transArr[0];
    };
    Page.prototype.getWH = function (axis) {
      if (axis === 'x') {return this.$page.width();}
      return this.$page.height();
    };
    Page.prototype.setCss = function (w, h) {
      this.$page.css({
        'width': w,
        'height': h
      });
    };

    var pluginName = 'PagesBox',
      pluginName_lower = 'pagesBox',
      document = window.document,
      methodHandler = ["goPage", "goStep", "goNext", "goPrev", "goPresent", "offTouch", "onTouch"],
      defaults = {
        speed: 200,
        axis: 'y', //方向: y: vertical, x: horizontal
        pages: 'li', //pages selector name
        unTouchedPages: false, //不能滑动的页
        threshold: 50, //变页的门槛值px值
        loop: false, //是否可以从最后一页到first页
        easing: 'cubic-bezier(.67,.13,.11,.96)', //easing 贝瑟尔曲线
        mouseMoveAvailable: true, //是否支持mouseMove事件
        verticalStyle: true, //竖版
        moveOutOfContainer: false, //上下页可以滑出
        initFn: false, //初始化结束后回调函数
        orientScale: true, //Orientchange时进行缩放
        hash: false //启动hash功能
      };

    function Plugin(element, options) {
        this.options = $.extend({}, defaults, options);
        this.transendEvent = this.getTransendEventName();
        this.transitionName = this.getPrefixProp('transition');
        this.transformName = this.getPrefixProp('transform');
        this.ul = $(element);
        this.container = this.ul.parent();
        this.pages = this.ul.children();
        this.length = this.pages.length;
        this.axis = this.options.axis;
        this.changed = false;
        this.unTouchedArr = [];
        if (this.length === 0) {return false;}
        if (this.options.unTouchedPages) {
          var that = this;
          this.ul.find(this.options.unTouchedPages).each(function () {
            that.unTouchedArr.push($(this).index());
          });
        }
        this._initPx();
        this._initPageArr();
        this.page = 0; //当前显示的页码
        this.prePage = 0;
        this.started = false;
        this.moved = false;
        this.animating = false;
        this.startPos = {};
        this.movePos = {};
        this.endPos = {};
        this.trans = {};
        this.startTrans = {};
        this.scaleSize = 1;
        this.init();
      }
      // Helper function to get the proper vendor property name.
      // (`transition` => `WebkitTransition`)
    Plugin.prototype.getPrefixProp = function (prop) {
      // Handle unprefixed versions (FF16+, for example)
      var div = document.createElement('div');
      if (prop in div.style) {return prop;}

      var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
      var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

      for (var i = 0; i < prefixes.length; ++i) {
        var vendorProp = prefixes[i] + prop_;
        if (vendorProp in div.style) {
          return vendorProp;
        }
      }
    };

    Plugin.prototype.getTransendEventName = function () {
      var eventNames = {
        'transition': 'transitionend',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'msTransition': 'MSTransitionEnd'
      };
      // Detect the 'transitionend' event needed.
      return eventNames[this.getPrefixProp('transition')] || null;
    };

    Plugin.prototype._getTotalWH = function () {
      var total = 0;
      for (var i = 0; i < this.pageArr.length; i++) {
        total += this.pageArr[i].getWH(this.axis);
      }
      return total;
    };
    Plugin.prototype._setPageCss = function (w, h) {
      for (var i = 0; i < this.pageArr.length; i++) {
        this.pageArr[i].setCss(w, h);
      }
    };
    Plugin.prototype._initPx = function () {
      var that = this;
      var wh = document.documentElement.clientHeight,
        ww = document.documentElement.clientWidth;
      //str = str.replace(/scale3d(.*)(\s+)*/, '');

      function switchWH() {
        var t = ww;
        ww = wh;
        wh = t;
      }
      if (that.options.orientScale) {
        if (that.options.verticalStyle) { //竖版
          that.scaleSize = wh > ww ? 1 : (wh / ww);
          //margintop = wh > ww ? 0 : (wh - ww) / 2;
          if (wh < ww) {
            switchWH();
          }
          that.container[0].style[that.transformName + '-origin'] = '50% 0';
        } else { //横版
          that.scaleSize = wh < ww ? 1 : (ww / wh);
          //marginleft = wh < ww ? 'auto' : (ww - wh) / 2;
          if (wh > ww) {
            switchWH();
          }
          that.container[0].style[that.transformName + '-origin'] = '0 0';
        }
      }
      if (that.axis === 'y') {
        that.unitHeight = wh;
        that.ul.css({
          'width': ww,
          'height': this.length * wh
        });
      } else {
        that.unitHeight = ww;
        that.ul.css({
          'width': this.length * ww,
          'height': wh
        });
      }
      that.pages.css({
        'width': ww,
        'height': wh
      });
      that.container.css({
        'width': ww,
        'height': wh
      });

      that.container[0].style[that.transformName] = 'scale3d(' + that.scaleSize + ',' + that.scaleSize + ',1)';
    };

    Plugin.prototype._initPageArr = function () {
      var that = this;
      that.pageArr = [];
      that.pages.each(function (i, v) {
        that.pageArr[i] = new Page($(this).index(), that);
      });
    };

    Plugin.prototype.init = function () {
      var that = this;
      this._setTransform(0);
      //绑定tuchstart事件
      this.handler = {
        tstart: function (e) {
          that._eventstart.call(that, e, true);
        },
        tmove: function (e) {
          that._eventmove.call(that, e, true);
        },
        tend: function (e) {
          that._eventend.call(that, e, true);
        },
        mstart: function (e) {
          that._eventstart.call(that, e, false);
        },
        mmove: function (e) {
          that._eventmove.call(that, e, false);
        },
        mend: function (e) {
          that._eventend.call(that, e, false);
        }
      };
      document.addEventListener('touchstart', that.handler.tstart, false);
      document.addEventListener('touchmove', that.handler.tmove, false);
      document.addEventListener('touchend', that.handler.tend, false);

      if (this.options.mouseMoveAvailable) { //鼠标事件
        document.addEventListener('mousedown', that.handler.mstart, false);
        document.addEventListener('mousemove', that.handler.mmove, false);
        document.addEventListener('mouseup', that.handler.mend, false);
      }
      //绑定webkitTransitionEnd事件
      this.ul[0].addEventListener(that.transendEvent, function (e) {
        //this.started = false; 
        that._transitionend.call(that, e);
        that.ul.trigger('transend', that.page);
      }, false);
      window.addEventListener("orientationchange", function (e) {
        that.ul.css('visibility', 'hidden');
        setTimeout(function () {
          that._initPx();
          that._initPageArr();
          that.goPage(that.page, that.page, 1);
          that.ul.css('visibility', 'visible');
          that.ul.trigger('orientchange', that.page);
        }, 300);
      }, false);
      if (this.options.hash) {
        var hash = parseInt(location.hash.substring(1));
        hash = isNaN(hash) ? 0 : hash;
        this.page = hash >= this.length ? this.length - 1 : hash;
        this.goPage(this.page, this.page, 1);
        this.ul.css('visibility', 'visible');
      }
      this.options.initFn && this.options.initFn();
    };

    Plugin.prototype._eventstart = function (e, iftouch) {
      var ev = iftouch ? e.changedTouches[0] : e;
      this.started = false;
      this.removeTrans();
      this.startPos = {
        x: ev.pageX,
        y: ev.pageY
      };
      this.startTrans = this._getTrans();
      // if (this.options.unTouchedPages && this.unTouchedArr.indexOf(this.startTrans[this.axis]) > -1) {
      //   return false;
      // }
      if (this._isUntouched(this.page)) {
        return false;
      }
      this.started = true;
      this.moved = false;
      this.startTime = e.timeStamp;
      //e.preventDefault();
      //e.stopPropagation();
    };

    Plugin.prototype._eventmove = function (e, iftouch) {

      if (!this.started) {return;}
      this.moved = true;
      e.preventDefault();
      //e.stopPropagation();
      var ev = iftouch ? e.changedTouches[0] : e;
      this.movePos = {
        x: ev.pageX,
        y: ev.pageY
      };
      this.moveTime = e.timeStamp;
      // if (this.movePos[this.axis] <= 5) { //微信ios从页顶移出有touchend不触发的bug
      //   this.moved = false;
      //   this.started = false;
      //   this.goNext();
      //   return;
      // }
      var step = this.movePos[this.axis] - this.startPos[this.axis];
      if (!this.options.moveOutOfContainer && (step > 0 && this.page === 0 || step < 0 && this.page === this.length - 1)) {
        return;
      } else {
        this.goStep(this._getPageTrans() + step);
      }
      //this.goStep(this.startTrans[this.axis] + this.movePos[this.axis] - this.startPos[this.axis]);
    };

    Plugin.prototype._eventend = function (e, iftouch) {
      if (!this.started) {return;}
      this.moved = false;
      this.started = false;
      var ev = iftouch ? e.changedTouches[0] : e;
      //e.stopPropagation();
      //e.preventDefault();

      this.endPos = {
        x: ev.pageX,
        y: ev.pageY
      };
      var mvstep = this.endPos[this.axis] - this.startPos[this.axis];
      this.trans = this._getTrans();
      this.endTime = e.timeStamp;
      if (mvstep !== 0) {
        if (mvstep >= this.options.threshold) {
          this.goPrev();
        } else if (mvstep <= -this.options.threshold) {
          this.goNext();
        } else {
          this.goPresent();
        }
      }
    };

    Plugin.prototype._getPageIndex = function (h) {
      if (h < this.pageArr[0]) {return -1;}
      for (var i = 0; i < this.pageArr.length; i++) {
        if (h <= this.pageArr[i][1] && h >= this.pageArr[i][0]) {return i;}
      }
      return i;
    };

    Plugin.prototype._getTrans = function () {
      var transformStr = this.ul[0].style[this.transformName] || '',
        arrTrans = transformStr.match(/translate3d\((.*)\)/),
        arr;
      if (!arrTrans || arrTrans.length === 0) {
        this.ul[0].style[this.transformName] = transformStr.replace(/translate3d\(.*\)(\s+)*/, '') + ' translate3d(0,0,0)';
        arr = [0, 0, 0];
      } else {
        arr = arrTrans[1].split(',');
      }
      return {
        x: parseInt(arr[0], 10),
        y: parseInt(arr[1], 10)
      };
    };
    Plugin.prototype._transitionend = function (e) {
      var that = this;
      this.animating = false;
      this.options.transEndCb && this.options.transEndCb.call(that, that.page);
    };
    Plugin.prototype.getAxis = function () {
      return this.options.axis;
    };
    Plugin.prototype.goStep = function (step) {
      this.trans[this.axis] = step;
      this._setTransform(step);
    };

    Plugin.prototype._isUntouched = function (page) {
      if (typeof page === 'undefined') {page = this.page;}
      return this.pageArr[page].isUntouched();
    };
    Plugin.prototype._pageEventmove = function (step, page) {
      if (typeof page === 'undefined') {page = this.page;}
      this.getPageTrans + movestep;
    };
    Plugin.prototype._pageEventend = function (step) {
      this.pageArr[this.page].eventend(step);
    };
    Plugin.prototype._getPageTrans = function (page) {
      if (typeof page === 'undefined') {page = this.page;}
      return this.pageArr[page].getPageTrans();
    };
    Plugin.prototype._setTransform = function (step) {
      var str = this.ul[0].style[this.transformName];
      str = str.replace(/translate3d\(.*\)(\s+)*/, '');
      if (this.axis === 'y') {
        this.ul[0].style[this.transformName] = str + ' translate3d(0,' + step + 'px,0)';
      } else {
        this.ul[0].style[this.transformName] = str + ' translate3d(' + step + 'px,0,0)';
      }
    };
    Plugin.prototype.goPage = function (to, from, ifNotrans) {
      this.page = to;
      this.options.hash && (location.hash = '#' + to);
      if (typeof from === 'undefined') {
        from = this.page;
      }
      if (typeof ifNotrans === 'undefined' || !ifNotrans) {
        this.addTrans();
      } else {
        this.removeTrans();
      }
      if (to >= this.length) {
        to = from >= this.length ? this.length - 1 : from;
      } else if (to < 0) {
        to = 0;
      }
      var newMargin = this._getPageTrans(to);
      this._setTransform(newMargin);
      if (to === from || ifNotrans) {
        this.animating = false;
      } else {
        this.animating = true;
      }
      this.ul.trigger('gopage', [to, from]);
    };

    Plugin.prototype.goNext = function () {
      var index = this.page;
      if (index >= this.length - 1) {
        if (this.options.loop) {
          index = 0;
        }
      } else {
        index++;
      }
      this.goPage(index, this.page);
    };

    Plugin.prototype.goPrev = function () {
      var index = this.page;
      if (index >= 1) {
        index--;
      } else {
        if (this.options.loop) {
          index = this.length;
        } else {
          index = 0;
        }
      }
      this.goPage(index, this.page);
    };
    Plugin.prototype.goPresent = function () {
      this.goPage(this.page, this.page);
    };

    Plugin.prototype.offTouch = function () {
      var that = this;
      document.removeEventListener('touchstart', that.handler.tstart, false);
      document.removeEventListener('touchmove', that.handler.tmove, false);
      document.removeEventListener('touchend', that.handler.tend, false);
      if (this.options.mouseMoveAvailable) { //鼠标事件
        document.removeEventListener('mousedown', that.handler.mstart, false);
        document.removeEventListener('mousemove', that.handler.mmove, false);
        document.removeEventListener('mouseup', that.handler.mend, false);
      }
    };

    Plugin.prototype.onTouch = function () {
      this.offTouch();
      var that = this;
      document.addEventListener('touchstart', that.handler.tstart, false);
      document.addEventListener('touchmove', that.handler.tmove, false);
      document.addEventListener('touchend', that.handler.tend, false);
      if (this.options.mouseMoveAvailable) { //鼠标事件
        document.addEventListener('mousedown', that.handler.mstart, false);
        document.addEventListener('mousemove', that.handler.mmove, false);
        document.addEventListener('mouseup', that.handler.mend, false);
      }
    };

    Plugin.prototype.addTrans = function () {
      this.ul[0].style[this.transitionName] = 'all ' + this.options.speed / 1000 + 's ' + this.options.easing;
    };

    Plugin.prototype.removeTrans = function () {
      this.ul[0].style[this.transitionName] = 'all 0 linear';
    };

    $.fn[pluginName] = $.fn[pluginName_lower] = function (options) {
      if (typeof options === 'string') {
        var args = arguments,
          method = options,
          isHandler = function () {
            for (var i = 0; i < methodHandler.length; i++) {
              if (methodHandler[i] === method) {return true;}
            }
            return false;
          };
        Array.prototype.shift.call(args);
        if (method === 'check') {
          return !!this.data('plugin_' + pluginName);
        } else if (isHandler()) {
          return this.each(function () {
            var _plugin = $(this).data('plugin_' + pluginName);
            if (_plugin && _plugin[method]) {_plugin[method].apply(_plugin, args);}
          });
        } else {
          throw new TypeError(pluginName + ' has no method "' + method + '"');
        }
      } else {
        return this.each(function () {
          var _plugin = $(this).data('plugin_' + pluginName);
          if (!_plugin) {
            $(this).data('plugin_' + pluginName, new Plugin(this, options));
          }
        });
      }
    };
  };
});