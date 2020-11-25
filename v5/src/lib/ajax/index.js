import { singleThread, throttle } from '../lambda/lambda';


function ajax(url, method) {
  const dataType = method === 'jsonp' ? 'jsonp' : 'json';
  const type = /^post$/i.test(method) ? 'POST' : 'GET';
  return singleThread((options, complete) => $.ajax({ ...options, url, dataType, type, complete }));
}

export function get(url) {
  return ajax(url, 'get');
}

export function jsonp(url) {
  return ajax(url, 'jsonp');
}

export function post(url) {
  return ajax(url, 'post');
}


function ajaxThrottle(url, method, time) {
  const dataType = method === 'jsonp' ? 'jsonp' : 'json';
  const type = /^post$/i.test(method) ? 'POST' : 'GET';
  return throttle(options => $.ajax({ ...options, url, dataType, type }), time);
}

export function getThrottle(url, time) {
  return ajaxThrottle(url, 'get', time);
}

export function jsonpThrottle(url, time) {
  return ajaxThrottle(url, 'jsonp', time);
}

export function postThrottle(url, time) {
  return ajaxThrottle(url, 'post', time);
}

