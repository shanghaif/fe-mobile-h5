const Apps = {};
const u = navigator.userAgent;
Apps.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
Apps.isTdAndroid = Apps.isAndroid && u.indexOf('android-tongdao-app') > -1;
Apps.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
Apps.isTdIos = Apps.isIos && u.indexOf('ios-tongdao-app') > -1;
Apps.isTd = Apps.isTdAndroid || Apps.isTdIos;
Apps.isWx = /MicroMessenger/ig.test(u);
// 判断app版本号
Apps.appVc = LT.Cookie.get('app_vc');
/*
 * 模块名称：右侧固定按钮
 * 功能说明：意见反馈、返回顶部
 */
window.Apps = Apps;
export default Apps;




