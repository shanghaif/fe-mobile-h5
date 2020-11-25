import { observable, action } from 'mobx';
import { setUrlParams, getUrlParams } from '../modules/urlUtil';

class Store {
  @observable activePage = 'userform';
  @observable activeCity = '';
  @observable activeTab = 'salary';

  @action.bound
  changeCity(city) {
    this.activeCity = city;
    this.activePage = 'joblist';
  }
  @action.bound
  changePage(page) {
    if (page === 'meetingplace' && !getUrlParams().tab) {
      this.activeTab = 'salary';
    }
    this.activePage = page;
  }
  @action.bound
  changeTab(tab) {
    this.activeTab = tab;
    this.activePage = 'meetingplace';
  }
  @action.bound
  changeUrl(replace = false) {
    const {
      activePage,
      activeCity,
      activeTab,
    } = this;
    setUrlParams({
      tab: activeTab,
      page: activePage,
      city: activeCity,
    }, replace);
  }
}

export default new Store();
