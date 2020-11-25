const u = navigator.userAgent;
export const isTdAndroid = (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) && u.indexOf('android-tongdao-app') > -1;
export const isTdIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && u.indexOf('ios-tongdao-app') > -1;
export const isTd = Apps.isTdAndroid || Apps.isTdIos;
export const isWx = /MicroMessenger/ig.test(u);
export const isAndroid = !!navigator.userAgent.match(/Android/i);
export const isIOS = !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
