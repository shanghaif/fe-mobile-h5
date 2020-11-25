/* eslint-disable no-param-reassign */
/**
 * Date相关操作
 * @namespace Date
 * @name Date
 * @static
 */
export default {
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  /**
   * 判断某个日期是否闰年
   * @name Date.isLeapYear
   * @function
   * @grammar Date.isLeapYear(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Boolean} 是否闰年
   */
  isLeapYear(date) {
    const y = date.getFullYear();
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  },
  /**
   * 判断某个日期是否周末
   * @name Date.isWeekend
   * @function
   * @grammar Date.isWeekend(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Boolean} 是否周末
   */
  isWeekend(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  },
  /**
   * 判断某个日期是否工作日
   * @name Date.isWeekDay
   * @function
   * @grammar Date.isWeekDay(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Boolean} 是否工作日
   */
  isWeekDay(date) {
    return !this.isWeekend(date);
  },
  /**
   * 获取某个日期当月中的天数
   * @name Date.getDaysInMonth
   * @function
   * @grammar Date.getDaysInMonth(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Int} 天数
   */
  getDaysInMonth(date) {
    return [31,
      (this.isLeapYear(date) ? 29 : 28),
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
  },
  /**
   * 获取日期是星期几
   * @name Date.getDayName
   * @function
   * @grammar Date.getDayName(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {String} 星期几
   */
  getDayName(date) {
    return this.dayNames[date.getDay()];
  },
  /**
   * 获取日期的月份名
   * @name Date.getMonthName
   * @function
   * @grammar Date.getMonthName(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {String} 月
   */
  getMonthName(date) {
    return this.monthNames[date.getMonth()];
  },
  /**
   * 获取当前日期是当年中的第几天
   * @name Date.getDayOfYear
   * @function
   * @grammar Date.getDayOfYear(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Int} 第几天
   */
  getDayOfYear(date) {
    const tmpdtm = new Date(`1/1/${date.getFullYear()}`);
    return Math.floor((date.getTime() - tmpdtm.getTime()) / 86400000);
  },
  /**
   * 获取当前日期是当年中的第几周
   * @name Date.getWeekOfYear
   * @function
   * @grammar Date.getWeekOfYear(date)
   * @param {Date} date 需要判断的日期
   *
   * @return {Int} 第几周
   */
  getWeekOfYear(date) {
    return Math.ceil(this.getDayOfYear(date) / 7);
  },
  /**
   * 设置当前日期中该年的第几天
   * @name Date.setDayOfYear
   * @function
   * @grammar Date.setDayOfYear(date,day)
   * @param {Date} date 需要设置的日期
   * @param {Int} day 天数
   *
   * @return {Date} 设置后的日期
   */
  setDayOfYear(date, day) {
    date.setMonth(0);
    date.setDate(day);
    return date;
  },
  /**
   * 设置零点
   * @name Date.zeroTime
   * @function
   * @grammar Date.zeroTime(date)
   * @param {Date} date 需要设置的日期
   *
   * @return {Date} 零点日期
   */
  zeroTime(date) {
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date;
  },
  /**
   * 计算时间差
   * @name Date.dateDiff
   * @function
   * @grammar Date.dateDiff(start, end, diff)
   * @param {Date} start 开始时间
   * @param {Date} end 结束时间
   * @param {String} diff 计算单位，Y：年，M：月，D：日，H：时，m：分，S：秒
   *
   * @return {Int} 时间差
   */
  dateDiff(start, end, diff) {
    let diffn = 1;
    switch (diff) {
      case 'S':
        diffn = 1000;
        break;
      case 'm':
        diffn = 1000 * 60;
        break;
      case 'H':
        diffn = 1000 * 3600;
        break;
      case 'D':
        diffn = 1000 * 3600 * 24;
        break;
      case 'M':
        diffn = 1000 * 3600 * 24 * 31;
        break;
      case 'Y':
        diffn = 1000 * 3600 * 24 * 365;
        break;
      default:
        break;
    }
    // eslint-disable-next-line radix
    return parseInt((start.getTime() - end.getTime(), 10) / parseInt(diffn, 10));
  },
  /**
   * 对目标日期对象进行格式化
   * @name Date.format
   * @function
   * @grammar Date.format(source, pattern)
   * @param {Date} source 目标日期对象
   * @param {string} pattern 日期格式化规则
   * @remark
   * 格式表达式，变量含义：
   * hh: 带 0 补齐的两位 12 进制时表示
   * h: 不带 0 补齐的 12 进制时表示
   * HH: 带 0 补齐的两位 24 进制时表示
   * H: 不带 0 补齐的 24 进制时表示
   * mm: 带 0 补齐两位分表示
   * m: 不带 0 补齐分表示
   * ss: 带 0 补齐两位秒表示
   * s: 不带 0 补齐秒表示
   * yyyy: 带 0 补齐的四位年表示
   * yy: 带 0 补齐的两位年表示
   * MM: 带 0 补齐的两位月表示
   * M: 不带 0 补齐的月表示
   * dd: 带 0 补齐的两位日表示
   * d: 不带 0 补齐的日表示
   *
   * @return {string} 格式化后的字符串
   */
  format(source, pattern) {
    if (typeof source === 'string') {
      pattern = source;
      source = null;
    }
    source = source || new Date();
    pattern = pattern || 'yyyy-MM-dd HH:mm:ss';

    function replacer(patternPart, result) {
      pattern = pattern.replace(patternPart, result);
    }
    const year = source.getFullYear();


    const month = source.getMonth() + 1;


    const date2 = source.getDate();


    const hours = source.getHours();


    const minutes = source.getMinutes();


    const seconds = source.getSeconds();

    // eslint-disable-next-line no-shadow
    const pad = (source, length) => {
      let pre = '';
      const negative = (source < 0);
      const string = String(Math.abs(source));
      if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0');
      }
      return (negative ? '-' : '') + pre + string;
    };
    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);
    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);
    return pattern;
  },
  /**
   * 将目标字符串转换成日期对象
   * @name Date.parse
   * @function
   * @grammar Date.parse(source)
   * @param {string} source 目标字符串
   * @remark
   * 对于目标字符串，下面这些规则决定了 parse 方法能够成功地解析：
   * 短日期可以使用“/”或“-”作为日期分隔符，但是必须用月/日/年的格式来表示，例如"7/20/96"。
   * 以 "July 10 1995"
   * 形式表示的长日期中的年、月、日可以按任何顺序排列，年份值可以用 2 位数字表示也可以用 4 位数字表示。如果使用 2 位数字来表示年份，那么该年份必须大于或等于 70。
   * 括号中的任何文本都被视为注释。这些括号可以嵌套使用。
   * 逗号和空格被视为分隔符。允许使用多个分隔符。
   * 月和日的名称必须具有两个或两个以上的字符。如果两个字符所组成的名称不是独一无二的，那么该名称就被解析成最后一个符合条件的月或日。例如，"Ju" 被解释为七月而不是六月。
   * 在所提供的日期中，
   * 如果所指定的星期几的值与按照该日期中剩余部分所确定的星期几的值不符合
   * ，那么该指定值就会被忽略。例如，尽管 1996 年 11 月 9 日实际上是星期五
   * "Tuesday November 9 1996" 也还是可以被接受并进行解析的。但是结果 date 对象中包含的是 "Friday November 9 1996"。
   * JScript 处理所有的标准时区，以及全球标准时间 (UTC) 和格林威治标准时间 (GMT)。
   * 小时、分钟、和秒钟之间用冒号分隔，尽管不是这三项都需要指明。"10:"、"10:11"、和 "10:11:12" 都是有效的。
   * 如果使用 24 小时计时的时钟，那么为中午 12 点之后的时间指定 "PM" 是错误的。例如 "23:15 PM" 就是错误的。
   * 包含无效日期的字符串是错误的。例如，一个包含有两个年份或两个月份的字符串就是错误的。
   *
   * @return {Date} 转换后的日期对象
   */
  parse(source) {
    const reg = new RegExp('^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24');
    if (typeof source === 'string') {
      // eslint-disable-next-line no-restricted-globals
      if (reg.test(source) || isNaN(Date.parse(source))) {
        const d = source.split(/ |T/);
        const d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0];
        const d0 = d[0].split(/[^\d]/);
        return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, d1[0] - 0, d1[1] - 0, d1[2] - 0);
      }
      return new Date(source);
    }
    return new Date();
  },
  /**
   * 向指定日期添加“年”
   * @name Date.addYears
   * @function
   * @type Date
   * @grammar Date.addYears(num)
   * @param {Number} num 添加的年数
   * @memberOf Date#
   *
   * @example
   * var dtm = new Date("01/12/2008");
   * Date.addYears(dtm, 1);
   * dtm.toString();
   * @result Mon Jan 12 2009 00:00:00
   *
   * @returns {Date} 添加年数后的日期
   */
  addYears(date, num) {
    date.setFullYear(date.getFullYear() + num);
    return date;
  },
  /**
   * 向指定日期添加“月”
   * @name Date.addMonths
   * @function
   * @type Date
   * @grammar Date.addMonths(num)
   * @param {Number} num 添加的月数
   * @memberOf Date#
   *
   * @example var dtm = new Date("01/12/2008");
   * Date.addMonths(dtm, 1);
   * dtm.toString();
   * @result Tue Feb 12 2008 00:00:00
   *
   * @returns {Date} 添加月数后的日期
   */
  addMonths(date, num) {
    const tmpdtm = date.getDate();
    date.setMonth(date.getMonth() + num);
    if (tmpdtm > date.getDate()) { Date.addDays(date, -date.getDate()); }
    return date;
  },
  /**
   * 向指定日期添加“日”
   * @name Date.addDays
   * @function
   * @type Date
   * @grammar Date.addDays(num)
   * @param {Number} num 添加的日数
   * @memberOf Date#
   *
   * @example var dtm = new Date("01/12/2008");
   * Date.addDays(dtm, 1);
   * dtm.toString();
   * @result Sun Jan 13 2008 00:00:00
   *
   * @returns {Date} 添加日数后的日期
   */
  addDays(date, num) {
    date.setTime(date.getTime() + (num * 86400000));
    return date;
  },
  /**
   * 向指定日期添加“小时”
   * @name Date.addHours
   * @function
   * @type Date
   * @grammar Date.addHours(num)
   * @param {Number} num 添加的小时数
   * @memberOf Date#
   *
   * @example var dtm = new Date("01/12/2008");
   * Date.addHours(dtm, 1);
   * dtm.toString();
   * @result Sun Jan 13 2008 00:00:00
   *
   * @returns {Date} 添加小时数后的日期
   */
  addHours(date, num) {
    date.setHours(date.getHours() + num);
    return date;
  },
  /**
   * 向指定日期添加“分钟”
   * @name Date.addMinutes
   * @function
   * @type Date
   * @grammar Date.addMinutes(num)
   * @param {Number} num 添加的分钟数
   * @memberOf Date#
   *
   * @example var dtm = new Date("01/12/2008");
   * Date.addMinutes(dtm, 1);
   * dtm.toString();
   * @result Sat Jan 12 2008 01:00:00
   *
   * @returns {Date} 添加分钟数后的日期
   */
  addMinutes(date, num) {
    date.setMinutes(date.getMinutes() + num);
    return date;
  },
  /**
   * 向指定日期添加“秒”
   * @name Date.addSeconds
   * @function
   * @type Date
   * @grammar Date.addSeconds(num)
   * @param {Number} num 添加的秒数
   * @memberOf Date#
   *
   * @example var dtm = new Date("01/12/2008");
   * Date.addSeconds(dtm, 60);
   * dtm.toString();
   * @result Sat Jan 12 2008 00:01:00
   *
   * @returns {Date} 添加秒数后的日期
   */
  addSeconds(date, num) {
    date.setSeconds(date.getSeconds() + num);
    return date;
  },
};
