/**
 *  猎聘 growingio 相关方法
 *
 */

/**
 *  Gio.textFactory(str)
 *  传入需要处理字符串进行规则加密；
 *  如果是疑似网址则不加密，截取
 *  其余
 *  截取8字符长度
 *  暴力加密: 存在@为疑似邮箱  连续6位即为疑似电话号码
 *
 *
 */
export default {
  textFactory(str) {
    if (str && !/^(https?:\/\/.+|\/{1,2}\w+.?)/ig.test(str)) {
      const newStr = str.substring(0, 8);
      const newlen = newStr.length;
      if (newlen >= 3 && /.+(%40|@).+/g.test(newStr)) {
        return '疑似邮箱';
      }
      if (newlen >= 6 && /[0-9]{6,}/g.test(newStr)) {
        return '疑似电话号码';
      }
      return newStr;
    }
    return str;
  },
};
