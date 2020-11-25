import liveStore from '../store/live';
import jobStore from '../store/job';

window.locationProxy = new Proxy(window.location, {
  set(target, prop, value) {
    if (prop === 'href') {
      jobStore.setListVisible(false);
      liveStore.setIframeSrc(value);
    } else {
      target[prop] = value;
    }
    return true;
  },
});
