
const { location, history } = window;

function getUrlParams() {
  const { search } = location;
  const result = {};
  if (search) {
    decodeURIComponent(search.slice(1)).split('&').forEach(function (kv) {
      const [k, v] = kv.split('=');
      if (k && v) {
        result[k] = decodeURIComponent(v);
      }
    });
  }
  return result;
}

function setUrlParams(params = {}, replace) {
  const search = Object.assign(getUrlParams(), params);
  const url = Object.keys(search).filter((key) => (search[key])).map((key) => (`${key}=${search[key]}`)).join('&');
  history[replace ? 'replaceState' : 'pushState']({}, '', `?${url}`);
}

export {
  getUrlParams,
  setUrlParams,
};
