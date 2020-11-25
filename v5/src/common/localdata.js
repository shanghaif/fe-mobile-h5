/**
 * 单独提取职能、行业等公共组件，挂载在window上，如页面需要使用，单独引用js（页面js之前）
 */
import localdata, { localdataCity } from '@liepin/zepto-localdata';

window.localdata = localdata;
window.localdataCity = localdataCity;
