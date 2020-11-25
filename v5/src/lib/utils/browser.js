/**
 * Browser相关操作
 * @namespace Browser
 * @name Browser
 * @static
 */
export default {
  /**
   * 判断浏览器是否Sogou IE7内核
   * @name Browser.Sogou
   * @property Opera
   * @grammar Browser.Sogou
   *
   * @return {Boolean} 是否Sogou IE7内核
   */
  Opera: !!window.opera,
  /**
   * 判断浏览器是否WebKit内核
   * @name Browser.WebKit
   * @property WebKit
   * @grammar Browser.WebKit
   *
   * @return {Boolean} 是否WebKit内核
   */
  WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
  /**
   * 判断浏览器是否Gecko内核
   * @name Browser.Gecko
   * @property Gecko
   * @grammar Browser.Gecko
   *
   * @return {Boolean} 是否Gecko内核
   */
  Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
  /**
   * 判断浏览器是否Safari浏览器
   * @name Browser.Safari
   * @property Safari
   * @grammar Browser.Safari
   *
   * @return {Boolean} 是否Safari浏览器
   */
  Safari: navigator.userAgent.indexOf('Safari') !== -1,
  /**
   * 判断浏览器是否ipad/ipod/iphone端浏览器
   * @name Browser.Mobile
   * @property Mobile
   * @grammar Browser.Mobile
   *
   * @return {Boolean} 是否ipad/ipod/iphone端浏览器
   */
  Mobile: 'createTouch' in document && !('onmousemove' in document.documentElement) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
  /**
   * 获取浏览器名称
   * @name Browser.getName
   * @property getName
   * @grammar Browser.getName
   *
   * @return {String} 浏览器名称
   */
  getName() {
    let a = '';
    const n = navigator.userAgent.toLowerCase();
    const c = (browser) => n.indexOf(browser) > -1;
    const b = (
      c('opera') === true ? 'opera' :
        (c('msie') && c('360se')) === true ? '360se' :
          ((c('msie') && c('tencenttraveler')) && c('metasr')) === true ? 'sogobrowser' :
            (c('msie') && c('qqbrowser')) === true ? 'QQbrowser' :
              (c('msie') && c('tencenttraveler')) === true ? 'TTbrowser' :
                c('msie') === true ? 'msie' :
                  c('se 2.x') === true ? 'sogou' :
                    (c('safari') && !c('chrome')) === true ? 'safari' :
                      c('maxthon') === true ? 'maxthon' :
                        ((c('chrome') && c('safari')) && c('qihu 360ee')) === true ? '360ee' :
                          (c('chrome') && c('taobrowser')) === true ? 'taobrowser' :
                            c('chrome') === true ? 'chrome' :
                              ((c('gecko') && !c('webkit')) && c('seamonkey')) === true ? 'SeaMonkey' :
                                ((c('gecko') && !c('webkit')) && !c('netscape')) === true ? 'firefox' :
                                  ((c('gecko') && !c('webkit')) && c('netscape')) === true ? 'netscape' :
                                    'other').toLowerCase();
    switch (b) {
      case '360se':
      case 'qihu 360ee':
      case 'sogou':
        a = b;
        break;
      case 'opera':
      case 'safari':
      case 'firefox':
      case 'qqbrowser':
      case 'seamonkey':
      case 'taobrowser':
        a = b + n.substring(n.lastIndexOf('/'));
        break;
      case 'netscape':
      case 'chrome':
        a = b + n.substring(n.lastIndexOf('/'), n.lastIndexOf(' '));
        break;
      case 'maxthon':
        a = b + n.substring(n.lastIndexOf('/'), n.lastIndexOf('chrome'));
        break;
      case 'ttbrowser':
        a = b + n.substring(n.lastIndexOf('/'), n.lastIndexOf(')'));
        break;
      case 'msie':
        a = n.substring(n.lastIndexOf(b)).substring(0, n.substring(n.lastIndexOf(b)).indexOf(';'));
        break;
      default:
        a = b;
    }
    return a;
  },
};
