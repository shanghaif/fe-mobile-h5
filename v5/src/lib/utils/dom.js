
/**
 * 获取元素通过行内样式设置样式的属性值
 * @param {HTMLElement} elm
 * @param {string} attrName
 * @return {string}
 */
function getStyleValue(elm, attrName) {
  return elm.style.getPropertyValue(attrName);
}
/**
 * 获取元素计算后的样式属性值
 * @param {HTMLElement} elm
 * @param {string} attrName
 * @return {string}
 */
function getCurStyleValue(elm, attrName) {
  return window.getComputedStyle(elm).getPropertyValue(attrName);
}

/**
 * 设置/获取元素的attrName对应属性的样式值
 * @param {HTMLElement} elm 要修改/获取样式的元素
 * @param {string} attrName 要修改/获取的样式名
 * @param value  值, 有value就修改, 没有就取值
 * @return {string}
 */
function css(elm, attrName, value) {
  if (value) {
    elm.style.setProperty(attrName, value);
  } else {
    return getCurStyleValue(elm, attrName);
  }
}
/**
 * 获取元素的通过行内样式设置的某一项属性值
 * @param {HTMLElement} elm 元素
 * @param {string} attrName 样式属性名
 * @return {string} 返回值
 */
function style(elm, attrName) {
  return getStyleValue(elm, attrName);
}
/**
 * 根据给定的选择器从父元素中查找第一个匹配的元素
 * @param {string} selector 选择器
 * @param {DocumentFragment | HTMLElement} parent  父元素
 * @return {HTMLElement} 匹配到的第一个元素
 */
function query(selector, parent = document.body) {
  return parent.querySelector(selector);
}
/**
 * 根据给定的选择器从父元素中查找所有匹配的元素
 * @param {string} selector
 * @param {DocumentFragment | HTMLElement} parent
 * @return {NodeList}
 */
function all(selector, parent = document.body) {
  return parent.querySelectorAll(selector);
}
/**
 * 将一段HTML字符串放到一个代码片段中, 并返回
 * @param {string} htmlStr
 * @return {DocumentFragment}
 */
function fragment(htmlStr) {
  const fragmentElm = document.createDocumentFragment();
  const div = document.createElement('div');
  div.innerHTML = htmlStr;
  Array.from(div.childNodes).forEach(function (e) { return fragmentElm.appendChild(e); });
  div.remove();
  return fragmentElm;
}
/**
 * 设置元素内的html
 * @param {string} htmlStr
 * @param {HTMLElement} elm
 */
function html(htmlStr, elm) {
  elm.innerHTML = htmlStr;
}
function append(htmlStr, elm = document.body) {
  const fragmentElm = document.createDocumentFragment();
  const div = document.createElement('div');
  div.innerHTML = htmlStr;
  Array.from(div.childNodes).forEach(function (e) { return fragmentElm.appendChild(e); });
  elm.appendChild(fragmentElm);
}
function isHtml(htmlStr) {
  return /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(htmlStr);
}

function attr(propName, elm) {
  return elm.getAttribute(propName) || '';
}

function isString(str) {
  return typeof str === 'string';
}

function hasClass(clsName, elm) {
  return elm.className.split(/\s+/).includes(clsName);
}

function addClass(className, elm) {
  const cls = elm.className.split(/\s+/);
  if (cls.includes(className)) {
    return;
  }
  cls.push(className);
  elm.className = cls.join(' ');
}

function removeClass(className, elm) {
  const cls = (elm.className || '').split(/\s+/);
  const index = cls.indexOf(className);
  if (~index) {
    cls.splice(index, 1);
    elm.className = cls.join(' ');
  }
}

function proxyEvent(eventType, selector, handler, target) {
  const targetElm = isString(target) ? query(target) : target;
  if (targetElm) {
    targetElm.addEventListener(eventType, function (event) {
      const children = all(selector, targetElm);
      let source = event.target;
      const filter = (child) => {
        if (child === event.target || child.contains(event.target)) {
          source = child;
          return true;
        }
        return false;
      };
      if ([].some.call(children, filter)) {
        handler.call(source, event);
      }
    });
  }
}

function isDisabled(elm) {
  return !elm.getAttribute('disabled');
}

function serializeArray(form) {
  const rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i;
  const rsubmittable = /^(?:input|select|textarea|keygen)/i;
  const manipulation = /^(?:checkbox|radio)$/i;
  const elements = Array.from(form.elements);

  return elements
    .filter((elm) => elm.name
      && isDisabled(elm)
      && rsubmittable.test(elm.nodeName)
      && !rsubmitterTypes.test(elm.type)
      && (elm.checked || !manipulation.test(elm.type)))
    .map(function (elem) {
      const val = elem.value;
      return val == null
        ? null
        : Array.isArray(val)
          ? val.map((v) => ({ name: elem.name, value: v.replace(/\r?\n/g, '\r\n') }))
          : { name: elem.name, value: val.replace(/\r?\n/g, '\r\n') };
    });
}

export default {
  all,
  append,
  attr,
  css,
  fragment,
  getCurStyleValue,
  getStyleValue,
  hasClass,
  removeClass,
  addClass,
  html,
  isHtml,
  serializeArray,
  proxyEvent,
  query,
  style,
};
