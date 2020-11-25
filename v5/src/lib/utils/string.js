/* eslint-disable no-cond-assign */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */

import { rootDomain } from './domain';
import cookieUtil from './cookie';
import userUtil from './user';

/**
 * String相关操作
 * @namespace String
 * @name LT.String
 * @static
 */
const StringUtil = {
  /**
   * 获取字符串的字节数，一个汉字为2个字节
   * @function
   * @name LT.String.realLength
   * @grammar LT.String.realLength(source)
   * @param {String} source 需要判断的字符串
   *
   * @return {Number} 字符串的字节数
   */
  realLength(source) {
    return source.replace(/[\u4e00-\u9fa5]/g, '**').length;
  },
  /**
   * 将字符串中的换行符替换为&lt;br /&gt;
   * @function
   * @name LT.String.nl2br
   * @grammar LT.String.nl2br(source)
   * @param {String} source 需要替换的字符串
   *
   * @return {String} 对字符串替换后的结果
   */
  nl2br(source) {
    return (source || '').replace(/([^>])\n/g, '$1<br />');
  },
  /**
   * 过滤字符串中的HTML标签
   * @name LT.String.stripTags
   * @function
   * @grammar LT.String.stripTags( source )
   * @param {string} source 待过滤的字符串
   *
   * @return {string} 对字符串过滤后的结果
   */
  stripTags(source) {
    return source.replace(/<\/?[^>]+>/igm, '');
  },
  /**
   * 过滤字符串中的Script标签
   * @name LT.String.stripScript
   * @function
   * @grammar LT.String.stripScript( source )
   * @param {string} source 待过滤的字符串
   *
   * @return {string} 对字符串过滤后的结果
   */
  stripScript(source) {
    return source.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/igm, '');
  },
  /**
   * 转换字符串中的"&lt;"，"&gt;"为对应的HTML编码："&amp;lt;"、"&amp;gt;"
   * @name LT.String.escapeHTML
   * @function
   * @grammar LT.String.escapeHTML( source )
   * @param {string} source 待转换的字符串
   *
   * @return {string} 对字符串转换后的结果
   */
  escapeHTML(source) {
    return source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },
  /**
   * 转换字符串中的"&amp;lt;"、"&amp;gt;"为对应的HTML字符："&lt;"，"&gt;"
   * @name LT.String.unescapeHTML
   * @function
   * @grammar LT.String.unescapeHTML( source )
   * @param {string} source 待转换的字符串
   *
   * @return {string} 对字符串转换后的结果
   */
  unescapeHTML(source) {
    return source.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&');
  },
  /**
   * 从某一位置，截取指定长度的字符串，一个中文的长度为2
   * @name LT.String.substr
   * @function
   * @grammar LT.String.substr(source[, begin, num, dot])
   * @param {string} source 需要处理的字符串
   * @param {number} [begin] 截取的开始位置（字节数）
   * @param {number} [num] 截取的长度（字节数）
   * @param {string} [dot] 截取后补的字符串，一般为...
   *
   * @return {string} 对字符串截取后的结果
   */
  substr(source, begin, num, dot) {
    // eslint-disable-next-line no-control-regex
    const ascRegexp = /[^\x00-\xFF]/g;
    let i = 0;
    const ibegin = begin;
    while (i < begin) { (i++ && source.charAt(i).match(ascRegexp) && begin--); }
    i = begin;
    let end = begin + num;
    while (i < end) { (i++ && source.charAt(i).match(ascRegexp) && end--); }
    if (dot) {
      if (source.length > end) {
        source = LT.String.substr(
          source,
          ibegin, num - dot.length + (dot.length % 2 === 0 ? 0 : 1), false
        );
        return source + dot;
      }
    }
    return source.substring(begin, end);
  },
  /**
   * 判断字符串中是否包含另外一个字符串
   * @name LT.String.include
   * @function
   * @grammar LT.String.include( source, key )
   * @param {string} source 目标字符串
   * @param {string} key 待查找的字符串
   *
   * @return {Boolean} 查找的结果
   */
  include(source, key) {
    return source.indexOf(key) > -1;
  },
  /**
   * 判断字符串是否以指定字符串开始
   * @name LT.String.startsWith
   * @function
   * @grammar LT.String.startsWith( source, key )
   * @param {string} source 目标字符串
   * @param {string} key 待查找的字符串
   *
   * @return {Boolean} 查找的结果
   */
  startsWith(source, key) {
    return source.indexOf(key) === 0;
  },
  /**
   * 判断字符串是否以指定字符串结束
   * @name LT.String.endsWith
   * @function
   * @grammar LT.String.endsWith( source, key )
   * @param {string} source 目标字符串
   * @param {string} key 待查找的字符串
   *
   * @return {Boolean} 查找的结果
   */
  endsWith(source, key) {
    const d = source.length - key.length;
    return d >= 0 && source.lastIndexOf(key) === d;
  },
  /**
   * 判断字符串是否为空
   * @name LT.String.isBlank
   * @function
   * @grammar LT.String.isBlank( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isBlank(source) {
    return /^\s*$/.test(source);
  },
  /**
   * 判断字符串是否为一个合法的Email
   * @name LT.String.isEmail
   * @function
   * @grammar LT.String.isEmail( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isEmail(source) {
    // eslint-disable-next-line no-useless-escape
    return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/.test(source);
  },
  /**
   * 判断字符串是否为一个合法的手机号码
   * @name LT.String.isMobile
   * @function
   * @grammar LT.String.isMobile( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isMobile(source) {
    // eslint-disable-next-line no-useless-escape
    return /^00((6001\d{8})|(8201[016]\d{8})|(919\d{9})|(330\d{9})|(6402\d{7,9})|(346\d{8})|(393\d{9})|(3519\d{8}))+$/.test(source) || /^((\(\d{2,3}\))|(\d{3}\-))?(1[2-9]\d{9})$/.test(source) || /^(001)[2-9]\d{9}$/.test(source);
  },
  /**
   * 判断字符串是否为一个合法的URL地址
   * @name LT.String.isUrl
   * @function
   * @grammar LT.String.isUrl( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isUrl(source) {
    // eslint-disable-next-line no-useless-escape
    return /^(http:|https:|ftp:)\/\/(?:[0-9a-zA-Z]+|[0-9a-zA-Z][\w-]+)\.[\w-]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/.test(source);
  },
  /**
   * 判断字符串是否为一个合法的IP地址
   * @name LT.String.isIp
   * @function
   * @grammar LT.String.isIp( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isIp(source) {
    return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])\.(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.test(source);
  },
  /**
   * 判断字符串是否为纯数字组成
   * @name LT.String.isNumber
   * @function
   * @grammar LT.String.isNumber( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isNumber(source) {
    return /^\d+$/.test(source);
  },
  /**
   * 判断字符串是否为一个合法的邮政编码
   * @name LT.String.isZip
   * @function
   * @grammar LT.String.isZip( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isZip(source) {
    return /^[1-9]\d{5}$/.test(source);
  },
  /**
   * 判断字符串是否为纯英文字符组成
   * @name LT.String.isEN
   * @function
   * @grammar LT.String.isEN( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isEN(source) {
    return /^[A-Za-z]+$/.test(source);
  },
  /**
   * 判断字符串是否为纯中文组成
   * @name LT.String.isCN
   * @function
   * @grammar LT.String.isCN( source )
   * @param {string} source 目标字符串
   *
   * @return {Boolean} 判断结果
   */
  isCN(source) {
    return /^[\u4e00-\u9fa5]+$/.test(source);
  },
  /**
   * 判断字符串是否为一个合法的身份证号码
   * @name LT.String.isIdCard
   * @function
   * @grammar LT.String.isIdCard( source, strict )
   * @param {string} source 目标字符串
   * @param {boolean} strict 是否严格判断
   *
   * @return {Boolean} 判断结果
   */
  isIdCard(source, strict) {
    if (!strict) { return /^\d{17}[xX\d]$|^\d{15}$/.test(source); }
    const DATES = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function isLeap(year) {
      return ((year % 4) === 0 && (year % 400) !== 0) ||
        ((year % 400) === 0);
    }

    function verifyDate(year, month, date) {
      if (month < 1 || month > 12) {
        return false;
      }
      let days = DATES[month];
      if (month === 2 && isLeap(year)) {
        days = 29;
      }
      return date > 0 && date <= days;
    }
    /**
     * 15位身份证号码组成：
     * `ddddddyymmddxxs` 共 15 位，其中：
     * `dddddd` 为 6 位的地方代码，根据这 6 位可以获得该身份证号所在地。
     * `yy` 为 2 位的年份代码，是身份证持有人的出身年份。
     * `mm` 为 2 位的月份代码，是身份证持有人的出身月份。
     * `dd` 为 2 位的日期代码，是身份证持有人的出身日。
     *    这 6 位在一起组成了身份证持有人的出生日期。
     * `xx` 为 2 位的顺序码，这个是随机数。
     * `s` 为 1 位的性别代码，奇数代表男性，偶数代表女性。
     */
    function verify15(id) {
      if (!/^[0-9]{15}$/.test(id)) {
        return false;
      }
      /*
       *var region = id.substr(0,6);
       * 1999/10/01 之后颁发 18 位第二代居民身份证。
       */
      const year = parseInt(`19${id.substr(6, 2)}`, 10);
      const month = parseInt(id.substr(8, 2), 10);
      const date = parseInt(id.substr(10, 2), 10);
      /*
       *var rand = id.substr(12,2);
       *var sex = id.substr(14,1);
       */
      if (!verifyDate(year, month, date)) {
        return false;
      }
      return true;
    }
    /**
     * 18位身份证号码组成：
     * `ddddddyyyymmddxxsp` 共18位，其中：
     * 其他部分都和15位的相同。年份代码由原来的2位升级到4位。最后一位为校验位。
     * 校验规则是：
     * （1）十七位数字本体码加权求和公式
     * S = Sum(Ai * Wi), i = 0, ... , 16 ，先对前17位数字的权求和
     * Ai:表示第i位置上的身份证号码数字值
     * Wi:表示第i位置上的加权因子
     * Wi: 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2
     * （2）计算模
     * Y = mod(S, 11)
     * （3）通过模得到对应的校验码
     * Y:      0 1 2 3 4 5 6 7 8 9 10
     * 校验码: 1 0 X 9 8 7 6 5 4 3 2
     *
     * 如果得到余数为 1 则最后的校验位 p 应该为对应的 0。
     * 如果校验位不是，则该身份证号码不正确。
     */
    const WI = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const VERIFY_CODE = '10X98765432';

    function verify18(id) {
      if (!/^[0-9]{17}[0-9xX]$/.test(id)) {
        return false;
      }

      const year = parseInt(id.substr(6, 4), 10);
      const month = parseInt(id.substr(10, 2), 10);
      const date = parseInt(id.substr(12, 2), 10);
      const vcode = id.substr(17, 1);

      if (!verifyDate(year, month, date)) {
        return false;
      }
      let sum = 0;
      for (let i = 0; i < 17; i++) {
        sum += parseInt(id.charAt(i), 10) * WI[i];
      }
      const mod = sum % 11;
      return VERIFY_CODE.charAt(mod) === vcode;
    }

    function verify(id) {
      if (!id) {
        return false;
      }
      id = String(id);
      if (id.length === 18) {
        return verify18(id);
      }
      if (id.length === 15) {
        return verify15(id);
      }
      return false;
    }
    return verify(source);
  },
  /**
   * 获取Email登录地址
   * @name LT.String.getEmailLoginUrl
   * @function
   * @grammar LT.String.getEmailLoginUrl( email )
   * @param {string} email email地址
   *
   * @return {String} 登录的Url地址
   */
  getEmailLoginUrl(email) {
    if (!email || !this.isEmail(email)) { return 'about:blank'; }
    const urls = [
      '163.com',
      '126.com',
      'qq.com',
      '139.com',
      'hotmail.com',
      'sohu.com',
      'sina.com',
      'sina.cn',
      'yeah.net',
      '189.cn',
      '21cn.com',
      '21cn.net',
      'yahoo.cn',
      'yahoo.com.cn',
      'yahoo.com',
      ['gmail.com', 'mail.google.com'],
    ];
    const domain = email.substring(email.indexOf('@') + 1);
    let redirect = `www.${domain}`;
    // eslint-disable-next-line array-callback-return
    urls.map((value) => {
      if (!Array.isArray(value)) { value = [value, `mail.${value}`]; }
      if (domain === value[0]) { redirect = value[1]; }
    });
    return `http://${redirect}`;
  },
  /**
   * 获取URL地址中的指定键值
   * @name LT.String.getQuery
   * @function
   * @grammar LT.String.getQuery( key[ , url] )
   * @param {string} key 指定的键名
   * @param {string} [url] 目标URL地址，如果为空，则为当前页面URL地址
   *
   * @return {String|Array} URL中指定键名对应的值，如果为多个，则返回数组
   */
  getQuery(key, url) {
    url = url || `${window.location.href}`;
    if (url.indexOf('#') !== -1) { url = url.substring(0, url.indexOf('#')); }
    const rts = [];
    let rt;
    const queryReg = new RegExp(`(^|\\?|&)${key}=([^&]*)(?=&|#|$)`, 'g');
    // eslint-disable-next-line no-cond-assign
    while ((rt = queryReg.exec(url)) !== null) {
      rts.push(decodeURIComponent(rt[2]));
    }
    if (rts.length === 0) { return null; }
    if (rts.length === 1) { return rts[0]; }
    return rts;
  },
  /**
   * 设置URL地址中的指定键值
   * @name LT.String.setQuery
   * @function
   * @grammar LT.String.setQuery( key, value[ , url] )
   *  | LT.String.setQuery( array [ , url] ) | LT.String.setQuery( object [ , url] )
   * @param {string} key 指定的键名
   * @param {string} value 键名对应的键值
   * @param {array} array 数组，数组中的每一个元素都是一个对象
   * @param {object} object 对象
   * @param {string} url 目标URL地址，如果为空，则为当前页面URL地址
   * @example
   * //传入key|value的形式设置
   * var url = "http://www.lietou.com";
   * LT.String.setQuery("id", "123", url);
   * ------------------------------------------
   * http://www.lietou.com?id=123
   * @example
   * //传入object的形式设置
   * var url = "http://www.lietou.com";
   * LT.String.setQuery({"id": "123"});
   * ------------------------------------------
   * http://www.lietou.com?id=123
   * @example
   * //传入array的形式设置
   * var url = "http://www.lietou.com";
   * LT.String.setQuery([{"id": "123"},"name": "lietou"]);
   * ------------------------------------------
   * http://www.lietou.com?id=123&name=lietou
   *
   * @return {String} 设置参数后的URL地址
   */
  setQuery(key, value, url) {
    if (Array.isArray(key)) {
      url = value || `${window.location.href}`;
      for (let i = 0; i < key.length; i++) {
        url = this.setQuery(key[i], url);
      }
      return url;
    }
    if (Array.isArray(key)) {
      url = value || `${window.location.href}`;
      // eslint-disable-next-line guard-for-in
      // eslint-disable-next-line no-restricted-syntax
      for (const i in key) {
        url = this.setQuery(i, key[i], url);
      }
      return url;
    }
    url = url || `${window.location.href}`;
    let hash = '';
    // if ( !/^http/.test(url) ) return url;
    if (url.indexOf('#') !== -1) { hash = url.substring(url.indexOf('#')); }
    url = url.replace(hash, '');
    url = url.replace(new RegExp(`(^|\\?|&)${key}=[^&]*(?=&|#|$)`, 'g'), '$1');
    url = url.replace(/(\?|&)&*/g, '$1');
    url = url.replace(/&+$/g, '');
    value = Array.isArray(value) ? value : [value];
    for (let i = value.length - 1; i >= 0; i--) {
      value[i] = encodeURIComponent(value[i]);
    }
    const p = `${key}=${value.join(`&${key}=`)}`;
    return url + (/\?/.test(url) ? '&' : '?') + p + hash;
  },
  queryToObject(url) {
    url = url || `${window.location.href}`;
    let hash = '';
    const obj = {};
    // if ( !/^http/.test(url) ) return url;
    if (url.indexOf('#') !== -1) { hash = url.substring(url.indexOf('#')); }
    url = url.replace(hash, '');
    url = url.indexOf('?') !== -1 ? url.substring(url.indexOf('?') + 1) : url;
    // eslint-disable-next-line array-callback-return
    url.split('&').map((item) => {
      const val = item.split('=');
      try {
        if (val.length >= 2) { obj[val[0]] = decodeURIComponent(val[1]); }
      } catch (e) {
        console.log(e);
      }
    });
    return obj;
  },
  /**
   * 将字符串分割为一个数组
   * @name LT.String.split
   * @function
   * @grammar LT.String.split( str, separator[, limit] )
   * @param {string} str 待分割的字符串
   * @param {string} separator 正则表达式
   * @param {string} [limit] 匹配的次数
   * @remark 大部分情况下，该方法等同于String.split，此举是为修复IE浏览器String.split方法传入正则表达式时，与其他浏览器结果不一致的bug
   *
   * @return {String[]} 分割后的数组
   */
  split(str, separator, limit) {
    if (Object.prototype.toString.call(separator) !== '[object RegExp]') { return str.split(separator, limit); }
    const output = [];
    let lastLastIndex = 0;
    const flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.sticky ? 'y' : '');
    const compliantExecNpcg = /()??/.exec('')[1] === undefined;
    let separator2;
    let match;
    let lastIndex;
    let lastLength;
    separator = new RegExp(separator.source, `${flags}g`);
    str += '';
    if (!compliantExecNpcg) { separator2 = new RegExp(`^${separator.source}$(?!\\s)`, flags); }
    if (limit === undefined || +limit < 0) {
      limit = Infinity;
    } else {
      limit = Math.floor(+limit);
      if (!limit) { return []; }
    }
    // eslint-disable-next-line no-sequences
    while (match = separator.exec(str), match) {
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        if (!compliantExecNpcg && match.length > 1) {
          // eslint-disable-next-line no-loop-func
          match[0].replace(separator2, function () {
            for (let i = 1; i < arguments.length - 2; i++) {
              // eslint-disable-next-line prefer-rest-params
              if (arguments[i] === undefined) { match[i] = undefined; }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) { break; }
      }
      if (separator.lastIndex === match.index) { separator.lastIndex++; }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test('')) { output.push(''); }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  },
  /**
   * 对字符串进行MD5加密
   * @name LT.String.md5
   * @function
   * @grammar LT.String.md5(data)
   * @param {string} data 传入的字符串
   *
   * @return {String} 字符串加密后的MD5值
   */
  md5(data) {
    const hexcase = 0;
    // const b64pad = '';
    const chrsz = 8;

    function binl2hex(binarray) {
      const hexTab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
      let str = '';
      for (let i = 0; i < binarray.length * 4; i++) {
        str += hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF)
         + hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
      }
      return str;
    }
    function bitRol(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    }
    function safeAdd(x, y) {
      const lsw = (x & 0xFFFF) + (y & 0xFFFF);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }
    function md5Cmn(q, a, b, x, s, t) {
      return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }
    function md5Ff(a, b, c, d, x, s, t) {
      return md5Cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function md5Gg(a, b, c, d, x, s, t) {
      return md5Cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function md5Hh(a, b, c, d, x, s, t) {
      return md5Cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function md5Ii(a, b, c, d, x, s, t) {
      return md5Cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    function coreMd5(x, len) {
      x[len >> 5] |= 0x80 << ((len) % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;
      let a = 1732584193;
      let b = -271733879;
      let c = -1732584194;
      let d = 271733878;
      for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        a = md5Ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5Ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5Ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5Ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5Ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5Ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5Ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5Ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5Ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5Ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5Ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5Ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5Ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5Ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5Ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5Ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5Gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5Gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5Gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5Gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5Gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5Gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5Gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5Gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5Gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5Gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5Gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5Gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5Gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5Gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5Gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5Gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5Hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5Hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5Hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5Hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5Hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5Hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5Hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5Hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5Hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5Hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5Hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5Hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5Hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5Hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5Hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5Hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5Ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5Ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5Ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5Ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5Ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5Ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5Ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5Ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5Ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5Ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5Ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5Ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5Ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5Ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5Ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5Ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
      }
      return [a, b, c, d];
    }
    function str2binl(str) {
      const bin = [];
      const mask = (1 << chrsz) - 1;
      for (let i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
      }
      return bin;
    }
    function hexMd5(s) {
      return binl2hex(coreMd5(str2binl(s), s.length * chrsz));
    }
    /*
     * 已声明但是未调取
     * function b64_md5(s) { // jshint ignore:line
     *   return binl2b64(coreMd5(str2binl(s), s.length * chrsz));
     * }
     * function hex_hmac_md5(key, data) { // jshint ignore:line
     * return binl2hex(core_hmac_md5(key, data));
     * }
     *
     * function b64_hmac_md5(key, data) { // jshint ignore:line
     * return binl2b64(core_hmac_md5(key, data));
     * }
     *
     * function calcMD5(s) { // jshint ignore:line
     * return binl2hex(coreMd5(str2binl(s), s.length * chrsz));
     * }
     *
     * function md5_vm_test() { // jshint ignore:line
     * return hexMd5('abc') === '900150983cd24fb0d6963f7d28e17f72';
     * }
     * function core_hmac_md5(key, data) {
     * let bkey = str2binl(key);
     * if (bkey.length > 16) { bkey = coreMd5(bkey, key.length * chrsz); }
     * let ipad = new Array(16),
     * opad = new Array(16);
     * for (let i = 0; i < 16; i++) {
     * ipad[i] = bkey[i] ^ 0x36363636;
     * opad[i] = bkey[i] ^ 0x5C5C5C5C;
     * }
     * const hash = coreMd5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
     * return coreMd5(opad.concat(hash), 512 + 128);
     * }
     * function binl2b64(binarray) {
     * const tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
     * let str = '';
     * for (let i = 0; i < binarray.length * 4; i += 3) {
     * const triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
     * | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
     * | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
     * for (let j = 0; j < 4; j++) {
     * if (i * 8 + j * 6 > binarray.length * 32) {
     * str += b64pad;
     * } else { str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F); }
     * }
     * }
     * return str;
     * }
     */

    return hexMd5(data);
  },
  /**
   * 猎聘网前端字符串加密算法-for简历
   * @name LT.String.encrypt
   * @function
   * @grammar LT.String.encrypt( source )
   * @param {string} source 密钥
   * @remark 带有及其强烈的欺骗性
   *
   * @return {String} 加密后的字符串
   */
  encrypt(source, cookiename) {
    const userid = userUtil.user_id || '0';
    const key1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
    const len1 = key1.length;
    const key2 = userid.split('');
    const key3 = parseInt(userid, 10);
    const key4 = key1.slice(key3 % len1).concat(key1.slice(0, key3 % len1).reverse());
    const result = [];
    for (let i = 0; i < key2.length; i++) {
      result.push(key4[(i * i + parseInt(key2[i], 10)) % key4.length]);
    }
    cookiename && cookieUtil.set(cookiename, result.join(''));
    key4.reverse();
    result.sort();
    for (let i = 0; i < key2.length; i++) {
      result.push(key4[(i * i + parseInt(key2[i], 10)) % key4.length]);
    }
    if (window.location.hostname.split('.').reverse().slice(0, 2).reverse()
      .join('.') === rootDomain) {
      return this.md5(result.join('') + source + userid).split('').reverse().join('');
    }
    return this.md5(userid + result.join('') + source).split('').reverse().join('');
  },
  /**
   * 猎聘网前端字符串加密算法-for手机号
   * @name LT.String.encryptMobile
   * @function
   * @grammar LT.String.encryptMobile( source )
   *
   * @return {String} 加密后的字符串
   */
  encryptMobile(name, value) {
    let md5key;
    let md5value;
    if (name && value) {
      value = value.split('').sort().join('') + name;
      md5key = this.md5(value).substring(4, 12);
      value = value.split('').sort().join('');
      md5value = this.md5(value);
      cookieUtil.set(md5key, md5value, false, '/', rootDomain);
    }
    return this;
  },
};

export default StringUtil;
