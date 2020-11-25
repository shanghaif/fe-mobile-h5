import { observable, action } from 'mobx';

class Store {
  @observable
  liveInfo = {}

  @action.bound
  changeInfo(info) {
    this.liveInfo = info;
  }
}
export default new Store();
