const pageId = Math.random();
if (window.parent) {
  window.parent.postMessage({ type: 'live', pageId, url: window.location.href }, window.location.origin);
}

window.addEventListener('message', function (event) {
  const msg = event.data;
  if (event.origin === window.location.origin && msg.type === 'live' && msg.pageId !== pageId) {
    window.location.replace(msg.url);
  }
});
