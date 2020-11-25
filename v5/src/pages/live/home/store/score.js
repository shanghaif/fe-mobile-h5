import {
  observable,
  action,
} from 'mobx';
import sweet from '@liepin/native-sweet-fe';

import liveStore from './live';


class Score {
  @observable
  scoreVisible = false;

  @observable
  isVisibleBubble = false;

  @observable
  timer = null;

  @action.bound
  setScoreVisible(visible) {
    this.scoreVisible = visible;
  }

  @action.bound
  initBubble() {
    const { info: { liveId } } = liveStore;
    this.timer = setInterval(() => {
      this.isVisibleBubble = true;
      sweet.set(`fe-c-living-c-again-${liveId}`, true);
      clearInterval(this.timer);
    }, 180000);
  }

  @action.bound
  initVisibleBubble() {
    const { info: { liveId } } = liveStore;
    if (sweet.get(`fe-c-clickBubble-${liveId}`)) {
      this.isVisibleBubble = false;
    } else if (sweet.get(`fe-c-living-c-again-${liveId}`)) {
      this.isVisibleBubble = true;
    } else {
      this.initBubble();
    }
  }
  @action.bound
  setVisibleBubble(visible) {
    const { info: { liveId } } = liveStore;
    if (visible) {
      if (sweet.get(`fe-c-living-c-again-${liveId}`)) {
        this.isVisibleBubble = true;
      } else if (!sweet.get(`fe-c-clickBubble-${liveId}`)) {
        this.initBubble();
      }
    } else {
      this.isVisibleBubble = false;
    }
  }
  @action.bound
  clickBubble() {
    const { info: { liveId } } = liveStore;
    sweet.set(`fe-c-clickBubble-${liveId}`, true, 3);
    sweet.remove(`fe-c-living-c-again-${liveId}`);
  }
}

export default new Score();
