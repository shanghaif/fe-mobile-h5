import {
  observable,
  action,
} from 'mobx';

class Live {
  @observable
  info = {};

  @observable
  liveId = '';

  @action.bound
  set(value) {
    this.info = value;
  }
  setId(id) {
    this.liveId = id;
  }
}

export default new Live();
